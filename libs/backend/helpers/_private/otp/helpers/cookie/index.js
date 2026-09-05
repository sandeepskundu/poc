const utils = process.aioBeLibs('helpers/_private/utils');
const ohelpers = process.aioBeLibs('helpers/_private/otp/helpers');

const encode = async (arg, req, res) => {
    return req.helpers.crypto.en(JSON.stringify(arg), utils.constants.otp.ENCRYPTION_SALT)
}

const decode = async (val, req, res) => {
    return req.helpers.crypto.de(val, utils.constants.otp.ENCRYPTION_SALT)
}

const getCookieName = async (conf, req, res) => {
    const rval = [
        req.helpers.json.val(utils, 'constants.otp.COOKIE_NAME'),
        req.helpers.json.val(conf, 'cookieHash', '')
    ]

    return `o${req.helpers.crypto.md5(rval.join(''))}tp`;
}

const getName = async (conf, req, res) => {
    return await getCookieName(conf, req, res)
}

const getValue = async (conf, req, res) => {
    let cname = await getCookieName(conf, req, res);
    let cval = req.helpers.json.val(req, `cookies.${cname}`);

    if(cval){
        return await decode(cval, req, res);
    }
    
    return null;
}

const set = async (conf, arg, req, res) => {
    const cval = await encode(arg, req, res);
    const cname = await getName(conf, req, res);
    const validTill = req.helpers.json.val(arg, 'validTill');

    await req.helpers.cookie.set(cname, cval, req, res, {
        expires:new Date(validTill || (Date.now()+(5 * 60 * 1000)))
    });
}

const remove = async (conf, req, res) => {
    const name = await getName(conf, req, res);
    await req.helpers.cookie.del(name, req, res);
}

const meta = async (conf, req, res, val) => {
    const dd = val || await getValue(conf, req, res);

    return {
        sentAt:dd.resendAt,
        validTill:dd.sentAt,
        resendAt:dd.validTill,
        countdown:{
            resend:req.helpers.date.timestamp.diff.byType(Date.now(), dd.resendAt, 'SEC'),
            expiry:req.helpers.date.timestamp.diff.byType(Date.now(), dd.validTill, 'SEC'),
        }
    }
}

exports.set = set;
exports.meta = meta;
exports.get = getValue;
exports.remove = remove;
exports.getName = getName;
exports.getValue = getValue;