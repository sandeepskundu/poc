const utils = process.aioBeLibs('helpers/_private/utils');

const get = async (req, type, extra) => {
    let msg = req.helpers.json.val(utils, `regex.address.${type}.message`, '');

    return req.helpers.json.merge({
        "type":`string`,
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":msg
                },
                "match":{
                    "enable":true,
                    "message":msg,
                    "value":`${req.helpers.json.val(utils, `regex.address.${type}.value`)}`
                },
                "default":{
                    "enable":true,
                    "value":null
                }
            }
        }
    }, (extra || {}));
}

exports.types = require('./types');
exports.states = require('./states');
exports.city = async (req, extra) => {return await get(req, 'city', extra)};
exports.line1 = async (req, extra) => {return await get(req, 'line1', extra)};
exports.line2 = async (req, extra) => {return await get(req, 'line2', extra)};
exports.pincode = async (req, extra) => {return await get(req, 'pincode', extra)};
exports.landmark = async (req, extra) => {return await get(req, 'landmark', extra)};