const reqv = require('./request');

const validate = (config, req, res, next) => {
    const map = {};
    const order = ['requestValidation', 'requestData'];

    for(const a in order){
        const on = order[a];
        switch(on) {
            case 'requestValidation':
                map[on] = reqv.validation.validate(req.helpers.json.get(config, 'request', {}), req, res, next)
            break;
            case 'requestData':
                map[on] = reqv.data.validate(req.helpers.json.get(config, 'validation', {}), req, res, next);
            break;
            default:
            
        }
    }

    for(const a in order){
        const on = order[a];
        if(map[on] && map[on].error){
            return map[on];
        }
    }

    return req.helpers.json.val(map, 'requestData', {});
}

const start = async (req, res, next) => {
    //const config = await reqc.get('validation/ui', req, res, next);
    //let config = await req.helpers.express.docs.json.get('api', req, res, next);
    //  req.runtime = req.runtime || {};
    //  req.runtime.validationConfig = config;

    return validate(req.helpers.json.val(req, 'runtime.validationConfig', {}), req, res, next);
}

exports.start = start;