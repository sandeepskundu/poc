const privateControllers = process.aioBeLibs('helpers/_private/controllers');

console.log(privateControllers);

exports.ds = require('./ds');
exports.props = require('./props');
exports.devOps = require('./devOps');
exports.component = require('./component');
exports.kundu = privateControllers.omniTree;