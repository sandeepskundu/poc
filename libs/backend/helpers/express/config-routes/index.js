const routes = require('./routes');

module.exports = (app, config) => {
    let helpers = process.helpers();
    let pathPrefix = helpers.json.val(config, 'appConfig.pathPrefix');
        app.use(`/:balancer?/${pathPrefix}/configs`, routes(app, config));

    return app;
}