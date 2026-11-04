'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const runnerLib = require('../index');
const constants = require('../constants');
const processUtils = require('../process');
const logger = require('../logger');
const broadcaster = require('../broadcaster');
const watcher = require('../watcher');
const scheduler = require('../scheduler');

// ============================================================================
// Functional In-Memory MongoDB Mock Supporting Full MongoDB Collection API
// ============================================================================
const matchesQuery = (doc, filter = {}) => {
  const keys = Object.keys(filter);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const cond = filter[key];
    const val = doc[key];

    if (cond && typeof cond === 'object' && !Array.isArray(cond)) {
      if (cond.$lt !== undefined && !(val < cond.$lt)) {
        return false;
      }
      if (cond.$lte !== undefined && !(val <= cond.$lte)) {
        return false;
      }
      if (cond.$gt !== undefined && !(val > cond.$gt)) {
        return false;
      }
      if (cond.$in !== undefined && !cond.$in.some((item) => String(item) === String(val))) {
        return false;
      }
    } else if (val !== cond && String(val) !== String(cond)) {
      return false;
    }
  }
  return true;
};

const applyUpdate = (doc, update = {}, isInsert = false) => {
  if (isInsert && update.$setOnInsert) {
    Object.assign(doc, update.$setOnInsert);
  }
  if (update.$set) {
    Object.assign(doc, update.$set);
  }
  if (update.$inc) {
    const incKeys = Object.keys(update.$inc);
    for (let i = 0; i < incKeys.length; i += 1) {
      const k = incKeys[i];
      doc[k] = Number(doc[k] || 0) + Number(update.$inc[k]);
    }
  }
  if (update.$push) {
    const pushKeys = Object.keys(update.$push);
    for (let i = 0; i < pushKeys.length; i += 1) {
      const k = pushKeys[i];
      if (!Array.isArray(doc[k])) {
        doc[k] = [];
      }
      const pushVal = update.$push[k];
      if (pushVal && Array.isArray(pushVal.$each)) {
        doc[k].push(...pushVal.$each);
      } else {
        doc[k].push(pushVal);
      }
    }
  }
  return doc;
};

const createMockDb = () => {
  const store = {
    runner: [],
    batch: [],
    task: [],
    log: []
  };
  let idSeq = 1;

  const createCollection = (name) => {
    if (!store[name]) {
      store[name] = [];
    }
    const items = store[name];

    return {
      items,
      insertOne: async (doc) => {
        const record = { ...doc };
        if (record._id === undefined) {
          record._id = `id_${String(idSeq).padStart(8, '0')}`;
          idSeq += 1;
        }
        items.push(record);
        return { insertedId: record._id, acknowledged: true };
      },
      findOne: async (filter = {}, options = {}) => {
        let matched = items.filter((d) => matchesQuery(d, filter));
        if (options && options.sort && options.sort._id === -1) {
          matched = matched.slice().reverse();
        }
        return matched[0] ? { ...matched[0] } : null;
      },
      find: (filter = {}) => {
        const matched = items.filter((d) => matchesQuery(d, filter)).map((d) => ({ ...d }));
        return {
          sort: (sortSpec = {}) => {
            const sorted = matched.slice();
            if (sortSpec._id === -1) {
              sorted.reverse();
            } else if (sortSpec.order === 1) {
              sorted.sort((a, b) => (a.order || 0) - (b.order || 0));
            }
            return {
              toArray: async () => sorted
            };
          },
          toArray: async () => matched
        };
      },
      updateOne: async (filter = {}, update = {}) => {
        const target = items.find((d) => matchesQuery(d, filter));
        if (!target) {
          return { matchedCount: 0, modifiedCount: 0 };
        }
        applyUpdate(target, update, false);
        return { matchedCount: 1, modifiedCount: 1 };
      },
      updateMany: async (filter = {}, update = {}) => {
        const matched = items.filter((d) => matchesQuery(d, filter));
        for (let i = 0; i < matched.length; i += 1) {
          applyUpdate(matched[i], update, false);
        }
        return { matchedCount: matched.length, modifiedCount: matched.length };
      },
      findOneAndUpdate: async (filter = {}, update = {}, options = {}) => {
        let candidates = items.filter((d) => matchesQuery(d, filter));
        if (options && options.sort && options.sort._id === -1) {
          candidates = candidates.slice().reverse();
        }
        let target = candidates[0] || null;
        if (!target && options && options.upsert) {
          target = {
            _id: `bucket_${String(idSeq).padStart(8, '0')}`
          };
          idSeq += 1;
          applyUpdate(target, update, true);
          items.push(target);
        } else if (target) {
          applyUpdate(target, update, false);
        }
        return { value: target ? { ...target } : null };
      }
    };
  };

  const collections = {
    runner: createCollection('runner'),
    batch: createCollection('batch'),
    task: createCollection('task'),
    log: createCollection('log')
  };

  return {
    store,
    collections,
    collection: (name) => collections[name] || createCollection(name)
  };
};

const createMockReq = (db, userDetails = { uId: 'user_101', aId: 'acc_202' }) => ({
  db,
  session: {
    details: () => userDetails
  },
  query: {},
  params: {}
});

const sleep = (ms) => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
};

// ============================================================================
// 1. Strict Coding Style & Constraints Tests
// ============================================================================
test('Strict Coding Style: No ES6 classes, constructors, or this in any module', () => {
  const files = [
    'constants.js',
    'process.js',
    'logger.js',
    'broadcaster.js',
    'watcher.js',
    'scheduler.js',
    'schemas.js',
    'routes.js',
    'index.js'
  ];

  for (let i = 0; i < files.length; i += 1) {
    const filePath = path.join(__dirname, '..', files[i]);
    const code = fs.readFileSync(filePath, 'utf8');
    assert.equal(/\bclass\s+[A-Za-z0-9_]/.test(code), false, `${files[i]} must not contain ES6 class`);
    assert.equal(/\bconstructor\s*\(/.test(code), false, `${files[i]} must not contain constructor`);
    assert.equal(/\bthis\./.test(code), false, `${files[i]} must not use this.`);
  }
});

test('constants.js: Exports required constants and /tmp/express-script-logs path helper', () => {
  assert.equal(constants.BUCKET_SIZE, 500);
  assert.equal(constants.HEARTBEAT_MS, 15000);
  assert.equal(constants.LOG_DIR, '/tmp/express-script-logs');

  const logPath = constants.getLogFilePath('task_abc_123');
  assert.equal(logPath, '/tmp/express-script-logs/task_abc_123.log');
  assert.equal(fs.existsSync(constants.LOG_DIR), true);
});

// ============================================================================
// 2. Process Tree Management Tests (process.js)
// ============================================================================
test('process.js: isPidAlive, suspendProcessTree (SIGSTOP), resumeProcessTree (SIGCONT), killProcessTree', async () => {
  assert.equal(processUtils.isPidAlive(-1), false);
  assert.equal(processUtils.isPidAlive(99999999), false);

  const child = spawn('node -e "setInterval(() => {}, 500)"', {
    shell: true,
    detached: true,
    stdio: 'ignore'
  });
  child.unref();

  const pid = child.pid;
  assert.equal(processUtils.isPidAlive(pid), true);

  if (process.platform !== 'win32') {
    const suspended = processUtils.suspendProcessTree(pid);
    assert.equal(suspended, true);
    assert.equal(processUtils.isPidAlive(pid), true);

    const resumed = processUtils.resumeProcessTree(pid);
    assert.equal(resumed, true);
    assert.equal(processUtils.isPidAlive(pid), true);
  }

  const killed = await processUtils.killProcessTree(pid, 300);
  assert.equal(killed, true);
  assert.equal(processUtils.isPidAlive(pid), false);
});

// ============================================================================
// 3. Logger & Bucketed Storage Tests (logger.js)
// ============================================================================
test('logger.js: user(req), parseLogChunk CI/CD headers, and 500-entry MongoDB bucketing', async () => {
  const db = createMockDb();
  const req = createMockReq(db, { uId: 'u_999', aId: 'a_888' });

  assert.deepEqual(logger.user(req), { uId: 'u_999', aId: 'a_888' });

  const rawChunk = [
    '##[step-start] Initializing build',
    '##[progress] 50% Compiling modules',
    'Regular stdout log line',
    '##[warning] Deprecated config flag',
    '##[error] Lint error in file.js',
    '##[step-end] Build finished'
  ].join('\n') + '\n';

  const parsed = logger.parseLogChunk(rawChunk);
  assert.equal(parsed.length, 6);
  assert.equal(parsed[0].type, constants.EVENT_TYPES.STEP_START);
  assert.equal(parsed[0].msg, 'Initializing build');
  assert.equal(parsed[1].type, constants.EVENT_TYPES.PROGRESS);
  assert.equal(parsed[1].progress, 50);
  assert.equal(parsed[2].type, constants.EVENT_TYPES.STDOUT);
  assert.equal(parsed[2].msg, 'Regular stdout log line');
  assert.equal(parsed[3].type, constants.EVENT_TYPES.WARNING);
  assert.equal(parsed[4].type, constants.EVENT_TYPES.ERROR);
  assert.equal(parsed[5].type, constants.EVENT_TYPES.STEP_END);

  // Test MongoDB bucketing at BUCKET_SIZE = 500
  const tierIds = {
    mapId: 'app_1',
    runnerId: 'run_1',
    batchId: 'batch_1',
    taskId: 'task_1'
  };

  await db.collection('task').insertOne({ _id: 'task_1', byteOffset: 0 });

  const bulkEntries = [];
  for (let i = 0; i < 1250; i += 1) {
    bulkEntries.push({ type: 'stdout', msg: `Line ${i + 1}`, ts: Date.now() });
  }

  await logger.appendLogsToDb(req, tierIds, bulkEntries, 9876);

  const buckets = db.store.log;
  assert.equal(buckets.length, 3, '1250 logs should split across 3 buckets (500, 500, 250)');
  assert.equal(buckets[0].count, 500);
  assert.equal(buckets[0].logs.length, 500);
  assert.equal(buckets[1].count, 500);
  assert.equal(buckets[1].logs.length, 500);
  assert.equal(buckets[2].count, 250);
  assert.equal(buckets[2].logs.length, 250);
  assert.deepEqual(buckets[0].ud, { uId: 'u_999', aId: 'a_888' });

  const updatedTask = await db.collection('task').findOne({ _id: 'task_1' });
  assert.equal(updatedTask.byteOffset, 9876);
});

// ============================================================================
// 4. Real-Time SSE Multiplexing / De-multiplexing & Heartbeat (broadcaster.js)
// ============================================================================
test('broadcaster.js: SSE attachStream filtering by runnerId, batchId, taskId and heartbeat ping', async () => {
  const createMockRes = () => {
    const headers = {};
    const chunks = [];
    const listeners = {};
    return {
      headers,
      chunks,
      setHeader: (k, v) => { headers[k] = v; },
      flushHeaders: () => {},
      write: (chunk) => { chunks.push(chunk); },
      on: (evt, fn) => { listeners[evt] = fn; },
      emitClose: () => { if (listeners.close) listeners.close(); }
    };
  };

  const reqRunner = { query: {}, params: {}, on: () => {} };
  const resRunner = createMockRes();
  const clientRunner = broadcaster.attachStream(reqRunner, resRunner, {
    runnerId: 'r_100',
    heartbeatMs: 60
  });

  const reqTask = { query: {}, params: {}, on: () => {} };
  const resTask = createMockRes();
  const clientTask = broadcaster.attachStream(reqTask, resTask, {
    runnerId: 'r_100',
    taskId: 't_2'
  });

  assert.equal(resRunner.headers['Content-Type'], 'text/event-stream');
  assert.equal(resRunner.chunks[0], ': connected\n\n');

  // Broadcast event for task t_1 in runner r_100
  broadcaster.broadcast(reqRunner, 'r_100', {
    mapId: 'm_1',
    runnerId: 'r_100',
    batchId: 'b_1',
    taskId: 't_1',
    type: 'stdout',
    msg: 'Output from task 1'
  });

  // Broadcast event for task t_2 in runner r_100
  broadcaster.broadcast(reqRunner, 'r_100', {
    mapId: 'm_1',
    runnerId: 'r_100',
    batchId: 'b_1',
    taskId: 't_2',
    type: 'step-start',
    msg: 'Output from task 2'
  });

  // Broadcast event for unrelated runner r_999
  broadcaster.broadcast(reqRunner, 'r_999', {
    mapId: 'm_2',
    runnerId: 'r_999',
    batchId: 'b_9',
    taskId: 't_9',
    type: 'stdout',
    msg: 'Unrelated output'
  });

  // Wait for heartbeat ping on clientRunner
  await sleep(90);

  const runnerEvents = resRunner.chunks.filter((c) => c.startsWith('event:'));
  const taskEvents = resTask.chunks.filter((c) => c.startsWith('event:'));
  const pingFrames = resRunner.chunks.filter((c) => c.includes(': ping'));

  assert.equal(runnerEvents.length, 2, 'Runner subscriber should receive both t_1 and t_2 events');
  assert.equal(taskEvents.length, 1, 'Task subscriber should only receive t_2 event');
  assert.equal(taskEvents[0].includes('Output from task 2'), true);
  assert.equal(pingFrames.length >= 1, true, 'SSE stream should emit {: ping} heartbeat');

  clientRunner.close();
  clientTask.close();
});

// ============================================================================
// 5. End-to-End 3-Tier Execution: Queue & Parallel Modes
// ============================================================================
test('scheduler.js: 3-Tier Runner executes sequential queue batch and parallel batch end-to-end', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const result = await runnerLib.triggerRunner(req, {
    mapId: 'project_alpha',
    awaitCompletion: true,
    pollIntervalMs: 40,
    batches: [
      {
        name: 'Stage 1 - Queue',
        mode: 'queue',
        maxQueueConcurrency: 1,
        tasks: [
          { name: 'Step 1A', cmd: 'echo "##[step-start] Step 1A" && echo "hello 1A"' },
          { name: 'Step 1B', cmd: 'echo "##[progress] 100%" && echo "hello 1B"' }
        ]
      },
      {
        name: 'Stage 2 - Parallel',
        mode: 'parallel',
        tasks: [
          { name: 'Step 2A', cmd: 'echo "parallel 2A"' },
          { name: 'Step 2B', cmd: 'echo "parallel 2B"' }
        ]
      }
    ]
  });

  assert.equal(result.status, constants.RUNNER_STATUS.COMPLETED);
  assert.equal(result.batches.length, 2);
  assert.equal(result.batches[0].status, constants.BATCH_STATUS.BATCH_DONE);
  assert.equal(result.batches[1].status, constants.BATCH_STATUS.BATCH_DONE);
  assert.equal(result.tasks.length, 4);
  assert.equal(result.tasks.every((t) => t.status === constants.TASK_STATUS.DONE && t.exitCode === 0), true);

  const { logs } = await runnerLib.queryLogs(req, { mapId: 'project_alpha' });
  assert.equal(logs.some((l) => l.type === 'step-start' && l.msg === 'Step 1A'), true);
  assert.equal(logs.some((l) => l.type === 'progress' && l.msg === '100%'), true);
  assert.equal(logs.some((l) => l.msg === 'parallel 2A'), true);
  assert.equal(logs.some((l) => l.msg === 'parallel 2B'), true);
});

