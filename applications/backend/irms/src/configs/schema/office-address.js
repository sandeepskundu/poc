const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const employer = async (req, coll) => {
    return `{
        validator: async function (value) {
            debugger;
            return true;
            return await helpers.mongoose.validate.document.isexist(this, 'employer', {hashId:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected employer is not valid, please select a valid and try again."
        }),
    }`
}


module.exports = async (private, appConfig, req) => {
    return {
        "type":false,
        "typeHash":false,
        "mapId":await schema.universal.mongoId(req, {
            "configs":{
                "mongodb":{
                    "unique":false,
                    "immutable":true,
                    'validate':await employer(req)
                }
            }
        })
    }
}