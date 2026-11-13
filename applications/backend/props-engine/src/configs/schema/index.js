const db = require('./db');
const devOpsScriptRun = require('./devops-script-run');
const devOpsScriptRunBucket = require('./devops-script-run-bucket');

exports.compiler = async (private, appConfig, req, res, next) => {
    return [
        ...await db.get(private, appConfig, req, res),
        await devOpsScriptRun.get(private, appConfig, req),
        await devOpsScriptRunBucket.get(private, appConfig, req),
        await private.builder.start('auth', 'emps', req, {schema:{}}),
        await private.builder.start('omni-tree', 'kundu', req, {schema:{}}),
        await private.builder.start('omni-tree-audit', 'kunduAudit', req, {schema:{
            "nodeId":{
                "configs":{
                    "mongodb":{
                        "ref":`'kundu'`
                    }
                }
            }
        }}),
    ]
}
