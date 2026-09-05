const respMap = {
    200:{
        "standard":{
            data:false,
            valid:true,
            status:{
                code:200,
                rcode:""
            },
            error:null
        }
    },
    400:{
        "standard":{
            data:false,
            valid:false,
            status:{
                code:400,
                rcode:"INVALID_REQ_DATA"
            },
            error:{
                rcode:"",
                code:'INVALID_REQ_DATA',
                description:'invalid request format'
            }
        }
    },
    404:{
        "standard":{
            data:false,
            valid:false,
            status:{
                code:404,
                rcode:""
            },
            error:{
                rcode:"",
                code:'RESOURCE_NOT_FOUND',
                description:'resource not found'
            }
        }
    },
    500:{
        "standard":{
            data:false,
            valid:false,
            status:{
                code:500,
                rcode:""
            },
            'error':{
                code:500,
                rcode:"",
                description:'Internal server error.'
            }
        }
    }
}

const getRespByCode = (rc, req, res, next, data) => {
    const rval = respMap['404'].standard;
    const at = req.helpers.json.val(req, 'appConfig.applicationType');
    let resp = req.helpers.json.val(respMap, `${rc}.${at}`);

    if(!resp){
        resp = req.helpers.json.val(respMap, `${rc}.standard`)
    }
    
    return req.helpers.json.merge((resp || rval), (data || {}));
}

const respByCode = (code, req, res, next, resp) => {
    const rc = code || 404;
    const rd = resp || getRespByCode(rc, req, res, next);
        res.status(rc).send(rd);
}

const noFound = (type, data, req, res, next) => {
    const resp = data || getRespByCode(404, req, res, next);
    switch (type) {
        case 'json':
            res.status(404).send(resp);
        break;
        default:
            res.writeHead(404);
            res.write('File not found');
            res.end();
    };
}

const send = (type, data, status, req, res, next) => {
    const respCode = status || 200;
    const resp = data || {};

    switch (type) {
        case 'json':
            res.status(respCode).send(resp);
        break;
        default:
            res.status(respCode).send(resp);
    };
}

const r500 = (req, res, next) => {respByCode(500, req, res, next)};

const r404 = (req, res, next) => {respByCode(404, req, res, next)};

const noResult = (req, res, next, resp) => {
    let d = getRespByCode(404, req, res, next, {
        error:{
            code:'RESULT_NOT_FOUND',
            description:'Results not found'
        } 
    });

    return req.helpers.json.merge(d, (resp || {}));
}

const noAccess = (req, res, next, resp) => {
    let d = getRespByCode(400, req, res, next, {
        error:{
            code:'ACCESS_NOT_GRANTED',
            rcode:'ACCESS_NOT_GRANTED',
            message:"You are not authorized to perform this action. Please request for required access.",
        },
        status:{
            rcode:'ACCESS_NOT_GRANTED'
        }
    });

    return req.helpers.json.merge(d, (resp || {}));
}

exports.send = send;
exports.exit = r404;
exports.r500 = r500;
exports.r404 = r404;

exports.noFound = noFound;
exports.noResult = noResult;
exports.noAccess = noAccess;
exports.respByCode = respByCode;
exports.getRespByCode = getRespByCode;