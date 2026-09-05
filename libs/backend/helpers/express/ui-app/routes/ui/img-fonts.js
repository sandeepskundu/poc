//const path = process.nodeModules('path');
const path = require('path');
const uH = require('./helpers');

module.exports = async (req, res, next) => {
    let bdir = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
    await uH.sendFile(path.resolve(`./${bdir}/${req.path}`), req, res);
}