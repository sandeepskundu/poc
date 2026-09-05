
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        query:req.helpers.json.val(mconf, 'query.itemIdAndType'),

        access:{
            request:{
                enable:false,
                configs:{
                    params:{
                        id:{
                            enable:true,
                            message:{
                                error:"Error - updated",
                                success:"Success"
                            }
                        }
                    }
                }
            }
        }
    }
};