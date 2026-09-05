const get = async (name, schemas, req, extra) => {
    if(name){
        const val = req.helpers.json.val;
        const isobj = req.helpers.data.type.is(extra, 'object');
        const rval = {
            "collection":{
                "name":name
            },
            "schema":{
                "hashId":await schemas.universal.hashId(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "immutable":true
                        }
                    }
                }, val(extra, 'hashId', {}))),
                "parentId":await schemas.universal.hashId(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "unique":false
                        }
                    }
                }, val(extra, 'parentId', {}))),
                "code":await schemas.universal.text.code(req, {
                    "configs":{
                        "mongodb":{
                            "immutable":true
                        }
                    }
                }),
                "codeHash":await schemas.universal.hashId(req, {
                    "configs":{
                        "mongodb":{
                            "immutable":true
                        }
                    }
                }),
                "name":await schemas.universal.text.title(req, val(extra, 'type', {})),
                "details":await schemas.universal.object(req, val(extra, 'details', {})),
                "exposed":await schemas.universal.exposed(req, val(extra, 'exposed', {})),
                "nameHashId":await schemas.universal.hashId(req, val(extra, 'hashId', {})),
                "hasChilds":await schemas.universal.boolean(req, val(extra, 'hasChilds', {})),
                "description":await schemas.universal.text.description(req, val(extra, 'description', {}))
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