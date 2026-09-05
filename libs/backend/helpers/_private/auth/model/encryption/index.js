const ENCODE_OPTS = ['mobile', 'email', 'username'];
const PUBLIC_EXPOSED = ['email', 'mobile', 'username'];

const transform = async (data, req, includes) => {
    let rval = {};
    let inc = PUBLIC_EXPOSED;
    let id = req.helpers.json.val(data, '_id');
    let isobj = req.helpers.data.type.is(includes, 'object');
    let islist = req.helpers.data.type.is(includes, 'array');

    if(id){
        rval.id = id.toString();
    }

    if(!isobj && islist){
        inc = inc.concat(includes);
    }

    for(const a in inc){
        if(data[inc[a]]){
            rval[inc[a]] = data[inc[a]];
        }
    }
    
    return rval;
}

const encrypt = async (arg, req, isdecode) => {
    for(const a in ENCODE_OPTS){
        let name = ENCODE_OPTS[a];

        if(arg[name]){
            if(isdecode){
                arg[name] = await de(arg[name], req);
            }else{
                let isobj = req.helpers.data.type.is(arg[name], 'object');
                let islist = req.helpers.data.type.is(arg[name], 'array');

                if(isobj && !islist){
                    arg[name] = await en(JSON.stringify(arg[name]), req);
                }else{
                    arg[name] = await en(arg[name], req);
                }
            }
        }
    }

    return arg;
}

const getKey = async (req) => {
    return req.helpers.json.val(req, 'appConfig.appConfig.authConfigs.encription.data')
}

const en = async (val, req) => {
    return req.helpers.crypto.en(val, await getKey(req));
}

const de = async (val, req) => {
    return req.helpers.crypto.de(val, await getKey(req));
}

const encode = async (arg, req) => {
    return await encrypt(arg, req, false);
}

const decode = async (arg, req) => {
    return await encrypt(arg, req, true);
}

exports.en = en;
exports.de = de;
exports.decode = decode;
exports.encode = encode;
exports.transform = transform;