// ============================================================================
// 6. Universal Control Commands: SKIP (skipTask, skipBatch)
// ============================================================================
test('Control Commands: skipTask and skipBatch bypass queued items cleanly', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'skip_test_map',
    pollIntervalMs: 40,
    batches: [
      {
        name: 'Batch 1',
        mode: 'queue',
        tasks: [
          { _id: 'skip_t1', name: 'Slow Task 1', cmd: 'node -e "setTimeout(() => console.log(\'t1 done\'), 150)"' },
          { _id: 'skip_t2', name: 'Task 2 To Skip', cmd: 'echo "should not run t2"' },
          { _id: 'skip_t3', name: 'Task 3 Runs', cmd: 'echo "t3 executed"' }
        ]
      },
      {
        _id: 'skip_b2',
        name: 'Batch 2 To Skip',
        mode: 'parallel',
        tasks: [
          { _id: 'skip_b2_t1', name: 'B2 Task 1', cmd: 'echo "should not run b2"' }
        ]
      },
      {
        _id: 'skip_b3',
        name: 'Batch 3 Runs',
        mode: 'queue',
        tasks: [
          { _id: 'skip_b3_t1', name: 'B3 Task 1', cmd: 'echo "b3 executed"' }
        ]
      }
    ]
  });

  // Immediately skip queued task 2 in Batch 1 and entire Batch 2
  await runnerLib.skipTask(req, 'skip_t2');
  await runnerLib.skipBatch(req, 'skip_b2');

  const finalRunner = await triggered.executionPromise;
  assert.equal(finalRunner.status, constants.RUNNER_STATUS.COMPLETED);

  const t1 = await db.collection('task').findOne({ _id: 'skip_t1' });
  const t2 = await db.collection('task').findOne({ _id: 'skip_t2' });
  const t3 = await db.collection('task').findOne({ _id: 'skip_t3' });
  const b2 = await db.collection('batch').findOne({ _id: 'skip_b2' });
  const b2t1 = await db.collection('task').findOne({ _id: 'skip_b2_t1' });
  const b3 = await db.collection('batch').findOne({ _id: 'skip_b3' });

  assert.equal(t1.status, constants.TASK_STATUS.DONE);
  assert.equal(t2.status, constants.TASK_STATUS.SKIPPED);
  assert.equal(t3.status, constants.TASK_STATUS.DONE);
  assert.equal(b2.status, constants.BATCH_STATUS.SKIPPED);
  assert.equal(b2t1.status, constants.TASK_STATUS.SKIPPED);
  assert.equal(b3.status, constants.BATCH_STATUS.BATCH_DONE);
});

// ============================================================================
// 7. Universal Control Commands: PAUSE & RESUME (Task SIGSTOP/SIGCONT & Runner Pause/Resume)
// ============================================================================
test('Control Commands: pauseTask / resumeTask (SIGSTOP / SIGCONT) and pauseRunner / resumeRunner', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // Part A: Task-level pause & resume
  const taskRun = await runnerLib.triggerRunner(req, {
    mapId: 'pause_task_map',
    pollIntervalMs: 40,
    batches: [
      {
        name: 'Batch Pause Task',
        mode: 'queue',
        tasks: [
          {
            _id: 'pt_1',
            name: 'Pausable Task',
            cmd: 'node -e "setTimeout(() => { console.log(\'finished after resume\'); }, 250)"'
          }
        ]
      }
    ]
  });

  // Wait for task to start running
  await sleep(80);
  const pausedDoc = await runnerLib.pauseTask(req, 'pt_1');
  assert.equal(pausedDoc.status, constants.TASK_STATUS.PAUSED);

  await sleep(100);
  const resumedDoc = await runnerLib.resumeTask(req, 'pt_1');
  assert.equal(resumedDoc.status, constants.TASK_STATUS.RUNNING);

  const completedTaskRunner = await taskRun.executionPromise;
  assert.equal(completedTaskRunner.status, constants.RUNNER_STATUS.COMPLETED);

  // Part B: Runner-level pause & resume across batches/tasks
  const runnerPauseTest = await runnerLib.triggerRunner(req, {
    mapId: 'pause_runner_map',
    pollIntervalMs: 40,
    batches: [
      {
        _id: 'pr_b1',
        name: 'Batch 1',
        mode: 'queue',
        tasks: [
          { _id: 'pr_t1', cmd: 'node -e "setTimeout(() => console.log(\'pr_t1 done\'), 150)"' },
          { _id: 'pr_t2', cmd: 'echo "pr_t2 done"' }
        ]
      },
      {
        _id: 'pr_b2',
        name: 'Batch 2',
        mode: 'queue',
        tasks: [
          { _id: 'pr_t3', cmd: 'echo "pr_t3 done"' }
        ]
      }
    ]
  });

  await sleep(50);
  // Request runner pause while pr_t1 is running
  const pauseReqState = await runnerLib.pauseRunner(req, runnerPauseTest.runnerId);
  assert.equal(pauseReqState.controlState, constants.CONTROL_STATES.PAUSE_REQUESTED);

  // Wait for active task pr_t1 to finish and runner to transition to paused
  const pausedRunnerState = await runnerPauseTest.executionPromise;
  assert.equal(pausedRunnerState.status, constants.RUNNER_STATUS.PAUSED);

  const t1AfterPause = await db.collection('task').findOne({ _id: 'pr_t1' });
  const t2AfterPause = await db.collection('task').findOne({ _id: 'pr_t2' });
  assert.equal(t1AfterPause.status, constants.TASK_STATUS.DONE, 'Currently running task is allowed to finish');
  assert.equal(t2AfterPause.status, constants.TASK_STATUS.QUEUED, 'Subsequent queued task was blocked while paused');

  // Now resume the runner and await full completion
  const finalResumedRunner = await runnerLib.resumeRunner(req, runnerPauseTest.runnerId, {
    awaitCompletion: true
  });
  assert.equal(finalResumedRunner.status, constants.RUNNER_STATUS.COMPLETED);

  const t2AfterResume = await db.collection('task').findOne({ _id: 'pr_t2' });
  const t3AfterResume = await db.collection('task').findOne({ _id: 'pr_t3' });
  assert.equal(t2AfterResume.status, constants.TASK_STATUS.DONE);
  assert.equal(t3AfterResume.status, constants.TASK_STATUS.DONE);
});

// ============================================================================
// 8. Universal Control Commands: STOP (stopTask, stopBatch, stopRunner)
// ============================================================================
test('Control Commands: stopTask, stopBatch, and stopRunner terminate OS processes immediately', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // Test stopRunner on a pipeline with parallel active tasks and subsequent batches
  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'stop_runner_map',
    pollIntervalMs: 40,
    killGraceMs: 100,
    batches: [
      {
        _id: 'sr_b1',
        name: 'Parallel Long Batch',
        mode: 'parallel',
        tasks: [
          { _id: 'sr_t1', cmd: 'node -e "setInterval(() => {}, 500)"' },
          { _id: 'sr_t2', cmd: 'node -e "setInterval(() => {}, 500)"' }
        ]
      },
      {
        _id: 'sr_b2',
        name: 'Subsequent Batch',
        mode: 'queue',
        tasks: [
          { _id: 'sr_t3', cmd: 'echo "should never run"' }
        ]
      }
    ]
  });

  await sleep(100);
  const t1Running = await db.collection('task').findOne({ _id: 'sr_t1' });
  assert.equal(t1Running.status, constants.TASK_STATUS.RUNNING);
  assert.equal(processUtils.isPidAlive(t1Running.pid), true);

  await runnerLib.stopRunner(req, triggered.runnerId);
  const finalRunner = await triggered.executionPromise;

  assert.equal(finalRunner.status, constants.RUNNER_STATUS.STOPPED);
  assert.equal(processUtils.isPidAlive(t1Running.pid), false);

  const b2 = await db.collection('batch').findOne({ _id: 'sr_b2' });
  const t3 = await db.collection('task').findOne({ _id: 'sr_t3' });
  assert.equal(b2.status, constants.BATCH_STATUS.STOPPED);
  assert.equal(t3.status, constants.TASK_STATUS.STOPPED);
});

