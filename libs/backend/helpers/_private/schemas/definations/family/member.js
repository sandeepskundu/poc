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
                "dob":await schemas.date.default(req, val(extra, 'dob', {})),
                "mapId":await schemas.universal.mongoId(req, val(extra, 'mapId', {})),
                "name":await schemas.universal.string.encoded(req, val(extra, 'name', {})),
                "relation":await schemas.family.relations.all(req, val(extra, 'relation', {})),
                "photo":await schemas.universal.string.encoded(req, optional(req, extra, 'photo'))
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