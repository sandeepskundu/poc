const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const dbId = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.mongoId', {
        "checks":{
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const name = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minLength":{
                "value":4
            },
            "maxLength":{
                "value":40
            },
            "required":{
                "value":"required"
            },
            "regex":{
                "value":utils.regex.string.key.value
            }
        }
    }), (extra || {}))
}

const description = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minLength":{
                "value":4
            },
            "maxLength":{
                "value":2000
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const summary = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minLength":{
                "value":4
            },
            "maxLength":{
                "value":250
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const displayName = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minLength":{
                "value":4
            },
            "maxLength":{
                "value":100
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

exports.name = name;
exports.dbId = dbId;
exports.summary = summary;
exports.displayName = displayName;
exports.description = description;