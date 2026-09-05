const response = require('./response');
const otp = process.aioBeLibs('helpers/_private/otp');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

const validate = async (req, res, next) => {
    let password = req.helpers.json.val(req, 'body.data.password', '');
    let confirmPassowrd = req.helpers.json.val(req, 'body.data.confirmPassowrd', '');

    if(password === confirmPassowrd){
        return {
            valid:true
        }
    }else{
        return await response.rrturn('ACCOUNT_CONFIRM_PASSWORD_MISMATCH', req, res);
    }
}

const getOtpConfigs = async (req, res) => {
    return {
        cookieHash:req.helpers.json.val(auth, 'constants.API_HASH.LOGIN_ACCOUNT')
    };
}

const getConfigs = async (req, res, next) => {
    return await await req.helpers.express.docs.json.get('model', req, res, next);
}

const updatePassword = async (data, model, configs, req, res, next) => {
    let uId = await req.helpers.json.val(req, 'body.data.trackId', '')
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
        item.lastLoginAt = Date.now();
        item.lastPasswordChangeAt = Date.now();

        if(model){
            let doc = await model.findOneAndUpdate({_id:uId}, {$set:item}, {new:true});
            if(doc){
                doc = doc.toObject();
                doc = await auth.module.encryption.transform(doc, req, []);
                doc = await auth.module.encryption.decode(doc, req);
            }

            if(doc){
                return await auth.module.login.markAsLoginAndResp(doc, req, res);
            }
        }

    return await response.rrturn('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
}

const isvalidUserId = async (model, req, res) => {
     let md = req.helpers.merchant.details(req, res, null);
     let details = await model.findOne({
        _deleted:0,
        _merchantId:req.helpers.json.val(md, 'id', ''),
        _id:req.helpers.json.val(req, 'body.data.trackId', '')
    });

    if(details){
        return {
            valid:true
        }
    }else{
        return await response.rrturn('ACOOUNT_FORGOT_PASSWORD_INVALID_TRACK_ID', req, res, 'data.body.trackId');
    }
}

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        let validation = await validate(req, res, next);

        if(validation.valid){
            const model = await auth.module.collection.get(req, res);
            const vvalidation = await isvalidUserId(model, req, res);

            if(vvalidation.valid){
                const otpResp = await otp.verify.init( {
                    configs:await getOtpConfigs(req, res)
                }, req, res, next);

                if(otpResp.valid){
                    let configs = await getConfigs(req, res, next);
                        return await updatePassword(req.helpers.json.val(req, 'body.data', {}), model, configs, req, res, next)
                }else{
                    return otpResp;
                }
            }else{
                return vvalidation;
            }
        }else{
            return validation;
        }
    }
}