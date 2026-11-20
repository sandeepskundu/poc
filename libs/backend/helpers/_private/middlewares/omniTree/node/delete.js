const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const signature = async (item, req, res, next) => {
    let sign = await req.helpers.mongoose.docHelpers.signature.decode({
        signature:req.helpers.json.val(item, 'signature', {})
    }, req, res, next);

    if(req.helpers.json.length(sign || {}) > 0){
        return {
            data:{...sign},
            valid:true
        }
    }else{
        return {
            data:item,
            valid:false
        }
    }
}

const byId = async (req, res, next) => {
    let item = await signature(req.helpers.json.get(req, 'body.data', {}), req, res, next);

    if(item.valid){
        let rv = await helpers.chain.getChilds(req, res, req.helpers.json.get(item, 'data._id', ''));
        let li = req.helpers.json.get(rv, 'data', []);

        if(li && li.length > 0){
            await mongodb.query.utils.deleteById(li, await mongodb.query.utils.getModel(false, req), false, req);

            return await req.helpers.express.response.getRespByCode(200, req, res, next, {});
        }else{
            return await req.helpers.express.response.getRespByCode(404, req, res, next, {
                error:{
                    code:'RESULT_NOT_FOUND',
                    description:'Results not found'
                } 
            });
        };
    }

    return req.helpers.express.response.getRespByCode(400, req, res, next, {});
}

const childById = async (req, res, next) => {
    return await byId(req, res, next)
}

exports.childById = childById;