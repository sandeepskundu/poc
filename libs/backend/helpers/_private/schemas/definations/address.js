const get = async (name, schemas, req, extra) => {
    if(name){
        const val = req.helpers.json.val;
        const isobj = req.helpers.data.type.is(extra, 'object')
        const rval = {
            "collection":{
                "name":name
            },
            "schema":{
                "city":await schemas.address.city(req, val(extra, 'city', {})),
                "line1":await schemas.address.line1(req, val(extra, 'line1', {})),
                "line2":await schemas.address.line2(req, val(extra, 'line2', {})),
                "type":await schemas.address.types.all(req, val(extra, 'type', {})),
                "country":await schemas.country.iso3(req, val(extra, 'country', {})),
                "mapId":await schemas.universal.mongoId(req, val(extra, 'mapId', {})),
                "hashId":await schemas.universal.hashId(req, val(extra, 'hashId', {})),
                "state":await schemas.address.states.all(req, val(extra, 'state', {})),
                "pincode":await schemas.address.pincode(req, val(extra, 'pincode', {})),
                "name":await schemas.universal.text.title(req, val(extra, 'name', {})),
                "nameHash":await schemas.universal.hashId(req, val(extra, 'nameHash', {})),
                "landmark":await schemas.address.landmark(req, val(extra, 'landmark', {})),
                "typeHash":await schemas.universal.hashId(req, val(extra, 'typeHash', {})),
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