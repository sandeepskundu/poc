'use strict';

const {
  BUCKET_SIZE,
  COLLECTIONS,
  EVENT_TYPES,
  REDACTION_MASK,
  DEFAULT_SECRET_KEY_PATTERN,
  getHostId,
  getCollection,
  unwrapFindOneAndUpdate
} = require('./constants');
const broadcaster = require('./broadcaster');

let customSessionProvider = null;

exports.setSessionProvider = (providerFn) => {
  customSessionProvider = typeof providerFn === 'function' ? providerFn : null;
};

exports.user = (req) => {
  if (!req) {
    return { uId: 'system', aId: 'system' };
  }
  if (customSessionProvider) {
    const details = customSessionProvider(req);
    if (details && (details.uId || details.aId)) {
      return { uId: details.uId || 'system', aId: details.aId || 'system' };
    }
  }
  if (req.session && typeof req.session.details === 'function') {
    const details = req.session.details(req);
    if (details && (details.uId || details.aId)) {
      return { uId: details.uId || 'system', aId: details.aId || 'system' };
    }
  }
  if (typeof req.sessionDetails === 'function') {
    const details = req.sessionDetails(req);
    if (details && (details.uId || details.aId)) {
      return { uId: details.uId || 'system', aId: details.aId || 'system' };
    }
  }
  if (req.ud && typeof req.ud === 'object') {
    return {
      uId: req.ud.uId || 'system',
      aId: req.ud.aId || 'system'
    };
  }
  if (req.session && (req.session.uId || req.session.aId)) {
    return {
      uId: req.session.uId || 'system',
      aId: req.session.aId || 'system'
    };
  }
  if (req.user && typeof req.user === 'object') {
    return {
      uId: req.user.uId || req.user._id || req.user.id || 'system',
      aId: req.user.aId || req.user.accountId || 'system'
    };
  }
  return { uId: 'system', aId: 'system' };
};

