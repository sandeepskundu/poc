const internal = require('./internal');
const response = require('./../response');

const public = async (config, req, res, next) => {
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
}

const marchant = async (config, req, res, next) => {

}

const start = async (config, req, res, next) => {
    let type = req.helpers.json.val(config, 'config.user.shouldBe', 'INTERNAL');

    switch (type) {
        case 'PUBLIC':
            return await public(config, req, res, next);
        break;
        case 'INTERNAL':
            return await internal.start(config, req, res, next);
        break;
        case 'MARCHENT':
            return await marchant(config, req, res, next);
        break;
        default:
            return await response.invalid(req, res, next);
    }
}

exports.start = start