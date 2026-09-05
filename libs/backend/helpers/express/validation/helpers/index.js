const valuesmap = (req, res, next) => {
    /*-- item|auth|body|query|params|headers|cookies|envs|merchant|appConfig|multer|utils|validation ---*/

    return {
        body:req.body || {},
        query:req.query || {},
        envs:process.env || {},
        params:req.params || {},
        multer:req.multer || {},
        headers:req.headers || {},
        cookies:req.cookies || {},
        appConfig:req.appConfig || {},
        uitls:req.helpers.json.val(req, 'app.utils', {}),
        auth:req.helpers.session.auth.authDetails(req, res),
        merchant:req.helpers.merchant.details(req, res, next),
        validation:req.helpers.json.val(req, 'runtime.validationConfig', {})
    }
}

exports.valuesmap = valuesmap;