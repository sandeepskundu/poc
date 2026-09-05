const email = async (rval, data, conf, req, res) => {
    let edata = req.helpers.json.val(data, 'email');
    let verified = req.helpers.json.val(conf, 'verifiedBy.email');

    if(edata && edata.id && verified){
        edata.verified = true;
        rval.email = edata;
    }

    return rval;
}

const mobile = async (rval, data, conf, req, res) => {
    let mdata = req.helpers.json.val(data, 'mobile');
    let otp = req.helpers.json.val(conf, 'verifiedBy.sms');
    let whatsapp = req.helpers.json.val(conf, 'verifiedBy.whatsapp');

    if(mdata && mdata.number && (otp || whatsapp)){
        mdata.verified = mdata.verified || {};

        if(otp){
            mdata.verified.otp = true
        }

        if(whatsapp){
            mdata.verified.whatsapp = true
        }

        rval.mobile = mdata;
    }

    return rval;
}

const set = async (data, conf, req, res, state) => {
    let rval = await email({
        isActive:true,
    }, data, conf, req, res);

    if(state){
        rval.state = state
    }

    return await mobile(rval, data, conf, req, res);
}

exports.set = set;