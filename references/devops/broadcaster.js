'use strict';

const {
  COLLECTIONS,
  HEARTBEAT_MS,
  EVENT_TYPES,
  CLUSTER_MODES,
  DEFAULT_REDIS_ENABLED,
  DEFAULT_REDIS_CHANNEL,
  DEFAULT_CLUSTER_POLL_MS,
  getHostId,
  normalizeId,
  idsEqual,
  generateId,
  getCollection
} = require('./constants');

const activeWatchers = Object.create(null);
const activeStreams = Object.create(null);

const clusterConfig = {
  useRedis: DEFAULT_REDIS_ENABLED, // Default false (OFF) -> uses MongoDB-Native Cluster Mode
  clusterMode: CLUSTER_MODES.MONGO,
  clusterPollIntervalMs: DEFAULT_CLUSTER_POLL_MS,
  enableChangeStreams: true,
  redisChannel: DEFAULT_REDIS_CHANNEL,
  redisControlChannel: `${DEFAULT_REDIS_CHANNEL}:control`,
  redisPub: null,
  redisSub: null,
  redisSubscribed: false,
  onControlSignal: null
};

exports.activeWatchers = activeWatchers;
exports.activeStreams = activeStreams;

exports.setControlSignalHandler = (handlerFn) => {
  clusterConfig.onControlSignal = typeof handlerFn === 'function' ? handlerFn : null;
};

exports.getClusterConfig = () => ({
  useRedis: clusterConfig.useRedis,
  clusterMode: clusterConfig.clusterMode,
  clusterPollIntervalMs: clusterConfig.clusterPollIntervalMs,
  enableChangeStreams: clusterConfig.enableChangeStreams,
  redisChannel: clusterConfig.redisChannel,
  redisControlChannel: clusterConfig.redisControlChannel,
  hasRedisPub: Boolean(clusterConfig.redisPub),
  hasRedisSub: Boolean(clusterConfig.redisSub),
  redisConnected: Boolean(clusterConfig.useRedis && clusterConfig.redisPub && clusterConfig.redisSub)
});

exports.registerWatcher = (taskId, watcherState) => {
  const key = normalizeId(taskId);
  if (!key) {
    throw Error('registerWatcher requires a valid taskId');
  }
  activeWatchers[key] = watcherState;
  return watcherState;
};

exports.getWatcher = (taskId) => {
  const key = normalizeId(taskId);
  if (!key) {
    return null;
  }
  return activeWatchers[key] || null;
};

exports.unregisterWatcher = (taskId) => {
  const key = normalizeId(taskId);
  if (!key || !activeWatchers[key]) {
    return false;
  }
  delete activeWatchers[key];
  return true;
};

exports.getWatchersByBatch = (batchId) => {
  if (batchId === undefined || batchId === null) {
    return [];
  }
  return Object.values(activeWatchers).filter((w) => w && idsEqual(w.batchId, batchId));
};

exports.getWatchersByRunner = (runnerId) => {
  if (runnerId === undefined || runnerId === null) {
    return [];
  }
  return Object.values(activeWatchers).filter((w) => w && idsEqual(w.runnerId, runnerId));
};

exports.getAllWatchers = () => Object.values(activeWatchers);

exports.matchesStreamFilter = (filters, payload) => {
  if (!filters) {
    return true;
  }
  if (filters.mapId && !idsEqual(filters.mapId, payload.mapId)) {
    return false;
  }
  if (filters.runnerId && !idsEqual(filters.runnerId, payload.runnerId)) {
    return false;
  }
  if (filters.batchId && !idsEqual(filters.batchId, payload.batchId)) {
    return false;
  }
  if (filters.taskId && !idsEqual(filters.taskId, payload.taskId)) {
    return false;
  }
  return true;
};

const formatSseFrame = (payload) => {
  const eventType = payload.type || EVENT_TYPES.STDOUT;
  const eventId = payload.id || `${payload.ts || Date.now()}-${payload.taskId || payload.batchId || payload.runnerId || 'sys'}`;
  return `event: ${eventType}\nid: ${eventId}\ndata: ${JSON.stringify(payload)}\n\n`;
};

const getEntryDedupKey = (payload) =>
  `${payload.ts || 0}:${payload.taskId || ''}:${payload.batchId || ''}:${payload.type || ''}:${payload.msg || ''}`;

const MAX_DEDUP_KEYS = 2048;

