const template = `
<!doctype html>
<html lang="en">
    <head>
        <title>Welcome ___PAGE__TITLE__</title>
        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____
        _____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____

        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____

        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____
    </head>
    <body>
        <!-- HEADER TEMPLATES STARTS HERE -->
        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____
        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____

        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____

        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____
        <!-- HEADER TEMPLATES ENDS HERE -->


        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____
        _____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____

        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____

        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____


        <!-- FOOTER TEMPLATES STARTS HERE -->
        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____

        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____

        _____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____

        _____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____
        _____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____
        _____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____
        <!-- FOOTER TEMPLATES ENDS HERE -->
    </body>
</html>
`

const compile = async (appConfig, req, res, next) => {
    let htm = template;
    let hooksKeys = req.helpers.json.val(appConfig, 'hooksKeyNames');
    //let hooks = req.helpers.json.val(appConfig, 'hooks.appCreateTimeHooks');
    let elmId = req.helpers.json.val(appConfig, `appConfig.appElementId`);
    let hooks = await req.helpers.express.htmlHooks.get.details(appConfig, 'app', req, res, next);

    if(hooksKeys){
        for(const a in hooksKeys){
            let key = `_____APP__CREATE__TIME__HOOKS${a}`;
            let val = req.helpers.json.val(hooks, key);
                htm = htm.replace(new RegExp(key, "g"), val || '');
        }
    }

    if(elmId){
        htm = htm.replace(new RegExp('____APP__ELMEMENT__ID____', "g"), elmId);
    }
    
    return htm;
}

const write = async (appConfig, req, res, next) => {
    let htm = await compile(appConfig, req, res, next)
    let appDir = req.helpers.json.val(appConfig, 'dirs.app');
    let scrapeDir = req.helpers.json.val(appConfig, 'appConfig.scrapeDir');
        scrapeDir = `${appDir}/${scrapeDir}`;
        await req.helpers.file.writer.async.dir(scrapeDir);
        await req.helpers.file.writer.async.write(`${scrapeDir}/index.html`, htm);
        delete appConfig.hooks.appCreateTimeHooks
    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    return await write(appConfig, req, res, next);
}

exports.create = create;