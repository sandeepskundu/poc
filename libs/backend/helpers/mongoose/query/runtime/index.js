const query = require('./query');

const lmap = {
    "or":"$or",
    "and":"$and"
}

const parse = async (qConfig, config, model, doc, item, req, res, next) => {
    let logical = await req.helpers.json.val(qConfig, 'logical', {});
    let isObj = await req.helpers.data.type.isObject(logical);

    if(isObj){
        let llen = await req.helpers.json.length(logical);

        if(llen && llen > 0){
            let rval = {};

            for(const a in logical){
                if(lmap[a]){
                    rval[lmap[a]] = await parse(logical[a], config, model, doc, item, req, res, next)
                }
            }

            return rval;
        }
    }

    return await query.start(await req.helpers.json.val(qConfig, 'query', {}), config, model, doc, item, req, res, next);
}

const start = async (rval, config, model, doc, item, req, res, next) => {
    let rvalLen = await req.helpers.json.length(rval || {});
    let rumtime = req.helpers.json.val(config, 'query.runtime.configs', {});
    let quer = await parse(rumtime, config, model, doc, item, req, res, next);
    let isList = await req.helpers.data.type.isArray(quer || {});

    if(!isList){
        let querLen = await req.helpers.json.length(quer || {});

        if(querLen && querLen > 0){
            if(rvalLen && rvalLen > 0){
                return {
                    "$and":[rval, quer]
                }
            }else{
                return quer;
            }
        }else{
            return rval;
        }
    }else{
        if(quer && quer.length > 0){
            if(quer.length === 1){
                if(rvalLen && rvalLen > 0){
                    return {...(quer[0] || {}), ...rval};
                }else{
                    return (quer[0] || {});
                }
            }else{
                if(rvalLen && rvalLen > 0){
                    return {
                        "$and":[rval, {
                            "$and":quer
                        }]
                    }
                }else{
                    return {
                        "$and":quer
                    };
                }
            }
        }
    };

    return rval;
}

exports.start = start;