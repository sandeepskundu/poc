
const rData = {
    "local":{
        enabled:true,
        ips:{
            range:[],
            list:[]
        }
    }
}

const getEnvsByMerchantId = async (merchantId, req, res, next, sendResp) => {
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
    await getEnvsByMerchantId(req.envProps.MERCHANT_ID, req, res, next, true)   
}

exports.getEnvsByMerchantId = getEnvsByMerchantId;
exports.routeAction = routeAction;