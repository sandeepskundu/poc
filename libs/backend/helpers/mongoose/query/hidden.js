/*-- 
    Hidden Query means, where will not be expected from API payload, like as auth user details, merchant Id details etc. these values will assigned directly from rumtime values and from server side only.
--*/

const rId = (config, model, item, req, res, next) => {
    let id = new req.mdb.db.Types.ObjectId();
    return id.toString()
}

const userId = async (config, model, item, req, res, next) => {
    let ad = req.helpers.session.auth.authDetails(req, res);
    let uId = req.helpers.json.val(ad, 'userId');

    if(uId){
        return uId;
    }else{
        return null //await rId(config, model, item, req, res, next);
    }
}

const merchantId = async (config, model, item, req, res, next) => {
    let md = await req.helpers.merchant.details(req, res, next);
    let mId = await req.helpers.json.val(md, 'id');

    if(mId){
        return mId;
    }else{
        return null; //await rId(config, model, item, req, res, next);
    }
}

const deleted = async (rval, config, model, item, req, res, next) => {
    let type = req.helpers.json.val(config, 'query.hidden.configs.columns.deleted.includes');

        if(type){
            switch (type) {
                case 'all':

                break;
                case 'deleted':
                    rval._deleted = 1;
                break;
                case 'active':
                    rval._deleted = 0;
                break;
                default:
                    rval._deleted = 0;
            }
        }else{
            rval._deleted = 0;
        }

    return rval;
}

const mapByType = async (config, model, item, type, req, res, next) => {
    let rval = {};
    let hid = req.helpers.json.val(config, (type || 'query.hidden.configs.columns'), {});
    let hidl = req.helpers.json.length(hid);
    let isObj = req.helpers.data.type.isObject(hid);

    if(isObj && hid && hidl > 0){
        for(const a in hid){
            let enabled = req.helpers.json.val(hid[a], 'enable');

            if(enabled){
                const k = `_${a}`;
                switch(a) {
                    case 'userId':
                        rval[k] = await userId(config, model, item, req, res, next);
                    break;
                    case 'merchantId':
                        rval[k] = await merchantId(config, model, item, req, res, next)
                    break;
                    default:
                        //code block
                }
            }
        }
    }

    return rval;
}

const get = async (config, model, item, req, res, next) => {
    let rval = await mapByType(config, model, item, 'query.hidden.configs.columns', req, res, next);
        rval = await deleted(rval, config, model, item, req, res, next); // Mapping to get delete items or not.

    return rval;
}

const map = async (config, model, item, req, res, next) => {
    return await mapByType(config, model, item, 'dbConfig.mapHiddenValuesToUpdate', req, res, next);
}


exports.map = map;
exports.get = get;