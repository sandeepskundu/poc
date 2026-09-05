const maps = {
    'server':'_____SERVER__SIDE__HOOKS',
    'app':'_____APP__CREATE__TIME__HOOKS',
    'webpack':'_____WEBPACK__COMPILE__TIME__HOOKS',
}

const data = async (appConfig, type, keyPrefix, req, res, next) => {
    return `<div class="${type} hide">${keyPrefix}</div>`
}

const start = async (appConfig, type, key, req, res, next) => {
    const rval = {};
    const keies = req.helpers.json.val(appConfig, 'hooksKeyNames');

    for(const a in keies){
        rval[`${key}${a}`] = await data(appConfig, type, `${key}${a}`, req, res, next)
    }

    return rval;
}

const hardcoded = async (rval, appConfig, type, req, res, next) => {
    const d = {
        '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____':`
        <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/dsystem/base.css"/>
        <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/theme-colors/base.css"/>
        <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/themes/base.css"/>
        <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/icons/g.css" />
        `,
        '_____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____':'<div id="____APP__ELMEMENT__ID____"></div>',
        '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____':`<script type="text/javascript">window._siteProps_ = window._siteProps_ || {};</script>`,
        '_____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____':`<script type="text/javascript">(() => {
            window._siteProps_ = _siteProps_ || {};
            window._siteProps_ = {...window._siteProps_, ...__RUN__TIME__SITEPROPS__};
        })();</script>`
    }

    return {...rval, ...d}
}

const details = async (appConfig, type, req, res, next) => {
    let rval = {};

    if(maps[type]){
        rval = await start(appConfig, type, maps[type], req, res, next)
    }

    return await hardcoded(rval, appConfig, type, req, res, next);
}

exports.details = details;