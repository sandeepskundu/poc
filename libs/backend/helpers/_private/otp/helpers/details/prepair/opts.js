const utils = process.aioBeLibs('helpers/_private/utils');
const order = utils.constants.otp.OTP_ALLOWED_CHANNELS;

const createOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const create = async (config, req, res) => {
    const rval = {}
    const commonOtp = createOtp();
    const iscommon = req.helpers.json.val(config, 'configs.common');
    const channels = req.helpers.json.val(config, 'configs.channels', {})

    for(const a in order){
        const type = order[a];
        const enabled = req.helpers.json.val(channels, `${type}.enable`);

        if(enabled){
            if(iscommon){
                rval[type] = commonOtp;
            }else{
                rval[type] = createOtp();
            }
        }
    }

    if(rval.sms){
        delete rval.whatsapp;
    }

    return rval;
}

exports.create = create;