// ============================================================================
// 9. Universal Control Commands: REPLAY / RESTART (replayTask, replayBatch, replayRunner)
// ============================================================================
test('Control Commands: replayTask, replayBatch, and replayRunner (full & fromFailed)', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const flakyFile = path.join(constants.LOG_DIR, 'flaky_flag.txt');
  if (fs.existsSync(flakyFile)) {
    fs.unlinkSync(flakyFile);
  }

  // Trigger a runner where Batch 1 succeeds and Batch 2 Task 1 fails on first run, succeeds on second run
  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'replay_map_1',
    awaitCompletion: true,
    pollIntervalMs: 40,
    batches: [
      {
        _id: 'rep_b1',
        name: 'Stage 1',
        mode: 'queue',
        tasks: [
          { _id: 'rep_t1', cmd: 'echo "stage 1 ok"' }
        ]
      },
      {
        _id: 'rep_b2',
        name: 'Stage 2',
        mode: 'queue',
        tasks: [
          {
            _id: 'rep_t2',
            cmd: `node -e "const fs = require('fs'); if (!fs.existsSync('${flakyFile}')) { fs.writeFileSync('${flakyFile}', '1'); console.error('first run fail'); process.exit(1); } console.log('second run pass');"`
          }
        ]
      }
    ]
  });

  assert.equal(triggered.status, constants.RUNNER_STATUS.FAILED);
  const failedT2 = await db.collection('task').findOne({ _id: 'rep_t2' });
  assert.equal(failedT2.status, constants.TASK_STATUS.FAILED);

  // Replay runner from failed batch/task (maintaining mapId and keeping rep_b1 done)
  const replayedRunner = await runnerLib.replayRunner(req, triggered.runnerId, {
    fromFailed: true
  });

  assert.equal(replayedRunner.status, constants.RUNNER_STATUS.COMPLETED);
  assert.equal(replayedRunner.mapId, 'replay_map_1');

  const passedT2 = await db.collection('task').findOne({ _id: 'rep_t2' });
  assert.equal(passedT2.status, constants.TASK_STATUS.DONE);
  assert.equal(passedT2.exitCode, 0);

  // Now test replayTask directly on rep_t1
  const replayedTask = await runnerLib.replayTask(req, 'rep_t1');
  assert.equal(replayedTask.status, constants.TASK_STATUS.DONE);
  assert.equal(replayedTask.exitCode, 0);

  // Now test replayBatch directly on rep_b1
  const replayedBatch = await runnerLib.replayBatch(req, 'rep_b1');
  assert.equal(replayedBatch.status, constants.BATCH_STATUS.BATCH_DONE);

  if (fs.existsSync(flakyFile)) {
    fs.unlinkSync(flakyFile);
  }
});

// ============================================================================
// 10. Timeout Watchdog & Boot Crash Reconciliation (resumeRunningJobsOnBoot)
// ============================================================================
test('Watcher timeout watchdog and resumeRunningJobsOnBoot orphan reconciliation', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Test task timeout watchdog
  const timeoutRun = await runnerLib.triggerRunner(req, {
    mapId: 'timeout_map',
    awaitCompletion: true,
    pollIntervalMs: 30,
    killGraceMs: 50,
    batches: [
      {
        name: 'Timeout Batch',
        mode: 'queue',
        tasks: [
          {
            _id: 'to_task_1',
            cmd: 'node -e "setInterval(() => {}, 500)"',
            timeoutMs: 120
          }
        ]
      }
    ]
  });

  assert.equal(timeoutRun.status, constants.RUNNER_STATUS.TIMEOUT);
  const timedOutTask = await db.collection('task').findOne({ _id: 'to_task_1' });
  assert.equal(timedOutTask.status, constants.TASK_STATUS.TIMEOUT);

  // 2. Test resumeRunningJobsOnBoot with a dead orphan task
  await db.collection('runner').insertOne({
    _id: 'boot_runner_dead',
    mapId: 'boot_map',
    status: constants.RUNNER_STATUS.RUNNING,
    controlState: constants.CONTROL_STATES.NORMAL,
    currentBatchIndex: 0
  });
  await db.collection('batch').insertOne({
    _id: 'boot_batch_dead',
    runnerId: 'boot_runner_dead',
    mapId: 'boot_map',
    status: constants.BATCH_STATUS.RUNNING,
    order: 0
  });
  const orphanLogPath = constants.getLogFilePath('boot_task_dead');
  fs.writeFileSync(orphanLogPath, 'Unflushed log line before crash\n', 'utf8');
  await db.collection('task').insertOne({
    _id: 'boot_task_dead',
    batchId: 'boot_batch_dead',
    runnerId: 'boot_runner_dead',
    mapId: 'boot_map',
    cmd: 'echo "orphan"',
    pid: 99999991,
    byteOffset: 0,
    status: constants.TASK_STATUS.RUNNING
  });

  const bootSummary = await runnerLib.resumeRunningJobsOnBoot(req);
  assert.equal(bootSummary.failedOrphanTasks.includes('boot_task_dead'), true);
  assert.equal(bootSummary.failedRunners.includes('boot_runner_dead'), true);

  const reconciledTask = await db.collection('task').findOne({ _id: 'boot_task_dead' });
  assert.equal(reconciledTask.status, constants.TASK_STATUS.FAILED);
  assert.equal(reconciledTask.byteOffset > 0, true, 'Remaining unread log bytes should be flushed on boot');

  // 3. Test resumeRunningJobsOnBoot with a LIVE surviving detached process
  const liveTaskId = 'boot_task_live';
  const liveLogPath = constants.getLogFilePath(liveTaskId);
  fs.writeFileSync(liveLogPath, 'Initial line before reboot\n', 'utf8');
  const initialBytes = fs.statSync(liveLogPath).size;

  const liveLogFd = fs.openSync(liveLogPath, 'a');
  const survivingChild = spawn('node -e "setTimeout(() => console.log(\'Line after reboot\'), 120)"', {
    shell: true,
    detached: true,
    stdio: ['ignore', liveLogFd, liveLogFd]
  });
  fs.closeSync(liveLogFd);
  survivingChild.unref();

  await db.collection('runner').insertOne({
    _id: 'boot_runner_live',
    mapId: 'boot_map_live',
    status: constants.RUNNER_STATUS.RUNNING,
    controlState: constants.CONTROL_STATES.NORMAL,
    currentBatchIndex: 0
  });
  await db.collection('batch').insertOne({
    _id: 'boot_batch_live',
    runnerId: 'boot_runner_live',
    mapId: 'boot_map_live',
    mode: 'queue',
    status: constants.BATCH_STATUS.RUNNING,
    order: 0
  });
  await db.collection('task').insertOne({
    _id: liveTaskId,
    batchId: 'boot_batch_live',
    runnerId: 'boot_runner_live',
    mapId: 'boot_map_live',
    cmd: 'node surviving script',
    pid: survivingChild.pid,
    byteOffset: initialBytes,
    pollIntervalMs: 40,
    status: constants.TASK_STATUS.RUNNING
  });

  const liveBootSummary = await runnerLib.resumeRunningJobsOnBoot(req, { awaitCompletion: true });
  assert.equal(liveBootSummary.reattachedTasks.includes(liveTaskId), true);
  assert.equal(liveBootSummary.resumedRunners.includes('boot_runner_live'), true);

  const finishedLiveTask = await db.collection('task').findOne({ _id: liveTaskId });
  assert.equal(finishedLiveTask.status, constants.TASK_STATUS.DONE);

  const liveLogs = await runnerLib.queryLogs(req, { taskId: liveTaskId });
  assert.equal(liveLogs.logs.some((l) => l.msg === 'Line after reboot'), true);
});

test('stopBatch and bounded maxQueueConcurrency (concurrency = 2)', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // Test queue batch with maxQueueConcurrency = 2
  const concRun = await runnerLib.triggerRunner(req, {
    mapId: 'conc_map',
    awaitCompletion: true,
    pollIntervalMs: 30,
    batches: [
      {
        name: 'Bounded Queue Batch',
        mode: 'queue',
        maxQueueConcurrency: 2,
        tasks: [
          { _id: 'cq_1', cmd: 'node -e "setTimeout(() => console.log(\'cq1\'), 60)"' },
          { _id: 'cq_2', cmd: 'node -e "setTimeout(() => console.log(\'cq2\'), 60)"' },
          { _id: 'cq_3', cmd: 'echo "cq3"' },
          { _id: 'cq_4', cmd: 'echo "cq4"' }
        ]
      }
    ]
  });

  assert.equal(concRun.status, constants.RUNNER_STATUS.COMPLETED);
  assert.equal(concRun.tasks.every((t) => t.status === constants.TASK_STATUS.DONE), true);

  // Test stopBatch directly
  const stopBatchRun = await runnerLib.triggerRunner(req, {
    mapId: 'stop_batch_map',
    pollIntervalMs: 30,
    killGraceMs: 50,
    batches: [
      {
        _id: 'sb_1',
        name: 'Batch To Stop',
        mode: 'queue',
        tasks: [
          { _id: 'sb_t1', cmd: 'node -e "setInterval(() => {}, 500)"' },
          { _id: 'sb_t2', cmd: 'echo "queued task should be stopped"' }
        ]
      }
    ]
  });

  await sleep(80);
  const stoppedBatch = await runnerLib.stopBatch(req, 'sb_1');
  assert.equal(stoppedBatch.status, constants.BATCH_STATUS.STOPPED);

  const finalSbRunner = await stopBatchRun.executionPromise;
  assert.equal(finalSbRunner.status, constants.RUNNER_STATUS.STOPPED);

  const sbT1 = await db.collection('task').findOne({ _id: 'sb_t1' });
  const sbT2 = await db.collection('task').findOne({ _id: 'sb_t2' });
  assert.equal(sbT1.status, constants.TASK_STATUS.STOPPED);
  assert.equal(sbT2.status, constants.TASK_STATUS.STOPPED);
});

test('schemas.js: MongoDB $jsonSchema, Mongoose defs, document builders, validators, and index provisioning', async () => {
  const db = createMockDb();
  const createdCollections = [];
  const createdIndexes = {};

  db.createCollection = async (name, opts) => {
    createdCollections.push({ name, opts });
  };
  Object.keys(db.collections).forEach((colName) => {
    db.collections[colName].createIndexes = async (specs) => {
      createdIndexes[colName] = specs;
    };
  });

  const req = createMockReq(db);

  // Build documents for all 4 collections
  const runnerDoc = runnerLib.buildRunnerDoc(req, {
    mapId: 'app_schema_1',
    ud: { uId: 'u_1', aId: 'a_1' },
    totalBatches: 2
  });
  assert.equal(runnerLib.validateRunnerDoc(runnerDoc).valid, true);
  assert.equal(runnerLib.validateRunnerDoc({ status: 'invalid' }).valid, false);

  const batchDoc = runnerLib.buildBatchDoc(req, {
    runnerId: runnerDoc._id,
    mapId: runnerDoc.mapId,
    name: 'Build Stage',
    mode: 'parallel',
    order: 0
  });
  assert.equal(runnerLib.validateBatchDoc(batchDoc).valid, true);
  assert.equal(runnerLib.validateBatchDoc({ mode: 'invalid-mode' }).valid, false);

  const taskDoc = runnerLib.buildTaskDoc(req, {
    batchId: batchDoc._id,
    runnerId: runnerDoc._id,
    mapId: runnerDoc.mapId,
    cmd: 'npm test'
  });
  assert.equal(runnerLib.validateTaskDoc(taskDoc).valid, true);
  assert.equal(runnerLib.validateTaskDoc({ cmd: '' }).valid, false);

  const logBucketDoc = runnerLib.buildLogBucketDoc(req, {
    mapId: runnerDoc.mapId,
    runnerId: runnerDoc._id,
    batchId: batchDoc._id,
    taskId: taskDoc._id,
    ud: { uId: 'u_1', aId: 'a_1' },
    logs: [{ type: 'stdout', msg: 'All tests passed', ts: Date.now() }]
  });
  assert.equal(runnerLib.validateLogBucketDoc(logBucketDoc).valid, true);
  assert.equal(runnerLib.validateLogBucketDoc({ count: 501, ud: { uId: 'u', aId: 'a' }, logs: [] }).valid, false);

  // Verify Mongoose Schemas & Models
  assert.ok(runnerLib.RunnerSchema);
  assert.ok(runnerLib.BatchSchema);
  assert.ok(runnerLib.TaskSchema);
  assert.ok(runnerLib.LogBucketSchema);
  assert.ok(runnerLib.UserDetailSchema);
  assert.ok(runnerLib.LogEntrySchema);
  assert.equal(runnerLib.RunnerModel.modelName, 'runner');
  assert.equal(runnerLib.BatchModel.modelName, 'batch');
  assert.equal(runnerLib.TaskModel.modelName, 'task');
  assert.equal(runnerLib.LogBucketModel.modelName, 'log');
  assert.equal(runnerLib.RunnerSchema.indexes().length, 3);
  assert.equal(runnerLib.BatchSchema.indexes().length, 3);
  assert.equal(runnerLib.TaskSchema.indexes().length, 4);
  assert.equal(runnerLib.LogBucketSchema.indexes().length, 5);

  // Verify index & validator provisioning across all 4 collections
  const provisioned = await runnerLib.ensureSchemasAndIndexes(req);
  assert.equal(createdCollections.length, 4);
  assert.equal(provisioned.runner.indexes.length, 3);
  assert.equal(provisioned.batch.indexes.length, 3);
  assert.equal(provisioned.task.indexes.length, 4);
  assert.equal(provisioned.log.indexes.length, 5);
});

