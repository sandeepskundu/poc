const utils = require('./utils');
const configs = process.aioAppConfigs('storybook');

const staticsEnums = async (mapping, arg, type, config, req, res, next) => {
    let rval = [];
    let options = req.helpers.json.get(configs, `enums.${mapping}`, {});

    for(let a in options){
        if(options[a]){
            rval.push(a);
        }
    }

    return rval.join('|');
}

const enums = async (rval, arg, type, config, req, res, next, flag) => {
    let econfig = req.helpers.json.get(arg, '___.enum', {});
    let from = req.helpers.json.get(econfig, 'from', '');
    let mapping = req.helpers.json.get(econfig, 'mapping', '');
    let options = req.helpers.json.get(econfig, 'options', '');

    if(from && mapping){
        rval = req.helpers.json.set(rval, '___.oneOf.from', from, false, true);
        rval = req.helpers.json.set(rval, '___.oneOf.mapping', mapping, false, true);
    }

    return req.helpers.json.set(rval, '___.oneOf.options', options || '');
}

const compProps = async (rval, arg, type, config, req, res, next, flag) => {
    let map = req.helpers.json.get(arg, '___.compProps.mapping', '');
    let ow = req.helpers.json.get(arg, '___.compProps.overwirte', {});

    if(map){
        return req.helpers.json.set(rval, '___.shape', req.helpers.json.get(await getPropsByTypeAndMap(map, type, ow, config, req, res, next), 'data', {}));
    }else{
        return req.helpers.json.set(rval, '___.shape', {});
    }
}

const predefined = async (rval, arg, type, config, req, res, next, flag) => {
    let from = req.helpers.json.get(arg, '___.predefined.from', '');
    let map = req.helpers.json.get(arg, '___.predefined.mapping', '');

    if(from && map){
        if(from === 'statics'){
            let pd = req.helpers.json.get(configs, 'predefined', {});
                pd = req.helpers.json.get(pd, map, {});
                pd = req.helpers.json.copy(pd);

                if(req.helpers.data.type.is(pd, 'object')){
                    let ow = req.helpers.json.get(arg, '___.predefined.overwirte', {});
                        pd = req.helpers.json.merge(pd, ow);

                    let pdl = req.helpers.json.length(pd);

                    if(pdl && pdl > 0){
                        return req.helpers.json.set(rval, '___.shape', await compile({}, pd, type, config, req, res, next));
                    }
                }
        }
    }

    return req.helpers.json.set(rval, '___.shape', {});
}

const addExtra = async (rval, arg, type, config, req, res, next, flag) => {
    let dval = req.helpers.random.key();
    let ctype = req.helpers.json.get(arg, 'type', '');
    let dv = req.helpers.json.get(arg, 'dvalue', dval);

    switch (ctype) {
        case 'nested':
            let rv = await compile({}, req.helpers.json.get(arg, '___.nested', {}), type, config, req, res, next);
            let rvl = req.helpers.json.length(rv || {});

            if(rvl && rvl > 0){
                rval = req.helpers.json.set(rval, '___.shape', rv || {})
            }
        break;
        case 'enum':
            rval = await enums(rval, arg, type, config, req, res, next, flag);
        break;
        case 'compProps':
            rval = await compProps(rval, arg, type, config, req, res, next, flag);
        break;
        case 'predefined':
            rval = await predefined(rval, arg, type, config, req, res, next, flag);
        break;
        default:
    };

    if(dval != dv){
        rval.dvalue = dv;
    }

    return rval;
}

const getvalue = async (arg, type, config, req, res, next, flag) => {
    return await addExtra({
        type:flag || 'any',
        desc:req.helpers.json.get(arg, 'description', ''),
        required:req.helpers.json.get(arg, '___.required', false)
    }, arg, type, config, req, res, next, flag)
}

const parse = async (arg, type, config, req, res, next) => {
    let conf = arg || {};
    let ctype = req.helpers.json.get(conf, 'type', '');

    switch (ctype) {
        case 'any':
            return await getvalue(conf, type, config, req, res, next, 'any');
        break;
        case 'string':
            return await getvalue(conf, type, config, req, res, next, 'string')
        break;
        case 'number':
            return await getvalue(conf, type, config, req, res, next, 'number')
        break;
        case 'boolean':
            return await getvalue(conf, type, config, req, res, next, 'bool')
        break;
        case 'object':
            return await getvalue(conf, type, config, req, res, next, 'object')
        break;
        case 'function':
            return await getvalue(conf, type, config, req, res, next, 'func')
        break;
        case 'enum':
            return await getvalue(conf, type, config, req, res, next, 'oneOf')
        break;
        case 'jsx':
            return await getvalue(conf, type, config, req, res, next, 'node')
        break;
        case 'nested':
            return await getvalue(conf, type, config, req, res, next, 'shape');
        break;
        case 'compProps':
            return await getvalue(conf, type, config, req, res, next, 'shape');
        break;
        case 'predefined':
            return await getvalue(conf, type, config, req, res, next, 'shape');
        break;
        default:
    }
}

const compile = async (rval, props, type, config, req, res, next) => {
    let dval = req.helpers.random.key();
    let len = req.helpers.json.length(props || {});

    if(len && len > 0){
        let rv = {};

        for(const a in props){
            let val = await parse(props[a], type, config, req, res, next);

            if(val != dval){
                rv[a] = val;
            }
        }

        rval = req.helpers.json.merge(rval, rv);
    }

    return rval;
}

const getOneOf = async (rval, arg, type, config, req, res, next, flag) => {
    let econfig = req.helpers.json.get(arg, '___.oneOf', {});
    let from = req.helpers.json.get(econfig, 'from', '');
    let mapping = req.helpers.json.get(econfig, 'mapping', '');

    if(from && mapping){
        let enummap = `${from}.${mapping}`;
        let has = req.helpers.json.get(rval, enummap, false);

        if(from === 'statics' && !has){
            let options = await staticsEnums(mapping, arg, type, config, req, res, next);

            if(options){
                rval = req.helpers.json.set(rval, enummap, options, false, true);
            }
        }
    }

    return rval;
}

const getEnums = async (rval, respobj, map, type, config, req, res, next) => {
    for(let a in respobj){
        let item = req.helpers.json.get(respobj, a, {});
        let type = req.helpers.json.get(item, 'type', '');
        if(type === 'shape'){
            rval = await getEnums(rval, req.helpers.json.get(item, '___.shape', {}), map, type, config, req, res, next);
        }else{
            if(type === 'oneOf'){
                rval = await getOneOf(rval, item, type, config, req, res, next);
            }
        }
    }

    return rval;
}

const getPropsByTypeAndMap = async (map, type, overwirte, config, req, res, next) => {
    let rval = await compile({}, await utils.getConfigByTypeAndMap(map, type, overwirte, config, req, res, next), type, config, req, res, next);

    return {
        data:rval,
        enums:await getEnums({}, rval, map, type, config, req, res, next)
    };
}

exports.getByMap = async (map, config, req, res, next) => {
    return await getPropsByTypeAndMap(map, 'props', {}, req.helpers.json.merge({}, config || {}), req, res, next);
}