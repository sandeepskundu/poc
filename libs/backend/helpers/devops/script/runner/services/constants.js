const fs = require('fs');
const os = require('os');
const path = require('path');

const BUCKET_SIZE = 500;
const HEARTBEAT_MS = 15000;
const MAX_CHUNK_BYTES = 64 * 1024;
const DEFAULT_TIMEOUT_MS = Number(process.env.SCRIPT_TIMEOUT_MS) || 3600000;
const MAX_QUEUE_CONCURRENCY = Number(process.env.SCRIPT_QUEUE_CONCURRENCY) || 1;

const EVENT_TYPES = {
    TRIGGERED: 'triggered',
    QUEUED: 'queued',
    STARTED: 'started',
    STEP_START: 'step-start',
    LOG: 'log',
    STDERR: 'stderr',
    PROGRESS: 'progress',
    ERROR: 'error',
    RETRYING: 'retrying',
    STEP_DONE: 'step-done',
    DONE: 'done',
    BATCH_DONE: 'batch-done',
    ARTIFACT: 'artifact',
    HEARTBEAT: 'heartbeat',
    COMPLETED: 'completed',
    FAILED: 'failed',
    STOPPED: 'stopped',
    TIMEOUT: 'timeout',
    SKIPPED: 'skipped'
};

// Uses OS temp folder (/tmp) so project file watchers (nodemon/webpack) are never triggered
const LOG_DIR = path.join(os.tmpdir(), 'express-script-logs');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getLogFilePath = (runId) => {
    return path.join(LOG_DIR, `${runId}.log`);
};

exports.LOG_DIR = LOG_DIR;
exports.BUCKET_SIZE = BUCKET_SIZE;
exports.EVENT_TYPES = EVENT_TYPES;
exports.HEARTBEAT_MS = HEARTBEAT_MS;
exports.getLogFilePath = getLogFilePath;
exports.MAX_CHUNK_BYTES = MAX_CHUNK_BYTES;
exports.DEFAULT_TIMEOUT_MS = DEFAULT_TIMEOUT_MS;
exports.MAX_QUEUE_CONCURRENCY = MAX_QUEUE_CONCURRENCY;
