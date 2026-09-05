const response = require('./response');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

const getConfigs = async (req, res, next) => {
    return await await req.helpers.express.docs.json.get('model', req, res, next);
}

const updatePassword = async (data, model, configs, req, res, next) => {
    let ud = await session.details(req);
    let uId = await req.helpers.json.val(ud, 'userId')
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
        item.lastPasswordChangeAt = Date.now();

    if(model){
        let doc = await model.findOneAndUpdate({_id:uId}, {$set:item});

        if(doc){
            doc = doc.toObject();
            doc = await auth.module.encryption.transform(doc, req, []);
            doc = await auth.module.encryption.decode(doc, req);
        }

        if(doc){
            let resp = await req.helpers.json.val(auth, 'constants.RESPONSES.SUCESS.ACCOUNT_PASSWORD_UPDATED_SUCCESSFULLY');
                resp.data = doc;
            
            return await req.helpers.express.response.getRespByCode(200, req, res, next, resp);
        }else{
            return await response.rrturn('ACCOUNT_NOT_FOUND', req, res);
        }
    }

    return await response.rrturn('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
}

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

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 0){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }else{
        let validation = await validate(req, res, next);

        if(validation.valid){
            let configs = await getConfigs(req, res, next);
            let model = await auth.module.collection.get(req, res);
            let bdata = req.helpers.json.val(req, 'body.data', {});

                return await updatePassword(bdata, model, configs, req, res, next);
        }else{
            return validation;
        }
    }
}