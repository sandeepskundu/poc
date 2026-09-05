
const configs = require('./../../common-configs');

const schema = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.model.schema', {});
}

const md5Hash = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.model.md5Hash', {});
}

const signature = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.model.signature.create', {});
}

const valuemap = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.model.valuemap.create', {});
}

const values = async (parent, appConfig, req) => {
    return req.helpers.json.val(configs, 'ds.model.values.create', {});
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