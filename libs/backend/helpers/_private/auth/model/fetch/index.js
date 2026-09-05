const collection = require('./../collection');
const encryption = require('./../encryption');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const decrypt = async (arg, req, res) => {
    return await encryption.decode(arg, req);
}

const fetch = async (arg, req, res) => {
    let model = await collection.get(req, res);

    if(model){
        let md = req.helpers.merchant.details(req, res, null);
        let query = req.helpers.json.merge({
            _deleted:0,
            _merchantId:req.helpers.json.val(md, 'id', '')
        }, (arg || {}));

        let details = await model.findOne(query);
        
        if(details){
            details = details.toObject();
            details = await decrypt(details, req, res);
        }
        
        return details;
    }else{
        return null;
    }
   
}

const fetchById = async (id, req, res) => {
    return await fetch({_id:id}, req, res);
}

const fetchByEmailHash = async (hashId, req, res) => {
    return await fetch({emailHash:hashId}, req, res);
}

const fetchByMobileHash = async (hashId, req, res) => {
    return await fetch({mobileHash:hashId}, req, res);
}

const fetchAuthDetails = async (id, req, res) => {
    let ad = await fetchById(id, req, res);

    if(ad){
        return await encryption.transform(ad, req);
    }else{
        return null
    }
}

const getEmployement = async (req, uId) => {
    let userId = uId;

    if(uId && uId.length != 25){

    }else{
        let ad = await session.details(req);
            userId = ad.userId;
    }

    let infos = await mongodb.query.find.refined('employmentInfo', {mapId:userId}, qp, req, false, false);
    let details = req.helpers.json.val(infos, '0', {});
    let detailsLen = req.helpers.json.length(details);

    if(detailsLen > 0){
        return {
            bu:req.helpers.json.val(details, 'bu', ''),
            bv:req.helpers.json.val(details, 'bv', ''),
            employer:req.helpers.json.val(details, 'employer', ''),
            employedBy:req.helpers.json.val(details, 'employedBy', ''),
            department:req.helpers.json.val(details, 'department', ''),
            designation:req.helpers.json.val(details, 'designation', '')
        }
    }

    return {}
}

const rolebaseAccessHash = async (req, ed) => {
    let md = req.helpers.merchant.details(req);
    let bu = req.helpers.json.val(ed, 'bu', '');
    let bv = req.helpers.json.val(ed, 'bv', '');
    let dep = req.helpers.json.val(ed, 'department', '');
    let emplyr = req.helpers.json.val(ed, 'employer', '');
    let des = req.helpers.json.val(ed, 'designation', '');
    let hmap = [md.id, emplyr, dep, des, bu, bv];

    return req.helpers.crpt.md5(hmap.join('_'));
}

const addProfile = async (rval, req, res) => {
    let md = req.helpers.merchant.details(req);
    let ed = await getEmployement(req, rval.id);

        rval.uIds = {
            merchant:md.id,
            employer:req.helpers.json.val(ed, 'employer', md.id),
            rolebaseAccessHash:await rolebaseAccessHash(req, ed)
        }

    return rval;
}

const fetchProfile = async (id, req, res) => {
    let ad = await fetchAuthDetails(id, req, res);

    if(ad){
        return await addProfile(ad, req, res);
    }else{
        return null;
    }
}

exports.decrypt = decrypt;
exports.fetchById = fetchById;
exports.addProfile = addProfile;
exports.fetchProfile = fetchProfile;
exports.getEmployement = getEmployement;
exports.fetchAuthDetails = fetchAuthDetails;
exports.fetchByEmailHash = fetchByEmailHash;
exports.fetchByMobileHash = fetchByMobileHash;
exports.rolebaseAccessHash = rolebaseAccessHash;