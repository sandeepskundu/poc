const utils = process.aioBeLibs('helpers/_private/utils');

const get = async (req, res, type) => {
    const conf = req.helpers.json.val(utils, 'constants.otp.MODEL_CONFIGS.COMMON', {});
    const tconf = req.helpers.json.val(utils, `constants.otp.MODEL_CONFIGS.${type}`, {});

    return req.helpers.json.merge(conf, tconf);
}

exports.get = get;