const { EVENT_TYPES } = require('./constants');
const { attachStream: baseAttachStream } = require('./broadcaster');
const { appendLogsToDb, recordInitialLifecycle } = require('./logger');
const { ensureWatcher: baseEnsureWatcher, stopWatcher } = require('./watcher');
const { runQueue, launchRun, resumeRunningJobsOnBoot } = require('./scheduler');

const ensureWatcher = (req, doc) => baseEnsureWatcher(req, doc, runQueue);

const attachStream = (req, res, runDocs) => baseAttachStream(req, res, runDocs, {
    ensureWatcher,
    recordInitialLifecycle,
    runQueue
});

exports.EVENT_TYPES = EVENT_TYPES;
exports.runQueue = runQueue;
exports.launchRun = launchRun;
exports.stopWatcher = stopWatcher;
exports.attachStream = attachStream;
exports.ensureWatcher = ensureWatcher;
exports.appendLogsToDb = appendLogsToDb;
exports.recordInitialLifecycle = recordInitialLifecycle;
exports.resumeRunningJobsOnBoot = resumeRunningJobsOnBoot;
