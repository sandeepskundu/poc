//const auth = require('./auth');
const body = require('./body');
const headers = require('./headers');
const methods = require('./methods');

const validate = (validation, req, res, next) => {
    let map = {};
    const order = ['methods', 'headers', 'body', 'auth'];

    for(const a in order){
        const on = order[a];
        if(validation[on]) {
            switch(on) {
                case 'auth':
                    //map[on] = auth.validate(req.helpers.json.get(validation, on, {}), req, res, next);
                break;
                case 'body':
                    map[on] = body.validate(req.helpers.json.get(validation, on, {}), req, res, next);
                break;
                case 'methods':
                    map[on] = methods.validate(req.helpers.json.get(validation, on, {}), req, res, next);
                break;
                case 'headers':
                    map[on] = headers.validate(validation, req, res, next);
                break;
                default:
            }

            if(map[on] && map[on].valid === false){
                map = {
                    request:map[on].validation,
                    error:{
                        message:map[on].validation.message,
                        code:req.helpers.json.get(map[on], 'validation.code', 400),
                    },
                    status:{
                        message:map[on].validation.message,
                        code:req.helpers.json.get(map[on], 'status.code', 400),
                    }
                };

                break;
            }
        } 
    }

    if(map.valid != 'undefined'){
        return map;
    }else{
        return {
            valid:true,
            validation:{}
        }
    }
}

exports.validate = validate;