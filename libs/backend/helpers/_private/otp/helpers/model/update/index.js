const dmaker = require('./../data');
const collection = require('./../colletion');

const deleteOld = async (data, req, res, progress) => {
    let model = await collection.model(req, res);
    let md = req.helpers.merchant.details(req, res, null);

    await model.updateMany({
        _deleted:0,
        progress:"SENT",
        hashId:data.hashId,
       //validTill:{$gt:new Date()},
        _merchantId:req.helpers.json.val(md, 'id', '')
    }, {
        $set:{ 
            _deleted:1,
            progress:progress || 'RESENT',
            _updated:Date.now(),
        }
    });
}

const makeAsVerified = async (data, req, res) => {
     let item = {
        status:{},
        _deleted:1,
        progress:'VALIDATED'
    };
    let model = await collection.model(req, res);
    let md = req.helpers.merchant.details(req, res, null);
    let dotps = await req.helpers.json.val(data, 'otps', {});

    for(const a in dotps){
        item.status[a] = 'VERIFIED';
    }

    await model.updateMany({
        _deleted:0,
        hashId:data.hashId,
        _merchantId:req.helpers.json.val(md, 'id', '')
    }, {
        $set:await dmaker.encodeData(item, req, res)
    });
}



exports.deleteOld = deleteOld;
exports.makeAsVerified = makeAsVerified;