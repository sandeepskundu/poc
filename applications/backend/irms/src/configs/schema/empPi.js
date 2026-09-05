const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const optional = () => {
    return {
        "configs":{
            "mongodb":{
                "required":{
                    "value":false,
                    "enable":false,
                }
            }
        }
    }
}

const validation = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
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
            "name":'empInfo'
        },
        "schema":{
            mapId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        'validate':await validation(req)
                    }
                }
            }),
            dob:await schema.date.default(req, {}),
            country:await schema.country.iso3(req, {}),
            marital:await schema.marital.status.all(req, {}),
            gender:await schema.gender.types.default(req, {}),
            photo:await schema.universal.string.encoded(req, optional()),
            name:{
                type:"nested",
                schema:{
                    first:await schema.name.fn(req, {}),
                    middle:await schema.name.mn(req, optional()),
                    last:await schema.name.fn(req, optional(), 'ln'),
                    title:await schema.name.title(req, 'adults', {}),
                }
            }
        }
    };

    return rval;
}