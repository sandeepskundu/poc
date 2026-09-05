const verified = require('./../verify');
const collection = require('./../collection');
const encryption = require('./../encryption');

const markAsVerified = async (data, conf, req, res, state, merge) => {
    let model = await collection.get(req, res);
    let id = req.helpers.json.val(data, '_id');
    let item = await verified.set(data, conf, req, res, state);

        if(merge){
            item = req.helpers.json.merge(data, item);
        }

        item = await encryption.encode(item, req);
        item.lastLoginAt = Date.now();
    
        if(model){
            let doc = await model.findOneAndUpdate({_id:id}, {$set:item}, {new:true});

            if(doc){
                doc = doc.toObject();
                doc = await encryption.transform(doc, req, []);
                doc = await encryption.decode(doc, req);
            }

            if(doc){
                return doc;
            } 
        }

    return await encryption.transform(data, req, []);
}

const linkDataAndSave = async (data, conf, req, res, state) => {
    return await markAsVerified(data, conf, req, res, state, true);
}

exports.markAsVerified = markAsVerified;
exports.linkDataAndSave = linkDataAndSave;