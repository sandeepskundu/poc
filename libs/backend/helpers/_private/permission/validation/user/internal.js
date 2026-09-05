const response = require('./../response');
const token = process.aioBeLibs('helpers/_private/token/internal-api');

const ips = ['127.0.0.1', '::11']

const validIp = async (req) => {
    return ips.includes(req.helpers.json.val(req, 'aioHd.ip'));
}

const isvalid = async (tval, config, req) => {
    return (Date.now() <= (req.helpers.json.val(tval, 'expireAt', (Date.now()-10))));
}

const start = async (config, req, res, next) => {
    let tokenv = await token.get(req);
    let valid = await isvalid(tokenv, config, req);

    if(valid){
        let isVip = await validIp(req);

        if(isVip){
            let islogin = req.helpers.json.val(req, 'runtime.auth.islogin');
            let atype = req.helpers.json.val(config, 'config.user.authShouldBe', 'LOGIN');
        
            switch (atype) {
                case 'LOGIN':
                    if(islogin){
                        return await response.valid(req);
                    }else{
                        return await response.invalid(req, 'USER_NOT_AUTHORIZED_LOGIN_AND_TRY_AGAIN')
                    }
                break;
                case 'TOKENIZED':
                break;
                default:
                    return await response.invalid(req, 'PERMISSION_NOT_GRANTED')
            }
        }else{
            return await response.invalid(req, 'PERMISSION_NOT_GRANTED_TO_IP') 
        }
    }else{
       return await response.invalid(req, 'PERMISSION_NOT_GRANTED') 
    }
}

exports.start = start;