test('14. Shell Script Executor: supports cmd, external scriptPath (.sh file), and multi-line inline script with args & env', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // Create a temporary .sh file in /tmp/express-script-logs to test scriptPath execution
  const externalScriptPath = path.join(runnerLib.LOG_DIR, 'test-external-deploy.sh');
  fs.writeFileSync(
    externalScriptPath,
    '#!/usr/bin/env bash\necho "##[step-start] External Script: env=$1 version=$2 tag=$DEPLOY_TAG"\necho "##[step-ok] External script completed"\n',
    'utf8'
  );

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'shell-executor-app',
    awaitCompletion: true,
    env: { DEPLOY_TAG: 'v2.4.0' },
    batches: [
      {
        name: 'Multi-Mode Shell Execution Stage',
        mode: 'queue',
        tasks: [
          // Mode 1: Direct command string (`cmd`) + `args`
          {
            name: 'Direct Command',
            cmd: 'echo',
            args: ['Direct cmd with spaces']
          },
          // Mode 2: External .sh file (`scriptPath`) + `args`
          {
            name: 'External Script File',
            scriptPath: externalScriptPath,
            args: ['production', '1.0.0'],
            shell: 'bash'
          },
          // Mode 3: Multi-line inline shell script (`script`) + `args`
          {
            name: 'Inline Multi-Line Script',
            script: [
              '#!/usr/bin/env bash',
              'set -e',
              'TARGET_ENV="$1"',
              'echo "##[progress] 80% Deploying to ${TARGET_ENV}"',
              'echo "Inline script success for ${TARGET_ENV} (${DEPLOY_TAG})"'
            ].join('\n'),
            args: ['staging-eu']
          }
        ]
      }
    ]
  });

  assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(triggered.tasks.length, 3);
  assert.ok(triggered.tasks.every((t) => t.status === runnerLib.TASK_STATUS.DONE));

  const { logs } = await runnerLib.queryLogs(req, { runnerId: triggered.runnerId });
  const messages = logs.map((l) => l.msg);

  assert.ok(messages.some((m) => m.includes('Direct cmd with spaces')));
  assert.ok(messages.some((m) => m.includes('External Script: env=production version=1.0.0 tag=v2.4.0')));
  assert.ok(messages.some((m) => m.includes('Inline script success for staging-eu (v2.4.0)')));
});

test('15. SSE Page Refresh & Reconnect: replayHistory, includeState snapshot, and Last-Event-ID / afterTs catch-up', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'refresh-test-app',
    awaitCompletion: true,
    tasks: [
      'echo "##[step-start] Historical Step 1"',
      'echo "##[progress] 50% Midpoint"',
      'echo "##[step-ok] Historical Step 2"'
    ]
  });

  const chunks = [];
  const resRefresh = {
    setHeader: () => {},
    flushHeaders: () => {},
    write: (chunk) => { chunks.push(chunk); },
    on: () => {}
  };

  // Simulate browser page refresh subscribing with replayHistory: true and includeState: true
  const client = runnerLib.attachStream(req, resRefresh, {
    runnerId: triggered.runnerId,
    replayHistory: true,
    includeState: true
  });

  await client.replayPromise;

  // Also broadcast a new live event after replay completes
  runnerLib.broadcast(req, triggered.runnerId, {
    mapId: 'refresh-test-app',
    runnerId: triggered.runnerId,
    type: 'stdout',
    msg: 'Live post-refresh line'
  });

  const joinedOutput = chunks.join('');
  assert.ok(joinedOutput.includes('event: snapshot'), 'Should emit initial tier state snapshot on refresh');
  assert.ok(joinedOutput.includes('Historical Step 1'), 'Should replay historical step-start from MongoDB');
  assert.ok(joinedOutput.includes('50% Midpoint'), 'Should replay historical progress from MongoDB');
  assert.ok(joinedOutput.includes('Historical Step 2'), 'Should replay historical step-ok from MongoDB');
  assert.ok(joinedOutput.includes('Live post-refresh line'), 'Should seamlessly transition to live events after replay');

  client.close();
});

// ============================================================================
// 16. Add-On 1: Secret Masking & Automatic Log Redaction
// ============================================================================
test('16. Secret Masking: redacts sensitive env vars, secretKeys, and explicit secrets in DB logs and SSE streams', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const sseChunks = [];
  const resMock = {
    setHeader: () => {},
    flushHeaders: () => {},
    write: (chunk) => { sseChunks.push(chunk); },
    on: () => {}
  };
  const streamClient = runnerLib.attachStream(req, resMock, { mapId: 'secret-app' });

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'secret-app',
    awaitCompletion: true,
    pollIntervalMs: 30,
    env: {
      API_TOKEN: 'tok_super_secret_999',
      DB_PASSWORD: 'pw_ultra_confidential',
      CUSTOM_PLAIN_VAR: 'custom_hidden_val',
      PUBLIC_ENV: 'visible_value'
    },
    secretKeys: ['CUSTOM_PLAIN_VAR'],
    secrets: ['inline_private_key_xyz'],
    tasks: [
      'echo "Connecting with token=$API_TOKEN pass=$DB_PASSWORD custom=$CUSTOM_PLAIN_VAR raw=inline_private_key_xyz public=$PUBLIC_ENV"'
    ]
  });

  streamClient.close();
  assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);

  const { logs } = await runnerLib.queryLogs(req, { runnerId: triggered.runnerId });
  const combinedDbLogs = logs.map((l) => l.msg).join('\n');
  const combinedSse = sseChunks.join('');

  // Verify none of the secret values appear in MongoDB or SSE stream
  assert.equal(combinedDbLogs.includes('tok_super_secret_999'), false, 'API_TOKEN should be redacted in DB');
  assert.equal(combinedDbLogs.includes('pw_ultra_confidential'), false, 'DB_PASSWORD should be redacted in DB');
  assert.equal(combinedDbLogs.includes('custom_hidden_val'), false, 'secretKeys value should be redacted in DB');
  assert.equal(combinedDbLogs.includes('inline_private_key_xyz'), false, 'explicit secrets should be redacted in DB');
  assert.equal(combinedDbLogs.includes('***REDACTED***'), true, 'Redaction mask should be present in DB');
  assert.equal(combinedDbLogs.includes('visible_value'), true, 'Non-secret env vars should remain visible');

  assert.equal(combinedSse.includes('tok_super_secret_999'), false, 'API_TOKEN should be redacted in SSE');
  assert.equal(combinedSse.includes('***REDACTED***'), true, 'Redaction mask should be present in SSE');
});

// ============================================================================
// 17. Add-On 2: Inter-Task Output Variables (##[set-output KEY=VAL])
// ============================================================================
test('17. Inter-Task Output Variables: captures ##[set-output KEY=VAL] and injects into downstream tasks env', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'outputs-app',
    awaitCompletion: true,
    pollIntervalMs: 30,
    batches: [
      {
        name: 'Build Stage',
        mode: 'queue',
        tasks: [
          {
            _id: 'out_t1',
            cmd: 'echo "##[set-output BUILD_ID=build_2026_rc1]" && echo "##[output ARTIFACT_PATH=/tmp/app.tar.gz]"'
          }
        ]
      },
      {
        name: 'Deploy Stage Consuming Outputs',
        mode: 'queue',
        tasks: [
          {
            _id: 'out_t2',
            cmd: 'echo "Deploying artifact $ARTIFACT_PATH from build $BUILD_ID"'
          }
        ]
      }
    ]
  });

  assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);

  const updatedRunner = await db.collection('runner').findOne({ _id: triggered.runnerId });
  assert.equal(updatedRunner.outputs.BUILD_ID, 'build_2026_rc1');
  assert.equal(updatedRunner.outputs.ARTIFACT_PATH, '/tmp/app.tar.gz');

  const task1Doc = await db.collection('task').findOne({ _id: 'out_t1' });
  assert.equal(task1Doc.outputs.BUILD_ID, 'build_2026_rc1');

  const { logs } = await runnerLib.queryLogs(req, { taskId: 'out_t2' });
  assert.ok(
    logs.some((l) => l.msg.includes('Deploying artifact /tmp/app.tar.gz from build build_2026_rc1')),
    'Downstream task should receive upstream ##[set-output] variables in its environment'
  );
});

// ============================================================================
// 18. Add-On 3: Automatic Task Retries with Exponential Backoff
// ============================================================================
test('18. Automatic Task Retries: retries flaky task with exponential backoff until success', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const attemptCounterFile = path.join(runnerLib.LOG_DIR, 'retry_counter_test.txt');
  if (fs.existsSync(attemptCounterFile)) {
    fs.unlinkSync(attemptCounterFile);
  }

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'retry-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    tasks: [
      {
        _id: 'flaky_retry_task',
        maxRetries: 2,
        retryDelayMs: 40,
        retryBackoffFactor: 1.5,
        cmd: `node -e "const fs = require('fs'); const f = '${attemptCounterFile}'; const count = fs.existsSync(f) ? Number(fs.readFileSync(f, 'utf8')) + 1 : 1; fs.writeFileSync(f, String(count)); if (count < 3) { console.error('Flaky failure #' + count); process.exit(1); } console.log('Succeeded on attempt #' + count);"`
      }
    ]
  });

  if (fs.existsSync(attemptCounterFile)) {
    fs.unlinkSync(attemptCounterFile);
  }

  assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);
  const finalTask = await db.collection('task').findOne({ _id: 'flaky_retry_task' });
  assert.equal(finalTask.status, runnerLib.TASK_STATUS.DONE);
  assert.equal(finalTask.retryCount, 2, 'Should record 2 retries (3 total attempts)');

  const { logs } = await runnerLib.queryLogs(req, { taskId: 'flaky_retry_task' });
  assert.ok(logs.some((l) => l.msg.includes('Succeeded on attempt #3')));
  assert.ok(logs.some((l) => l.type === 'warning' && l.msg.includes('retrying in')));
});

