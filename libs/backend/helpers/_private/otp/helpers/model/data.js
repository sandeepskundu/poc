const utils = process.aioBeLibs('helpers/_private/utils');
const secureNode = ['recipients', 'otps', 'channels', 'status'];

const encode = async (arg, req, res) => {
    return req.helpers.crypto.en(arg, utils.constants.otp.ENCRYPTION_SALT);
}

const decode = async (arg, req, res) => {
    return req.helpers.crypto.de(arg, utils.constants.otp.ENCRYPTION_SALT)
}

const encryption = async (arg, req, res, isdecode) => {
    let rval = req.helpers.json.copy(arg);

    for(let a in secureNode){
        let name = secureNode[a];

        if(rval[name]){
            if(isdecode){
                rval[name] = await decode(rval[name], req, res);
            }else{
                rval[name] = await encode(JSON.stringify(rval[name]), req, res);
            }
        }
    }

    return rval;
}

const encodeData = async (arg, req, res) => {
    return await encryption(arg, req, res);
}

const decodeData = async (arg, req, res) => {
    return await encryption(arg, req, res, true);
}

exports.decodeData = decodeData;
exports.encodeData = encodeData;