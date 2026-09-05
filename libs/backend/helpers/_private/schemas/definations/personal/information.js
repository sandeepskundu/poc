const optional = (req, extra, type) => {
    return req.helpers.json.merge({
        configs:{
            mongodb:{
                "required":{
                    "enable":false,
                }
            }
        }
    }, req.helpers.json.val(extra, type, {}));
}

const get = async (name, schemas, req, extra) => {
    if(name){
        const val = req.helpers.json.val;
        const isobj = req.helpers.data.type.is(extra, 'object')
        const rval = {
            "collection":{
                "name":name
            },
            "schema":{
                "doj":await schemas.date.doj(req, val(extra, 'doj', {})),
                "dob":await schemas.date.default(req, val(extra, 'dob', {})),
                "country":await schemas.country.iso3(req, val(extra, 'country', {})),
                "mapId":await schemas.universal.mongoId(req, val(extra, 'mapId', {})),
                "gender":await schemas.gender.types.all(req, val(extra, 'gender', {})),
                "name":await schemas.universal.string.encoded(req, val(extra, 'name', {})),
                "marital":await schemas.marital.status.all(req, val(extra, 'marital', {})),
                "photo":await schemas.universal.string.encoded(req, optional(req, extra, 'photo')),
                
            }
        };

        if(isobj){
            return req.helpers.json.merge(rval, extra);
        }else{
            return rval;
        }
    }else{
        return false
    }
}

exports.get = get;