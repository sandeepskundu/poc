const ptoken = require('./token');

const enums = {
    'NO_TOKEN':'NO_TOKEN'
}

const validRv = {
    valid:true
};

const respByCode = async (req, res, next, arg, code) => {
    return await req.helpers.express.response.getRespByCode(code || 400, req, res, next, arg);
}

const vtoken = async (token, config, model, option, req, res, next) => {
    if(token != enums.NO_TOKEN){
        let tval = await ptoken.de(token, req, res, next);
        let val = req.helpers.json.val(tval, 'has.limit');

        if(val > 0){
            
        }else{
            return await respByCode(req, res, next, {
                error:{
                    code:'INVALID_PAGINATION_TOKEN',
                    description:'Pagination token is not in valid format'
                }
            });
        }
    }

    return validRv;
}

const action = async (token, config, model, option, req, res, next) => {
    if(token != enums.NO_TOKEN){
        let action = req.helpers.json.val(req, 'body.pagination.action');
        let map = {
            next:true,
            prev:true
        };

        if(map[action]) {

        }else{
            return await respByCode(req, res, next, {
                error:{
                    code:'INVALID_PAGINATION_ACTION',
                    description:'Pagination action is invalid'
                }
            });
        }
    }

    return validRv;
}

const page = async (token, config, model, option, req, res, next) => {
    if(token != enums.NO_TOKEN){
        let tokenv = await ptoken.de(token, req, res, next);
        let action = req.helpers.json.val(req, 'body.pagination.action');

        if(action === 'next'){
            let next = req.helpers.json.val(tokenv, 'has.next');

            if(next){

            }else{
                return await respByCode(req, res, next, {
                    error:{
                        code:'INVALID_PAGINATION_NEXT_PAGE',
                        description:'You alread reach to last index of pagination.'
                    }
                });
            }
        }else{
            if(action === 'prev'){
                let prev = req.helpers.json.val(tokenv, 'has.prev');
                if(prev){
    
                }else{
                    return await respByCode(req, res, next, {
                        error:{
                            code:'INVALID_PAGINATION_PREVIOUS_PAGE',
                            description:'You alread reach to 1st index of pagination.'
                        }
                    });
                }
            }
        }
    }

    return validRv;
}

const start = async (config, model, option, req, res, next) => {
    let map = {};
    let rval = validRv;
    let orders = ['token', 'action', 'page'];
    let token = req.helpers.json.val(req, 'body.pagination.token', enums.NO_TOKEN);
    
    for(const a in orders){
        let type = orders[a];
        switch(type) {
            case 'token':
                map[type] = await vtoken(token, config, model, option, req, res, next);
            break;
            case 'action':
                map[type] = await action(token, config, model, option, req, res, next);
            break;
            default:
                map[type] = await page(token, config, model, option, req, res, next);
              
        }
    }

    for(const a in orders){
        let type = orders[a];

        if(map[type] && !map[type].valid){
            rval = map[type];
            break;
        }
    };

    return rval;
}

exports.start = start;