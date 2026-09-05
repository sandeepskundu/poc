const {detailsById} = require('./getMerchantDetails')

const routeAction = async (req, res, next) => {
    await detailsById(req.params.merchantId, req, res, next, true);
}

exports.routeAction = routeAction;