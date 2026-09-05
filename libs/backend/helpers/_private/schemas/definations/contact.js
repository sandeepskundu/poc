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
                "type":await schemas.contact.types.all(req, val(extra, 'type', {})),
                "mapId":await schemas.universal.mongoId(req, val(extra, 'mapId', {})),
                "typeHash":await schemas.universal.hashId(req, val(extra, 'typeHash', {})),
                "email":await schemas.universal.string.encoded(req, val(extra, 'email', {})),
                "mobile":await schemas.universal.string.encoded(req, val(extra, 'mobile', {})),
                "name":await schemas.universal.string.encoded(req, optional(req, extra, 'name'))
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