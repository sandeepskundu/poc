import helpers from 'ui-helpers';

const nested = (arg) => {
    const sch = helpers.json.val(arg, 'schema', {});
    const schl = helpers.json.length(sch);

    if(schl && schl > 0){
        const rv = parse(sch);
        const rvl = helpers.json.length(rv);
        if(rvl && rvl > 0){
            return rv;
        }
    }

    return false;
}

const compileConf = (arg) => {
    const rval = {};
    const mconf = helpers.json.val(arg, 'mongodb', {});
    const aioconf = helpers.json.val(arg, 'aioconfig', {});

    const mcl = helpers.json.length(mconf);
    const acl = helpers.json.length(aioconf);

    if(mcl && mcl > 0){
        rval.mongodb = mconf;
    }

    if(acl && acl > 0){
        rval.aioconfig = aioconf;
    }

    const rvl = helpers.json.length(rval);

    if(rvl && rvl > 0){
        return rval;
    }

    return false;
}

const common = (arg) => {
    const item = {
        type:helpers.json.val(arg, 'type')
    }
    const config = helpers.json.val(arg, 'configs', {});
    const configl = helpers.json.length(config);

    if(configl && configl > 0){
        const rconf = compileConf(config);

        if(item){
            item.configs = rconf;
        }
    }

    return item;
}

const parse = (arg) => {
    let rval = {};

    for(const a in arg){
        const type = helpers.json.val(arg[a], 'type');
        switch (type) {
            case 'nested':
                const as = nested(arg[a]);
                const asl = helpers.json.length(as);
                if(as && asl > 0){
                    arg[a].schema = as;
                    arg[a].type = type;
                }
            break;
            case 'email':
            case 'switch':
            case 'object':
            case 'paragraph':
            case 'stringKey':
            case 'objectId':
            case 'string':
            case 'boolean':
            case 'number':
            case 'date':
                arg[a] = common(arg[a]);
            break;
        }
    }

    for(const a in arg){
        if(arg[a]){
            rval[a] = arg[a];
        }
    }

    return rval;
}

const start = (arg) => {
    return parse(arg)
}

export default {
    start:start
}