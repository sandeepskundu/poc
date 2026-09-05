
const rData = {
    "valid":true,
    "id":"6738829afbe779c7746626aa",
    "name":"Sandeep Kundu"
}

const validateMerchantUserbyIds = async (merchantId, userId, env, req, res, next, sendResp) => {
    const resp = rData

    if(sendResp){
        if(resp){
            req.helpers.express.response.send('json', {
                data:resp,
                error:false
            }, 200, req, res, next)
        }else{
            req.helpers.express.response.send('json', {
                data:null,
                error:true
            }, 404, req, res, next)
        }
    }else{
        return resp
    }
    
}


const routeAction = async (req, res, next) => {
    await validateMerchantUserbyIds(req.envProps.MERCHANT_ID, req.envProps.MERCHANT_USER_ID, req.envProps.MERCHANT_APP_ENVIRONMENT, req, res, next, true)   
}

exports.validateMerchantUserbyIds = validateMerchantUserbyIds;
exports.routeAction = routeAction;