// ============================================================================
// 19. Add-On 4: /tmp File Garbage Collection & MongoDB Log TTL Index
// ============================================================================
test('19. Temp File Garbage Collection & Log TTL: cleanupTempOnFinish, cleanupRunnerFiles, cleanupStaleTempFiles, and logTtlSeconds', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Automatic cleanupTempOnFinish
  const autoCleanRun = await runnerLib.triggerRunner(req, {
    mapId: 'gc-app',
    awaitCompletion: true,
    cleanupTempOnFinish: true,
    pollIntervalMs: 30,
    tasks: [
      {
        _id: 'gc_task_auto',
        script: '#!/usr/bin/env sh\necho "auto cleanup test"'
      }
    ]
  });

  assert.equal(autoCleanRun.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(fs.existsSync(runnerLib.getLogFilePath('gc_task_auto')), false, 'Log file should be auto-removed on finish');
  assert.equal(fs.existsSync(runnerLib.getScriptFilePath('gc_task_auto')), false, 'Inline .sh file should be auto-removed on finish');

  // 2. Manual cleanupRunnerFiles
  const manualRun = await runnerLib.triggerRunner(req, {
    mapId: 'gc-manual-app',
    awaitCompletion: true,
    cleanupTempOnFinish: false,
    pollIntervalMs: 30,
    tasks: [{ _id: 'gc_task_manual', cmd: 'echo "keep until manual cleanup"' }]
  });
  assert.equal(fs.existsSync(runnerLib.getLogFilePath('gc_task_manual')), true);
  const cleanRes = await runnerLib.cleanupRunnerFiles(req, manualRun.runnerId);
  assert.equal(cleanRes.removedLogs, 1);
  assert.equal(fs.existsSync(runnerLib.getLogFilePath('gc_task_manual')), false);

  // 3. Stale temp file sweep (cleanupStaleTempFiles)
  const staleFile = path.join(runnerLib.LOG_DIR, 'stale_old_task.log');
  fs.writeFileSync(staleFile, 'old data\n', 'utf8');
  const pastTimeSec = Math.floor((Date.now() - 7200 * 1000) / 1000);
  fs.utimesSync(staleFile, pastTimeSec, pastTimeSec);

  const sweepResult = runnerLib.cleanupStaleTempFiles(1800 * 1000);
  assert.ok(sweepResult.removedCount >= 1);
  assert.equal(fs.existsSync(staleFile), false);

  // 4. Optional MongoDB TTL index on log collection
  const ttlIndexes = [];
  db.collections.log.createIndexes = async (specs) => {
    ttlIndexes.push(...specs);
  };
  const idxRes = await runnerLib.ensureSchemasAndIndexes(req, { logTtlSeconds: 604800 });
  assert.ok(idxRes.log.indexes.includes('idx_log_ttl'));
  assert.ok(ttlIndexes.some((s) => s.name === 'idx_log_ttl' && s.expireAfterSeconds === 604800));
});

// ============================================================================
// 20. Add-On 5: Per-mapId Concurrency Lock / Mutex Policies
// ============================================================================
test('20. Per-mapId Concurrency Policies: reject (409 Conflict) and cancel-previous', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // Start a long-running runner on mapId 'mutex-map'
  const firstRun = await runnerLib.triggerRunner(req, {
    mapId: 'mutex-map',
    pollIntervalMs: 30,
    killGraceMs: 50,
    tasks: [
      { _id: 'mutex_t1', cmd: 'node -e "setInterval(() => {}, 500)"' }
    ]
  });

  await sleep(80);

  // 1. Test 'reject' policy (or preventParallelRuns: true) -> throws RUNNER_CONFLICT (409)
  let conflictError = null;
  try {
    await runnerLib.triggerRunner(req, {
      mapId: 'mutex-map',
      concurrencyPolicy: 'reject',
      tasks: ['echo "should be rejected"']
    });
  } catch (err) {
    conflictError = err;
  }
  assert.ok(conflictError, 'Should throw conflict error when concurrencyPolicy is reject');
  assert.equal(conflictError.code, 'RUNNER_CONFLICT');
  assert.equal(conflictError.statusCode, 409);
  assert.ok(conflictError.activeRunnerIds.includes(firstRun.runnerId));

  // 2. Test 'cancel-previous' policy -> automatically stops firstRun and completes secondRun
  const secondRun = await runnerLib.triggerRunner(req, {
    mapId: 'mutex-map',
    concurrencyPolicy: 'cancel-previous',
    awaitCompletion: true,
    pollIntervalMs: 30,
    tasks: [
      { _id: 'mutex_t2', cmd: 'echo "second run took over"' }
    ]
  });

  const firstRunFinal = await firstRun.executionPromise;
  assert.equal(firstRunFinal.status, runnerLib.RUNNER_STATUS.STOPPED, 'Previous runner should be cancelled');
  assert.equal(secondRun.status, runnerLib.RUNNER_STATUS.COMPLETED, 'New runner should complete');
});

// ============================================================================
// 21. Add-On 6: Lifecycle Webhooks (HMAC-SHA256) & Event Hooks
// ============================================================================
test('21. Lifecycle Webhooks & Hooks: fires registerLifecycleHook, onFinish callback, and HMAC-signed HTTP webhook', async () => {
  const crypto = require('node:crypto');
  const db = createMockDb();
  const req = createMockReq(db);

  const receivedWebhooks = [];
  const hookEvents = [];
  let onFinishPayload = null;
  runnerLib.clearLifecycleHooks();
  runnerLib.registerLifecycleHook((payload) => {
    hookEvents.push(payload);
  });

  try {
    const triggered = await runnerLib.triggerRunner(req, {
      mapId: 'webhook-app',
      awaitCompletion: true,
      pollIntervalMs: 30,
      webhookUrl: 'https://hooks.example.com:8443/ci/webhook',
      webhookSecret: 'my_webhook_hmac_secret',
      webhookHeaders: { 'X-Custom-Source': 'devops-runner' },
      webhookTransport: (reqOptions, bodyStr) => {
        receivedWebhooks.push({
          options: reqOptions,
          headers: reqOptions.headers,
          rawBody: bodyStr,
          body: JSON.parse(bodyStr)
        });
        return { statusCode: 200 };
      },
      onFinish: (payload) => {
        onFinishPayload = payload;
      },
      tasks: [
        'echo "##[set-output DEPLOY_URL=https://app.example.com]"',
        'echo "Deployment finished"'
      ]
    });

    assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);
    assert.equal(hookEvents.length, 1);
    assert.equal(hookEvents[0].event, 'runner.completed');
    assert.equal(hookEvents[0].outputs.DEPLOY_URL, 'https://app.example.com');

    assert.ok(onFinishPayload);
    assert.equal(onFinishPayload.runnerId, triggered.runnerId);

    assert.equal(receivedWebhooks.length, 1);
    const wh = receivedWebhooks[0];
    assert.equal(wh.options.hostname, 'hooks.example.com');
    assert.equal(wh.options.port, 8443);
    assert.equal(wh.options.path, '/ci/webhook');
    assert.equal(wh.headers['X-Custom-Source'], 'devops-runner');

    const expectedSig = `sha256=${crypto
      .createHmac('sha256', 'my_webhook_hmac_secret')
      .update(wh.rawBody)
      .digest('hex')}`;
    assert.equal(
      wh.headers['X-Runner-Signature-256'],
      expectedSig,
      'Webhook should include verified HMAC-SHA256 signature header'
    );
    assert.equal(wh.body.status, 'completed');
    assert.equal(wh.body.outputs.DEPLOY_URL, 'https://app.example.com');
  } finally {
    runnerLib.clearLifecycleHooks();
  }
});

// ============================================================================
// 22. Add-On 7: Paginated & Filtered Log Querying (type, search, afterTs, limit, offset)
// ============================================================================
test('22. Paginated & Filtered queryLogs: filters by type, search, afterTs/beforeTs, and paginates with limit & offset', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const triggered = await runnerLib.triggerRunner(req, {
    mapId: 'query-filter-app',
    awaitCompletion: true,
    pollIntervalMs: 30,
    tasks: [
      [
        'echo "Info line 1: initializing cluster"',
        'echo "##[warning] Disk usage above 80%"',
        'echo "##[error] Connection refused to replica-2"',
        'echo "Info line 2: fallback replica connected"',
        'echo "##[error] Timeout on shard-4"'
      ].join(' && ')
    ]
  });

  assert.equal(triggered.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // 1. Filter by type = 'error'
  const errorOnly = await runnerLib.queryLogs(req, {
    runnerId: triggered.runnerId,
    type: 'error'
  });
  assert.equal(errorOnly.totalLogs, 2);
  assert.ok(errorOnly.logs.every((l) => l.type === 'error'));

  // 2. Filter by search substring (case-insensitive) across stdout/error
  const replicaSearch = await runnerLib.queryLogs(req, {
    runnerId: triggered.runnerId,
    type: ['stdout', 'error'],
    search: 'REPLICA'
  });
  assert.equal(replicaSearch.totalLogs, 2);

  // 3. Pagination with limit & offset
  const page1 = await runnerLib.queryLogs(req, {
    runnerId: triggered.runnerId,
    limit: 2,
    offset: 0
  });
  assert.equal(page1.logs.length, 2);
  assert.equal(page1.hasMore, true);

  const page2 = await runnerLib.queryLogs(req, {
    runnerId: triggered.runnerId,
    limit: 2,
    offset: 2
  });
  assert.equal(page2.logs.length, 2);
  assert.notEqual(page1.logs[0].msg, page2.logs[0].msg);
});

// ============================================================================
// 23. Add-On 8A: MongoDB-Native Cluster Mode (Default: useRedis = false)
// ============================================================================
test('23. MongoDB-Native Cluster Mode (useRedis=false default): cross-node SSE tailing, remote pause/resume/stop delegation, and host-scoped boot recovery', async () => {
  // Ensure default cluster config has Redis OFF (useRedis: false) and clusterMode: 'mongo'
  runnerLib.configureCluster({ useRedis: false, clusterMode: 'mongo', clusterPollIntervalMs: 35 });
  const defaultCfg = runnerLib.getClusterConfig();
  assert.equal(defaultCfg.useRedis, false, 'Redis must be OFF (false) by default');
  assert.equal(defaultCfg.clusterMode, 'mongo', 'Default clusterMode must be mongo');

  const db = createMockDb();
  const reqNodeA = { ...createMockReq(db), hostId: 'node-alpha:1001' };
  const reqNodeB = { ...createMockReq(db), hostId: 'node-beta:2002' };

  // 1. Cross-Node Live SSE Streaming via MongoDB Watermark Delta Tailer (Node B streams Runner executing on Node A)
  const nodeBSseChunks = [];
  const resNodeB = {
    setHeader: () => {},
    flushHeaders: () => {},
    write: (chunk) => { nodeBSseChunks.push(chunk); },
    on: () => {}
  };

  const clientNodeB = runnerLib.attachStream(reqNodeB, resNodeB, {
    mapId: 'mongo-cluster-app',
    clusterPollIntervalMs: 30
  });

  const runOnNodeA = await runnerLib.triggerRunner(reqNodeA, {
    mapId: 'mongo-cluster-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    tasks: [
      'echo "##[step-start] Built on Node Alpha"',
      'echo "Cluster log line from Node Alpha"'
    ]
  });

  // Allow Node B's MongoDB delta tailer to poll the newly inserted log bucket
  await sleep(90);
  clientNodeB.close();

  assert.equal(runOnNodeA.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(runOnNodeA.runner.hostId, 'node-alpha:1001');
  const combinedNodeBSse = nodeBSseChunks.join('');
  assert.ok(
    combinedNodeBSse.includes('Built on Node Alpha') && combinedNodeBSse.includes('Cluster log line from Node Alpha'),
    'Node B SSE client should receive live logs from Node A via MongoDB delta tailing without Redis'
  );

  // 2. Cross-Node Process Signal Delegation (Node B pauses, resumes, and stops a PID running on Node A) + Host-Scoped Boot Check
  const controlRun = await runnerLib.triggerRunner(reqNodeA, {
    mapId: 'mongo-remote-control-app',
    pollIntervalMs: 25,
    killGraceMs: 50,
    tasks: [
      {
        _id: 'remote_ctrl_task_1',
        cmd: 'node -e "setInterval(() => console.log(\'tick\'), 200)"'
      }
    ]
  });

  await sleep(80);

  // Verify Host-Scoped Boot Recovery: Node B rebooting MUST NOT touch Node A's active task
  const nodeBBootSummary = await runnerLib.resumeRunningJobsOnBoot(reqNodeB);
  assert.ok(
    nodeBBootSummary.skippedRemoteTasks.includes('remote_ctrl_task_1'),
    'Node B boot recovery must skip active tasks owned by Node A'
  );

  // Node B requests pauseTask -> delegates via MongoDB controlState: 'pause-requested' -> Node A watcher executes SIGSTOP
  const pauseReqDoc = await runnerLib.pauseTask(reqNodeB, 'remote_ctrl_task_1');
  assert.equal(pauseReqDoc.controlState, runnerLib.CONTROL_STATES.PAUSE_REQUESTED);
  await sleep(90);
  const pausedTaskDoc = await db.collection('task').findOne({ _id: 'remote_ctrl_task_1' });
  assert.equal(pausedTaskDoc.status, runnerLib.TASK_STATUS.PAUSED, 'Node A watcher should execute SIGSTOP and mark task paused');
  assert.equal(pausedTaskDoc.controlState, runnerLib.CONTROL_STATES.NORMAL);

  // Node B requests resumeTask -> delegates via MongoDB controlState: 'resume-requested' -> Node A watcher executes SIGCONT
  const resumeReqDoc = await runnerLib.resumeTask(reqNodeB, 'remote_ctrl_task_1');
  assert.equal(resumeReqDoc.controlState, runnerLib.CONTROL_STATES.RESUME_REQUESTED);
  await sleep(90);
  const resumedTaskDoc = await db.collection('task').findOne({ _id: 'remote_ctrl_task_1' });
  assert.equal(resumedTaskDoc.status, runnerLib.TASK_STATUS.RUNNING, 'Node A watcher should execute SIGCONT and mark task running');
  assert.equal(resumedTaskDoc.controlState, runnerLib.CONTROL_STATES.NORMAL);

  // Node B requests stopTask -> delegates via MongoDB controlState: 'stop-requested' -> Node A watcher executes SIGTERM
  const stopReqDoc = await runnerLib.stopTask(reqNodeB, 'remote_ctrl_task_1');
  assert.equal(stopReqDoc.controlState, runnerLib.CONTROL_STATES.STOP_REQUESTED);
  const finalControlRunner = await controlRun.executionPromise;
  assert.equal(finalControlRunner.status, runnerLib.RUNNER_STATUS.STOPPED);

  const stoppedTaskDoc = await db.collection('task').findOne({ _id: 'remote_ctrl_task_1' });
  assert.equal(stoppedTaskDoc.status, runnerLib.TASK_STATUS.STOPPED, 'Node A watcher should execute SIGTERM and mark task stopped');
});

