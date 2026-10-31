const helpers = require('./utils/helpers');

const write = async (req, res, next) => {
    let propsPath = await helpers.compPath(req, res, next);
    let props = req.helpers.json.get(req, 'body.data.storybook.props', {});
        propsPath = `${propsPath}/props.js`;

    if(!req.helpers.data.type.is(props, 'object')){
        props = {};
    }

    await req.helpers.file.writer.async.write(propsPath, `module.exports = ${JSON.stringify(props, null, 4)}`);
}

exports.write = write;