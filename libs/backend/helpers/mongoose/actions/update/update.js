const value = async (rval, data, name, config, model, docConfig, req, res, next) => {
    let c = '__NO_VALUE__';
    let from = req.helpers.json.val(config, 'value.from');
    let to = req.helpers.json.val(config, 'value.to', name);
    let fallback = req.helpers.json.val(config, 'value.fallback', c);

    if(from && to){
        let value = req.helpers.json.val(data, from, c);

        if(value != c){
            req.helpers.json.set(rval, to, value, false, true);
        }else{
            if(fallback != c){
                rval = req.helpers.json.set(rval, to, fallback, false, true) 
            }
        }
    }

    return rval;
}

const assign = async (rval, data, config, model, docConfig, req, res, next) => {
    const nodes = req.helpers.json.val(config, 'nodes', {});

    for(const a in nodes){
        let enable = req.helpers.json.val(nodes[a], 'enable');

        if(enable){
            rval = await value(rval, data, a, nodes[a], model, docConfig, req, res, next);
        }
    }

    return rval;
}

const auth = async (rval, config, model, docConfig, req, res, next) => {
    let ad = req.helpers.session.auth.authDetails(req, res);
    return await assign(rval, (ad || {}), config, model, docConfig, req, res, next)
}

const merchant = async (rval, config, model, docConfig, req, res, next) => {
    let md = await req.helpers.merchant.details(req, res, next);
    return await assign(rval, (md || {}), config, model, docConfig, req, res, next)
}

const runtime = async (rval, data, config,  model, docConfig, req, res, next) => {
    const val = req.helpers.json.val
    const nodes = req.helpers.json.val(config, 'nodes', {});

    for(const a in nodes){
        let enable = req.helpers.json.val(nodes[a], 'enable');

        if(enable){
            switch(a) {
                case 'query':
                    rval = await assign(rval, await val(req, 'query', {}), nodes[a], model, docConfig, req, res, next);
                break;
                case 'body':
                    rval = await assign(rval, await val(req, 'body', {}), nodes[a], model, docConfig, req, res, next);
                break;
                case 'params':
                    rval = await assign(rval, await val(req, 'params', {}), nodes[a], model, docConfig, req, res, next);
                break;
                case 'auth':
                    rval = await auth(rval, nodes[a], model, docConfig, req, res, next)
                break;
                case 'merchant':
                    rval = await merchant(rval, nodes[a], model, docConfig, req, res, next)
                break;
                default :
            }
        }
    };

    return rval;
}

const signature = async (rval, req, res, next) => {
    let sign = await req.helpers.mongoose.docHelpers.signature.decode(rval, req, res, next);

    if(sign){
        let isObj = await req.helpers.data.type.isObject(sign);

        if(isObj){
            let len = await req.helpers.json.length(sign);

            if(len > 0){
                return {...rval, ...sign}
            }
        }
    }

    return rval;
}

const mapHidden = async (rval, data, model, docConfig, req, res, next) => {
    let hops = await req.helpers.json.val(docConfig, 'dbConfig.hiddenmap.options', {});

    for(const a in hops){
        let enable = req.helpers.json.val(hops[a], 'enable');
        if(enable){
            switch(a){
                case 'runtime':
                    rval = await runtime(rval, data, hops[a], model, docConfig, req, res, next);
                break;
                default:
            }
        }
    }

    return await signature(rval, req, res, next);
}

const excludeNonEditble = async (data, model, docConfig, req, res, next) => {
    let item = req.helpers.json.val(data, 'apiData', {});
        item = req.helpers.mongoose.docHelpers.transform.removePrivate(item, req, res, next);

    return await mapHidden(item, data, model, docConfig, req, res, next);
}

const parse = async (data, model, docConfig, messages, isList, req, res, next) => {
    let rval = {
        docs:isList?[]:{},
        data:isList?[]:{},
    };

    let dt = req.helpers.json.val(data, 'data', {});
    let dl = req.helpers.data.type.isArray(dt);

    if(isList && dl){
        for(const a in dt){
            rval.docs.push(dt[a].db)
            rval.data.push(await excludeNonEditble(dt[a], model, docConfig, req, res, next));
        }
    }else{
        rval.docs = dt.db;
        rval.data = await excludeNonEditble(dt, model, docConfig, req, res, next);
    }

    return rval;
}

const objectId = (req, res, next) => {
    let id = new req.mdb.db.Types.ObjectId();
    return id.toString()
}

const updateby = async (rval, req, res, next) => {
    let val = req.helpers.json.val;
    let auth = req.helpers.session.auth.authDetails(req, res);
        rval._updatedBy = await val(auth, 'userId', val(auth, 'anonId'));

    return rval;
}

