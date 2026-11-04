const devops = require('./devops');

const devOpsScriptRun = require('./devops-script-run');
const devOpsScriptRunBucket = require('./devops-script-run-bucket');

exports.compiler = async (private, appConfig, req, res, next) => {
    return [
        ...await devops.compiler(private, appConfig, req, res, next),
        await devOpsScriptRun.get(private, appConfig, req),
        await devOpsScriptRunBucket.get(private, appConfig, req)
    ]
}
