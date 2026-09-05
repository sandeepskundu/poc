const configs = require('./../../common-configs');

const request = async (parent, appConfig, req) => {
    return {
        body:req.helpers.json.val(configs, 'ds.request.body.create', {}),
        methods:{
            post:req.helpers.json.val(configs, 'ds.request.methods.post', {})
        }
    }
}

const body = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.validation.create.body', {});
}

module.exports = async (parent, appConfig, req) => {
    return {
        validation:{
            body:await body(parent, appConfig, req),
        },
        request:await request(parent, appConfig, req),
    }
}