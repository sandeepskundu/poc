'use strict';

const fs = require('node:fs');
const {
  COLLECTIONS,
  EVENT_TYPES,
  CONTROL_STATES,
  TASK_STATUS,
  FLUSH_INTERVAL_MS,
  getHostId,
  getLogFilePath,
  cleanupTaskFiles,
  getCollection
} = require('./constants');
const processUtils = require('./process');
const logger = require('./logger');
const broadcaster = require('./broadcaster');

const SHARED_READ_BUFFER_SIZE = 65536;
const SHARED_READ_BUFFER = Buffer.allocUnsafe(SHARED_READ_BUFFER_SIZE);

const closeWatcherReadFd = (watcherOrTask) => {
  if (watcherOrTask && typeof watcherOrTask.readFd === 'number') {
    const fdToClose = watcherOrTask.readFd;
    watcherOrTask.readFd = null;
    try {
      fs.closeSync(fdToClose);
    } catch (_err) {
      // Ignore close error
    }
  }
};

exports.closeWatcherReadFd = closeWatcherReadFd;

exports.flushFileToDb = async (req, watcherOrTask, isFinalFlush = false) => {
  if (!watcherOrTask) {
    return [];
  }

  const taskId = watcherOrTask.taskId !== undefined ? watcherOrTask.taskId : watcherOrTask._id;
  const logFilePath = watcherOrTask.logFilePath || getLogFilePath(taskId);

  if (watcherOrTask.activeFlushPromise) {
    await watcherOrTask.activeFlushPromise;
  }

  const runFlush = async () => {
    const keepFdOpen = Boolean(watcherOrTask.isManagedWatcher && !isFinalFlush && !watcherOrTask.isFinalized);
    let fd = typeof watcherOrTask.readFd === 'number' ? watcherOrTask.readFd : null;
    let stats = null;

    try {
      if (fd === null) {
        if (!fs.existsSync(logFilePath)) {
          return [];
        }
        fd = fs.openSync(logFilePath, 'r');
        if (keepFdOpen) {
          watcherOrTask.readFd = fd;
        }
      }
      stats = fs.fstatSync(fd);
    } catch (_err) {
      closeWatcherReadFd(watcherOrTask);
      if (fd !== null && watcherOrTask.readFd !== fd) {
        try {
          fs.closeSync(fd);
        } catch (_e) {
          // Ignore
        }
      }
      return [];
    }

    let currentOffset = Number(watcherOrTask.byteOffset || 0);
    if (stats.size < currentOffset) {
      currentOffset = 0;
      watcherOrTask.byteOffset = 0;
    }

    const availableBytes = stats.size - currentOffset;
    if (availableBytes <= 0) {
      if (!keepFdOpen) {
        if (watcherOrTask.readFd === fd) {
          closeWatcherReadFd(watcherOrTask);
        } else if (fd !== null) {
          try {
            fs.closeSync(fd);
          } catch (_e) {
            // Ignore
          }
        }
      }
      return [];
    }

    const targetBuffer = availableBytes <= SHARED_READ_BUFFER_SIZE
      ? SHARED_READ_BUFFER
      : Buffer.allocUnsafe(availableBytes);
    let bytesRead = 0;

    try {
      bytesRead = fs.readSync(fd, targetBuffer, 0, availableBytes, currentOffset);
    } catch (_err) {
      closeWatcherReadFd(watcherOrTask);
      return [];
    } finally {
      if (!keepFdOpen) {
        if (watcherOrTask.readFd === fd) {
          closeWatcherReadFd(watcherOrTask);
        } else if (fd !== null) {
          try {
            fs.closeSync(fd);
          } catch (_closeErr) {
            // Ignore close error
          }
        }
      }
    }

    if (bytesRead <= 0) {
      return [];
    }

    let sliceEnd = bytesRead;
    if (!isFinalFlush && bytesRead < 65536) {
      let lastNewlineIdx = -1;
      for (let i = bytesRead - 1; i >= 0; i -= 1) {
        if (targetBuffer[i] === 0x0a) {
          lastNewlineIdx = i;
          break;
        }
      }
      if (lastNewlineIdx === -1) {
        return [];
      }
      sliceEnd = lastNewlineIdx + 1;
    }

    const nextByteOffset = currentOffset + sliceEnd;
    watcherOrTask.byteOffset = nextByteOffset;

    const text = targetBuffer.toString('utf8', 0, sliceEnd);
    const secretValues = Array.isArray(watcherOrTask.secretValues)
      ? watcherOrTask.secretValues
      : logger.extractSecretValues(watcherOrTask.env, watcherOrTask.secretKeys, watcherOrTask.secrets);

    const entries = logger.parseLogChunk(text, EVENT_TYPES.STDOUT, secretValues);

    // Capture any ##[set-output KEY=VAL] variables emitted in this chunk
    const capturedOutputs = {};
    let hasNewOutputs = false;
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      if (entry && entry.type === EVENT_TYPES.OUTPUT && entry.outputKey) {
        capturedOutputs[entry.outputKey] = entry.outputValue;
        hasNewOutputs = true;
      }
    }

    if (hasNewOutputs) {
      if (!watcherOrTask.outputs || typeof watcherOrTask.outputs !== 'object') {
        watcherOrTask.outputs = {};
      }
      Object.assign(watcherOrTask.outputs, capturedOutputs);

      if (req && watcherOrTask.runnerId) {
        try {
          const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
          if (runnerCol && typeof runnerCol.findOne === 'function') {
            const runnerDoc = await runnerCol.findOne({ _id: watcherOrTask.runnerId });
            const mergedRunnerOutputs = {
              ...((runnerDoc && runnerDoc.outputs) || {}),
              ...capturedOutputs
            };
            await runnerCol.updateOne(
              { _id: watcherOrTask.runnerId },
              { $set: { outputs: mergedRunnerOutputs, updatedAt: Date.now() } }
            );
          }
        } catch (_outErr) {
          // Ignore output sync error
        }
      }
    }

    const hostId = watcherOrTask.hostId || getHostId(req);
    const context = {
      mapId: watcherOrTask.mapId || null,
      runnerId: watcherOrTask.runnerId || null,
      batchId: watcherOrTask.batchId || null,
      taskId,
      hostId,
      secretValues,
      alreadyMasked: true
    };

    await logger.appendLogsToDb(req, context, entries, nextByteOffset);

    const broadcastContext = {
      mapId: context.mapId,
      runnerId: context.runnerId,
      batchId: context.batchId,
      taskId,
      hostId
    };

    for (let i = 0; i < entries.length; i += 1) {
      broadcaster.broadcast(req, context.runnerId, {
        ...entries[i],
        ...broadcastContext
      });
    }

    return entries;
  };

  const flushPromise = runFlush();
  watcherOrTask.activeFlushPromise = flushPromise;
  try {
    return await flushPromise;
  } finally {
    if (watcherOrTask.activeFlushPromise === flushPromise) {
      watcherOrTask.activeFlushPromise = null;
    }
  }
};

