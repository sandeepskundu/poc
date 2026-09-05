const response = require('./../response');
const userAccess = process.aioBeLibs('helpers/_private/permission/details');

const rolebase = async (config, req, res, next) => {
    const roles = req.helpers.json.val(config, 'config.access.configs', {});
    const isobj = req.helpers.data.type.is(roles, 'object');
    const islogin = req.helpers.json.val(req, 'runtime.auth.islogin');

    if(islogin || !islogin){
        if(isobj){
            const len = req.helpers.json.length(roles);

            if(len > 0){
                let userac = await userAccess.get(req);

                if(userac && userac.access){
                    let isaobj = req.helpers.data.type.is(userac.access, 'object');

                    if(isaobj){
                        let alen = req.helpers.json.length(userac.access);

                        if(alen > 0){
                            let rval = false;
                            let aces = userac.access || {};

                            for(const a in roles){
                                if(rval === false && ((roles[a] === 1 && aces[a] === 1) || (roles[a] === '1' && aces[a] === '1'))){
                                    rval = true;
                                    break;
                                }
                            }

                            if(rval){
                                return await response.valid(req);
                            }else{
                                return await response.invalid(req, 'PERMISSION_USER_ACCESS_ROLES_NOT_GRANTED');
                            }
                        }
                    }
                }

                return await response.invalid(req, 'PERMISSION_USER_ACCESS_ROLES_NOT_GRANTED');
            }else{
                return await response.invalid(req, 'PERMISSION_API_ACCESS_ROLES_NOT_DEFINED'); 
            }
        }else{
            return await response.invalid(req, 'PERMISSION_API_ACCESS_ROLES_NOT_DEFINED'); 
        }
    }else{
        return await response.invalid(req, 'USER_NOT_AUTHORIZED_LOGIN_AND_TRY_AGAIN')
    }
}

const type = async (config, req, res, next) => {
    let type = req.helpers.json.val(config, 'config.access.type');

    switch (type) {
        case 'PUBLIC':
            return await response.valid(req);
        break;
        case 'ROLEBASE':
            return await rolebase(config, req, res, next);
        break;
        default:
            return await response.invalid(req, 'PERMISSION_USER_ACCESS_NOT_GRANTED')
    }
}

const start = async (config, req, res, next) => {
    let enable = req.helpers.json.val(config, 'config.access.enable');

    if(enable === true){
        return await type(config, req, res, next);
    }else{
        return await response.invalid(req, 'PERMISSION_USER_ACCESS_NOT_GRANTED');
    }
}

exports.start = start