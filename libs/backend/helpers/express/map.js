
const ui = require('./ui-app');
const api = require('./api-app');
const configRoutes = require('./config-routes');
//const express = require('./express');
//const beAppCreator =  process.aioBeLibs('app-creater');
//const documentation = process.aioBeLibs('documentation');
//const balanceLoad = process.aioBeLibs('server/balancer/balance-load');

module.exports = (app, config) => {
    const helpers = process.helpers();
    const appType = helpers.json.val(config, 'appConfig.applicationType');

    switch(appType) {
        case 'ui':
            app = ui(app, config);
        break;
        case 'api':
        case 'express':
            app = api(app, config);
        break;
        case 'gateway':
            //app.use(`/:balancer?`, balanceLoad.gateway);
        break;
        case 'balancer':
            //app.use(`/:pathBalancer/:balancer/:appname`, balanceLoad.start);
        break;
        default:
          // code block
    }

    app = configRoutes(app, config)

    return app;
}