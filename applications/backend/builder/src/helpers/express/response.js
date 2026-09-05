const respMap = {
    404:{
        "standard":{
            data:false,
            error:{
                code:404,
                description:'resource not found'
            }
        }
    },

    500:{
        "standard":{
            data:false,
            'error':{
                code:500,
                description:'Internal server error.'
            }
        }
    }
}

const getRespByCode = (rc, req, res, next) => {
    const rval = respMap['404'].standard;
    const at = req.helpers.json.val(req, 'appConfig.applicationType');
    let resp = req.helpers.json.val(respMap, `${rc}.${at}`);

    if(!resp){
        resp = req.helpers.json.val(respMap, `${rc}.standard`)
    }
    
    return resp || rval;
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

const r404 = (req, res, next) => {
    console.log('404')
    respByCode(404, req, res, next)
};




exports.send = send;
exports.exit = r404;
exports.r500 = r500;
exports.r404 = r404;
exports.noFound = noFound;
exports.respByCode = respByCode;