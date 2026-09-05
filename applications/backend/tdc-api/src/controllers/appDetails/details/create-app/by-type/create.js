const apps = require('./apps');

module.exports = async (req, res, next) => {
    let resp = {
        data:{},
        valid:false,
        error:{
            code:'APP_NOT_CONFIGRED_TO_CREATE'
        },
        status:{
            code:400,
            message:"",
        }
    };

    const type = req.helpers.json.val(req, 'params.id', '');

    if(apps && type && apps[type] && apps[type].model && apps[type].data){
        req.body = apps[type].data;
        req.dbUtils = req.dbUtils  || {};
        req.dbUtils.model = apps[type].model;
        resp = await req.helpers.express.controllers.actions.global.start(req, res, next);
    }

    req.helpers.express.response.send('json', resp, req.helpers.json.get(resp, 'status.code'), req, res, next);
}