const model = require('./../model');

module.exports = async (req) => { 
    return {
        response:model.response,
        query:model.query.getByCate,
        permissions:model.permissions,
        signature:model.signature.create,           
    }
}