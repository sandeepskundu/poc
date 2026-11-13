const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const byId = async (req, res, next) => {
    let conf = req.helpers.json.get(req, 'runtime.model.config', {});
    return await mongodb.query.find.init(conf.name, {}, conf, req, res, next);
}

const childById = async (req, res, next) => {
    return await byId(req, res, next)
}

const treeById = async (req, res, next) => {
    let mapId = req.helpers.json.get(req, 'params.id', '');
    let rval = {
        valid: true
    }

    if (mapId) {
        rval = await helpers.chain.getChilds(req, res, mapId);
    }

    if (rval.valid) {
        return await req.helpers.express.response.r200(req, res, next, {
            data:{
                result:await helpers.nested.tree.build(rval.data, mapId, req, res, next)
            }
        });
    } else {
        return await req.helpers.express.response.noResult(req, res, next, {});
    }
}

exports.byId = byId;
exports.treeById = treeById;
exports.childById = childById;