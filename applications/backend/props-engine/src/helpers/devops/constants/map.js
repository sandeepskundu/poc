const os = require('node:os');

exports.LOG_DIR = '/tmp/express-script-logs';

exports.DEFAULT_HOST_ID = `${os.hostname()}:${process.pid}`;


exports.CLUSTER_MODES = {
  MONGO: 'mongo',
  REDIS: 'redis',
  LOCAL: 'local'
};

exports.DEFAULT_REDIS_ENABLED = false;

exports.DEFAULT_REDIS_CHANNEL = 'express-script-runner:events';

exports.DEFAULT_CLUSTER_POLL_MS = 150;

exports.BUCKET_SIZE = 500;

exports.HEARTBEAT_MS = 15000;

exports.FLUSH_INTERVAL_MS = 150;

exports.KILL_GRACE_MS = 2000;

exports.DEFAULT_CONCURRENCY = 1;

exports.DEFAULT_RETRY_DELAY_MS = 500;

exports.DEFAULT_RETRY_BACKOFF_FACTOR = 2;

exports.DEFAULT_TEMP_RETENTION_MS = 24 * 60 * 60 * 1000;

exports.REDACTION_MASK = '***REDACTED***';

exports.DEFAULT_SECRET_KEY_PATTERN = /(secret|password|passwd|token|api[_-]?key|private[_-]?key|auth|credential)/i;

exports.CONCURRENCY_POLICIES = {
  ALLOW: 'allow',
  REJECT: 'reject',
  QUEUE: 'queue',
  CANCEL_PREVIOUS: 'cancel-previous'
};

exports.WHEN_CONDITIONS = {
  ON_SUCCESS: 'on-success',
  ON_FAILURE: 'on-failure',
  ALWAYS: 'always'
};

exports.COLLECTIONS = {
    RUNNER: 'devOpsRunners',
    BATCH: 'devOpsBatch',
    TASK: 'devOpsTask',
    LOG: 'devOpsLog'
};

exports.EVENT_TYPES = {
  STDOUT: 'stdout',
  STDERR: 'stderr',
  SYSTEM: 'system',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  DEBUG: 'debug',
  COMMAND: 'command',
  STEP_START: 'step-start',
  STEP_END: 'step-end',
  STEP_OK: 'step-ok',
  STEP_FAIL: 'step-fail',
  SECTION_START: 'section-start',
  SECTION_END: 'section-end',
  PROGRESS: 'progress',
  METRIC: 'metric',
  OUTPUT: 'output',
  LIFECYCLE: 'lifecycle',
  STATUS: 'status',
  DONE: 'done',
  TIMEOUT: 'timeout'
};

exports.RUNNER_STATUS = {
  TRIGGERED: 'triggered',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
  PAUSED: 'paused',
  AWAITING_APPROVAL: 'awaiting-approval',
  COMPLETED: 'completed',
  FAILED: 'failed',
  STOPPED: 'stopped',
  TIMEOUT: 'timeout'
};

exports.CONTROL_STATES = {
  NORMAL: 'normal',
  PAUSE_REQUESTED: 'pause-requested',
  RESUME_REQUESTED: 'resume-requested',
  STOP_REQUESTED: 'stop-requested'
};

exports.BATCH_STATUS = {
  QUEUED: 'queued',
  RUNNING: 'running',
  PAUSED: 'paused',
  AWAITING_APPROVAL: 'awaiting-approval',
  SKIPPED: 'skipped',
  BATCH_DONE: 'batch-done',
  FAILED: 'failed',
  STOPPED: 'stopped'
};

exports.BATCH_MODES = {
  QUEUE: 'queue',
  PARALLEL: 'parallel'
};

exports.APPROVAL_STATUS = {
  NONE: null,
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SKIPPED: 'skipped',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
};

exports.TASK_STATUS = {
  QUEUED: 'queued',
  STARTED: 'started',
  RUNNING: 'running',
  PAUSED: 'paused',
  SKIPPED: 'skipped',
  DONE: 'done',
  FAILED: 'failed',
  STOPPED: 'stopped',
  TIMEOUT: 'timeout'
};