// ============================================================================
// 24. Add-On 8B: Redis Cluster Mode (Switch Flag: useRedis = true)
// ============================================================================
test('24. Redis Cluster Mode (useRedis=true switch): real-time Redis Pub/Sub SSE fan-out and instant cross-node process control signals', async () => {
  const db = createMockDb();
  const reqNodeA = { ...createMockReq(db), hostId: 'redis-node-1' };
  const reqNodeB = { ...createMockReq(db), hostId: 'redis-node-2' };

  const redisBus = runnerLib.createInMemoryRedisBus();

  try {
    // Enable Redis Cluster Mode via switch flag `useRedis: true`
    const activeCfg = runnerLib.configureCluster({
      useRedis: true,
      redisPub: redisBus.redisPub,
      redisSub: redisBus.redisSub,
      redisChannel: 'test:runner:events'
    });

    assert.equal(activeCfg.useRedis, true, 'useRedis flag should be enabled');
    assert.equal(activeCfg.clusterMode, 'redis', 'clusterMode should switch to redis');
    assert.equal(activeCfg.hasRedisPub, true);
    assert.equal(activeCfg.hasRedisSub, true);

    const nodeBSseChunks = [];
    const resNodeB = {
      setHeader: () => {},
      flushHeaders: () => {},
      write: (chunk) => { nodeBSseChunks.push(chunk); },
      on: () => {}
    };

    // Connect SSE client on Node B
    const clientNodeB = runnerLib.attachStream(reqNodeB, resNodeB, {
      mapId: 'redis-cluster-app'
    });

    // Execute task on Node A; logs and status events are published over Redis Pub/Sub to Node B
    const runOnNodeA = await runnerLib.triggerRunner(reqNodeA, {
      mapId: 'redis-cluster-app',
      awaitCompletion: true,
      pollIntervalMs: 25,
      tasks: [
        'echo "##[step-start] Redis PubSub Step"',
        'echo "Hello from Redis Node 1"'
      ]
    });

    assert.equal(runOnNodeA.status, runnerLib.RUNNER_STATUS.COMPLETED);
    const combinedSse = nodeBSseChunks.join('');
    assert.ok(
      combinedSse.includes('Redis PubSub Step') && combinedSse.includes('Hello from Redis Node 1'),
      'Node B SSE client should immediately receive Node A events over Redis Pub/Sub'
    );
    clientNodeB.close();

    // Test instant cross-node stopTask via Redis control channel
    const longRedisRun = await runnerLib.triggerRunner(reqNodeA, {
      mapId: 'redis-ctrl-app',
      pollIntervalMs: 30,
      killGraceMs: 50,
      tasks: [
        {
          _id: 'redis_remote_task',
          cmd: 'node -e "setInterval(() => {}, 500)"'
        }
      ]
    });

    await sleep(70);
    await runnerLib.stopTask(reqNodeB, 'redis_remote_task');
    const finalRedisRunner = await longRedisRun.executionPromise;
    assert.equal(finalRedisRunner.status, runnerLib.RUNNER_STATUS.STOPPED);
  } finally {
    // Switch Redis back OFF (default: useRedis = false)
    const restoredCfg = runnerLib.configureCluster({
      useRedis: false,
      redisPub: null,
      redisSub: null
    });
    assert.equal(restoredCfg.useRedis, false, 'Redis should be restored to OFF (false) by default');
    assert.equal(restoredCfg.clusterMode, 'mongo', 'Cluster mode should return to mongo when useRedis is false');
  }
});

// ============================================================================
// 25. Add-On 9: Conditional Execution (`when` Rules on Batches & Tasks)
// ============================================================================
test('25. Conditional Execution (when rules): on-failure rollback, always teardown, and output-driven step matching', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Test output-driven `when` condition + skipped non-matching batch
  const outputConditionRun = await runnerLib.triggerRunner(req, {
    mapId: 'when-output-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Detect Changes',
        tasks: [
          'echo "##[set-output DEPLOY_ENV=canary]" && echo "##[set-output HAS_MIGRATIONS=false]"'
        ]
      },
      {
        name: 'DB Migrations (Skipped when HAS_MIGRATIONS != true)',
        when: { output: { HAS_MIGRATIONS: 'true' } },
        tasks: ['echo "Running DB migration"']
      },
      {
        name: 'Canary Deploy (Runs when DEPLOY_ENV == canary)',
        when: { status: 'on-success', output: { DEPLOY_ENV: 'canary' } },
        tasks: ['echo "Deploying to canary cluster"']
      }
    ]
  });

  assert.equal(outputConditionRun.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(outputConditionRun.batches[0].status, runnerLib.BATCH_STATUS.BATCH_DONE);
  assert.equal(outputConditionRun.batches[1].status, runnerLib.BATCH_STATUS.SKIPPED, 'Migrations batch should be skipped');
  assert.equal(outputConditionRun.batches[2].status, runnerLib.BATCH_STATUS.BATCH_DONE, 'Canary batch should run');

  // 2. Test `on-failure` rollback batch and `always` cleanup batch when an upstream batch fails
  const failureRollbackRun = await runnerLib.triggerRunner(req, {
    mapId: 'when-failure-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Primary Deployment (Fails)',
        tasks: [
          { name: 'Deploy Step (Fails)', cmd: 'echo "Deploy failed" && exit 1' },
          { name: 'Task-level Rollback Notice', when: 'on-failure', cmd: 'echo "##[set-output ROLLBACK_TRIGGERED=yes]"' }
        ]
      },
      {
        name: 'Normal Post-Deploy Verification (No when rule -> stays queued)',
        tasks: ['echo "Should not run"']
      },
      {
        name: 'Emergency Rollback Batch (when: on-failure)',
        when: 'on-failure',
        tasks: ['echo "##[set-output ROLLED_BACK=true]"']
      },
      {
        name: 'Teardown Ephemeral Env (when: always)',
        when: 'always',
        tasks: ['echo "##[set-output CLEANUP_DONE=true]"']
      }
    ]
  });

  assert.equal(failureRollbackRun.status, runnerLib.RUNNER_STATUS.FAILED, 'Overall runner status must remain failed');
  assert.equal(failureRollbackRun.batches[0].status, runnerLib.BATCH_STATUS.FAILED);
  assert.equal(failureRollbackRun.batches[1].status, runnerLib.BATCH_STATUS.QUEUED, 'Normal downstream batch should not run');
  assert.equal(failureRollbackRun.batches[2].status, runnerLib.BATCH_STATUS.BATCH_DONE, 'on-failure rollback batch must execute');
  assert.equal(failureRollbackRun.batches[3].status, runnerLib.BATCH_STATUS.BATCH_DONE, 'always cleanup batch must execute');
  assert.equal(failureRollbackRun.runner.outputs.ROLLBACK_TRIGGERED, 'yes', 'Task-level on-failure task should have run');
  assert.equal(failureRollbackRun.runner.outputs.ROLLED_BACK, 'true');
  assert.equal(failureRollbackRun.runner.outputs.CLEANUP_DONE, 'true');
});

// ============================================================================
// 26. Add-On 10: Manual Approval Gates (`requiresApproval`, `approveBatch`, `rejectBatch`)
// ============================================================================
test('26. Manual Approval Gates: pauses pipeline at requiresApproval batch until approveBatch or rejectBatch is called', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Trigger pipeline with a production batch that requires manual approval
  const approvalPipeline = await runnerLib.triggerRunner(req, {
    mapId: 'prod-approval-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        _id: 'staging_batch',
        name: 'Staging Build & Test',
        tasks: ['echo "##[set-output STAGING_OK=true]"']
      },
      {
        _id: 'prod_gate_batch',
        name: 'Production Release (Requires Approval)',
        requiresApproval: true,
        tasks: ['echo "##[set-output PROD_DEPLOYED=true]"']
      }
    ]
  });

  // Pipeline should pause cleanly at prod_gate_batch with status `awaiting-approval`
  assert.equal(approvalPipeline.status, runnerLib.RUNNER_STATUS.AWAITING_APPROVAL);
  const stagingBatch = await db.collection('batch').findOne({ _id: 'staging_batch' });
  const gateBatch = await db.collection('batch').findOne({ _id: 'prod_gate_batch' });
  assert.equal(stagingBatch.status, runnerLib.BATCH_STATUS.BATCH_DONE);
  assert.equal(gateBatch.status, runnerLib.BATCH_STATUS.AWAITING_APPROVAL);
  assert.equal(gateBatch.approvalStatus, 'pending');

  // Approve the batch and await pipeline completion
  const approvedBatchRes = await runnerLib.approveBatch(req, 'prod_gate_batch', {
    approvedBy: 'release-manager@corp',
    comment: 'LGTM for prod push',
    awaitCompletion: true
  });
  assert.equal(approvedBatchRes.approvalStatus, 'approved');
  assert.equal(approvedBatchRes.approvedBy, 'release-manager@corp');

  const completedRunner = await db.collection('runner').findOne({ _id: approvalPipeline.runnerId });
  assert.equal(completedRunner.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(completedRunner.outputs.PROD_DEPLOYED, 'true');

  // 2. Test rejectBatch stops the batch and parent runner
  const rejectPipeline = await runnerLib.triggerRunner(req, {
    mapId: 'prod-reject-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        _id: 'reject_gate_batch',
        name: 'Prod Gate to Reject',
        requiresApproval: true,
        tasks: ['echo "Should never execute"']
      }
    ]
  });

  assert.equal(rejectPipeline.status, runnerLib.RUNNER_STATUS.AWAITING_APPROVAL);
  const rejectedBatch = await runnerLib.rejectBatch(req, 'reject_gate_batch', {
    rejectedBy: 'secops@corp',
    reason: 'Vulnerability detected in image'
  });
  assert.equal(rejectedBatch.status, runnerLib.BATCH_STATUS.STOPPED);
  assert.equal(rejectedBatch.approvalStatus, 'rejected');

  const stoppedRunner = await db.collection('runner').findOne({ _id: rejectPipeline.runnerId });
  assert.equal(stoppedRunner.status, runnerLib.RUNNER_STATUS.STOPPED);
});