exports.pauseWatcherTimeout = (watcher) => {
  if (!watcher || !watcher.timeoutTimer) {
    return;
  }
  clearTimeout(watcher.timeoutTimer);
  watcher.timeoutTimer = null;
  if (watcher.lastActiveTs) {
    watcher.elapsedActiveMs += Math.max(0, Date.now() - watcher.lastActiveTs);
    watcher.lastActiveTs = null;
  }
};

exports.resumeWatcherTimeout = (req, watcher) => {
  if (!watcher || watcher.isFinalized || !(watcher.timeoutMs > 0)) {
    return;
  }
  exports.pauseWatcherTimeout(watcher);
  const remainingMs = Math.max(10, watcher.timeoutMs - (watcher.elapsedActiveMs || 0));
  watcher.lastActiveTs = Date.now();

  watcher.timeoutTimer = setTimeout(async () => {
    if (watcher.isFinalized) {
      return;
    }
    watcher.timedOut = true;
    if (watcher.pid) {
      await processUtils.killProcessTree(watcher.pid, watcher.killGraceMs);
    }
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: watcher.mapId,
        runnerId: watcher.runnerId,
        batchId: watcher.batchId,
        taskId: watcher.taskId
      },
      EVENT_TYPES.TIMEOUT,
      `Task timed out after ${watcher.timeoutMs}ms`
    );
    await exports.finalizeTaskWatcher(req, watcher, -1, TASK_STATUS.TIMEOUT);
  }, remainingMs);

  if (watcher.timeoutTimer && typeof watcher.timeoutTimer.unref === 'function') {
    watcher.timeoutTimer.unref();
  }
};

