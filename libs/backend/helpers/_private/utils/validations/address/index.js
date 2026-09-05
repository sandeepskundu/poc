const utils = process.aioBeLibs('helpers/_private/utils');

const get = async (req, type) => {
    const msg = req.helpers.json.val(utils, `regex.address.${type}.message`);
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "regex":{
                "value":req.helpers.json.val(utils, `regex.address.${type}.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.types = require('./types');
exports.states = require('./states');
exports.city = async (req) => {return await get(req, 'city')};
exports.line1 = async (req) => {return await get(req, 'line1')};
exports.line2 = async (req) => {return await get(req, 'line2')};
exports.pincode = async (req) => {return await get(req, 'pincode')};
exports.landmark = async (req) => {return await get(req, 'landmark')};