// ============================================================================
// 27. Add-On 11: Pipeline Telemetry & Bottleneck Analytics (`durationMs` & `getRunnerMetrics`)
// ============================================================================
test('27. Pipeline Telemetry & Bottleneck Analytics: records durationMs across tiers and computes getRunnerMetrics breakdown', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const run = await runnerLib.triggerRunner(req, {
    mapId: 'metrics-telemetry-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Fast Lint Stage',
        tasks: [{ name: 'Quick Lint', cmd: 'echo "Lint passed"' }]
      },
      {
        name: 'Slow Integration Stage',
        tasks: [
          {
            name: 'Heavy Integration Suite',
            cmd: 'node -e "setTimeout(() => console.log(\'##[warning] Slow query detected\'), 70)"'
          }
        ]
      }
    ]
  });

  assert.equal(run.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(typeof run.runner.durationMs, 'number');
  assert.ok(run.runner.durationMs >= 50);

  const metrics = await runnerLib.getRunnerMetrics(req, run.runnerId);
  assert.equal(metrics.runnerId, run.runnerId);
  assert.equal(metrics.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(metrics.taskCounts.total, 2);
  assert.equal(metrics.taskCounts.done, 2);
  assert.equal(metrics.batchBreakdown.length, 2);
  assert.equal(metrics.taskBreakdown.length, 2);
  assert.ok(metrics.slowestTask && metrics.slowestTask.name === 'Heavy Integration Suite');
  assert.ok(metrics.slowestBatch && metrics.slowestBatch.name === 'Slow Integration Stage');
  assert.ok(metrics.logSummary.warnLogs >= 1);
});

// ============================================================================
// 28. Add-On 12: Matrix Task Expansion (`matrix` Strategy on Batches & Tasks)
// ============================================================================
test('28. Matrix Task Expansion: expands Cartesian product of matrix axes into parameterized tasks with env variables', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const matrixRun = await runnerLib.triggerRunner(req, {
    mapId: 'matrix-deploy-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Multi-Region Multi-Service Deploy',
        mode: runnerLib.BATCH_MODES.PARALLEL,
        matrix: {
          REGION: ['us-east-1', 'eu-west-1'],
          SERVICE: ['api', 'worker']
        },
        tasks: [
          {
            name: 'Deploy Target',
            cmd: 'echo "##[set-output DEPLOY_${REGION}_${SERVICE}=$REGION:$SERVICE]"'
          }
        ]
      }
    ]
  });

  assert.equal(matrixRun.status, runnerLib.RUNNER_STATUS.COMPLETED);
  assert.equal(matrixRun.tasks.length, 4, '2 regions x 2 services should expand into 4 tasks');
  assert.equal(matrixRun.runner.outputs['DEPLOY_us-east-1_api'], 'us-east-1:api');
  assert.equal(matrixRun.runner.outputs['DEPLOY_us-east-1_worker'], 'us-east-1:worker');
  assert.equal(matrixRun.runner.outputs['DEPLOY_eu-west-1_api'], 'eu-west-1:api');
  assert.equal(matrixRun.runner.outputs['DEPLOY_eu-west-1_worker'], 'eu-west-1:worker');
});

// ============================================================================
// 29. Add-On 13: Downloadable Raw Build Log Export (`exportRunnerLogs` — txt, ndjson, json)
// ============================================================================
test('29. Downloadable Raw Build Log Export: exports pipeline logs in txt, ndjson, and json formats', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  const run = await runnerLib.triggerRunner(req, {
    mapId: 'log-export-app',
    awaitCompletion: true,
    pollIntervalMs: 25,
    tasks: [
      'echo "Export line alpha" && echo "Export line beta"'
    ]
  });

  const txtExport = await runnerLib.exportRunnerLogs(req, { runnerId: run.runnerId }, { format: 'txt' });
  assert.equal(txtExport.format, 'txt');
  assert.ok(txtExport.filename.endsWith('-logs.txt'));
  assert.ok(txtExport.content.includes('Export line alpha') && txtExport.content.includes('Export line beta'));

  const ndjsonExport = await runnerLib.exportRunnerLogs(req, { runnerId: run.runnerId }, { format: 'ndjson' });
  assert.equal(ndjsonExport.format, 'ndjson');
  const ndjsonLines = ndjsonExport.content.trim().split('\n').map((l) => JSON.parse(l));
  assert.equal(ndjsonLines.length, txtExport.totalLogs);

  const jsonExport = await runnerLib.exportRunnerLogs(req, { runnerId: run.runnerId }, { format: 'json' });
  assert.equal(jsonExport.format, 'json');
  const parsedJson = JSON.parse(jsonExport.content);
  assert.equal(parsedJson.length, txtExport.totalLogs);
});

// ============================================================================
// 30. Add-On 14: Delayed & Scheduled Triggers (`delayMs` / `runAt` + pre-start cancellation)
// ============================================================================
test('30. Delayed & Scheduled Triggers: schedules runner with delayMs and supports pre-start cancellation via stopRunner', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Trigger a runner with delayMs: 80 -> starts in `scheduled` status and completes after timer fires
  const scheduledRun = await runnerLib.triggerRunner(req, {
    mapId: 'scheduled-app-1',
    delayMs: 80,
    pollIntervalMs: 25,
    tasks: ['echo "Executed on schedule"']
  });

  assert.equal(scheduledRun.status, runnerLib.RUNNER_STATUS.SCHEDULED);
  assert.ok(scheduledRun.runner.scheduledAt > Date.now());

  const completedScheduled = await scheduledRun.executionPromise;
  assert.equal(completedScheduled.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // 2. Trigger a scheduled runner with delayMs: 5000 and cancel it before start via stopRunner
  const cancelledScheduledRun = await runnerLib.triggerRunner(req, {
    mapId: 'scheduled-app-2',
    delayMs: 5000,
    pollIntervalMs: 25,
    tasks: ['echo "Should be cancelled before starting"']
  });

  assert.equal(cancelledScheduledRun.status, runnerLib.RUNNER_STATUS.SCHEDULED);

  // Verify getScheduledRunners & listRunners return the pending scheduled runner with remainingDelayMs and hasLocalTimer
  const scheduledList = await runnerLib.getScheduledRunners(req, { mapId: 'scheduled-app-2' });
  assert.equal(scheduledList.length, 1);
  assert.equal(scheduledList[0].runnerId, cancelledScheduledRun.runnerId);
  assert.equal(scheduledList[0].hasLocalTimer, true);
  assert.ok(scheduledList[0].remainingDelayMs > 0);

  await runnerLib.stopRunner(req, cancelledScheduledRun.runnerId);
  const stoppedScheduled = await cancelledScheduledRun.executionPromise;
  assert.equal(stoppedScheduled.status, runnerLib.RUNNER_STATUS.STOPPED);

  // 3. Bulk cancel multiple scheduled runners via cancelScheduledRunners
  const bulkRun1 = await runnerLib.triggerRunner(req, {
    mapId: 'scheduled-bulk',
    delayMs: 5000,
    tasks: ['echo "Bulk 1"']
  });
  const bulkRun2 = await runnerLib.triggerRunner(req, {
    mapId: 'scheduled-bulk',
    delayMs: 8000,
    tasks: ['echo "Bulk 2"']
  });
  const allBulkScheduled = await runnerLib.getScheduledRunners(req, { mapId: 'scheduled-bulk' });
  assert.equal(allBulkScheduled.length, 2);

  const bulkCancelRes = await runnerLib.cancelScheduledRunners(req, { mapId: 'scheduled-bulk' });
  assert.equal(bulkCancelRes.cancelledCount, 2);
  const [res1, res2] = await Promise.all([bulkRun1.executionPromise, bulkRun2.executionPromise]);
  assert.equal(res1.status, runnerLib.RUNNER_STATUS.STOPPED);
  assert.equal(res2.status, runnerLib.RUNNER_STATUS.STOPPED);
});

// ============================================================================
// 31. Performance Optimizations: Pre-compiled Secret Regex, Bucket Capacity Cache,
//     Persistent Read FD, and Bounded Two-Generation SSE Deduplication Window
// ============================================================================
test('31. Performance Optimizations: compiled secret regex, zero-findOne bucket cache, persistent readFd, and bounded SSE dedup', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Pre-compiled regex attached to extractSecretValues
  const secrets = logger.extractSecretValues(
    { API_TOKEN: 'tok_super_secret_999', DB_PASSWORD: 'pw_special$[regex]*chars' },
    [],
    ['inline_secret_123']
  );
  assert.ok(secrets._compiledRegex instanceof RegExp);
  const maskedLine = logger.maskSecrets(
    'Connecting with tok_super_secret_999 and pw_special$[regex]*chars plus inline_secret_123',
    secrets
  );
  assert.equal(
    maskedLine,
    `Connecting with ${constants.REDACTION_MASK} and ${constants.REDACTION_MASK} plus ${constants.REDACTION_MASK}`
  );

  // 2. Bucket capacity cache avoids redundant findOne calls on subsequent multi-line appends
  let findOneCount = 0;
  const origFindOne = db.collections.log.findOne;
  db.collections.log.findOne = async (...args) => {
    findOneCount += 1;
    return origFindOne(...args);
  };

  await logger.appendLogsToDb(req, { runnerId: 'r_perf', batchId: 'b_perf', taskId: 't_perf' }, [
    { type: 'stdout', msg: 'line 1', ts: 1000 }
  ]);
  assert.equal(findOneCount, 0);

  await logger.appendLogsToDb(req, { runnerId: 'r_perf', batchId: 'b_perf', taskId: 't_perf' }, [
    { type: 'stdout', msg: 'line 2', ts: 1001 },
    { type: 'stdout', msg: 'line 3', ts: 1002 },
    { type: 'stdout', msg: 'line 4', ts: 1003 }
  ]);
  // Should still be 0 because _bucketCountCache tracked count=1 from the first write!
  assert.equal(findOneCount, 0);

  // 3. Bounded Two-Generation SSE Deduplication Window (MAX_DEDUP_KEYS = 2048)
  const mockClient = {
    seenDedupKeys: Object.create(null),
    seenDedupPrev: null,
    seenDedupCount: 0
  };
  for (let i = 0; i < broadcaster.MAX_DEDUP_KEYS + 10; i += 1) {
    broadcaster.markSeenDedupKey(mockClient, `key_${i}`);
  }
  assert.equal(mockClient.seenDedupCount, 10);
  assert.equal(broadcaster.hasSeenDedupKey(mockClient, 'key_0'), true);
  assert.equal(broadcaster.hasSeenDedupKey(mockClient, `key_${broadcaster.MAX_DEDUP_KEYS + 5}`), true);
});

