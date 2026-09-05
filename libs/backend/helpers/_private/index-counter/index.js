{

}

const utils = process.aioBeLibs('helpers/_private/utils');
const colname = utils.constants.db.COUNTER_INDEX_COLLECTION_NAME;

const getNext = async (req, name) => {
    if(name){
        const col = colname.toLowerCase();
        const hashId = req.helpers.crypto.md5(name);
        const md = req.helpers.merchant.details(req);

        if(col && req.mdb && req.mdb.models && req.mdb.models[col]){
            const result = await req.mdb.models[col].findOneAndUpdate(
                {
                    hashId:hashId
                }, {
                    $inc:{
                        sequence:1
                    },
                    $set:{
                        hashId:hashId,
                        _merchantId:req.helpers.json.val(md, 'id', '')
                    }
                }, {
                    returnDocument:'after',
                    upsert:true
            });

            if(result.sequence){
                return result.sequence;
            }
        }
    }
    
    return null
}

exports.getNext = getNext;