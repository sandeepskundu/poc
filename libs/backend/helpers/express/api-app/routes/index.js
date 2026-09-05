/*---
    let t = await req.helpers.s2s.internal.init([{
            name:'1'
        }, {
            name:'2'
        }, {
            name:'3'
        }, {
            name:'4'
        },{
            name:'5'
        }, {
            name:'6'
        }, {
            name:'7'
        }, {
            name:'8'
        }, {
            name:'9'
        }, {
            name:'10'
        }, {
            name:'11'
        }, {
            name:'12'
        }, {
            name:'13'
        },{
            name:'14'
        }, {
            name:'15'
        }, {
            name:'16'
        }, {
            name:'17'
        }], req, res, next);
--*/



const multer = process.nodeModules('multer');
const validations = process.aioAppSrc('middlewares/validations');
const validationUtils = process.aioBeLibs('helpers/_private/utils/validations');

const  middleware = (req, res, next) => {
    const type = req.helpers.json.val(req, 'runtime.validationConfig.request.body.type', '');

    if(type === 'multipart' || type === 'multipart-list'){
        multer({
            storage:multer.memoryStorage(),
            fileFilter:req.helpers.validation.image.mime.multer,
            limits: {
                //fileSize: 5 * 1024 
            } // 5 KB
        }).any()(req, res, next);
    }else{
        return next()
    }
}

/*-- This functions validate request data basis on configuration configured. --*/

const validation = async (req, res, next) => {
    const valid = await req.helpers.express.validation.api.start(req, res, next);
    const _valid = {
        error:false
    }

    if(valid.error){
        req.helpers.express.response.send('json', valid, req.helpers.json.get(valid, 'status.code'), req, res, next);
    }else{
        req.runtime = req.runtime || {};
        req.runtime.validation = valid;
        next();
    }
}

const controller = async (req, res, next) => {
    let resp = await req.helpers.express.controllers.starter.init(req, res, next);
        req.helpers.express.response.send('json', resp, req.helpers.json.get(resp, 'status.code'), req, res, next);
}

const getValidations = async (req, res, next) => {
    let middleware = req.helpers.json.copy(validations);
    let config = await req.helpers.express.docs.json.get('api', req, res, next);
    let order = ['appController', 'controllerAction', 'actionVersion', 'versionJob', 'jobMethod'];

    for(const a in order){
        let name = req.helpers.json.val(req.params, order[a]);

        if(name && middleware[name]){
            middleware = middleware[name];
        }else{
            middleware = false;
            break;
        }
    }

    if(middleware){
        const isobj = req.helpers.data.type.is(middleware, 'object');
        const isfun = req.helpers.data.type.is(middleware, 'function');
        if(isobj){
            config = req.helpers.json.merge(config, middleware);
        }else{
            if(isfun){
                return await middleware(config, req, res, next);
            }
        }
    }

    if(req.method === 'PUT' || req.method === 'put'){
        return req.helpers.json.merge({
            validation:{
                body:{
                    "signature.id":await validationUtils.build(req, 'signature.id'),
                    "signature.token":await validationUtils.build(req, 'signature.token'),
                }
            }
        }, config);
    }else{
        return config;
    }
}

const loadValidations = async (req, res, next) => {
    let id = req.helpers.json.val(req, 'params.id', 'data');

    if(id === 'uiv'){
        let resp = await req.helpers.express.response.getRespByCode(200, req, res, next);
            resp.data = await req.helpers.express.docs.json.get('ui', req, res, next);
            req.helpers.express.response.send('json', resp, 200, req, res, next);
    }else{
        req.runtime = req.runtime || {};
        req.runtime.validationConfig = await getValidations(req, res, next);
        next();
    }
}

exports.multer = middleware;
exports.controller = controller;
exports.validation = validation;
exports.loadValidations = loadValidations;