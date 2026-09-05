const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const validate = async (req) => {
    return `{
        validator: async function (value) {
            return true;
            return await helpers.mongoose.validate.document.isexist(this, 'businessUnit', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'businessVerticals'
        },
        "schema":{
            "hashId":await schema.universal.hashId(req, {}),
            "code":await schema.universal.text.code(req, {}),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "codeHash":await schema.universal.hashId(req, {}),
            "hasChilds":await schema.universal.boolean(req, {}),
            "description":await schema.universal.text.description(req, {}),
            "parentId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "validate":await validate(req)
                    }
                }
            })
        }
    };

    return rval;
}