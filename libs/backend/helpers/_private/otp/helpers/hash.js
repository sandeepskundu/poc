const getValue = async (conf, map, req) => {
    let dv = req.helpers.random.uuid();
    let val = req.helpers.json.val(conf, map, dv);
    if(val && val != dv){
        return val;
    }else{
        return ''
    }
}

const md5Hash = async (rval, req) => {
    rval = rval.join('');

    if(rval && rval.length > 0){
        return req.helpers.crypto.md5(req.aioHd.apiHash+rval);
    }else{
        return '';
    }  
}

const getMobileHash =  async (conf, req, res) => {
    return await md5Hash([
        await getValue(conf, 'recipients.mobile.isd', req),
        await getValue(conf, 'recipients.mobile.iso2', req),
        await getValue(conf, 'recipients.mobile.iso3', req),
        await getValue(conf, 'recipients.mobile.number', req)
    ], req) 
}

const getEmailHash =  async (conf, req, res) => {
    return await md5Hash([
        await getValue(conf, 'recipients.email', req)
    ], req)     
}

const getRecipientsHash = async (conf, req, res) => {
    return await md5Hash([
        await getValue(conf, 'recipients.mobile.isd', req),
        await getValue(conf, 'recipients.mobile.iso2', req),
        await getValue(conf, 'recipients.mobile.iso3', req),
        await getValue(conf, 'recipients.mobile.number', req),
        await getValue(conf, 'recipients.email', req)
    ], req) 
}

exports.getEmailHash = getEmailHash;
exports.getMobileHash = getMobileHash;
exports.getRecipientsHash = getRecipientsHash;