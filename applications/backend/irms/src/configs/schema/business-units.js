const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const employer = async (req) => {
    return `{
        validator: async function (value) {
            debugger;
            return true;
            //return await helpers.mongoose.validate.document.isexist(this, 'employer', {_id:value}, {})
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
            "name":'businessUnit'
        },
        "schema":{
            "employer":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await employer(req)
                    }
                }
            }),
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