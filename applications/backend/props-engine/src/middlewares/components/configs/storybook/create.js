const props = require('./props');
const details = require('./details');
const helpers = require('./utils/helpers');
const ing = require('./../storybook/utils/index-generator');

const init = async (req, res, next) => {
    let compPath = await helpers.compPath(req, res, next);

    if(!req.helpers.file.reader.async.read(compPath)){
        await ing.init(req, res, next);
        await req.helpers.file.writer.async.write(`${compPath}/index.js`, `exports.props = require('./props');\nexports.storybook = require('./storybook');`);
        await props.write(req, res, next);
        await details.write(req, res, next);
    }
}

exports.init = init;