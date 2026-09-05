const publicApiHeaders = require('./public-api-headers');

const validate = (vConfig, req, res, next) => {
    const headersV = req.helpers.json.get(vConfig, 'headers', {});
    const authType = req.helpers.json.get(vConfig, 'auth.type', '');
    /*--{
        "channelid":{
            "enums":{
                "ios":true,
                "web":true,
                "mweb":true,
                "android":true
            },
            "required":"required",
            "message":{
                "error":"channelid is not valid input",
                "success":"Only put method is allowed"
            }
        },
        
        "traceid":{},
        "clientid":{},
        "signatureid":{},
        "subscriptionid":{}
    }--*/

    switch(authType) {
        case 's2s':
            debugger;
        break;
        case 'partner':
            debugger;
        break;
        case 'public':
            return publicApiHeaders.validate(headersV, req, res, next);
        break;
        default:
            return publicApiHeaders.validateResp({}, false, 'You are not authorized user to init this request.');
    }
}

exports.validate = validate;