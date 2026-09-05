const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'employer'
        },
        "schema":{
            "hashId":await schema.universal.hashId(req, {}),
            "code":await schema.universal.text.code(req, {}),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "codeHash":await schema.universal.hashId(req, {}),
            "description":await schema.universal.text.description(req, {}),
        }
    };

    return rval;
}