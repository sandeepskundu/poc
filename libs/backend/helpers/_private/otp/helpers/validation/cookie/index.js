const create = require('./create');
const cookie = require('./../../cookie');

const get = async (config, req, res)  => {
    return await cookie.getValue({
        cookieHash:req.helpers.json.val(config, 'configs.cookieHash')
    }, req, res);
}

const init = async (config, type, otpData, req, res) => {
    const cookie = await get(config, req, res);

    switch (type) {
        case 'create':
            return await create.validate(cookie, config, otpData, req, res)
        break;
        case 'resend':
        break;
        case 'validate':
        break;
    }

}

exports.init = init;