const dmodel = {
    valuemap:{
        _merchantId:{
            valuemap:{
                map:"id",
                from:"merchant"
            }
        }
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        },
        hidden:{
            enable:true,
            configs:{
                columns:{
                    merchantId:{
                        enable:true
                    }
                }
            }
        }
    }
};

const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const query = async (doc, raw, config, model, item, req, res, next) => {
    let ud = req.helpers.session.auth.authDetails(req, res);
    let pconf = req.helpers.json.merge(dmodel, req.helpers.json.val(config, 'permissions.configs.permissions.model', {}));
    let qpObj = await req.helpers.mongoose.query.build(pconf, model, doc, item, req, res, next);
    let relation = model?.modelName || req.helpers.random.id();

    if(qpObj.valid){
        let qps = {
            relation:relation.toUpperCase(),
            itemId:req.helpers.json.val(doc, '_id', ''),
            userId:req.helpers.json.val(ud, 'userId', '')
        }

        return {
            valid:true,
            configs:pconf,
            query:req.helpers.json.merge(qps, qpObj.data || {})
        }
    }else{
        return {
            valid:false
        }
    }
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

    return rval;
} 

const permission = async (doc, raw, config, model, item, req, res, next) => {
    let que = await query(doc, raw, config, model, item, req, res, next);

    if(que.valid){
        let method = req.helpers.json.val(req, 'params.jobMethod', '')
        let perms = await mongodb.query.find.byQuery('permission', que.query, (que.configs || {}), req, res, next, true);

        if(perms.type && method){
                perms = await parse(perms, req);
            let access = req.helpers.json.val(perms, 'access', {});
            let alen = req.helpers.json.length(access);
            

            if(alen > 0){
                let mmap = req.helpers.json.val({
                    'fetch':'read',
                    'create':'write',
                    'remove':'delete',
                    'update':'update'
                }, method.toLowerCase());
                let has = req.helpers.json.val(access, mmap);

                if(has){
                    doc.access = access;

                    return {
                        doc:doc,
                        code:'valid'
                    }
                }else{
                    return {
                        doc:doc,
                        code:'invalid'
                    }   
                }
            }
        }
    }

    /*-- If query is not valid then return this as check-access for further access check process --*/
    return {
        doc:doc,
        code:'check-access'
    }
}

const validate = async (doc, raw, config, model, item, req, res, next) => {
    return await permission(doc, raw, config, model, item, req, res, next);
}

const init = async (doc, raw, config, model, item, req, res, next) => {
    let enable = req.helpers.json.val(config, 'permissions.configs.permissions.enable');
    
    if(enable && doc.isac){
        return await validate(doc, raw, config, model, item, req, res, next);
    }else{

        if(doc.isac){
            /*-- If permission check is not enabled and isac is true then return this as check-access for further access check process --*/
            return {
                doc:doc,
                code:'check-access'
            }
        }else{
            /*-- If permission check is not enabled and isac is not true then return this as valid for further process --*/
            return {
                doc:doc,
                code:'valid',
            }
        }
    }
}

exports.init = init;