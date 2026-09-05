const filePath = async (appConfig, req) => {
    let app = req.helpers.json.val(appConfig, 'dirs.scriptDir');
    return `${app}/server.js`;
}

const server = async (config, req, appType) => {
    const content = `require('module-alias/register');
require('./process');
module.exports = (async () => { 
    let config = require('./appConfig.json');
    let helpers = require('./helpers');
        helpers.express.server(config, helpers);
}
)();`

    await req.helpers.file.writer.async.write(await filePath(config, req), content);

}

const  create = async (config, req, appType) => {
    switch(appType) {
        case 'ui':
            await server(config, req, appType);
        break;
        case 'express':
            await server(config, req, appType);
        break;
        default:
          // code block
    }

    return config;
}

exports.create = create;