

const map = require('./map'); 
const enums = require('./enums');

exports.MAP = map;
exports.ENUMS = enums.get(map, [
    'BATCH_MODES',
    'TASK_STATUS',
    'COLLECTIONS',
    'EVENT_TYPES',
    'BATCH_STATUS',
    'RUNNER_STATUS',
    'CLUSTER_MODES',
    'CONTROL_STATES',
    'WHEN_CONDITIONS',
    'APPROVAL_STATUS',
    'CONCURRENCY_POLICIES'
]);