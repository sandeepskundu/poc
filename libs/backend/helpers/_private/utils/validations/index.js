const uh = process.aioUiLibs('helpers');
const universal = require('./universal');

const map = {
    otp:require('./otp'),
    name:require('./name'),
    date:require('./date'),
    blood:require('./blood'),
    email:require('./email'),
    gender:require('./gender'),
    family:require('./family'),
    mobile:require('./mobile'),
    marital:require('./marital'),
    country:require('./country'),
    methods:require('./methods'),
    address:require('./address'),
    contact:require('./contact'),
    request:require('./request'),
    username:require('./username'),
    password:require('./password'),
    universal:require('./universal'),
    alphabets:require('./alphabets'),
    signature:require('./signature')
}

const getType = (val) => {
    let map = {
        optional:true,
        required:true
    }

    return map[val]?val:'required'
}

const getRequired = (val) => {
    if(val != 'undefined'){
        let type = getType(val);

        return {
            "checks":{
                "required":{
                    "value":`${type}`
                }
            }
        }
    }else{
        return {}
    }
}

const getConfig = (vmap) => {
    return uh.json.val(map, vmap, uh.json.val(universal, 'random', {}));
}

const set = (rval, required) => {
    let isobj = uh.data.type.is(required, 'object');
    let isstr = uh.data.type.is(required, 'string');

    if(isstr){
        return uh.json.merge(rval, getRequired(required))
    }else{
        if(isobj){
            return uh.json.merge(rval, required)
        }else{
            return rval;
        }
    }
}

const get = (vmap, required) => {
    return set(getConfig(vmap), required)
}

const build = async (req, vmap, required) => {
    let rval = getConfig(vmap);
    let isfun = req.helpers.data.type.is(rval, 'function');

    if(isfun){
        return set(await rval(req), required)
    }else{
        return set(rval, required)
    }
}

exports.get = get;
exports.build = build;