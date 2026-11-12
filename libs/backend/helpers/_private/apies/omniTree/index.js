const helpers = require('./../helpers');


const map = {
    'details/v1/node/create':require('./details_v1_node_create'), // router.post('/nodes', treeController.createNode);
};




exports.get = async (name, req, extend, list, globalConf) => {
    return await helpers.build(name, map, req, extend, list, globalConf)
};