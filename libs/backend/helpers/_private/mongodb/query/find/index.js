const dconfig = {
    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        }
    }
}

const getModel = async (req, collname) => {
    return req.helpers.json.val(req, `mdb.models.${collname.toLowerCase()}`);
}

const addRuntime = async (docs, config, model, req, res, next) => {
    let rval = [];
    for(const a in docs){
        let item = await req.helpers.mongoose.docHelpers.addRuntime(docs[a], config, model, req, res, next);
            rval.push(item);
    }
    
    return rval;
}

const notFound = async (req, res, next) => {
    return await req.helpers.express.response.getRespByCode(404, req, res, next, {
        error:{
            code:'RESULT_NOT_FOUND',
            description:'Results not found'
        } 
    });
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

const getDocByQuery = async (query, config, model, req, res, next) => {
    let data = null;

    try {
            query = lean(req, query);
        let docs = await model.find(query);

        if(docs && docs.length > 0){
            data = {
                valid:true,
                data:{
                    result:await addRuntime(docs, config, model, req, res, next)
                }
            };
        }else{
            data = await notFound(req, res, next);
        }
    }catch(err) {
        console.log(err);
    }

    return data;
}

const init = async (collname, query, conf, req, res, next) => {
    let data = null;
    let model = await getModel(req, collname);
    let config = req.helpers.json.merge(dconfig, conf || {});

    if(model){
        let qpObj = await req.helpers.mongoose.query.build(config, model, {}, {}, req, res, next);

        if(qpObj.valid){
            data = await getDocByQuery(req.helpers.json.merge((qpObj.data || {}), (query || {})), config, model, req, res, next);
        }else{
            data = await notFound(req, res, next);
        }
    }

    if(data && data.valid){
        let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
            rval.data = data.data;
        return rval;
    }else{
        return data;
    }
}

const refined = async (collname, query, conf, req, res, next, single) => {
    let rval = {};
    let resp = await init(collname, query, conf, req, res, next);

    if(single){
        let result = req.helpers.json.val(resp, 'data.result.0', {});

        if(result && result.toJSON){
            return lean(req, result.toJSON());
        }else{
            return lean(req, result);
        }
    }else{
        let results = req.helpers.json.val(resp, 'data.result', []);

        if(results && results.length > 0){
            for(const a in results){
                if(results[a].toJSON){
                    rval[a] = lean(req, results[a].toJSON());
                }else{
                    rval[a] = lean(req, results[a]);
                }
            }
        }
    }

    return rval;
}

const getByMap = async (collname, map, mapColl, query, conf, req, res, next, single) => {
    let rval = {};

    if(map && mapColl){
        let ml = map.split('.');

        if(ml && ml.length > 0){
            for(let a in ml){
                let qp = {};
                    qp[mapColl] = ml[a];
                    rval[a] = await refined(collname, req.helpers.json.merge(qp, query || {}), conf, req, res, next, single)
            }
        }
    };
    
    return rval;
}

const byQuery = async (collname, query, config, req, res, next, single) => {
    let rval = {};
    let model = await getModel(req, collname);
    let resp = await getDocByQuery(query, config, await model, req, res, next);

    if(single){
        let result = req.helpers.json.val(resp, 'data.result.0', {});

        if(result && result.toJSON){
            result = await req.helpers.mongoose.docHelpers.addRuntime(result, config, model, req, res, next);
            return lean(req, result.toJSON());
        }else{
            return lean(req, result);
        }
    }else{
        let results = req.helpers.json.val(resp, 'data.result', []);

        if(results && results.length > 0){
            for(const a in results){
                let item = results[a];

                if(item.toJSON){
                    item = await req.helpers.mongoose.docHelpers.addRuntime(item, config, model, req, res, next);
                    rval[a] = lean(req, item.toJSON());
                }else{
                    rval[a] = lean(req, item);
                }
            }
        }
    }

    return rval;
}

exports.init = init;
exports.byQuery = byQuery;
exports.refined = refined;
exports.getByMap = getByMap;