import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        options:{
            validate:false,
            endpoint:'auth.account.sendOtpOnEmailToCreatePassword',
        },
        request:{
            method:'post'
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                helpers.url.route.redirect('auth.password', {
                    params:{
                        action:'create',
                        otpToken:helpers.json.val(resp, 'data.token', ''),
                        trackId:helpers.json.val(resp, 'data.trackId', '')
                    },
                    query:{
                        otp:helpers.json.val(resp, 'data.email.otp'),
                        email:'sandeepskundu@gmail.com'
                    }
                });
            }else{
                setTimeout(() => {callback(helpers.json.val(resp, 'data', {}))}, 200);
            }
        }
    }, (req || {}))
}

const init = (callback, req) => {
    if(callback){
        helpers.request.ui.init(config(callback, {...(req || {}), ...{responseDataMap:false}}))
    }
}

export default {
    init:init,
    config:config
}