const fetch = require('./../fetch');
const sendOtp = require('./send-otp');
const update = require('./../update');
const password = require('./password');
const session = process.aioBeLibs('helpers/_private/session');

const markAsLoginAndResp = async (doc, req, res) => {
    doc = await fetch.addProfile(doc, req, res);
    await session.login(doc, req, res);

    return req.helpers.express.response.getRespByCode(200, req, res, null, {
        data:doc,
        status:{
            rcode:"USER_AUTHORISED"
        }
    })
}

const verifyAndLogin = async (resp, req, res, state) => {
    let id = req.helpers.json.val(resp, 'data.user.id', '');
    let data = await fetch.fetchById(id, req, res);
    let doc = await update.markAsVerified(data, {
        verifiedBy:req.helpers.json.val(resp, 'data.validatedBy', {})
    }, req, res, state);

    return markAsLoginAndResp(doc, req, res);
}

const updateVerifiedAndLogin = async (arg, data, req, res, state) => {
     let doc = await update.markAsVerified(data, {
        verifiedBy:req.helpers.json.val(arg, 'data.validatedBy', {})
    }, req, res, state);

    return await markAsLoginAndResp(doc, req, res);
}

const sendOtpByType = async (type, req, res) => {
    return await sendOtp.byType(type, req, res);
}

const loginWithPassword = async (type, req, res) => {
    return await password.loginWithPassword(type, req, res);
}

const verifyAndRegister = async (resp, req, res) => {
    return await verifyAndLogin(resp, req, res, '');
}

exports.password = password;
exports.sendOtpByType = sendOtpByType;
exports.verifyAndLogin = verifyAndLogin;
exports.verifyAndRegister = verifyAndRegister;
exports.loginWithPassword = loginWithPassword;
exports.markAsLoginAndResp = markAsLoginAndResp;
exports.updateVerifiedAndLogin = updateVerifiedAndLogin;