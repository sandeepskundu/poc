const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const lean = (req, obj) => {
    if(obj && obj.buffer && typeof obj.buffer === 'object' && Object.keys(obj.buffer).every(k => !isNaN(k))) {
        return Buffer.from(Object.values(obj.buffer)).toString('hex');
    }

    if(obj){
        let isList = req.helpers.data.type.is(obj, 'list');
        let isObj = req.helpers.data.type.is(obj, 'object');

        if(isList){
            return obj.map(item => lean(req, item));
        }else{
            if(isObj){
                let rv = {};
                for(const a in obj){
                    rv[a] = lean(req, obj[a]);
                }

                return rv;
            }
        }
    }

    return obj;
}

const parse = async (arg, req) => {
    let rval = req.helpers.json.copy(arg);
    let type = req.helpers.json.val(rval, 'type', '');

    switch(type) {
        case 'super':
            rval.access = {
                read:true,
                write:true,
                update:true,
                delete:true,
            }
        break;
        case 'writer':
            rval.access = {
                read:true,
                write:true,
                update:true
            }
        break;
        case 'updater':
            rval.access = {
                read:true,
                update:true
            }
        break;
        case 'reader':
            rval.access = {
                read:true,
                update:true
            }
        break;
        default:
            // code block
    }

    return false;
}

const transform = async (rval, req, results) => {
    for(let a in results){
        let item = lean(req, results[a]);
        let i = await parse(item, req);

        if(i){
            rval.push(i)
        }
    }
   
    return rval;
}

const getPermission = async (code, req, res, next) => {
    let rval = [];
    let ud = req.helpers.session.auth.authDetails(req);
    let results = await mongodb.query.find.refined('permission', {userId:ud.userId, code:(code?code.toUpperCase():'')}, qp, req, res, next);
    let rl = req.helpers.json.length(results);

    if(rl > 0){
        rval = await transform(rval, req, results);
    }

    return rval;
};


const permissionItems = async (perms, config, model, item, req, res, next) => {
    let name = req.helpers.json.val(model, 'modelName', '');

    if(perms && perms.length > 0){
        for(let a in perms){
            let perms = perms[a];
            let appId = req.helpers.json.val(perms, 'itemId', '');
            let apps = await mongodb.query.find.init(name, {
                _id:appId, category:cate
            }, qp, req, res, next);
            let app = req.helpers.json.val(apps, 'data.result.0', {})
            let alen = req.helpers.json.length(app);

            if(alen > 0){
                app = await req.helpers.mongoose.docHelpers.addRuntime(app, config, model, req, res, next);
                app.permissions = req.helpers.json.val(perms, 'access', {});
                results.push(app);
            }
        }
    }

}


const init = async (config, model, item, req, res, next) => {
    let code = req.helpers.json.val(config, 'query.permission.configs.permission.code');
    let items = await getPermission(code, req, res, next);
    let name = req.helpers.json.val(model, 'modelName', '');



    if(permissions && permissions.length > 0){
        for(let a in permissions){
            let perms = permissions[a];
            let appId = req.helpers.json.val(perms, 'itemId', '');
            let apps = await mongodb.query.find.init('app', {_id:appId, category:cate}, qp, req, res, next);
            let app = req.helpers.json.val(apps, 'data.result.0', {})
            let alen = req.helpers.json.length(app);

            if(alen > 0){
                app = app.toJSON();
                app.permissions = {
                    perms:req.helpers.json.val(perms, 'perms', {}),
                    access:req.helpers.json.val(perms, 'access', {})
                }
                results.push(app);
            }
        }
    }
    debugger;
}

exports.init = init;