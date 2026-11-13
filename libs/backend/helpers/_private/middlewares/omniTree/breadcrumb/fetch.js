const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const byId = async (req, res, next) => {
    let mapId = req.helpers.json.get(req, 'params.id', '');
    let rval = {
        valid:true
    }

    if(mapId){
        rval = await helpers.chain.getParents(req, res, mapId, 'read');
    }

    if (rval.valid) {
        return await req.helpers.express.response.r200(req, res, next, {
            data:{
                result:await helpers.breadcrumb.list(rval.data, req, res, next)
            }
        });
    } else {
        return await req.helpers.express.response.noResult(req, res, next, {});
    }
}

exports.byId = byId;