const hasSeenDedupKey = (client, key) => Boolean(
  client &&
  ((client.seenDedupKeys && client.seenDedupKeys[key]) ||
   (client.seenDedupPrev && client.seenDedupPrev[key]))
);

const markSeenDedupKey = (client, key) => {
  if (!client || !client.seenDedupKeys) {
    return;
  }
  if (client.seenDedupKeys[key]) {
    return;
  }
  if ((client.seenDedupCount || 0) >= MAX_DEDUP_KEYS) {
    client.seenDedupPrev = client.seenDedupKeys;
    client.seenDedupKeys = Object.create(null);
    client.seenDedupCount = 0;
  }
  client.seenDedupKeys[key] = true;
  client.seenDedupCount = (client.seenDedupCount || 0) + 1;
};

exports.MAX_DEDUP_KEYS = MAX_DEDUP_KEYS;
exports.hasSeenDedupKey = hasSeenDedupKey;
exports.markSeenDedupKey = markSeenDedupKey;

const deliverToLocalStreams = (payload) => {
  const sseFrame = formatSseFrame(payload);
  const dedupKey = getEntryDedupKey(payload);
  let deliveredCount = 0;

  const streamKeys = Object.keys(activeStreams);
  for (let i = 0; i < streamKeys.length; i += 1) {
    const streamId = streamKeys[i];
    const client = activeStreams[streamId];
    if (!client || client.closed) {
      continue;
    }
    if (exports.matchesStreamFilter(client.filters, payload)) {
      if (hasSeenDedupKey(client, dedupKey)) {
        continue;
      }
      if (client.isReplaying && Array.isArray(client.liveBuffer)) {
        client.liveBuffer.push(payload);
        deliveredCount += 1;
        continue;
      }
      try {
        markSeenDedupKey(client, dedupKey);
        client.res.write(sseFrame);
        deliveredCount += 1;
      } catch (_err) {
        client.close();
      }
    }
  }

  return deliveredCount;
};

const handleIncomingRedisMessage = (channel, rawMessage) => {
  if (!clusterConfig.useRedis || !rawMessage) {
    return;
  }
  try {
    const parsed = typeof rawMessage === 'string' ? JSON.parse(rawMessage) : rawMessage;
    if (!parsed || typeof parsed !== 'object') {
      return;
    }

    if (channel === clusterConfig.redisControlChannel) {
      if (typeof clusterConfig.onControlSignal === 'function') {
        Promise.resolve(clusterConfig.onControlSignal(parsed)).catch(() => {});
      }
      return;
    }

    if (channel === clusterConfig.redisChannel && parsed.payload) {
      const localHost = getHostId();
      // Ignore events that originated on the same host & were already delivered locally
      const targetCheckHost = parsed.subscriberHostId || localHost;
      if (parsed.originHostId && parsed.originHostId === targetCheckHost) {
        return;
      }
      deliverToLocalStreams({
        ...parsed.payload,
        _fromCluster: true
      });
    }
  } catch (_err) {
    // Ignore malformed Redis message
  }
};

exports.configureCluster = (options = {}) => {
  if (options.useRedis !== undefined) {
    clusterConfig.useRedis = Boolean(options.useRedis);
  }
  if (options.clusterMode) {
    clusterConfig.clusterMode = options.clusterMode;
  } else {
    clusterConfig.clusterMode = clusterConfig.useRedis ? CLUSTER_MODES.REDIS : CLUSTER_MODES.MONGO;
  }

  if (options.clusterPollIntervalMs !== undefined && Number(options.clusterPollIntervalMs) > 0) {
    clusterConfig.clusterPollIntervalMs = Number(options.clusterPollIntervalMs);
  }
  if (options.enableChangeStreams !== undefined) {
    clusterConfig.enableChangeStreams = Boolean(options.enableChangeStreams);
  }
  if (options.redisChannel) {
    clusterConfig.redisChannel = String(options.redisChannel);
    clusterConfig.redisControlChannel = options.redisControlChannel
      ? String(options.redisControlChannel)
      : `${clusterConfig.redisChannel}:control`;
  }
  if (options.redisControlChannel) {
    clusterConfig.redisControlChannel = String(options.redisControlChannel);
  }
  if (options.redisPub !== undefined) {
    clusterConfig.redisPub = options.redisPub;
  }
  if (options.redisSub !== undefined) {
    clusterConfig.redisSub = options.redisSub;
    clusterConfig.redisSubscribed = false;
  }
  if (typeof options.onControlSignal === 'function') {
    clusterConfig.onControlSignal = options.onControlSignal;
  }

  if (clusterConfig.useRedis && clusterConfig.redisSub && !clusterConfig.redisSubscribed) {
    clusterConfig.redisSubscribed = true;
    const sub = clusterConfig.redisSub;
    const evtChan = clusterConfig.redisChannel;
    const ctrlChan = clusterConfig.redisControlChannel;

    if (typeof sub.on === 'function') {
      sub.on('message', (chan, msg) => {
        handleIncomingRedisMessage(chan, msg);
      });
    }

    if (typeof sub.subscribe === 'function') {
      try {
        sub.subscribe(evtChan, (msg, chan) => {
          handleIncomingRedisMessage(chan || evtChan, msg);
        });
        sub.subscribe(ctrlChan, (msg, chan) => {
          handleIncomingRedisMessage(chan || ctrlChan, msg);
        });
      } catch (_err) {
        // Ignore subscribe error
      }
    }
  } else if (!clusterConfig.useRedis) {
    clusterConfig.redisSubscribed = false;
  }

  return exports.getClusterConfig();
};

