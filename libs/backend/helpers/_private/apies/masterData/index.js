const helpers = require('./../helpers');
const map = {
    'details/v1/root/fetch':require('./details_v1_root_fetch'),
    'details/v1/root/create':require('./details_v1_root_create'),
    'details/v1/rootById/update':require('./details_v1_rootById_update'),
    'details/v1/info/create':require('./details_v1_info_create'),
    'details/v1/info/update':require('./details_v1_info_update'),
    'details/v1/child/create':require('./details_v1_child_create'),
    'details/v1/child/update':require('./details_v1_child_update'),
    'details/v1/getByHashId/fetch':require('./details_v1_getByHashId_fetch'),
    'details/v1/getByParentId/fetch':require('./details_v1_getByParentId_fetch'),
};


exports.get = async (name, req, extend, list) => { return await helpers.build(name, map, req, extend, list) };