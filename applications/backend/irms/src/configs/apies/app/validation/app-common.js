const validation = process.aioBeLibs('helpers/_private/utils/validations');

const port = async (req) => {
    return await validation.build(req, 'universal.require', {
        "message":{
            "error":{
                "checks":{
                    "port":"Public port is invalid",
                    "required":"Partner port is required."
                }
            }
        },
        "checks":{
            "port":{
                "value":'required'
            }
        }
    })
}

const instances = async (req) => {
    return await validation.build(req, 'universal.require', {
        "message":{
            "error":{
                "checks":{
                    "regex":"No of Instances value is invalid.",
                    "required":"No of Instances are required."
                }
            }
        },
        "checks":{
            "regex":{
                "value":'^(5[0-0]|[1-4][0-9]|[1-9])$'
            }
        }
    })
}

const version = async (req) => {
    return await validation.build(req, 'universal.require', {
        "message":{
            "error":{
                "checks":{
                    "regex":"Please provide app version in valid format",
                }
            }
        },
        "checks":{
            "regex":{
                "value":'^[0-9.]+$'
            }
        }
    })
}

const category = async (req) => {
    return await validation.build(req, 'universal.require', {
        "message":{
            "error":{
                "checks":{
                    "regex":"Please provide a valid category from the list",
                }
            }
        },
        "checks":{
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, [`appConfigs.applicationTypes`], {node:'id', regex:true})
            }
        }
    })
};

module.exports = async (rval, req, type) => {
    let rv = req.helpers.json.merge(rval, {
        "category":await category(req),
        "appInfo.version":await version(req),
        "appConfig.ports.public":await port(req),
        "appConfig.ports.partner":await port(req),
        "appConfig.ports.internal":await port(req),
        "appConfig.ports.scheduler":await port(req),
        "appConfig.applicationType":await category(req),
        "appConfig.instances.public":await instances(req),
        "appConfig.instances.partner":await instances(req),
        "appConfig.instances.internal":await instances(req),
        "appConfig.instances.scheduler":await instances(req),
        "appName":await validation.build(req, 'universal.text.lowerCode'),
        "appInfo.author":await validation.build(req, 'universal.text.lowerCode'),
        "appInfo.description":await validation.build(req, 'universal.text.description'),
        "appConfig.appExposedIn.public":await validation.build(req, 'universal.boolean'),
        "appConfig.appExposedIn.partner":await validation.build(req, 'universal.boolean'),
        "appConfig.appExposedIn.internal":await validation.build(req, 'universal.boolean'),
        "appConfig.appExposedIn.scheduler":await validation.build(req, 'universal.boolean'),
    });

    if(type === 'update'){
        rv = req.helpers.json.merge(rv, {
            "appInfo.appId":await validation.build(req, 'universal.require', {}),
            "appConfig.appEnv":await validation.build(req, 'universal.require', {})
        });
    }

    return rv;
}