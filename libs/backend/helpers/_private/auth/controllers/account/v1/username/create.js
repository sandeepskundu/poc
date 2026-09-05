const response = require('./response');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

const getConfigs = async (req, res, next) => {
    return await await req.helpers.express.docs.json.get('model', req, res, next);
}

const getBody = async (req, res, next) => {
    let dv = req.helpers.random.uuid();
    let body = req.helpers.json.val(req, 'body.data', {});
    let username = req.helpers.json.val(body, 'username', dv);
        body.org = body.org || {};

        if(username != dv){
            body.org.username = username;
            body.username = await auth.module.encryption.en(username, req);
        }

        req.body.data = body;
}

const refineQuery = async (query, req, res, next) => {
    let que = req.helpers.json.val(query, 'data', {});
        delete que._deleted;
    
    return que;
}

const hasExisting = async (data, model, configs, req, res, next) => {
    let ud = await session.details(req);
    let uId = await req.helpers.json.val(ud, 'userId')
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
    let qpObj = await req.helpers.mongoose.query.build(configs, model, {}, item, req, res, next);

    if(qpObj.valid){
        let query = await refineQuery(qpObj, req, res, next);
        let doc = await model.findOne(query).lean();

        if(doc){
            if(doc._id.toString() === uId){
                return null
            }else{
                return doc;
            }
        }else{
            return null
        };
    }else{
        return await response.rrturn('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
    }
}

const updateUsername = async (data, model, configs, req, res, next) => {
    let ud = await session.details(req);
    let uId = await req.helpers.json.val(ud, 'userId')
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);

    if(model){
        let doc = await model.findOneAndUpdate({_id:uId}, {$set:item});
        if(doc){
            doc = doc.toObject();
            doc = await auth.module.encryption.transform(doc, req, []);
            doc = await auth.module.encryption.decode(doc, req);
        }

        if(doc){
            let resp = await req.helpers.json.val(auth, 'constants.RESPONSES.SUCESS.ACCOUNT_USERNAME_UPDATED_SUCCESSFULLY');
                resp.data = doc;
            
            return await req.helpers.express.response.getRespByCode(200, req, res, next, resp);
        }else{
            return await response.rrturn('ACCOUNT_NOT_FOUND', req, res);
        } 
    }

    return await response.rrturn('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
}

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 0){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }else{
            await getBody(req, res, next)
        let model = await auth.module.collection.get(req, res);
        let configs = await getConfigs(req, res, next);
        let bdata = req.helpers.json.val(req, 'body.data', {});
        let doc = await hasExisting(bdata, model, configs, req, res, next);

        if(doc && doc.valid === false && doc.error){
            return doc;
        }else{
            if(doc){
                return await response.rrturn('ACCOUNT_USERNAME_NOT_AVAILABLE', req, res);
            }else{
                return await updateUsername(bdata, model, configs, req, res, next);
            }
        }
    }
}