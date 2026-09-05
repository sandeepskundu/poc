const utils = require('./utils');
const configs = process.aioAppConfigs('storybook');

const getvalue = (arg, req, res, dval, fbval) => {
    let val = req.helpers.json.get(arg, 'dvalue', dval);

    if(val != dval){
        return val
    }else{
        return fbval
    }
}

const compProps = async (conf, type, config, req, res, next, fbval) => {
    let from = req.helpers.json.get(conf, '___.compProps.from', '');
    let map = req.helpers.json.get(conf, '___.compProps.mapping', '');
    let ow = req.helpers.json.get(conf, '___.compProps.overwirte', {});

    if(from && map){
        if(from === 'statics'){
            return await getPropsByTypeAndMap(map, type, ow, config, req, res, next);
        }
    }

    return fbval;
}

const predefined = async (conf, type, config, req, res, next, fbval) => {
    let detailed = req.helpers.json.get(config, 'detailed', false);
    let from = req.helpers.json.get(conf, '___.predefined.from', '');
    let map = req.helpers.json.get(conf, '___.predefined.mapping', '');
    let ow = req.helpers.json.get(conf, '___.predefined.overwirte', {});

    if(from && map){
        if(from === 'statics'){
            let pd = req.helpers.json.get(configs, 'predefined', {});
                pd = req.helpers.json.get(pd, map, {});

            if(req.helpers.data.type.is(pd, 'object')){
                    pd = req.helpers.json.merge(pd, ow);
                let pdl = req.helpers.json.length(pd);

                if(pdl && pdl > 0){
                    let nsp = await compile({}, pd, type, config, req, res, next);
                    let nspl = req.helpers.json.length(nsp);

                    if(nspl && nspl > 0){
                        return nsp;
                    }
                }
            }
        }
    }

    return fbval;
}

const parse = async (rval, arg, type, config, dval, req, res, next) => {
    let conf = arg || {};
    let rId = req.helpers.random.key();
    let ctype = req.helpers.json.get(conf, 'type', '');
    let detailed = req.helpers.json.get(config, 'detailed', false);

    switch (ctype) {
        case 'any':
            return await getvalue(conf, req, res, rId, (detailed?null:dval));
        break;
        case 'string':
            return await getvalue(conf, req, res, rId, (detailed?'':dval));
        break;
        case 'number':
            return await getvalue(conf, req, res, rId, (detailed?'':dval));
        break;
        case 'boolean':
            return await getvalue(conf, req, res, rId, (detailed?false:dval));
        break;
        case 'object':
            return await getvalue(conf, req, res, rId, (detailed?`{}`:dval));
        break;
        case 'function':
            return await getvalue(conf, req, res, rId, (detailed?null:dval));
        break;
        case 'enum':
            return await getvalue(conf, req, res, rId, (detailed?'':dval));
        break;
        case 'jsx':
            return (detailed?'':dval);
        break;
        case 'nested':
            let nsp = await compile({}, req.helpers.json.get(conf, '___.nested', {}), type, config, req, res, next);

            if(detailed){
                return nsp
            }else{
                let nspl = req.helpers.json.length(nsp);

                if(nspl && nspl > 0){
                    return nsp
                }else{
                    return dval;
                }
            }
        break;
        case 'compProps':
            return await compProps(conf, type, config, req, res, next, (detailed?`{}`:dval));
        break;
        case 'predefined':
            return await predefined(conf, type, config, req, res, next, (detailed?`{}`:dval))
        break;
        default:
            return dval;
            //return await getvalue(conf, req, res, rId, null);
    }
}

const compile = async (rval, props, type, config, req, res, next) => {
    let dval = req.helpers.random.key();
    let len = req.helpers.json.length(props || {});
    let detailed = req.helpers.json.get(config, 'detailed', false);

    if(len && len > 0){
        let rv = {};

        for(const a in props){
            let item = props[a];
            let val = await parse(rval, item, type, config, dval, req, res, next);

            if(val != dval){
                let asroot = req.helpers.json.get(item, '___.asroot', false);
                if(asroot){
                    let isobj = req.helpers.data.type.is(val, 'object');
                    if(isobj){
                        rv = req.helpers.json.merge(rv, val);
                    }else{
                        rv[a] = val;
                    }
                }else{
                    rv[a] = val;
                }
            }
        }

        let rvl = req.helpers.json.length(rv);

        if((rvl && rvl > 0) || detailed){
            rval = req.helpers.json.merge(rval, rv);
        }
    }

    return rval;
}

const getPropsByTypeAndMap = async (map, type, overwrite, config, req, res, next) => {
    return await compile({}, await utils.getConfigByTypeAndMap(map, type, overwrite, config, req, res, next), type, config, req, res, next);
}

exports.getByMap = async (map, config, req, res, next) => {
    return await getPropsByTypeAndMap(map, 'props', {}, req.helpers.json.merge({detailed:false}, config || {}), req, res, next);
}