// ============================================================================
// 32. 3-Tier Discovery Queries, Bulk Controls, skipBatch on Approval Gates,
//     replayBatch(fromFailed), and Parent Hierarchy Status Sync
// ============================================================================
test('32. Discovery & Control Enhancements: getPausedTasks/getFailedTasks, skipBatch on waiting_approval, replayBatch(fromFailed), and parent status sync', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. skipBatch on a batch in `waiting_approval` automatically skips the gate and resumes the runner
  const approvalRun = await runnerLib.triggerRunner(req, {
    mapId: 'approval-skip-app',
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Build',
        tasks: ['echo "build ok"']
      },
      {
        name: 'Optional Security Signoff',
        requiresApproval: true,
        tasks: ['echo "signoff script"']
      },
      {
        name: 'Deploy',
        tasks: ['echo "deploy ok"']
      }
    ]
  });

  const haltedDoc = await approvalRun.executionPromise;
  assert.equal(haltedDoc.status, runnerLib.RUNNER_STATUS.AWAITING_APPROVAL);

  const skippableBatches = await runnerLib.getSkippableBatches(req, { runnerId: approvalRun.runnerId });
  assert.equal(skippableBatches.length, 2); // waiting_approval batch + queued Deploy batch

  const gateBatch = skippableBatches.find((b) => b.status === runnerLib.BATCH_STATUS.AWAITING_APPROVAL);
  assert.ok(gateBatch);

  const skippedGate = await runnerLib.skipBatch(req, gateBatch._id, { awaitCompletion: true });
  assert.equal(skippedGate.status, runnerLib.BATCH_STATUS.SKIPPED);
  assert.equal(skippedGate.approvalStatus, 'skipped');

  const finalApprovalRunner = await db.collections.runner.findOne({ _id: approvalRun.runnerId });
  assert.equal(finalApprovalRunner.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // 2. replayBatch with { fromFailed: true } preserves DONE tasks and syncs parent runner status
  let markerCount = 0;
  const failRun = await runnerLib.triggerRunner(req, {
    mapId: 'replay-batch-from-failed',
    pollIntervalMs: 25,
    awaitCompletion: true,
    batches: [
      {
        name: 'Multi-Step Batch',
        mode: 'queue',
        tasks: [
          { name: 'Step 1 (Succeeds)', cmd: 'echo "step 1 done"' },
          { name: 'Step 2 (Flaky)', cmd: 'exit 1' },
          { name: 'Step 3 (Downstream)', cmd: 'echo "step 3 done"' }
        ]
      }
    ]
  });

  assert.equal(failRun.status, runnerLib.RUNNER_STATUS.FAILED);

  const failedRunners = await runnerLib.getFailedRunners(req, { mapId: 'replay-batch-from-failed' });
  assert.equal(failedRunners.length, 1);

  const failedBatches = await runnerLib.getFailedBatches(req, { runnerId: failRun.runnerId });
  assert.equal(failedBatches.length, 1);

  const failedTasks = await runnerLib.getFailedTasks(req, { runnerId: failRun.runnerId });
  assert.equal(failedTasks.length, 1);
  assert.equal(failedTasks[0].name, 'Step 2 (Flaky)');

  const allTasksBefore = await runnerLib.listTasks(req, { runnerId: failRun.runnerId });
  const step1Before = allTasksBefore.find((t) => t.name === 'Step 1 (Succeeds)');
  assert.equal(step1Before.status, runnerLib.TASK_STATUS.DONE);
  const step1FinishedAt = step1Before.finishedAt;

  // Fix flaky Step 2 command in DB and call replayBatch with { fromFailed: true }
  await db.collections.task.updateOne(
    { _id: failedTasks[0]._id },
    { $set: { cmd: 'echo "step 2 fixed"', args: ['-c', 'echo "step 2 fixed"'] } }
  );

  const replayedBatch = await runnerLib.replayBatch(req, failedBatches[0]._id, { fromFailed: true });
  assert.equal(replayedBatch.status, runnerLib.BATCH_STATUS.BATCH_DONE);

  // Step 1 should NOT have been re-executed (its finishedAt timestamp is untouched)
  const step1After = await runnerLib.getTask(req, step1Before._id);
  assert.equal(step1After.status, runnerLib.TASK_STATUS.DONE);
  assert.equal(step1After.finishedAt, step1FinishedAt);

  // Parent runner should automatically sync to COMPLETED because all batches are now BATCH_DONE
  const syncedRunner = await db.collections.runner.findOne({ _id: failRun.runnerId });
  assert.equal(syncedRunner.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // 3. Terminal-state guard on pauseTask / resumeTask prevents corrupting finished tasks
  const pauseOnDone = await runnerLib.pauseTask(req, step1After._id);
  assert.equal(pauseOnDone.status, runnerLib.TASK_STATUS.DONE);
  const resumeOnDone = await runnerLib.resumeTask(req, step1After._id);
  assert.equal(resumeOnDone.status, runnerLib.TASK_STATUS.DONE);
});

// ============================================================================
// 33. Complete APPROVAL_STATUS Enum & All Approval Lifecycle Use Cases
// ============================================================================
test('33. APPROVAL_STATUS enum, schema validation, pre-approval, when-skip, stop->cancelled, timeout->expired, re-approval, bulk approve/reject, and replay', async () => {
  const db = createMockDb();
  const req = createMockReq(db);

  // 1. Verify APPROVAL_STATUS exports and schema validation
  assert.deepEqual(runnerLib.APPROVAL_STATUS, {
    NONE: null,
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SKIPPED: 'skipped',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired'
  });

  for (const validVal of Object.values(runnerLib.APPROVAL_STATUS)) {
    const validBatch = runnerLib.buildBatchDoc(req, {
      runnerId: 'r1',
      mapId: 'm1',
      name: 'Stage 1',
      approvalStatus: validVal
    });
    const check = runnerLib.validateBatchDoc(validBatch);
    assert.equal(check.valid, true, `Should accept approvalStatus=${validVal}`);
  }

  const invalidCheck = runnerLib.validateBatchDoc({
    runnerId: 'r1',
    mapId: 'm1',
    name: 'Stage 1',
    status: 'queued',
    mode: 'parallel',
    order: 0,
    approvalStatus: 'unknown_state'
  });
  assert.equal(invalidCheck.valid, false);
  assert.ok(invalidCheck.errors.some((e) => e.includes('Invalid batch approvalStatus')));

  // 2. Pre-Approval (approveBatch while batch is still 'queued') + Conditional 'when' skip ('skipped')
  const preApproveRun = await runnerLib.triggerRunner(req, {
    mapId: 'pre-approve-map',
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Slow Stage 1',
        tasks: ['node -e "setTimeout(() => console.log(\'stage1 done\'), 120)"']
      },
      {
        name: 'Pre-Approved Stage 2',
        requiresApproval: true,
        tasks: ['echo "stage2 executed without pausing"']
      },
      {
        name: 'Conditional Skipped Gate Stage 3',
        requiresApproval: true,
        when: 'on-failure', // Will be skipped because Stage 1 & 2 succeed
        tasks: ['echo "should not run"']
      }
    ]
  });

  const initialBatches = await runnerLib.listBatches(req, { runnerId: preApproveRun.runnerId });
  assert.equal(initialBatches[0].approvalStatus, runnerLib.APPROVAL_STATUS.NONE);
  assert.equal(initialBatches[1].approvalStatus, runnerLib.APPROVAL_STATUS.PENDING);
  assert.equal(initialBatches[2].approvalStatus, runnerLib.APPROVAL_STATUS.PENDING);

  // Discover pending approval batches (includes queued + awaiting-approval)
  const pendingBefore = await runnerLib.getPendingApprovalBatches(req, { runnerId: preApproveRun.runnerId });
  assert.equal(pendingBefore.length, 2);

  // Pre-approve Stage 2 while Stage 1 is still running (Stage 2 is 'queued')
  const preApproved = await runnerLib.approveBatch(req, initialBatches[1]._id, {
    approvedBy: 'lead@company.com',
    comment: 'Pre-approved before gate reached'
  });
  assert.equal(preApproved.approvalStatus, runnerLib.APPROVAL_STATUS.APPROVED);
  assert.equal(preApproved.approvedBy, 'lead@company.com');
  assert.equal(preApproved.status, runnerLib.BATCH_STATUS.QUEUED);

  const completedPreApproveRun = await preApproveRun.executionPromise;
  assert.equal(completedPreApproveRun.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // Stage 3 was skipped by 'when: on-failure' and its approvalStatus transitioned to 'skipped'
  const stage3After = await runnerLib.getBatch(req, initialBatches[2]._id);
  assert.equal(stage3After.status, runnerLib.BATCH_STATUS.SKIPPED);
  assert.equal(stage3After.approvalStatus, runnerLib.APPROVAL_STATUS.SKIPPED);

  // 3. stopRunner while awaiting-approval transitions approvalStatus -> 'cancelled'
  const cancelGateRun = await runnerLib.triggerRunner(req, {
    mapId: 'cancel-gate-map',
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Gate Awaiting Approval',
        requiresApproval: true,
        tasks: ['echo "gated"']
      },
      {
        name: 'Downstream Queued Gate',
        requiresApproval: true,
        tasks: ['echo "downstream"']
      }
    ]
  });

  await cancelGateRun.executionPromise;
  const awaitingRunners = await runnerLib.getAwaitingApprovalRunners(req, { mapId: 'cancel-gate-map' });
  assert.equal(awaitingRunners.length, 1);
  const awaitingBatches = await runnerLib.getAwaitingApprovalBatches(req, { runnerId: cancelGateRun.runnerId });
  assert.equal(awaitingBatches.length, 1);

  await runnerLib.stopRunner(req, cancelGateRun.runnerId);
  const cancelledBatches = await runnerLib.listBatches(req, { runnerId: cancelGateRun.runnerId });
  assert.equal(cancelledBatches[0].status, runnerLib.BATCH_STATUS.STOPPED);
  assert.equal(cancelledBatches[0].approvalStatus, runnerLib.APPROVAL_STATUS.CANCELLED);
  assert.equal(cancelledBatches[1].status, runnerLib.BATCH_STATUS.STOPPED);
  assert.equal(cancelledBatches[1].approvalStatus, runnerLib.APPROVAL_STATUS.CANCELLED);

  // 4. approvalTimeoutMs auto-expiration transitions approvalStatus -> 'expired', and Re-Approval resumes!
  const timeoutGateRun = await runnerLib.triggerRunner(req, {
    mapId: 'timeout-gate-map',
    pollIntervalMs: 25,
    batches: [
      {
        name: 'SLA Timed Gate',
        requiresApproval: true,
        approvalTimeoutMs: 90,
        tasks: ['echo "recovered after expiration"']
      }
    ]
  });

  await timeoutGateRun.executionPromise;
  // Wait for the 90ms approvalTimeoutMs timer to fire
  await sleep(160);

  const expiredBatches = await runnerLib.listBatches(req, { runnerId: timeoutGateRun.runnerId });
  assert.equal(expiredBatches[0].status, runnerLib.BATCH_STATUS.STOPPED);
  assert.equal(expiredBatches[0].approvalStatus, runnerLib.APPROVAL_STATUS.EXPIRED);

  const expiredRunner = await runnerLib.getRunner(req, timeoutGateRun.runnerId);
  assert.equal(expiredRunner.status, runnerLib.RUNNER_STATUS.STOPPED);

  // Re-approve the expired batch and await completion
  const reApproved = await runnerLib.approveBatch(req, expiredBatches[0]._id, {
    approvedBy: 'vp-eng@company.com',
    comment: 'Override SLA expiration and deploy',
    awaitCompletion: true
  });
  assert.equal(reApproved.approvalStatus, runnerLib.APPROVAL_STATUS.APPROVED);
  assert.equal(reApproved.status, runnerLib.BATCH_STATUS.BATCH_DONE);

  const recoveredRunner = await runnerLib.getRunner(req, timeoutGateRun.runnerId);
  assert.equal(recoveredRunner.status, runnerLib.RUNNER_STATUS.COMPLETED);

  // 5. Bulk approveBatches and rejectBatches + replayRunner resetting approvalStatus
  const bulkRun = await runnerLib.triggerRunner(req, {
    mapId: 'bulk-approval-map',
    pollIntervalMs: 25,
    batches: [
      {
        name: 'Bulk Gate 1',
        requiresApproval: true,
        tasks: ['echo "bulk 1"']
      }
    ]
  });
  await bulkRun.executionPromise;

  const bulkRejectRes = await runnerLib.rejectBatches(req, {
    runnerId: bulkRun.runnerId,
    rejectedBy: 'secops@company.com',
    reason: 'Bulk freeze'
  });
  assert.equal(bulkRejectRes.rejectedCount, 1);

  const rejectedBatchDoc = (await runnerLib.listBatches(req, { runnerId: bulkRun.runnerId }))[0];
  assert.equal(rejectedBatchDoc.approvalStatus, runnerLib.APPROVAL_STATUS.REJECTED);
  assert.equal(rejectedBatchDoc.rejectedBy, 'secops@company.com');

  // Replay runner with autoApprove: true so it resets rejected state to approved and completes
  const replayedBulkRunner = await runnerLib.replayRunner(req, bulkRun.runnerId, {
    fromFailed: true,
    autoApprove: true,
    approvedBy: 'release-bot',
    awaitCompletion: true
  });
  assert.equal(replayedBulkRunner.status, runnerLib.RUNNER_STATUS.COMPLETED);
  const afterReplayBatch = (await runnerLib.listBatches(req, { runnerId: bulkRun.runnerId }))[0];
  assert.equal(afterReplayBatch.approvalStatus, runnerLib.APPROVAL_STATUS.APPROVED);
});









