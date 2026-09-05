const model = require('./../model');

module.exports = async (req) => { 
    return {
        response:model.response,
        query:model.query.getById,
        signature:model.signature.create,
    }
}