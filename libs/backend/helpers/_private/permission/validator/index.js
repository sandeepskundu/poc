const reqv = require('./request');

/*-- 
    This method validates request data permissons that user has read, write, delete or update permissons.
    To data that is persent in request body.
--*/

const request = async (config, item, req, res, next) => {
    return await reqv.init(config, item, req, res, next)
}

exports.request = request;