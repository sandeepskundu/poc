const utils = require('./utils');
const routes = require('./routes');
const utilsApi = require('./../global-utils');

const virtual = async (req, res, next) => {
    req.params = req.params || {};
    req.params.vvalidation = true;
    next();
}

module.exports = (app, config) => {
    let helpers = process.helpers();
    let pathPrefix = helpers.json.val(config, 'appConfig.pathPrefix');
        app.use(`/:balancer?/${pathPrefix}/utils`, utils);
        app.use(`/:balancer?/${pathPrefix}/gUtilsApi`, utilsApi);
        app.use(`/:balancer?/${pathPrefix}/documentation`, helpers.documentation);
        app.use(`/:balancer?/${pathPrefix}/:appController/:controllerAction/:actionVersion/:versionJob/:jobMethod/vv/:id?/:subId?`, virtual, routes.loadValidations, routes.multer, routes.validation, routes.controller); // virtual-validation
        app.use(`/:balancer?/${pathPrefix}/:appController/:controllerAction/:actionVersion/:versionJob/:jobMethod/:id?/:subId?`, routes.loadValidations, routes.multer, routes.validation, routes.controller); // 
        app.use(`/:balancer?`, helpers.express.response.r404);

    return app;
}