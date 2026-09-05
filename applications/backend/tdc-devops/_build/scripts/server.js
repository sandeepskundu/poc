require('module-alias/register');
require('./process');
module.exports = (async () => { 
    let config = require('./appConfig.json');
    let helpers = require('./helpers');
        helpers.express.server(config, helpers);
}
)();