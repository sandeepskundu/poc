const routeAction = async (req, res, next) => {
    let appConfig = await req.utils.frontend.app.getAppConfigs(req, res, next); // STEP-1
    let config = await req.controllers.frontend.config.parseAppConfig(appConfig, req, res, next); // STEP-2
        config = await req.controllers.frontend.packageJson.build(config, req, res, next); // STEP-3
        config = await req.controllers.frontend.babelrc.create(config, req, res, next); // STEP-4
        config = await req.controllers.frontend.src.create(config, req, res, next); // STEP-5
        config = await req.controllers.frontend.statics.create(config, req, res, next); // STEP-6
        config = await req.controllers.frontend.html.create(config, req, res, next); // STEP-7
        config = await req.controllers.frontend.scss.create(config, req, res, next); // STEP-8
        config = await req.controllers.frontend.webpack.create(config, req, res, next); // STEP-9
        config = await req.controllers.common.scripts.create(config, req, res, next); // STEP-10
        config = await req.controllers.common.scripts.create(config, req, res, next); // STEP-11
        config = await req.controllers.common.process.create(config, req, res, next); // STEP-12
        config = await req.controllers.common.helpersJs.create(config, req, 'ui'); // STEP-13
        config = await req.controllers.common.serverJs.create(config, req, 'ui'); // STEP-14
        config = await req.controllers.frontend.components.create(config, req); // STEP-14
        config = await req.controllers.frontend.fontIcons.create(config, req); // STEP-15
        //config = await req.controllers.frontend.storybook.create(config, req);
        req.helpers.express.response.send('json', config, 200, req, res, next);
}

exports.routeAction = routeAction;