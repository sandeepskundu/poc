const configs = require('./../../common-configs');

const schema = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'dsTheme.model.schema', {});
}

const md5Hash = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'dsTheme.model.md5Hash', {});
}

const signature = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'dsTheme.model.signature.create', {});
}

const valuemap = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'dsTheme.model.valuemap.create', {});
}

const values = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'dsTheme.model.values.create', {});
}

module.exports = async (parent, appConfig, req) => {
    return {
        values:await values(parent, appConfig, req),
        schema:await schema(parent, appConfig, req),
        md5Hash:await md5Hash(parent, appConfig, req),
        valuemap:await valuemap(parent, appConfig, req),
        signature:await signature(parent, appConfig, req),
    }
}