const utils = process.aioBeLibs('helpers/_private/utils');

const start = async (data, req, res) => {
    let rval = {
        valid:true,
        validation:{}
    }
    let status = req.helpers.json.val(data, 'status', {});
    let channels = req.helpers.json.val(data, 'channels', {});

    for(const a in channels){
        if(status && channels && status[a] && channels[a] && status[a] != 'SENT'){
            rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_PARTIALLY_VERIFIED', {});
        }

        if(rval && rval.valid === false){
            break;
        }
    }

    return rval;
}

exports.start = start;