exports.extractSecretValues = (env = {}, secretKeys = [], explicitSecrets = []) => {
  const values = [];
  const seen = Object.create(null);

  const addVal = (val) => {
    if (val === undefined || val === null) {
      return;
    }
    const str = String(val).trim();
    if (str.length >= 3 && !seen[str]) {
      seen[str] = true;
      values.push(str);
    }
  };

  if (Array.isArray(explicitSecrets)) {
    for (let i = 0; i < explicitSecrets.length; i += 1) {
      addVal(explicitSecrets[i]);
    }
  }

  const explicitKeyMap = Object.create(null);
  if (Array.isArray(secretKeys)) {
    for (let i = 0; i < secretKeys.length; i += 1) {
      if (secretKeys[i]) {
        explicitKeyMap[String(secretKeys[i])] = true;
      }
    }
  }

  if (env && typeof env === 'object') {
    const envKeys = Object.keys(env);
    for (let i = 0; i < envKeys.length; i += 1) {
      const k = envKeys[i];
      if (explicitKeyMap[k] || DEFAULT_SECRET_KEY_PATTERN.test(k)) {
        addVal(env[k]);
      }
    }
  }

  // Sort longest first so substring secrets don't partially mask longer secrets
  const sorted = values.sort((a, b) => b.length - a.length);
  if (sorted.length > 0) {
    Object.defineProperty(sorted, '_compiledRegex', {
      value: exports.compileSecretRegex(sorted),
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  return sorted;
};

exports.escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.compileSecretRegex = (secretValues = []) => {
  if (!Array.isArray(secretValues) || secretValues.length === 0) {
    return null;
  }
  const escaped = [];
  for (let i = 0; i < secretValues.length; i += 1) {
    const s = secretValues[i];
    if (s && typeof s === 'string') {
      escaped.push(exports.escapeRegex(s));
    }
  }
  if (escaped.length === 0) {
    return null;
  }
  return RegExp(escaped.join('|'), 'g');
};

exports.maskSecrets = (text, secretValues = []) => {
  if (text === undefined || text === null) {
    return '';
  }
  const masked = String(text);
  if (!Array.isArray(secretValues) || secretValues.length === 0 || masked.length === 0) {
    return masked;
  }

  let regex = secretValues._compiledRegex;
  if (regex === undefined) {
    regex = exports.compileSecretRegex(secretValues);
    try {
      Object.defineProperty(secretValues, '_compiledRegex', {
        value: regex,
        enumerable: false,
        configurable: true,
        writable: true
      });
    } catch (_err) {
      // Ignore if array is frozen
    }
  }

  if (regex) {
    return masked.replace(regex, REDACTION_MASK);
  }

  let fallbackMasked = masked;
  for (let i = 0; i < secretValues.length; i += 1) {
    const secret = secretValues[i];
    if (secret && fallbackMasked.includes(secret)) {
      fallbackMasked = fallbackMasked.split(secret).join(REDACTION_MASK);
    }
  }
  return fallbackMasked;
};

const HEADER_TAG_MAP = {
  'step-start': EVENT_TYPES.STEP_START,
  'step-end': EVENT_TYPES.STEP_END,
  'step-ok': EVENT_TYPES.STEP_OK,
  'step-fail': EVENT_TYPES.STEP_FAIL,
  'section-start': EVENT_TYPES.SECTION_START,
  'group': EVENT_TYPES.SECTION_START,
  'section-end': EVENT_TYPES.SECTION_END,
  'endgroup': EVENT_TYPES.SECTION_END,
  'progress': EVENT_TYPES.PROGRESS,
  'metric': EVENT_TYPES.METRIC,
  'set-output': EVENT_TYPES.OUTPUT,
  'output': EVENT_TYPES.OUTPUT,
  'error': EVENT_TYPES.ERROR,
  'err': EVENT_TYPES.ERROR,
  'warning': EVENT_TYPES.WARNING,
  'warn': EVENT_TYPES.WARNING,
  'info': EVENT_TYPES.INFO,
  'debug': EVENT_TYPES.DEBUG,
  'command': EVENT_TYPES.COMMAND,
  'cmd': EVENT_TYPES.COMMAND,
  'system': EVENT_TYPES.SYSTEM,
  'lifecycle': EVENT_TYPES.LIFECYCLE,
  'status': EVENT_TYPES.STATUS,
  'done': EVENT_TYPES.DONE,
  'timeout': EVENT_TYPES.TIMEOUT
};

const INLINE_HEADER_REGEX = /^##\[([a-zA-Z0-9_:-]+)(?:\s+([^\]]+))?\]\s*(.*)$/;
const PROGRESS_PERCENT_REGEX = /(\d+(?:\.\d+)?)\s*%/;
const KEY_VALUE_REGEX = /^([a-zA-Z_][a-zA-Z0-9_.-]*)\s*=\s*(.*)$/;

exports.parseLogLine = (line, defaultType = EVENT_TYPES.STDOUT, ts = Date.now(), secretValues = []) => {
  const rawLine = String(line);
  const match = INLINE_HEADER_REGEX.exec(rawLine);

  if (!match) {
    return {
      type: defaultType,
      msg: exports.maskSecrets(rawLine, secretValues),
      ts
    };
  }

  const rawTag = match[1].toLowerCase().trim();
  const inlineParam = match[2] ? match[2].trim() : '';
  const trailingBody = match[3] !== undefined ? match[3] : '';
  const body = inlineParam && trailingBody
    ? `${inlineParam} ${trailingBody}`
    : (inlineParam || trailingBody);
  const mappedType = HEADER_TAG_MAP[rawTag] || rawTag;

  const entry = {
    type: mappedType,
    msg: exports.maskSecrets(body, secretValues),
    ts
  };

  if (mappedType === EVENT_TYPES.PROGRESS) {
    const pctMatch = PROGRESS_PERCENT_REGEX.exec(body);
    if (pctMatch) {
      entry.progress = Number(pctMatch[1]);
    }
  } else if (mappedType === EVENT_TYPES.OUTPUT) {
    const kvSource = inlineParam && KEY_VALUE_REGEX.test(inlineParam) ? inlineParam : body;
    const kvMatch = KEY_VALUE_REGEX.exec(kvSource);
    if (kvMatch) {
      entry.outputKey = kvMatch[1].trim();
      entry.outputValue = kvMatch[2].trim();
      entry.msg = exports.maskSecrets(`${entry.outputKey}=${entry.outputValue}`, secretValues);
    }
  }

  return entry;
};

exports.parseLogChunk = (text, defaultType = EVENT_TYPES.STDOUT, secretValues = []) => {
  if (text === undefined || text === null) {
    return [];
  }
  const str = Buffer.isBuffer(text) ? text.toString('utf8') : String(text);
  if (str.length === 0) {
    return [];
  }

  const lines = str.split(/\r?\n/);
  if (lines.length > 0 && lines[lines.length - 1] === '' && /\r?\n$/.test(str)) {
    lines.pop();
  }

  const now = Date.now();
  return lines.map((line) => exports.parseLogLine(line, defaultType, now, secretValues));
};

exports.appendLogsToDb = async (req, tierIds = {}, entries = [], byteOffset) => {
  const {
    mapId = null,
    runnerId = null,
    batchId = null,
    taskId = null,
    secretValues = [],
    alreadyMasked = false
  } = tierIds || {};
  const hostId = (tierIds && tierIds.hostId) || getHostId(req);

  const normalizedEntries = Array.isArray(entries)
    ? entries.map((item) => {
        const rawMsg = item && item.msg !== undefined ? String(item.msg) : String(item || '');
        return {
          type: (item && item.type) || EVENT_TYPES.STDOUT,
          msg: alreadyMasked ? rawMsg : exports.maskSecrets(rawMsg, secretValues),
          ts: (item && item.ts) || Date.now(),
          hostId: (item && item.hostId) || hostId,
          ...(item && item.progress !== undefined ? { progress: item.progress } : {}),
          ...(item && item.outputKey !== undefined ? { outputKey: item.outputKey } : {})
        };
      })
    : [];

  let lastBucketDoc = null;

  if (normalizedEntries.length > 0 && req) {
    const logCollection = getCollection(req, COLLECTIONS.LOG);
    const ud = (tierIds && tierIds.ud) || exports.user(req);

    if (logCollection && !logCollection._bucketCountCache) {
      try {
        Object.defineProperty(logCollection, '_bucketCountCache', {
          value: Object.create(null),
          enumerable: false,
          configurable: true,
          writable: true
        });
      } catch (_err) {
        // Ignore if collection object is sealed
      }
    }
    const bucketCache = (logCollection && logCollection._bucketCountCache) || null;
    const bucketCacheKey = `${mapId || ''}:${runnerId || ''}:${batchId || ''}:${taskId || ''}`;

    const bucketFilter = {
      mapId,
      runnerId,
      batchId,
      taskId,
      count: { $lt: BUCKET_SIZE }
    };

    let offset = 0;
    while (offset < normalizedEntries.length) {
      let maxSliceSize = BUCKET_SIZE;
      const cachedCount = bucketCache ? bucketCache[bucketCacheKey] : undefined;

      if (typeof cachedCount === 'number') {
        maxSliceSize = cachedCount > 0 && cachedCount < BUCKET_SIZE
          ? Math.max(1, BUCKET_SIZE - cachedCount)
          : BUCKET_SIZE;
      } else if (normalizedEntries.length - offset > 1 && typeof logCollection.findOne === 'function') {
        try {
          const openBucket = await logCollection.findOne(bucketFilter, { sort: { _id: -1 } });
          if (openBucket && typeof openBucket.count === 'number' && openBucket.count < BUCKET_SIZE) {
            maxSliceSize = Math.max(1, BUCKET_SIZE - openBucket.count);
          }
        } catch (_err) {
          maxSliceSize = BUCKET_SIZE;
        }
      }

      const slice = normalizedEntries.slice(offset, offset + maxSliceSize);
      offset += slice.length;

      const updateResult = await logCollection.findOneAndUpdate(
        bucketFilter,
        {
          $push: { logs: { $each: slice } },
          $inc: { count: slice.length },
          $setOnInsert: {
            mapId,
            runnerId,
            batchId,
            taskId,
            ud,
            createdAt: Date.now()
          },
          $set: {
            hostId,
            updatedAt: Date.now()
          }
        },
        {
          upsert: true,
          sort: { _id: -1 },
          returnDocument: 'after'
        }
      );

      lastBucketDoc = unwrapFindOneAndUpdate(updateResult);
      if (bucketCache) {
        if (lastBucketDoc && typeof lastBucketDoc.count === 'number') {
          bucketCache[bucketCacheKey] = lastBucketDoc.count >= BUCKET_SIZE ? 0 : lastBucketDoc.count;
        } else {
          const nextCount = (typeof cachedCount === 'number' ? cachedCount : 0) + slice.length;
          bucketCache[bucketCacheKey] = nextCount >= BUCKET_SIZE ? 0 : nextCount;
        }
      }
    }
  }

  if (typeof byteOffset === 'number' && taskId !== null && taskId !== undefined && req) {
    try {
      const taskCollection = getCollection(req, COLLECTIONS.TASK);
      if (taskCollection && typeof taskCollection.updateOne === 'function') {
        await taskCollection.updateOne(
          { _id: taskId },
          { $set: { byteOffset, updatedAt: Date.now() } }
        );
      }
    } catch (_err) {
      // Ignore task byteOffset update failure if task collection is unavailable
    }
  }

  return lastBucketDoc;
};

exports.resolveTierContext = async (req, tierId) => {
  if (tierId && typeof tierId === 'object' && !tierId._bsontype) {
    return {
      mapId: tierId.mapId !== undefined ? tierId.mapId : null,
      runnerId: tierId.runnerId !== undefined ? tierId.runnerId : (tierId.totalBatches !== undefined ? tierId._id : null),
      batchId: tierId.batchId !== undefined ? tierId.batchId : (tierId.mode !== undefined ? tierId._id : null),
      taskId: tierId.taskId !== undefined ? tierId.taskId : (tierId.cmd !== undefined ? tierId._id : null)
    };
  }

  if (req) {
    try {
      const taskCol = getCollection(req, COLLECTIONS.TASK);
      const taskDoc = taskCol && typeof taskCol.findOne === 'function'
        ? await taskCol.findOne({ _id: tierId })
        : null;
      if (taskDoc) {
        return {
          mapId: taskDoc.mapId || null,
          runnerId: taskDoc.runnerId || null,
          batchId: taskDoc.batchId || null,
          taskId: taskDoc._id
        };
      }

      const batchCol = getCollection(req, COLLECTIONS.BATCH);
      const batchDoc = batchCol && typeof batchCol.findOne === 'function'
        ? await batchCol.findOne({ _id: tierId })
        : null;
      if (batchDoc) {
        return {
          mapId: batchDoc.mapId || null,
          runnerId: batchDoc.runnerId || null,
          batchId: batchDoc._id,
          taskId: null
        };
      }

      const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
      const runnerDoc = runnerCol && typeof runnerCol.findOne === 'function'
        ? await runnerCol.findOne({ _id: tierId })
        : null;
      if (runnerDoc) {
        return {
          mapId: runnerDoc.mapId || null,
          runnerId: runnerDoc._id,
          batchId: null,
          taskId: null
        };
      }
    } catch (_err) {
      // Fallback if lookup fails
    }
  }

  return {
    mapId: null,
    runnerId: tierId || null,
    batchId: null,
    taskId: null
  };
};

exports.recordLifecycleEvent = async (req, tierId, type, message) => {
  const context = await exports.resolveTierContext(req, tierId);
  const entry = {
    type: type || EVENT_TYPES.SYSTEM,
    msg: message !== undefined ? String(message) : '',
    ts: Date.now()
  };

  await exports.appendLogsToDb(req, context, [entry]);
  broadcaster.broadcast(req, context.runnerId || tierId, {
    ...entry,
    ...context
  });

  return { ...entry, ...context };
};
