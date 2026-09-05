const constants = require('./../../../../constants');

const setMessage = (rval, map, message, req, sucess) => {
    return req.helpers.json.set(rval, map, {
        error:!sucess,
        valid:sucess || false,
        message:message
    })
} 

const notFoundByType = async (type, req, res, valimap) => {
    let resMap = {
        'email-with-otp':'ACCOUNT_NOT_FOUND_BY_EMAIL',
        'mobile-with-otp':'ACCOUNT_NOT_FOUND_BY_MOBILE',
        'email-with-password':'ACCOUNT_NOT_FOUND_BY_EMAIL',
        'mobile-with-password':'ACCOUNT_NOT_FOUND_BY_MOBILE',
        "username-with-password":'ACCOUNT_NOT_FOUND_BY_USERNAME',
        'username-with-email-otp':'ACCOUNT_NOT_FOUND_BY_USERNAME',
        'username-with-mobile-otp':'ACCOUNT_NOT_FOUND_BY_USERNAME'
    };
    
    let vmap = valimap || 'data.body.identifier';
    let map = resMap[type] || (type || 'ACCOUNT_SOMETHING_WENT_WRONG');
    let resp = req.helpers.json.val(constants, `RESPONSES.ERRORS.${map}`);
    let message = req.helpers.json.val(resp, `error.message`);
        resp = setMessage(resp, vmap, message, req);
    
    return resp;
}

const returnResp =  async (type, req, res, valimap) => {
    let map = type || 'ACCOUNT_SOMETHING_WENT_WRONG';
    let vmap = valimap || 'data.body.identifier';
    let resp = req.helpers.json.val(constants, `RESPONSES.SUCESS.${map}`);
        message = req.helpers.json.val(resp, `status.message`);

    if(resp){
        resp = setMessage(resp, vmap, message, req);
        resp = req.helpers.express.response.getRespByCode(200, req, res, null, resp)
    }else{
        resp = req.helpers.json.val(constants, `RESPONSES.ERRORS.${map}`);
        message = req.helpers.json.val(resp, `error.message`);
        resp = setMessage(resp, vmap, message, req);
    }
    
    return resp;
}

exports.returnResp = returnResp;
exports.notFoundByType = notFoundByType;