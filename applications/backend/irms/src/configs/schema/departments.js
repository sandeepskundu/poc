const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'departments'
        },
        "schema":{
            "hashId":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "immutable":true
                    }
                }
            }),

            "parentId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),
            "isac":await schema.universal.isac(req, {}),
            "code":await schema.universal.text.code(req, {}),
            "codeHash":await schema.universal.hashId(req, {}),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "hasChilds":await schema.universal.boolean(req, {}),
            "description":await schema.universal.text.description(req, {})
        }
    };

    return rval;
}