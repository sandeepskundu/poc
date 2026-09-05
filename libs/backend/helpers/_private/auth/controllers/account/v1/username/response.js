const constants = require('./../../../../constants');

const setMessage = (rval, map, message, req) => {
    return req.helpers.json.set(rval, map, {
        error:true,
        valid:false,
        message:message
    })
} 

const rrturn = async (type, req, res) => {
    let map = type || 'ACCOUNT_SOMETHING_WENT_WRONG';
    let resp = req.helpers.json.val(constants, `RESPONSES.ERRORS.${map}`);
    let message = req.helpers.json.val(resp, `error.message`);
        resp = setMessage(resp, 'data.body.username', message, req)
    
    return resp;
}


exports.rrturn = rrturn;