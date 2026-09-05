const appJs = require('./appJs.js');
const indexJs = require('./indexJs.js');
const components = require('./components.js');

const create = async (appConfig, req, res, next) => {
    appConfig = await appJs.create(appConfig, req, res, next); //STEP - 1
    appConfig = await indexJs.create(appConfig, req, res, next); // STEP - 2
    appConfig = await components.create(appConfig, req, res, next); // STEP - 3

    return appConfig;
}

exports.create = create;