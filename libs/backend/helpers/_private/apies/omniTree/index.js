const helpers = require('./../helpers');


const map = {
    'root/v1/list/fetch':require('./root_v1_list_fetch'), // router.get('/nodes/roots', treeController.getRoots);
    'details/v1/byId/fetch':require('./details_v1_byId_fetch'), // router.get('/nodes/:id', treeController.getNodeById);
    'details/v1/node/create':require('./details_v1_node_create'), //router.post('/nodes', treeController.createNode);
    'details/v1/childById/fetch':require('./details_v1_childById_fetch'), //router.get('/nodes/:id/children', treeController.getDirectChildren);
};




exports.get = async (name, req, extend, list, globalConf) => {
    return await helpers.build(name, map, req, extend, list, globalConf)
};