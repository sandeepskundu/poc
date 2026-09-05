const cookieh = require('./../../cookie');
const utils = process.aioBeLibs('helpers/_private/utils');

const validate = async (cookie, config, data, req, res) => {
    let rval = {
        valid:true,
        validation:{}
    };

    if(cookie && data && cookie.hashId  && data.hashId && cookie.hashId === data.hashId){
        if(cookie.resendAt > Date.now()){
            let rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_CANNOT_RESEND_TILL_TIME', {});
                rval.data = rval.data || {};
                rval.error = rval.error || {};
                rval.error.meta = await cookieh.meta({}, req, res, cookie);
            return rval;
        }
    }

    return rval;
}

exports.validate = validate;