exports.createInMemoryRedisBus = () => {
  const channelListeners = Object.create(null);

  const createClient = () => {
    const messageHandlers = [];
    return {
      on: (event, fn) => {
        if (event === 'message' && typeof fn === 'function') {
          messageHandlers.push(fn);
        }
      },
      subscribe: (channel, callback) => {
        if (!channelListeners[channel]) {
          channelListeners[channel] = [];
        }
        const entry = {
          callback: typeof callback === 'function' ? callback : null,
          messageHandlers
        };
        channelListeners[channel].push(entry);
        return Promise.resolve('OK');
      },
      publish: (channel, message) => {
        const subs = channelListeners[channel] || [];
        const strMsg = typeof message === 'string' ? message : JSON.stringify(message);
        for (let i = 0; i < subs.length; i += 1) {
          const sub = subs[i];
          if (sub.callback) {
            sub.callback(strMsg, channel);
          } else if (Array.isArray(sub.messageHandlers)) {
            for (let j = 0; j < sub.messageHandlers.length; j += 1) {
              sub.messageHandlers[j](channel, strMsg);
            }
          }
        }
        return Promise.resolve(subs.length);
      }
    };
  };

  return {
    createClient,
    redisPub: createClient(),
    redisSub: createClient()
  };
};

exports.publishControlSignal = async (req, signalPayload = {}) => {
  if (!clusterConfig.useRedis || !clusterConfig.redisPub || typeof clusterConfig.redisPub.publish !== 'function') {
    return false;
  }
  try {
    const message = JSON.stringify({
      originHostId: getHostId(req),
      ts: Date.now(),
      ...signalPayload
    });
    await clusterConfig.redisPub.publish(clusterConfig.redisControlChannel, message);
    return true;
  } catch (_err) {
    return false;
  }
};

exports.broadcast = (req, runId, entry = {}) => {
  const runIdIsObj = typeof runId === 'object' && runId !== null && !runId._bsontype;
  const resolvedRunnerId = entry.runnerId !== undefined
    ? entry.runnerId
    : (runIdIsObj ? runId.runnerId : runId);
  const originHostId = entry.hostId || getHostId(req);

  const payload = {
    ...entry,
    hostId: originHostId,
    mapId: entry.mapId !== undefined ? entry.mapId : (runIdIsObj ? runId.mapId : null),
    runnerId: resolvedRunnerId !== undefined ? resolvedRunnerId : null,
    batchId: entry.batchId !== undefined ? entry.batchId : (runIdIsObj ? runId.batchId : null),
    taskId: entry.taskId !== undefined ? entry.taskId : (runIdIsObj ? runId.taskId : null),
    type: entry.type || EVENT_TYPES.STDOUT,
    msg: entry.msg !== undefined ? String(entry.msg) : '',
    ts: entry.ts || Date.now()
  };

  const deliveredCount = deliverToLocalStreams(payload);

  if (
    clusterConfig.useRedis &&
    clusterConfig.redisPub &&
    typeof clusterConfig.redisPub.publish === 'function' &&
    !entry._fromCluster
  ) {
    try {
      const redisEnvelope = JSON.stringify({
        originHostId,
        payload
      });
      Promise.resolve(clusterConfig.redisPub.publish(clusterConfig.redisChannel, redisEnvelope)).catch(() => {});
    } catch (_err) {
      // Ignore Redis publish error
    }
  }

  return deliveredCount;
};

