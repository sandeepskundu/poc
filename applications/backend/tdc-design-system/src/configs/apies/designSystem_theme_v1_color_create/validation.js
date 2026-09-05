const theme = require('./../../common-configs');

const body = async (parent, appConfig, req) => {
    return req.helpers.json.val(theme, 'dsTheme.validation.themeBody.create', {});
}

const request = async (parent, appConfig, req) => {
    return {
        body:req.helpers.json.val(theme, 'dsTheme.request.body', {}),
        methods:{
            post:req.helpers.json.val(theme, 'dsTheme.request.methods.post', {})
        }
    }
}

module.exports = async (parent, appConfig, req) => {
    return {
        validation:{
            body:await body(parent, appConfig, req),
        },
        request:await request(parent, appConfig, req),
    }
}