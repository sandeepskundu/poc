const content = {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}

const write = async (appConfig, req, res, next) => {
    const url = req.helpers.json.val(appConfig, 'dirs.app');;
    await req.helpers.file.writer.async.write(`${url}/babelrc`, JSON.stringify(content, null, 4))
}

const create = async (appConfig, req, res, next) => {
    await write(appConfig, req, res, next);

    return appConfig;
}

exports.create = create;