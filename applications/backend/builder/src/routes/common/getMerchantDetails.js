
const rData = {
    "valid":true,
    "code":"AIO_PVT_LTD",
    "name":"AIO online Pvt Ltd.",
    "id":"fd9c3721-6816-425b-94c9-422a02ee594d",
    "description":"Something about online pvt Ltd."
}

const detailsById = async (merchantId, req, res, next, sendResp) => {
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
    await detailsById(req.envProps.MERCHANT_ID, req, res, next, true)   
}

exports.detailsById = detailsById;
exports.routeAction = routeAction;