exports.finalizeTaskWatcher = async (req, watcher, exitCode, overrideStatus) => {
  if (!watcher) {
    return null;
  }
  if (watcher.isFinalized) {
    return watcher.finalizePromise;
  }

  watcher.isFinalized = true;

  if (watcher.pollTimer) {
    clearInterval(watcher.pollTimer);
    watcher.pollTimer = null;
  }
  exports.pauseWatcherTimeout(watcher);

  const runFinalization = async () => {
    await exports.flushFileToDb(req, watcher, true);
    closeWatcherReadFd(watcher);

    const resolvedExitCode = typeof exitCode === 'number'
      ? exitCode
      : (typeof watcher.exitCode === 'number' ? watcher.exitCode : (overrideStatus === TASK_STATUS.DONE ? 0 : -1));

    let finalStatus = overrideStatus;
    if (!finalStatus) {
      if (watcher.stopped) {
        finalStatus = TASK_STATUS.STOPPED;
      } else if (watcher.timedOut) {
        finalStatus = TASK_STATUS.TIMEOUT;
      } else if (watcher.skipped) {
        finalStatus = TASK_STATUS.SKIPPED;
      } else if (resolvedExitCode === 0) {
        finalStatus = TASK_STATUS.DONE;
      } else {
        finalStatus = TASK_STATUS.FAILED;
      }
    }

    watcher.status = finalStatus;
    watcher.exitCode = resolvedExitCode;

    const finishedAt = Date.now();
    const durationMs = watcher.startedAt ? Math.max(0, finishedAt - watcher.startedAt) : 0;
    const updateFields = {
      status: finalStatus,
      controlState: CONTROL_STATES.NORMAL,
      exitCode: resolvedExitCode,
      byteOffset: watcher.byteOffset,
      outputs: watcher.outputs || {},
      durationMs,
      finishedAt,
      updatedAt: finishedAt
    };

    let finalTaskDoc = {
      _id: watcher.taskId,
      batchId: watcher.batchId,
      runnerId: watcher.runnerId,
      mapId: watcher.mapId,
      pid: watcher.pid,
      ...updateFields
    };

    if (req) {
      try {
        const taskCol = getCollection(req, COLLECTIONS.TASK);
        if (taskCol && typeof taskCol.updateOne === 'function') {
          await taskCol.updateOne({ _id: watcher.taskId }, { $set: updateFields });
        }
        if (taskCol && typeof taskCol.findOne === 'function') {
          const dbDoc = await taskCol.findOne({ _id: watcher.taskId });
          if (dbDoc) {
            finalTaskDoc = dbDoc;
          }
        }
      } catch (_err) {
        // Proceed even if DB update encounters an error
      }
    }

    const eventType = finalStatus === TASK_STATUS.TIMEOUT
      ? EVENT_TYPES.TIMEOUT
      : (finalStatus === TASK_STATUS.FAILED ? EVENT_TYPES.ERROR : EVENT_TYPES.DONE);

    await logger.recordLifecycleEvent(
      req,
      {
        mapId: watcher.mapId,
        runnerId: watcher.runnerId,
        batchId: watcher.batchId,
        taskId: watcher.taskId
      },
      eventType,
      `Task finalized with status "${finalStatus}" (exitCode: ${resolvedExitCode})`
    );

    if (watcher.cleanupTempOnFinish) {
      cleanupTaskFiles(watcher.taskId);
    }

    broadcaster.unregisterWatcher(watcher.taskId);

    const callbacks = Array.isArray(watcher.callbacks) ? watcher.callbacks.slice() : [];
    watcher.callbacks = [];
    for (let i = 0; i < callbacks.length; i += 1) {
      try {
        callbacks[i](null, finalTaskDoc);
      } catch (_cbErr) {
        // Ignore callback error
      }
    }

    return finalTaskDoc;
  };

  watcher.finalizePromise = runFinalization();
  return watcher.finalizePromise;
};