const fetchCursorArray = async (col, filter, sortSpec = { _id: 1 }) => {
  if (!col || typeof col.find !== 'function') {
    return [];
  }
  const cursorOrArr = await col.find(filter);
  if (Array.isArray(cursorOrArr)) {
    return cursorOrArr;
  }
  if (cursorOrArr && typeof cursorOrArr.sort === 'function') {
    const sorted = cursorOrArr.sort(sortSpec);
    if (typeof sorted.toArray === 'function') {
      return sorted.toArray();
    }
  }
  if (cursorOrArr && typeof cursorOrArr.toArray === 'function') {
    return cursorOrArr.toArray();
  }
  return [];
};

exports.replayStreamHistory = async (req, client, options = {}) => {
  if (!client || client.closed) {
    return 0;
  }

  let logCol = null;
  try {
    logCol = getCollection(req, COLLECTIONS.LOG);
  } catch (_err) {
    logCol = null;
  }

  if (!logCol) {
    client.isReplaying = false;
    return 0;
  }

  const dbFilter = {};
  if (client.filters.mapId) {
    dbFilter.mapId = client.filters.mapId;
  }
  if (client.filters.runnerId) {
    dbFilter.runnerId = client.filters.runnerId;
  }
  if (client.filters.batchId) {
    dbFilter.batchId = client.filters.batchId;
  }
  if (client.filters.taskId) {
    dbFilter.taskId = client.filters.taskId;
  }

  const afterTs = Number(options.afterTs || 0);
  const seenKeys = Object.create(null);
  let replayedCount = 0;

  try {
    // Optionally emit current tier state snapshot first if includeState is enabled
    if (options.includeState) {
      const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
      const batchCol = getCollection(req, COLLECTIONS.BATCH);
      const taskCol = getCollection(req, COLLECTIONS.TASK);

      const stateSnapshot = {
        type: EVENT_TYPES.STATUS,
        isSnapshot: true,
        mapId: client.filters.mapId,
        runnerId: client.filters.runnerId,
        batchId: client.filters.batchId,
        taskId: client.filters.taskId,
        runner: client.filters.runnerId && runnerCol ? await runnerCol.findOne({ _id: client.filters.runnerId }) : null,
        batches: client.filters.runnerId && batchCol ? await fetchCursorArray(batchCol, { runnerId: client.filters.runnerId }, { order: 1 }) : [],
        tasks: (client.filters.runnerId || client.filters.batchId || client.filters.taskId) && taskCol
          ? await fetchCursorArray(
              taskCol,
              client.filters.taskId
                ? { _id: client.filters.taskId }
                : (client.filters.batchId ? { batchId: client.filters.batchId } : { runnerId: client.filters.runnerId }),
              { order: 1 }
            )
          : [],
        ts: Date.now()
      };

      if (!client.closed) {
        client.res.write(`event: snapshot\ndata: ${JSON.stringify(stateSnapshot)}\n\n`);
      }
    }

    const buckets = await fetchCursorArray(logCol, dbFilter, { _id: 1 });

    for (let i = 0; i < buckets.length; i += 1) {
      if (client.closed) {
        break;
      }
      const bucket = buckets[i];
      const entries = (bucket && Array.isArray(bucket.logs)) ? bucket.logs : [];
      if (bucket && bucket._id !== undefined && client.seenBucketCounts) {
        client.seenBucketCounts[String(bucket._id)] = entries.length;
      }

      for (let j = 0; j < entries.length; j += 1) {
        if (client.closed) {
          break;
        }
        const entry = entries[j];
        if (!entry) {
          continue;
        }
        if (afterTs > 0 && Number(entry.ts || 0) <= afterTs) {
          continue;
        }

        const payload = {
          ...entry,
          mapId: bucket.mapId,
          runnerId: bucket.runnerId,
          batchId: bucket.batchId,
          taskId: bucket.taskId,
          replayed: true
        };

        const dedupKey = getEntryDedupKey(payload);
        seenKeys[dedupKey] = true;
        markSeenDedupKey(client, dedupKey);

        client.res.write(formatSseFrame(payload));
        replayedCount += 1;
      }
    }

    // Drain any live events that arrived while MongoDB buckets were being read
    if (Array.isArray(client.liveBuffer)) {
      while (client.liveBuffer.length > 0 && !client.closed) {
        const bufferedPayload = client.liveBuffer.shift();
        const dedupKey = getEntryDedupKey(bufferedPayload);
        if (seenKeys[dedupKey] || hasSeenDedupKey(client, dedupKey)) {
          continue;
        }
        seenKeys[dedupKey] = true;
        markSeenDedupKey(client, dedupKey);
        if (afterTs > 0 && Number(bufferedPayload.ts || 0) <= afterTs) {
          continue;
        }
        client.res.write(formatSseFrame(bufferedPayload));
      }
    }
  } catch (_err) {
    // Ignore write/query errors if client disconnected mid-replay
  } finally {
    client.isReplaying = false;
    client.liveBuffer = [];
  }

  return replayedCount;
};

