const utils = process.aioBeLibs('helpers/_private/utils');

const start = async (data, req, res) => {
    let vtimestamp = data.resendAt;
    let rval = {
        valid:true,
        validation:{}
    }

    if(vtimestamp){
        let vTill = data.resendAt.getTime();

        if(vTill > Date.now()){
            rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_CANNOT_RESEND_TILL_TIME', {});
            rval.error = rval.error || {};
            rval.error.retryAt = vTill;
        }
    }else{
        rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_CANNOT_RESEND_TILL_TIME', {});
    }

    return rval;
}

exports.start = start;