const appendOtp = async (rval, conf, otp, map, req, res) => {

    const ov = req.helpers.json.val(otp, map);

    if(1 === 1 && ov){
        rval.otp = ov;
    }

    return rval;
}

const mobile = async (rval, conf, otp, req, res) => {
    const sms = req.helpers.json.val(conf, 'configs.channels.sms.enable');
    const whatsapp = req.helpers.json.val(conf, 'configs.channels.whatsapp.enable');

    if(sms || whatsapp){
        if(sms){
            rval.mobile = {
                sms:await appendOtp({
                    code:'OTP_SENT_ON_MOBILE_NUMBER',
                    message:'An OTP has been sent to your mobile number.'
                }, conf, otp, 'otps.sms', req, res)
            }
        }else{
            rval.mobile = {
                whatsapp:await appendOtp({
                    code:'OTP_SENT_ON_WHATSAAP',
                    message:'An OTP has been sent to your WhatsApp account associated with the provided mobile number.'
                }, conf, otp, 'otps.whatsapp', req, res)
            }
        }
    }

    return rval;
}

const email = async (rval, conf, otp, req, res) => {
    const email = req.helpers.json.val(conf, 'configs.channels.email.enable');

    if(email){
        rval.email =await appendOtp({
            code:'OTP_SENT_ON_EMAIL',
            message:'An OTP has been sent to your email address.'
        }, conf, otp, 'otps.email', req, res)
    }

    return rval;
}


const sucess = async (rval, conf, otp, req, res) => {
    rval.data = await mobile({
        token:req.helpers.json.val(rval, 'data.hashId') 
    }, conf, otp, req, res);

    rval.data = await email(rval.data, conf, otp, req, res)

    return rval;
}

exports.sucess = sucess;