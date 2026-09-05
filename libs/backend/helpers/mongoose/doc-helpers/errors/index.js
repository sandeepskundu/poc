
const message = async (err, req, config) => {
    let msg = '';
    let code = req.helpers.json.val(err, 'code', 1);

    switch (`${code}`) {
        case '11000':
            msg = 'Duplicate value is not allowed'
        break;
        default:
            msg = 'Invalid data schema'
    }

    return msg;
}

const vmessage = async (err, req, config, path, fb) => {
    return req.helpers.json.val(config, `validation.errors.${path}.messages.${req.helpers.json.val(err, 'code', 1)}`, fb);
}

const pathmap = async (req, config, path) => {
    return req.helpers.json.val(config, `validation.errors.${path}.mapTo`, path);
}

const vmap = async (req, res, next) => {
    let rval = {};
    let vali = req.helpers.json.val(req, 'runtime.validationConfig.validation', {});

    for(const a in vali){
        rval[a] = rval[a] || {};

        for(const b in vali[a]){
            rval[a][b] = rval[a][b] || true
        }
    }

    return rval;
}

const set = async (rval, error, doc, config, model, list, req, res, next) => {
    config.validation = config.validation || {};

    if(error && rval.valid){
        rval = req.helpers.express.response.getRespByCode(400, req, res, next);
        rval.validationMap = await vmap(req, res, next);
    }

    if(list){
        rval.data = rval.data || [];
        rval.validation = rval.validation || []
    }else{
        rval.data = rval.data || {};
        rval.validation = rval.validation || {};
    }

    let dItem = doc.toJSON?doc.toJSON():doc;

    if(error){
        let vobj = {
            error:true,
            valid:false,
            message:await message(error, req, config)
        };
        let item = {} //doc.toJSON();
        let key = req.helpers.json.val(error, 'errorResponse.keyPattern', {});
        let keys = req.helpers.json.keys(key);
            rval.valid = false;
            rval.status.code = 400;

            if(keys && keys.length > 0 && keys[0]){
                let path = await pathmap(req, config, keys[0]);
                    vobj.message = await vmessage(error, req, config, keys[0], vobj.message);
                    item[path] = vobj;
            }else{
                if(error.name === 'ValidationError' && error.errors){
                    for (const a in error.errors) {
                        let {path} = error.errors[a];
                        let fpath = await pathmap(req, config, req.helpers.json.val(error.errors[a], 'properties.message.path', path));
                            vobj.message = req.helpers.json.val(error.errors[a], 'properties.message.message', vobj.message);
                            item[fpath] = vobj;
                    }
                }else{
                    item.private = vobj;
                }
            }

            if(list){
                rval.data.push(dItem);
                rval.validation.push(item);
            }else{
                rval.data = dItem;
                rval.validation = item;
            }

            delete rval.data
    }else{
        if(list){
            rval.data.push(dItem);
            rval.validation.push({});
        }else{
            rval.data = dItem;
            rval.validation = {};
        }
    }

    return rval;
}

exports.set = set;