const merge = async (rval, doc, req, res, next) => {
    let rv = {};

    for(const a in doc){
        if(a.indexOf('_') != 0){
            rv[a] = doc[a];
        }
    }

    rval = await updateby(({...rv, ...rval}), req, res, next);

    delete rval._updated;

    return rval;
}

const docs = async (ndoc, olddoc, model, req, res, next) => {
    let item = req.helpers.json.copy(ndoc);
    let prev = req.helpers.json.val(olddoc, 'db._doc');
    let old = req.helpers.json.copy(prev);
    let ver = req.helpers.json.val(old, '_version', 0);
        item = await merge(item, old, req, res, next); 
        item = {...old, ...item};
    
        old._deleted = 1;
        old._prevId = old._id;
        old._updated = new Date();
        old._id = objectId(req, res, next);
        item._version = (ver+1);

    return {
        old:await model.validate(old),
        new:{
            doc:await model.validate(item),
            signature:req.helpers.json.val(item, 'signature')
        }
    }
}

const versioning = async (list, data, model, docConfig, messages, isList, req, res, next) => {
    let dl = req.helpers.json.val(data, 'data', isList?[]:{});
    let rval = {
        old:isList?[]:{},
        new:isList?[]:{}
    };

    if(isList){
        for(const a in list){
            let ds = await docs(list[a], dl[a], model, req, res, next);
                rval.old.push(ds.old);
                rval.new.push(ds.new);
        }
    }else{
        let ds = await docs(list, dl, model, req, res, next);
            rval.old = ds.old;
            rval.new = ds.new;
    }

    return rval;
}

const updateDoc = async (rval, isList, arg, doc, model, docConfig, req, res, next) => {
    let ddoc = {};
    let dddump = {}
    let item = await req.helpers.json.val(arg, 'doc', {});
        doc = await req.helpers.mongoose.docHelpers.addRuntime(doc, docConfig, model, req, res, next);

        if(doc){
            try{
                ddoc = JSON.parse(JSON.stringify(doc));
                dddump = JSON.parse(JSON.stringify(doc));
            }catch (err){
                ddoc = doc;
                dddump = doc;
            }            
        }

        for(const a in item){
            const isObj = req.helpers.data.type.is(item[a], 'object');
            const isList = req.helpers.data.type.is(item[a], 'array');

            if(isObj && !isList){
                //ddoc[a] = req.helpers.json.merge(ddoc[a], item[a]); // Don't uncomment else removed nodes will not be deleted from db.
                ddoc[a] = item[a];
            }else{
                if(item[a] != ddoc[a]){
                    ddoc[a] = item[a];
                }else{
                    delete ddoc[a];
                }
            }
        };

        const rdoc = req.helpers.json.merge(dddump, ddoc);

        try{
            await model.updateOne({_id:doc._id}, ddoc, {runValidators:true});
            rval = await req.helpers.mongoose.docHelpers.error.set(rval, false, rdoc, docConfig, model, isList, req, res, next);
        }catch (err){
            rval = await req.helpers.mongoose.docHelpers.error.set(rval, err, rdoc, docConfig, model, isList, req, res, next);
        }

    return rval;
}

const start = async (data, model, docConfig, messages, isList, req, res, next) => {
    let dt = {};
    let rval = isList?[]:{};
    let d = await parse(data, model, docConfig, messages, isList, req, res, next);
    let rd = await req.helpers.express.response.getRespByCode(200, req, res, next);
    let versions = await req.helpers.json.val(docConfig, 'dbConfig.versioning.enable');

    if(versions){
        dt = await versioning(d.data, data, model, docConfig, messages, isList, req, res, next);
    }else{
        dt.old = isList?[]:{};
        dt.new = isList?[]:{};
        if(isList){
            for(const a in d.data){
                dt.new.push(d.data[a]);
            }
        }else{
            dt.new = d.data;
        }
    }

    let docs = req.helpers.json.val(dt, 'new', rval);

    if(versions){
        if(isList){
            await model.create(dt.old);

            for(const a in docs){
                rd = await updateDoc(rd, isList, docs[a], d.docs[a], model, docConfig, req, res, next);
            }
        }else{
            await model.create(dt.old);
            rd = await updateDoc(rd, isList, docs, d.docs, model, docConfig, req, res, next);
        }
    }else{
        if(isList){
            for(const a in docs){
                rd = await updateDoc(rd, isList, {doc:docs[a]}, d.docs[a], model, docConfig, req, res, next)
            }
        }else{
            rd = await updateDoc(rd, isList, {doc:docs}, d.docs, model, docConfig, req, res, next);
        }
    }

    return rd;
}

exports.start = start;