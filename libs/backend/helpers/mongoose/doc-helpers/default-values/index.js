
const createdby = async (rval, req, res) => {
    let auth = req.helpers.session.auth.authDetails(req, res);
    let uId = await req.helpers.json.val(auth, 'userId');
        rval._createdBy = uId || await req.helpers.json.val(auth, 'anonId');
        
    return rval;
}

const merchantId = async (rval, req, res) => {
    let md = req.helpers.merchant.details(req);
        rval._merchantId = req.helpers.json.val(md, 'id', '');
        
    return rval;
}

const atInsert = async (rval, req, res) => {
    rval = await createdby(rval, req, res);
    rval = await merchantId(rval, req, res);

    return rval;
}

exports.atInsert = atInsert;