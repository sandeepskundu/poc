const session = process.aioBeLibs('helpers/_private/session');

const marchentId = async (req) => {
    let md = await req.helpers.merchant.details(req);
    
    return md.id;
}

const hash = async (req, arg) => {
    return await req.helpers.crypto.md5(arg.join('_'))
}

const getByUserId = async (req, userId) => {
    if(userId){
        return hash(req, [await marchentId(req), userId]);
    }else{
        return false;
    }
}

const getByAuthToken = async (req) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return hash(req, await getByUserId(req, ad.userId));
    }else{
        return false;
    }
}

exports.getByUserId = getByUserId;
exports.getByAuthToken = getByAuthToken;