const buildClientDbFilter = (filters) => {
  const dbFilter = {};
  if (filters.mapId) {
    dbFilter.mapId = filters.mapId;
  }
  if (filters.runnerId) {
    dbFilter.runnerId = filters.runnerId;
  }
  if (filters.batchId) {
    dbFilter.batchId = filters.batchId;
  }
  if (filters.taskId) {
    dbFilter.taskId = filters.taskId;
  }
  return dbFilter;
};

exports.pollClientMongoBuckets = async (req, client) => {
  if (
    !client ||
    client.closed ||
    client.isReplaying ||
    clusterConfig.useRedis ||
    clusterConfig.clusterMode !== CLUSTER_MODES.MONGO
  ) {
    return 0;
  }

  let logCol = null;
  try {
    logCol = getCollection(req, COLLECTIONS.LOG);
  } catch (_err) {
    logCol = null;
  }
  if (!logCol) {
    return 0;
  }

  const dbFilter = buildClientDbFilter(client.filters);
  let delivered = 0;

  try {
    const buckets = await fetchCursorArray(logCol, dbFilter, { _id: 1 });
    for (let i = 0; i < buckets.length; i += 1) {
      if (client.closed) {
        break;
      }
      const bucket = buckets[i];
      if (!bucket || bucket._id === undefined) {
        continue;
      }
      const bucketKey = String(bucket._id);
      const entries = Array.isArray(bucket.logs) ? bucket.logs : [];
      const prevCount = client.seenBucketCounts[bucketKey] || 0;

      if (entries.length <= prevCount) {
        continue;
      }

      client.seenBucketCounts[bucketKey] = entries.length;

      for (let j = prevCount; j < entries.length; j += 1) {
        if (client.closed) {
          break;
        }
        const entry = entries[j];
        if (!entry) {
          continue;
        }

        const entryHostId = entry.hostId || bucket.hostId || null;
        // Skip entries generated on this same host (already delivered in-memory via broadcast)
        if (entryHostId && entryHostId === client.localHostId) {
          continue;
        }

        const payload = {
          ...entry,
          hostId: entryHostId,
          mapId: bucket.mapId,
          runnerId: bucket.runnerId,
          batchId: bucket.batchId,
          taskId: bucket.taskId
        };

        const dedupKey = getEntryDedupKey(payload);
        if (hasSeenDedupKey(client, dedupKey)) {
          continue;
        }
        markSeenDedupKey(client, dedupKey);

        try {
          client.res.write(formatSseFrame(payload));
          delivered += 1;
        } catch (_writeErr) {
          client.close();
          break;
        }
      }
    }
  } catch (_err) {
    // Ignore transient DB poll errors
  }

  return delivered;
};

const startClientMongoClusterBridge = (req, client) => {
  if (clusterConfig.useRedis || clusterConfig.clusterMode !== CLUSTER_MODES.MONGO) {
    return;
  }

  let logCol = null;
  try {
    logCol = getCollection(req, COLLECTIONS.LOG);
  } catch (_err) {
    logCol = null;
  }

  // 1. Attach MongoDB Change Stream if supported by driver/ReplicaSet
  if (clusterConfig.enableChangeStreams && logCol && typeof logCol.watch === 'function') {
    try {
      const changeStream = logCol.watch([], { fullDocument: 'updateLookup' });
      if (changeStream && typeof changeStream.on === 'function') {
        client.mongoChangeStream = changeStream;
        changeStream.on('change', () => {
          if (!client.closed) {
            exports.pollClientMongoBuckets(req, client);
          }
        });
        changeStream.on('error', () => {
          if (client.mongoChangeStream && typeof client.mongoChangeStream.close === 'function') {
            try {
              client.mongoChangeStream.close();
            } catch (_e) {
              // Ignore
            }
          }
          client.mongoChangeStream = null;
        });
      }
    } catch (_err) {
      client.mongoChangeStream = null;
    }
  }

  // 2. Attach MongoDB Watermark Delta Tailer (works on Standalone & Replica Sets)
  const pollMs = Math.max(30, Number(clusterConfig.clusterPollIntervalMs || DEFAULT_CLUSTER_POLL_MS));
  client.mongoTailTimer = setInterval(() => {
    if (client.closed) {
      return;
    }
    exports.pollClientMongoBuckets(req, client);
  }, pollMs);

  if (client.mongoTailTimer && typeof client.mongoTailTimer.unref === 'function') {
    client.mongoTailTimer.unref();
  }
};

