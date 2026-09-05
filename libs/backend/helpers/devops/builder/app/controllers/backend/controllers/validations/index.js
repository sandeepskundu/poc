const write = require('./write');
const DEFAULT_VALUE = '___VAL__NA__';

const getMasterData = async (hMap, req, res, next) => {
    let hashMap = hMap?hMap.split('.'):[];
    let hId = hashMap.slice(-1)[0];

    if(hId){
        let resp = await req.helpers.s2s.internal.init({
            name:'1',
            request:{
                url:'/tdc-backend/masterData/details/v1/getByHashId/fetch/:_hashId_:',
                params:{
                    hashId:hId
                },
            }
        }, req, res, next);

        return req.helpers.json.val(resp, 'resp.data.data', {});
    }else{
        return {}
    }
}

const virtualValidation = async (hashMap, req, res, next) => {
    const resp = await getMasterData(hashMap, req, res, next);
    return req.helpers.json.val(resp, 'result.0.details', {
        message:{
            en:{
                error:{
                    default:"Virtual validation is not cofigured correctly."
                }
            }
        },
        checks:{
            maxlength:{
                value:1,
                uivalue:1,
                bothAreSame:true
            },
            minlength:{
                value:10,
                uivalue:10,
                bothAreSame:true
            },
            required:{
                value:'required',
                uivalue:'required',
                bothAreSame:true
            }
        }
    });
}

const getRegex = async (hashMap, req, res, next) => {
    const resp = await getMasterData(hashMap, req, res, next);
    return req.helpers.json.val(resp, 'result.0.details.value', `^\\${req.helpers.random.id(60)}{1,1}$`);
}

const getEnums= async (hashMap, req, res, next) => {
    const rval = {};
    const resp = await getMasterData(hashMap, req, res, next);
    const list = req.helpers.json.val(resp, 'result', []);

    if(list && list.length > 0){
        for(const a in list){
            const value = req.helpers.json.val(list[a], 'details.value', '');
            if(value){
                rval[value] = true
            }
        }
    }

    const vlen = req.helpers.json.length(rval);

    if(vlen > 0){
        return rval;
    }

    return DEFAULT_VALUE;
}

const checkValue = async (option, appConfig, req, res, next, type, checktype) => {
    let hashmap = '';
    let rval = DEFAULT_VALUE;
    let val = req.helpers.json.val(option, 'value', DEFAULT_VALUE)
    let uival = req.helpers.json.val(option, 'uivalue', DEFAULT_VALUE)
    let bothSame = req.helpers.json.val(option, 'bothAreSame', DEFAULT_VALUE);

    if(checktype === 'enums' || checktype === 'regex'){
        hashmap = req.helpers.json.val(option, 'hashmap');
    }

    if(type === 'ui'){
        if((bothSame === true) && (val != DEFAULT_VALUE)){
            if(hashmap){
                if(checktype === 'regex'){
                    rval = await getRegex(val, req, res, next);
                }else{
                    rval = await getEnums(val, req, res, next);
                }
            }else{
                rval = val;
            }
        }else{
            if(uival != DEFAULT_VALUE){
                if(hashmap){
                    if(checktype === 'regex'){
                        rval = await getRegex(uival, req, res, next);
                    }else{
                        rval = await getEnums(uival, req, res, next);
                    }
                }else{
                    rval = uival;
                }
            }else{
                if(val != DEFAULT_VALUE){
                    if(hashmap){
                        if(checktype === 'regex'){
                            rval = await getRegex(val, req, res, next);
                        }else{
                            rval = await getEnums(val, req, res, next);
                        }
                    }else{
                        rval = val;
                    }
                }
            }
        }
    }else{
        if(val != DEFAULT_VALUE){
            if(hashmap){
                if(checktype === 'regex'){
                    rval = await getRegex(val, req, res, next);
                }else{
                    rval = await getEnums(val, req, res, next);
                }
            }else{
                rval = val;
            }
        }
    };

    return rval;
}

const compileChecks = async (options, appConfig, req, res, next, type) => {
    const rval = {};

    for(const a in options){
        let val = await checkValue(options[a], appConfig, req, res, next, type, a);

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

        if(valid){
            let vvenabled = req.helpers.json.val(valid, 'virtual.validation.enabled', false);

            if(vvenabled){
                valid = await virtualValidation(req.helpers.json.val(valid, 'virtual.validation.map', ''), req, res, next);
            };

            let checks = req.helpers.json.val(valid, 'checks', {});
                valid = req.helpers.json.copy(valid);
                valid.checks = await compileChecks(checks, appConfig, req, res, next, type);
                rval[a] = valid;
        }
        
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
    let list = await req.helpers.devops.builder.app.controllers.backend.apiSchema.list(appConfig, req, res, next);

    if(list){
        for(const a in list){
            rval[a] = await parse(list[a], appConfig, req, res, next);
        }
    }

    await write.init(rval, appConfig, req, res, next);

    return appConfig;
}

exports.start = start;