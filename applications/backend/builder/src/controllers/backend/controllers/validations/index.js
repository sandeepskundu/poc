const write = require('./write');
const DEFAULT_VALUE = '___VAL__NA__';

const checkValue = async (option, appConfig, req, res, next, type) => {
    let rval = DEFAULT_VALUE;
    const val = req.helpers.json.val(option, 'value', DEFAULT_VALUE)
    const uival = req.helpers.json.val(option, 'uivalue', DEFAULT_VALUE)
    const bothSame = req.helpers.json.val(option, 'bothAreSame', DEFAULT_VALUE);

    if(type === 'ui'){
        if((bothSame === true) && (val != DEFAULT_VALUE)){
            rval = val;
        }else{
            if(uival != DEFAULT_VALUE){
                rval = uival;
            }else{
                if(val != DEFAULT_VALUE){
                    rval = val;
                }
            }
        }
    }else{
        if(val != DEFAULT_VALUE){
            rval = val;
        }
    };

    return rval;
}

const compileChecks = async (options, appConfig, req, res, next, type) => {
    const rval = {};

    for(const a in options){
        let val = await checkValue(options[a], appConfig, req, res, next, type);

        if(val != DEFAULT_VALUE){
            rval[a] = {
                value:val
            }
        }
    }

    return rval;
}

const compile = async (validation, appConfig, req, res, next, type, from) => {
    let rval = {};
    let data = req.helpers.json.val(validation, from, {});

    for(const a in data){
        let valid = data[a];
        let checks = req.helpers.json.val(valid, 'checks', {});
            valid = req.helpers.json.copy(valid);
            valid.checks = await compileChecks(checks, appConfig, req, res, next, type);
            rval[a] = valid;
    }
    
    return rval;
}

const validation = async (item, appConfig, req, res, next, type) => {
    const valid = req.helpers.json.val(item, 'validation.validation', {})

    return {
        headers:req.helpers.json.val(valid, 'headers', {}),
        cookies:req.helpers.json.val(valid, 'cookies', {}),
        body:await compile(valid, appConfig, req, res, next, type, 'body'),
        query:await compile(valid, appConfig, req, res, next, type, 'query'),
        params:await compile(valid, appConfig, req, res, next, type, 'params')
    }
}

const ui = async (item, appConfig, req, res, next) => {
    return {
        validation:await validation(item, appConfig, req, res, next, 'ui')
    }
}

const api = async (item, appConfig, req, res, next) => {
    return {
        request:req.helpers.json.val(item, 'validation.request', {}),
        validation:await validation(item, appConfig, req, res, next, 'api')
    }
}

const model = async (item, appConfig, req, res, next) => {
    const rval = {
        "valuemap": {
            "_merchantId": {
                "valuemap": {
                    "map": "id",
                    "from": "merchant"
                }
            }
        },
        "query":{
            "hidden":{
                "enable":true,
                "configs":{
                    "columns":{
                        "merchantId": {
                            "enable":true
                        }
                    }
                }
            }
        }
    }

    const mval = req.helpers.json.val(item, 'model', {});

    return req.helpers.json.merge(rval, mval);
}

const parse = async (item, appConfig, req, res, next) => {
    return {
        ui:await ui(item, appConfig, req, res, next),
        api:await api(item, appConfig, req, res, next),
        model:await model(item, appConfig, req, res, next)
    }
}

const start = async (appConfig, req, res, next) => {
    let rval = {};
    let list = await req.helpers.apiSchema.list(appConfig, req, res, next);

    if(list){
        for(const a in list){
            rval[a] = await parse(list[a], appConfig, req, res, next);
        }
    }

    await write.init(rval, appConfig, req, res, next);

    return appConfig;
}

exports.start = start;