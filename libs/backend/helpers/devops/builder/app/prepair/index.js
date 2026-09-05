const controllers = require('./../controllers');

const frontend = async (appConfig, req, res, next) => {
    let config = await controllers.frontend.config.parseAppConfig(appConfig, req, res, next); // STEP-1
        config = await controllers.frontend.packageJson.build(config, req, res, next); // STEP-2
        config = await controllers.frontend.babelrc.create(config, req, res, next); // STEP-3
        config = await controllers.frontend.src.create(config, req, res, next); // STEP-4
        config = await controllers.frontend.statics.create(config, req, res, next); // STEP-5
        config = await controllers.frontend.html.create(config, req, res, next); // STEP-6
        config = await controllers.frontend.scss.create(config, req, res, next); // STEP-7
        config = await controllers.frontend.webpack.create(config, req, res, next); // STEP-8
        config = await controllers.common.scripts.create(config, req, res, next); // STEP-9
        config = await controllers.common.process.create(config, req, res, next); // STEP-10
        config = await controllers.common.helpersJs.create(config, req, 'ui'); // STEP-11
        config = await controllers.common.serverJs.create(config, req, 'ui'); // STEP-12
        config = await controllers.frontend.components.create(config, req, res, next); // STEP-13
        config = await controllers.frontend.fontIcons.create(config, req); // STEP-14
        config = await controllers.frontend.storybook.create(config, req); // STEP-15
        config = await controllers.frontend.storybook.mapall(config, req); // STEP-16

    return config;
}

const backend = async (appConfig, req, res, next) => {
    let config = await controllers.backend.config.parseAppConfig(appConfig, req, res, next); // STEP-1
        config = await controllers.backend.packageJson.build(config, req, res, next); // STEP-2
        config = await controllers.common.scripts.create(config, req, res, next); // STEP-3
        config = await controllers.common.process.create(config, req, res, next); // STEP-4
        config = await controllers.common.helpersJs.create(config, req, 'express'); // STEP-5
        config = await controllers.common.serverJs.create(config, req, 'express'); // STEP-6
        config = await controllers.backend.src.create(config, req, res, next); // STEP-7
        config = await controllers.backend.database.create(config, req, res, next); // STEP-8
        config = await controllers.backend.controllers.create(config, req, res, next); // STEP-9
        config = await controllers.common.config.environmentVariables.create(config, req, res, next); // STEP-10 

    return config;
}

const init = async (req, res, next) => {
    let rval = {};
    let appConfig = await req.helpers.devops.builder.utils.common.app.config.getAppConfigById(req, res, next);
    let category = req.helpers.json.val(appConfig, 'category', '');

    switch(category) {
        case 'frontend':
            rval = await frontend(appConfig, req, res, next);
        break;
        case 'backend':
            rval = await backend(appConfig, req, res, next);
        break;
        default:
            return null
    }

    //req.helpers.express.response.send('json', rval, 200, req, res, next);
}

exports.init = init;