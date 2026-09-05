const cookie = require('./cookie');
const existing = require('./existing');
const channels = require('./channels');
const recipients = require('./recipients');

const init = async (config, otpData, req, res) => {
    let rval = await recipients.init(config, req, res);

    if(rval.valid){
        let cv = await channels.init(config, req, res);
            rval.validation = req.helpers.json.merge(rval.validation || {}, req.helpers.json.val(cv, 'validation', {}));
    }

    if(rval.valid){
        rval = await cookie.init(config, 'create', otpData, req, res);
    }

    return rval;
}

exports.init = init;
exports.cookie = cookie;
exports.existing = existing;
exports.recipients = recipients;