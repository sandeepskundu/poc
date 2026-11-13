const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const mapId = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.mongoId', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), (extra || {}))
}

const name = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minlength":{
                "value":4
            },
            "maxlength":{
                "value":50
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const description = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "minlength":{
                "value":4
            },
            "maxlength":{
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
            "minlength":{
                "value":4
            },
            "maxlength":{
                "value":250
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const key = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.key', {
        "checks":{
            "minlength":{
                "value":2
            },
            "maxlength":{
                "value":100
            },
            "required":{
                "value":"required"
            }
        }
    }), (extra || {}))
}

const details = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.object', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), (extra || {}))
}

const value = async (req, extra) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.require', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), (extra || {}))
}

exports.key = key;
exports.name = name;
exports.value = value;
exports.mapId = mapId;
exports.details = details;
exports.summary = summary;
exports.description = description;
exports.compile = require('./compile');