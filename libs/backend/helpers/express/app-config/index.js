const parse = (app, conf) => {
    let helpers = process.helpers();
    let atype = helpers.json.get(conf, 'appConfig.applicationType', '')
    let rval = {};
    let map = {
        'hooks':true,
        'appConfig':true,
        'hooksKeyNames':true,
        'htmlPlaceholders':true,
        'exposedSiteProps':true,
    }

    for(const a in map){
        if(map[a]){
            let val = helpers.json.val(conf, a);
            if(val != null){
                rval[a] = val;
            }
        }
    }

    rval.appInfo = {
        "appId": helpers.json.val(conf, 'appInfo.appId')
    }

    if(atype === 'ui'){
        rval = helpers.json.set(rval, 'dirs.storybook', helpers.json.get(conf, 'dirs.storybook', {}));
    }

    app.appConfig = helpers.json.merge(app.appConfig || {}, rval);

    return app;
}

exports.parse = parse;