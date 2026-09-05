const SECRET_VAL = 'CZKPR2199J'

const secret = async (req, res, next) => {
    const md = await req.helpers.merchant.details(req, res, next);
    return await req.helpers.json.val(md, 'id', SECRET_VAL)
}

const en = async (value, req, res, next) => {
    return await req.helpers.crypto.en(value, await secret(req, res, next));
}

const de = async (value, req, res, next) => {
    let token = await req.helpers.crypto.de(value, await secret(req, res, next));

    return await req.helpers.jwt.verify(token)
}

exports.en = en;
exports.de = de;