const model = require('./../model')

module.exports = async (req, routeConf, globalConf) => {
    const mconf = await model.compile(req, routeConf, globalConf);

    return {
       name:req.helpers.json.val(mconf, 'name'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
        md5Hash:{
            keyHash:req.helpers.json.val(mconf, 'md5Hash.keyHash'),
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash'),
        }
    }
}