exports.reconcileWatcherControlState = async (req, watcher) => {
  if (!watcher || watcher.isFinalized || !req) {
    return;
  }

  let taskCol = null;
  try {
    taskCol = getCollection(req, COLLECTIONS.TASK);
  } catch (_err) {
    taskCol = null;
  }
  if (!taskCol || typeof taskCol.findOne !== 'function') {
    return;
  }

  try {
    const taskDoc = await taskCol.findOne({ _id: watcher.taskId });
    if (!taskDoc || watcher.isFinalized) {
      return;
    }

    // 1. Check remote stop request
    if (
      taskDoc.controlState === CONTROL_STATES.STOP_REQUESTED ||
      (taskDoc.status === TASK_STATUS.STOPPED && !watcher.stopped)
    ) {
      watcher.stopped = true;
      if (watcher.pid) {
        await processUtils.killProcessTree(watcher.pid, watcher.killGraceMs);
      }
      await exports.finalizeTaskWatcher(req, watcher, -1, TASK_STATUS.STOPPED);
      return;
    }

    // 2. Check remote pause request
    if (
      (taskDoc.controlState === CONTROL_STATES.PAUSE_REQUESTED || taskDoc.status === TASK_STATUS.PAUSED) &&
      !watcher.paused
    ) {
      if (watcher.pid) {
        processUtils.suspendProcessTree(watcher.pid);
      }
      watcher.paused = true;
      watcher.status = TASK_STATUS.PAUSED;
      exports.pauseWatcherTimeout(watcher);
      await taskCol.updateOne(
        { _id: watcher.taskId },
        { $set: { status: TASK_STATUS.PAUSED, controlState: CONTROL_STATES.NORMAL, updatedAt: Date.now() } }
      );
      return;
    }

    // 3. Check remote resume request
    if (
      (taskDoc.controlState === CONTROL_STATES.RESUME_REQUESTED ||
        (taskDoc.status === TASK_STATUS.RUNNING && taskDoc.controlState === CONTROL_STATES.NORMAL)) &&
      watcher.paused
    ) {
      if (watcher.pid) {
        processUtils.resumeProcessTree(watcher.pid);
      }
      watcher.paused = false;
      watcher.status = TASK_STATUS.RUNNING;
      exports.resumeWatcherTimeout(req, watcher);
      await taskCol.updateOne(
        { _id: watcher.taskId },
        { $set: { status: TASK_STATUS.RUNNING, controlState: CONTROL_STATES.NORMAL, updatedAt: Date.now() } }
      );
    }
  } catch (_err) {
    // Ignore transient DB errors during control state reconciliation
  }
};

broadcaster.setControlSignalHandler(async (signal) => {
  if (!signal || !signal.taskId) {
    return;
  }
  const activeWatcher = broadcaster.getWatcher(signal.taskId);
  if (!activeWatcher || activeWatcher.isFinalized) {
    return;
  }
  if (signal.action === 'stop_task') {
    activeWatcher.stopped = true;
    if (activeWatcher.pid) {
      await processUtils.killProcessTree(activeWatcher.pid, signal.killGraceMs || activeWatcher.killGraceMs);
    }
    await exports.finalizeTaskWatcher(activeWatcher.req, activeWatcher, -1, TASK_STATUS.STOPPED);
  } else if (signal.action === 'pause_task' && !activeWatcher.paused) {
    if (activeWatcher.pid) {
      processUtils.suspendProcessTree(activeWatcher.pid);
    }
    activeWatcher.paused = true;
    activeWatcher.status = TASK_STATUS.PAUSED;
    exports.pauseWatcherTimeout(activeWatcher);
  } else if (signal.action === 'resume_task' && activeWatcher.paused) {
    if (activeWatcher.pid) {
      processUtils.resumeProcessTree(activeWatcher.pid);
    }
    activeWatcher.paused = false;
    activeWatcher.status = TASK_STATUS.RUNNING;
    exports.resumeWatcherTimeout(activeWatcher.req, activeWatcher);
  }
});