exports.attachStream = (req, res, queryFilters = {}) => {
  const reqQuery = (req && req.query) || {};
  const reqParams = (req && req.params) || {};
  const reqHeaders = (req && req.headers) || {};
  const merged = { ...reqParams, ...reqQuery, ...(queryFilters || {}) };

  const filters = {
    mapId: merged.mapId ? normalizeId(merged.mapId) : null,
    runnerId: merged.runnerId ? normalizeId(merged.runnerId) : null,
    batchId: merged.batchId ? normalizeId(merged.batchId) : null,
    taskId: merged.taskId ? normalizeId(merged.taskId) : null
  };

  // Determine if history replay on page refresh / reconnect is requested
  const lastEventIdHeader = reqHeaders['last-event-id'] || merged.lastEventId || null;
  const parsedLastEventTs = lastEventIdHeader ? Number(String(lastEventIdHeader).split('-')[0]) : 0;
  const afterTs = Number(merged.afterTs || parsedLastEventTs || 0);
  const shouldReplayHistory = Boolean(
    merged.replayHistory === true ||
    merged.replayHistory === 'true' ||
    merged.replayHistory === '1' ||
    merged.replay === true ||
    merged.replay === 'true' ||
    afterTs > 0
  );
  const includeState = Boolean(
    merged.includeState === true ||
    merged.includeState === 'true' ||
    merged.includeState === '1'
  );

  if (res && typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
  } else if (res && typeof res.writeHead === 'function') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
  }

  if (res && typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  const streamId = generateId(req);
  const heartbeatIntervalMs = Number(merged.heartbeatMs) > 0 ? Number(merged.heartbeatMs) : HEARTBEAT_MS;
  const localHostId = getHostId(req);

  const client = {
    streamId,
    req,
    res,
    filters,
    localHostId,
    seenBucketCounts: Object.create(null),
    seenDedupKeys: Object.create(null),
    seenDedupPrev: null,
    seenDedupCount: 0,
    closed: false,
    isReplaying: shouldReplayHistory || includeState,
    liveBuffer: [],
    replayPromise: null,
    heartbeatTimer: null,
    mongoTailTimer: null,
    mongoChangeStream: null,
    close: null
  };

  const cleanup = () => {
    if (client.closed) {
      return;
    }
    client.closed = true;
    if (client.heartbeatTimer) {
      clearInterval(client.heartbeatTimer);
      client.heartbeatTimer = null;
    }
    if (client.mongoTailTimer) {
      clearInterval(client.mongoTailTimer);
      client.mongoTailTimer = null;
    }
    if (client.mongoChangeStream && typeof client.mongoChangeStream.close === 'function') {
      try {
        client.mongoChangeStream.close();
      } catch (_err) {
        // Ignore close error
      }
      client.mongoChangeStream = null;
    }
    delete activeStreams[streamId];
  };

  client.close = cleanup;
  activeStreams[streamId] = client;

  if (res && typeof res.write === 'function') {
    try {
      res.write(': connected\n\n');
    } catch (_err) {
      cleanup();
      return client;
    }
  }

  if (shouldReplayHistory || includeState) {
    client.replayPromise = exports.replayStreamHistory(req, client, {
      afterTs,
      includeState
    });
  }

  startClientMongoClusterBridge(req, client);

  client.heartbeatTimer = setInterval(() => {
    if (client.closed || !client.res || typeof client.res.write !== 'function') {
      cleanup();
      return;
    }
    try {
      client.res.write(': ping\n\n');
    } catch (_err) {
      cleanup();
    }
  }, heartbeatIntervalMs);

  if (client.heartbeatTimer && typeof client.heartbeatTimer.unref === 'function') {
    client.heartbeatTimer.unref();
  }

  if (req && typeof req.on === 'function') {
    req.on('close', cleanup);
    req.on('error', cleanup);
  }
  if (res && typeof res.on === 'function') {
    res.on('close', cleanup);
    res.on('error', cleanup);
  }

  return client;
};
