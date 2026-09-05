const utils = process.aioBeLibs('helpers/_private/utils');

const start = async (data, req, res) => {
    let vtimestamp = data.validTill;
    let rval = {
        valid:true,
        validation:{}
    }

    if(vtimestamp){
        let vTill = data.validTill.getTime();

        if(vTill < Date.now()){
            rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_EXPIRED', {});
        }
    }else{
        rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_EXPIRED', {});
    }

    return rval;
}

exports.start = start;