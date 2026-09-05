const response = require('./../response');

const map = {
    'fetch':true,
    'update':true,
    'create':true,
    'remove':true
}

const validate = async (config, req, res, next) => {
    const uId = req.helpers.random.uuid();
    const act = req.helpers.json.val(req, 'params.jobMethod');
    const appId = req.helpers.json.val(req, 'appConfig.appInfo.appId');
    const ops = req.helpers.json.val(config, `config.collection.operations.${act}.${appId}`, uId);

    if(ops === 1 || ops === '1'){
        return {
            valid:true
        }
    }else{
        return await response.invalid(req, 'PERMISSION_APP_ACCESS_NOT_GRANTED');
    }
}

const action = async (req, res, next) => {
    return req.helpers.json.val(map, req.helpers.json.val(req, 'params.jobMethod'));
}

const start = async (config, req, res, next) => {
    let aname = await action(req, res, next);

    if(aname){
        return await validate(config, req, res, next);
    }else{
        return await response.invalid(req, 'PERMISSION_ACTION_NOT_ALLOWED');
    }
}

exports.start = start