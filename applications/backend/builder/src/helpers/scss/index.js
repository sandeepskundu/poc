exports.list = require('./list');
exports.convert = require('./convert');
exports.import = require('./import');

exports.rootFile = async (req, url, content) => {
    await req.helpers.file.writer.async.write(`${url}/_index.scss`, content);

    return true;
}