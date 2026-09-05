const pagination = require('./pagination');
const validator = process.aioBeLibs('helpers/_private/permission/validator');
const permission = process.aioBeLibs('helpers/_private/permission/validation');

const getModel = async (req, res, next) => {
    const m = req.helpers.json.val(req, 'dbUtils.model');
    return m || await req.helpers.express.docs.json.get('model', req, res, next);
}

const start = async (model, req, res, next) => {
    let data = null;
    let config = await getModel(req, res, next);
    let pvv = await validator.request(config, {}, req, res, next);

    if(pvv.valid){
        let pagi = await req.helpers.json.val(config, 'pagination.enable');

        if(pagi){
            data = await pagination.start(config, model, req, res, next);
        }else{
            let qpObj = await req.helpers.mongoose.query.build(config, model, {}, {}, req, res, next);

            if(qpObj.valid){
                try {
                    let docs = await model.find(qpObj.data);

                    if(docs && docs.length > 0){
                        data = {
                            valid:true,
                            data:{
                                result:await permission.data.start(docs, config, model, {}, req, res, next)
                            }
                        };
                    }else{
                        data = await req.helpers.express.response.getRespByCode(404, req, res, next, {
                            error:{
                                code:'RESULT_NOT_FOUND',
                                description:'Results not found'
                            } 
                        });
                    }
                }catch(err) {
                    console.log(err);
                }
            }else{
                data = await req.helpers.express.response.getRespByCode(404, req, res, next, {
                    error:{
                        code:'RESULT_NOT_FOUND',
                        description:'Results not found'
                    } 
                });
            }
        }

        if(data && data.valid){
            let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
                rval.data = data.data;
            return rval;
        }else{
            return data;
        }
    }else{
        return pvv;
    }
}

exports.start = start;
exports.pagination = pagination;