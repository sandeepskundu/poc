const utils = process.aioBeLibs('helpers/_private/utils');

const get = async (name, schemas, req, extra) => {
    if(name){
        const val = req.helpers.json.val;
        const isobj = req.helpers.data.type.is(extra, 'object')
        const rval = {
            "collection":{
                "name":name
            },
            "schema":{
                "value":await schemas.universal.mixed(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "default": {
                                "value":null,
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'value', {}))),
                "extend":await schemas.universal.object(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "default": {
                                "value":{},
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'extend', {}))),
                "mapId":await schemas.universal.mongoId(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "unique":false,
                            "default": {
                                "value":null,
                                "enable":true
                            },
                            "required": {
                                "enable":false
                            }
                        }
                    }
                }, val(extra, 'mapId', {}))),
                "key":await schemas.universal.string.key(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "required": {
                                "enable":true
                            },
                            "match":{
                                "enable":true,
                                "value":utils.regex.string.key.value
                            }
                        }
                    }
                }, val(extra, 'key', {}))),
                "name":await schemas.universal.text.title(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "required": {
                                "enable":true
                            },
                            "minLength":{},
                            "maxLength":{
                                "value":50,
                            }
                        }
                    }
                }, val(extra, 'name', {}))),
                "summary":await schemas.universal.text.title(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "required": {
                                "enable":true
                            },
                            "minLength":{},
                            "maxLength":{
                                "value":250,
                            }
                        }
                    }
                }, val(extra, 'summary', {}))),
                "description":await schemas.universal.text.title(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "required": {
                                "enable":true
                            },
                            "minLength":{},
                            "maxLength":{
                                "value":2000,
                            }
                        }
                    }
                }, val(extra, 'description', {}))),
                "keyHash":await schemas.universal.hashId(req, val(extra, 'keyHash', {})),
                "nameHash":await schemas.universal.hashId(req, val(extra, 'nameHash', {})),
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