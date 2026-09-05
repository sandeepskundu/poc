const consts = process.aioBeLibs('helpers/_private/utils/constants');

const header = async (req) => {
    return req.helpers.json.val(consts, 'token.INTERNAL_API.HEADER_NAME');
}

const salt = async (req) => {
    return req.helpers.json.val(consts, 'token.INTERNAL_API.ENCRYPTION_SALT');
}

const validTill = async (req) => {
    return req.helpers.date.timestamp.ahead(req.helpers.json.val(consts, 'token.INTERNAL_API.EXPIRY_TIME', '10S'))
}

const encode = async (req, arg) => {
    let value = {
        expireAt:await validTill(req)
    };
    let isobj = req.helpers.data.type.is(arg, 'object');

    if(isobj){
        value = req.helpers.json.merge(value, arg);
    }

    return req.helpers.crypto.en(JSON.stringify(value), await salt(req));
}

const decode = async (req, value) => {
    return req.helpers.crypto.de(value, await salt(req))
}

const set = async (headers, req, arg) => {
    let rval = headers || {};
    let hn = await header(req);
        rval[hn] = await encode(req, arg);

    return rval;
}

const get = async (req) => {
    return await decode(req, req.helpers.json.val(req, `headers.${await header(req)}`));
}

exports.set = set;
exports.get = get;