const utils = process.aioBeLibs('helpers/_private/utils');

const enums = async (req, enums, dvalue) => {
    return {
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "default":{
                    "enable":true,
                    "value":`'${dvalue || ''}'`
                },
                "match":{
                    "enable":true,
                    "message":"",
                    "value":await req.helpers.enums.builder.async.init(req, enums, {node:'id', regex:true})
                }
            }
        }
    }
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
                "action":(req, req.helpers.json.merge(await enums(req, ['audit.actions.defaults'], ''), val(extra, 'schema.action', {}))),
                "changedBy":await schemas.universal.text.key(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "default": {
                                "value":'',
                                "enable":true
                            },
                            "required": {
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'schema.changedBy', {}))),
                "previous":await schemas.universal.object(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "default": {
                                "value":null,
                                "enable":true
                            },
                            "required": {
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'schema.previous', {}))),
                "current":await schemas.universal.object(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            "default": {
                                "value":null,
                                "enable":true
                            },
                            "required": {
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'schema.current', {}))),
                "nodeId":await schemas.universal.mongoId(req, req.helpers.json.merge({
                    "configs":{
                        "mongodb":{
                            //index:true,
                            "unique":false,
                            "required": {
                                "enable":true
                            }
                        }
                    }
                }, val(extra, 'schema.nodeId', {}))),
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