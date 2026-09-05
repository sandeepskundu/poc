const otps = require('./opts');
const hash = require('./../../hash');
const channels = require('./channels');
const metaData = require('./meta-data');

const timestamp = (sec, config, req, res) => {
    return (Date.now() + ((sec || 60) * 1000));
}

const validTill = async (config, req, res) => {
    return timestamp(req.helpers.json.val(config, 'configs.expiry', 60), config, req, res);
}

const resentAt = async (config, req, res) => {
    return timestamp(req.helpers.json.val(config, 'configs.resend', 60), config, req, res);
}

const init = async (config, req, res) => {
    let conf = req.helpers.json.copy(config)
    let schema = req.helpers.json.val(conf, 'schema', {});
    let emailHash = await hash.getEmailHash(conf, req, res);
    let mobileHash = await hash.getMobileHash(conf, req, res);
        conf.otp = await otps.create(conf, req, res);

    let rval = req.helpers.json.merge(schema, {
        status:{},
        channels:{},
        otps:conf.otp,
        sentAt:Date.now(), // This will not save in database
        resendAt:await resentAt(conf, req, res),
        validTill:await validTill(conf, req, res),
        metaData:await metaData.create(conf, req, res),
        hashId:await hash.getRecipientsHash(conf, req, res)
	});

    if(emailHash){
        rval.emailHash = emailHash;
    }

    if(mobileHash){
        rval.mobileHash = mobileHash;
    }

    return await channels.map(rval, config, req, res);
}

exports.init = init;