exports.ensureTaskWatcher = (req, taskDoc, onFinishedCallback) => {
  if (!taskDoc || (taskDoc._id === undefined && taskDoc.taskId === undefined)) {
    throw Error('ensureTaskWatcher requires a valid taskDoc with _id');
  }

  const taskId = taskDoc._id !== undefined ? taskDoc._id : taskDoc.taskId;
  const existing = broadcaster.getWatcher(taskId);
  if (existing && !existing.isFinalized) {
    if (typeof onFinishedCallback === 'function') {
      existing.callbacks.push(onFinishedCallback);
    }
    if (taskDoc.pid && !existing.pid) {
      existing.pid = taskDoc.pid;
    }
    return existing;
  }

  const logFilePath = getLogFilePath(taskId);
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '', 'utf8');
  }

  const pollIntervalMs = Number(taskDoc.pollIntervalMs) > 0
    ? Number(taskDoc.pollIntervalMs)
    : FLUSH_INTERVAL_MS;

  const secretValues = Array.isArray(taskDoc.secretValues)
    ? taskDoc.secretValues
    : logger.extractSecretValues(taskDoc.env, taskDoc.secretKeys, taskDoc.secrets);

  const watcher = {
    req,
    taskId,
    batchId: taskDoc.batchId || null,
    runnerId: taskDoc.runnerId || null,
    mapId: taskDoc.mapId || null,
    hostId: taskDoc.hostId || getHostId(req),
    pid: taskDoc.pid || null,
    childProcess: taskDoc.childProcess || null,
    logFilePath,
    readFd: null,
    isManagedWatcher: true,
    byteOffset: Number(taskDoc.byteOffset || 0),
    status: taskDoc.status || TASK_STATUS.RUNNING,
    paused: taskDoc.status === TASK_STATUS.PAUSED,
    stopped: false,
    timedOut: false,
    skipped: false,
    exitCode: typeof taskDoc.exitCode === 'number' ? taskDoc.exitCode : null,
    timeoutMs: Number(taskDoc.timeoutMs || 0),
    killGraceMs: taskDoc.killGraceMs,
    secretValues,
    outputs: { ...(taskDoc.outputs || {}) },
    cleanupTempOnFinish: Boolean(taskDoc.cleanupTempOnFinish),
    startedAt: Number(taskDoc.startedAt || Date.now()),
    elapsedActiveMs: 0,
    lastActiveTs: Date.now(),
    pollTimer: null,
    timeoutTimer: null,
    activeFlushPromise: null,
    isFinalized: false,
    finalizePromise: null,
    callbacks: typeof onFinishedCallback === 'function' ? [onFinishedCallback] : []
  };

  broadcaster.registerWatcher(taskId, watcher);

  watcher.pollTimer = setInterval(async () => {
    if (watcher.isFinalized) {
      return;
    }
    await exports.reconcileWatcherControlState(req, watcher);
    if (watcher.isFinalized) {
      return;
    }
    await exports.flushFileToDb(req, watcher, false);

    // If watching an orphaned/reattached process without a direct ChildProcess handle, check PID liveness
    if (!watcher.childProcess && watcher.pid && !watcher.paused) {
      if (!processUtils.isPidAlive(watcher.pid)) {
        const inferredExitCode = typeof watcher.exitCode === 'number' ? watcher.exitCode : 0;
        await exports.finalizeTaskWatcher(req, watcher, inferredExitCode);
      }
    }
  }, pollIntervalMs);

  if (watcher.pollTimer && typeof watcher.pollTimer.unref === 'function') {
    watcher.pollTimer.unref();
  }

  if (watcher.timeoutMs > 0 && !watcher.paused) {
    exports.resumeWatcherTimeout(req, watcher);
  }

  return watcher;
};
