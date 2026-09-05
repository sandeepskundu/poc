const utils = process.aioBeLibs('helpers/_private/utils');

const model = async (req, res) => {
    let name = req.helpers.json.val(utils, 'constants.otp.OTP_COLLECTION_NAME');
        name = name.toLowerCase();
    return req.helpers.json.val(req, `mdb.models.${name}`)
}

exports.model = model;