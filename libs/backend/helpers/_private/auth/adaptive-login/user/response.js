const constants = require('./../../constants');

const setMessage = (rval, map, message, req, sucess) => {
    return req.helpers.json.set(rval, map, {
        error:!sucess,
        valid:sucess || false,
        message:message
    })
} 

const invalid = async (type, req, res, valimap) => {
    let vmap = valimap || 'data.body.mobile.number';
    let map = type || 'ACCOUNT_SOMETHING_WENT_WRONG';
    let resp = req.helpers.json.val(constants, `RESPONSES.ERRORS.${map}`);
    let message = req.helpers.json.val(resp, `error.message`);
        resp = setMessage(resp, vmap, message, req);
    
    return resp;
}

const valid =  async (type, req, res, valimap) => {
    let map = type || 'ACCOUNT_SOMETHING_WENT_WRONG';
    let vmap = valimap || 'data.body.email.id';
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

exports.valid = valid;
exports.invalid = invalid;