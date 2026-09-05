const uiRoutes = require('./routes/ui');
const utilsApi = require('./../global-utils');
const storybook = require('./routes/storybook');
//const documentation = process.aioBeLibs('documentation');


module.exports = (app, config) => {
    let helpers = process.helpers();
    let pathPrefix = helpers.json.val(config, 'appConfig.pathPrefix');
        app.use(`/:balancer?/${pathPrefix}/gUtilsApi`, utilsApi);
        app.use(`/:balancer?/${pathPrefix}/storybook`, storybook);
        //app.use(`/:balancer?/${config.pathPrefix}/documentation`, documentation);
        //app.use(`/:balancer?/${config.pathPrefix}/controller`, helpers.middleware.routes);
        app.use(`/:balancer?/${pathPrefix}`, uiRoutes(config));
        app.use(`/:balancer?`, uiRoutes(config));

    return app;
}