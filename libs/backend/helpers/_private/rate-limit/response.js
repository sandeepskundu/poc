let sample = {
    data:{},
    valid:true,
    error:null,
    status:{
        code:200,
        message:"",
    }
}

const sucess = (configs, req) => {
    return {
        error:null,
        valid:true,
        status:{
            code:200,
            message:"",
        }
    }
}

const message = (msg, req, item) => {
    let istr = req.helpers.data.type.is(msg, 'string');

    if(istr){
        return msg;
    }else{
        let isFun = req.helpers.data.type.is(msg, 'function');
        if(isFun){
            return msg(item)
        }else{
            return 'You have reached the limit to access this. Please try again later.'
        }
    }
}

const error = (configs, req, errorCode, item) => {
    let msg = '';

    switch (errorCode){
        case 'LIMTI_REACHED':
            msg = message(req.helpers.json.val(configs, 'LIMIT.MESSAGE'), req, item);
        break;
        case 'QUOTA_LIMTI_REACHED':
            msg = message(req.helpers.json.val(configs, 'QUOTA.MESSAGE'), req, item)
        break;
        case 'CONFIGURATION_NOT_MAPPED':
            msg = message('Something seems misconfigured. Please check your settings and try again.', req, item)
        break;
        default:
        break;
    }
    
    return {
        error:{
            message:msg,
            code:errorCode
        },
        valid:false,
        status:{
            code:429,
            message:"",
        }
    }
}

exports.error = error;
exports.sucess = sucess;