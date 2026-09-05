const ptoken = require('./token');
const defaults = {
    sort:{
        updated:'asc'
    },
    page:1,
    limit:{ 
        "min":1,
        "max":50,
        "default":15
    },
}

const limit = async (token, config, model, req, res) => {
    let lconf = req.helpers.json.val(config, 'pagination.limit', defaults.limit)
        lconf = req.helpers.json.merge(defaults.limit, lconf);

    let rv = req.helpers.json.val(req, 'body.pagination.has.limit', lconf.default);
    
        if(token){
            rv = req.helpers.json.val(token, 'has.limit', defaults.limit);
        }

        if(rv < lconf.min){
            rv = lconf.min;
        }

        if(rv > lconf.max){
            rv = lconf.max;
        }

    return rv;
}

const page = async (token, config, model, req, res) => {
    let rval = 1;
    let action = req.helpers.json.val(req, 'body.pagination.action');

    if(token){
        rval = req.helpers.json.val(token, `state.${action}`, 1);
    }

    return rval;
}

const parse = async (config, model, req, res, next) => {
    let pagi = await req.helpers.json.val(config, 'pagination');
    let token = req.helpers.json.val(req, 'body.pagination.token');

    if(token){
        token = await ptoken.de(token, req, res, next);
    }
    
    return {
        lean:false,
        page:await page(token, config, model, req, res),
        limit:await limit(token, config, model, req, res)
    }
}

const get = async (config, model, req, res, next) => {
    return await parse(config, model, req, res, next);
}

exports.get = get;