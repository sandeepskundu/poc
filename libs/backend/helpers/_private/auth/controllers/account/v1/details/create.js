const otp = process.aioBeLibs('helpers/_private/otp');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

const getRecipients = async (resp, req, res) => {
    return {
        mobile:req.helpers.json.val(req, 'body.data.org.mobile', {}),
        email:req.helpers.json.val(req, 'body.data.org.email.id', {}),
    }
}

const getOtpConfigs = async (resp, req, res) => {
    let code = req.helpers.json.val(resp, 'code')
    let rval = req.helpers.json.val(auth, 'constants.OTP_CONFIGS.ACCOUNT_CREATE');
        rval.cookieHash = req.helpers.json.val(auth, 'constants.API_HASH.CREATE_ACCOUNT');

    if(code){
        if(code === 'VERIFY_MOBILE'){
            delete rval.channels.email
        }

        if(code === 'VERIFY_EMAIL'){
            delete rval.channels.sms;
            delete rval.channels.whatsapp
        }
    }

    return rval;
}

const sendOtp = async (resp, req, res) => {
    if(resp.valid){
        return await otp.send.init({
            configs:await getOtpConfigs(resp, req, res),
            recipients:await getRecipients(resp, req, res),
            schema:await auth.module.schema.defaultSchemaByType('ACCOUNT_CREATE', req, res)
        }, resp, req, res);
    }else{
        return resp;
    }
}

const setBody = async (req, res, next) => {
    let dv = req.helpers.random.uuid();
    let body = req.helpers.json.val(req, 'body.data', {});
    let email = req.helpers.json.val(body, 'email', dv);
    let mobile = req.helpers.json.val(body, 'mobile', dv);
        body.org = body.org || {};

    if(email != dv){
        body.org.email = email;
        body.email = await auth.module.encryption.en(JSON.stringify(email), req);
    }

    if(mobile != dv){
        body.org.mobile = mobile;
        body.mobile = await auth.module.encryption.en(JSON.stringify(mobile), req);
    }

    req.body.data = body;
}

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        await setBody(req, res, next);
        let resp = await auth.module.insert.validate(req, res, next);
        
        if(resp.valid){
            let otpresp = await sendOtp(resp, req, res);
            let code = req.helpers.json.val(otpresp, 'status.code');
            let rcode = req.helpers.json.val(otpresp, 'status.rcode');

            if(otpresp.valid && code === 200 && rcode === 'OTP_SENT'){
                let trackId = req.helpers.uuid.create();
                    otpresp.data.trackId = trackId;
                    otpresp.data = otpresp.data || {};
                    otpresp.data.token = await auth.helpers.token.encode({
                        register:req.helpers.json.val(req, 'body.data.org', {}),
                        otp:{
                            token:req.helpers.json.val(otpresp, 'data.token', '')
                        }
                    }, trackId, req, res);
            }
            return otpresp;
        }else{
            return resp;
        }
    }
}