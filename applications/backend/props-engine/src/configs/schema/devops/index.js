const logs = require('./logs');
const task = require('./task');
const batch = require('./batch');
const runner = require('./runner');
const dHelpers = require('./../../../helpers');

exports.compiler = async (private, appConfig, req, res, next) => {
    return [
        await logs.get(private, appConfig, req, dHelpers),
        await task.get(private, appConfig, req, dHelpers),
        await batch.get(private, appConfig, req, dHelpers),
        await runner.get(private, appConfig, req, dHelpers)
    ]
}