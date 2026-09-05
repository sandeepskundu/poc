const cbv = 'NO_VALUE_DEFINED';
const operation = require('./operation');

const dvalue = async (qObj, config, model, item, req, res, next) => {
    let vconf = await req.helpers.json.val(qObj, 'value', {});
    return await req.helpers.json.val(vconf, 'fallback', cbv);
};

const getValueFrom = async (node, qObj, config, model, item, req, res, next, type) => {
    let bdata = await req.helpers.json.val(req, type, {});
    return await req.helpers.json.val(bdata, node, await dvalue(qObj, config, model, item, req, res, next));
}

const bodyItem = async (node, qObj, config, model, item, req, res, next) => {
    return await req.helpers.json.val(item, node, await dvalue(qObj, config, model, item, req, res, next));
}

const auth = async  (node, qObj, config, model, item, req, res, next) => {
    const ad = await req.helpers.session.auth.authDetails(req, res);
    return await req.helpers.json.val(ad, node, await dvalue(qObj, config, model, item, req, res, next));
}

const session = async  (node, qObj, config, model, item, req, res, next) => {
    const sd = await req.helpers.session.auth.sessionDetails(req, res);
    return await req.helpers.json.val(sd, node, await dvalue(qObj, config, model, item, req, res, next));
}

const merchant = async  (node, qObj, config, model, item, req, res, next) => {
    let md = await req.helpers.merchant.details(req, res, next);
    return await req.helpers.json.val(md, node, await dvalue(qObj, config, model, item, req, res, next));
}

const appConfig = async  (node, qObj, config, model, item, req, res, next) => {
    let vm = req.helpers.express.validation.helpers.valuesmap(req, res, next);
        vm = req.helpers.json.val(vm, 'appConfig', {});

    return await req.helpers.json.val(vm, node, await dvalue(qObj, config, model, item, req, res, next));
}

const value = async (qObj, config, model, item, req, res, next) => {
    let vconf = req.helpers.json.val(qObj, 'value');
    let from = req.helpers.json.val(vconf, 'from');
    let node = req.helpers.json.val(vconf, 'map');

    // const valuemap = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    // body|params|query|body-item|auth|session|merchant|appConfig|envs|utils|headers|cookies|multer|validation|doc

    switch(from) {
        case 'body':
            return await getValueFrom(node, qObj, config, model, item, req, res, next, 'body');
        break;
        case 'params':
            return await getValueFrom(node, qObj, config, model, item, req, res, next, 'params');
        break;
        case 'query':
            return await getValueFrom(node, qObj, config, model, item, req, res, next, 'query');
        break;
        case 'body-item':
            return await bodyItem(node, qObj, config, model, item, req, res, next);
        break;
        case 'auth':
            return await auth(node, qObj, config, model, item, req, res, next);
        break;
        case 'session':
            return await session(node, qObj, config, model, item, req, res, next);
        break;
        case 'merchant':
            return await merchant(node, qObj, config, model, item, req, res, next);
        break;
        case 'appConfig':
            return await appConfig(node, qObj, config, model, item, req, res, next)
        break;
        case 'envs':
        break;
        case 'utils':
        break;
        case 'headers':
        break;
        case 'cookies':
        break;
        case 'multer':
        break;
        case 'validation':
        break;
        case 'doc':
        break;
        default:
          // code block
    }
}

const parse = async (arg, config, model, item, req, res, next) => {
    let rval = {};
    let col = req.helpers.json.val(arg, 'cloumn');
    let val = await value(arg, config, model, item, req, res, next);
    
    if(col && (val != cbv)){
        let oval = await operation.start(val, arg, config, model, item, req, res, next);
        let ovallen = req.helpers.json.length(oval || {});

        if(ovallen && ovallen > 0){
            rval[col] = oval;
        }
    }

    return rval;
}

const start = async (qObj, config, model, item, req, res, next) => {
    let rval = [];
    let qpL = req.helpers.json.length(qObj || {});

    if(qpL && qpL > 0){
        for(const a in qObj){

            let qi = await parse(qObj[a], config, model, item, req, res, next);
            let qil = req.helpers.json.length(qi || {});

            if(qil && qil > 0){
                rval.push(qi);
            }
        }
    }

    return rval;
}

exports.start = start;