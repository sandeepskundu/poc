const dmaker = require('./../data');
const collection = require('./../colletion');

const getDetailsByHash = async (hashId, req, res) => {
    let model = await collection.model(req, res);
    let md = req.helpers.merchant.details(req, res, null);
    let details = await model.findOne({
        _deleted:0,
        hashId:hashId,
        progress:"SENT",
        validTill:{$gt:new Date()},
        _merchantId:req.helpers.json.val(md, 'id', '')
    });

    if(details){
        details = details.toObject();
        details = await dmaker.decodeData(details, req, res);
    }

    return details;
}

const getDetailsToValidateOtp = async (hashId, req, res) => {
    let model = await collection.model(req, res);
    let md = req.helpers.merchant.details(req, res, null);
    let details = await model.findOne({
        _deleted:0,
        hashId:hashId,
        progress:"SENT",
        _merchantId:req.helpers.json.val(md, 'id', '')
    }).sort({createdAt:-1}).exec();

    if(details){
        details = details.toObject();
        details = await dmaker.decodeData(details, req, res);
    }

    return details;
}


exports.getDetailsByHash = getDetailsByHash;
exports.getDetailsToValidateOtp = getDetailsToValidateOtp;