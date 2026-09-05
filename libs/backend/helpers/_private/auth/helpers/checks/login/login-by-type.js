
const utils = process.aioBeLibs('helpers/_private/utils');

const map = {
    'email-with-otp':'email-with-otp',
    'mobile-with-otp':'mobile-with-otp',
    'email-with-password':'email-with-password',
    'mobile-with-password':'mobile-with-password',
    'username-with-password':'username-with-password',
    'username-with-email-otp':'username-with-email-otp',
    'username-with-mobile-otp':'username-with-mobile-otp'
}

const sample = {
    data:{
        isd:'',
        iso2:'',
        ison3:'',
        password:'',
        identifier:'',
        otpVia:''
    }
}

const haspassword = async (req, val, dval) => {
    let pss = req.helpers.json.val(req, 'body.data.password', dval);

    return (pss && pss != dval)
}

const ismobile = async (req, val, dval) => {
    let isd = req.helpers.json.val(req, 'body.data.isd', dval);

    return (isd && isd != dval);
}

const isemail = async (req, val, dval) => {
    if(val && val != dval){
        val = val.replace(/[^a-zA-Z0-9@._]/g, "");

        if(val){
            let ergx = req.helpers.json.val(utils, 'regex.email.value', '');
                ergx = new RegExp(ergx);
                return ergx.test(val)
        }
    }

    return false;
}

const isusername = (req, val, dval) => {
    if(val && val != dval){
        val = val.replace(/[^a-zA-Z0-9._]/g, "");

        if(val){
            let ergx = req.helpers.json.val(utils, 'regex.username.value', '');
                ergx = new RegExp(ergx);
                return ergx.test(val)
        }
    }

    return false;
}

const get = async (req, val, dval) => {
    let ismob = await ismobile(req, val, dval);
    let ispass = await haspassword(req, val, dval)

    if(ismob){
        if(ispass){
            return map['mobile-with-password']
        }else{
            return map['mobile-with-otp'];  
        }
    }else{
        let ismail = await isemail(req, val, dval);

        if(ismail){
            if(ispass){
                return map['email-with-password']
            }else{
                return map['email-with-otp']; 
            }
        }else{
            let isun = await isusername(req, val, dval);

            if(isun){
                if(ispass){
                    return map['username-with-password']
                }else{
                    let via = req.helpers.json.val(req, 'body.data.otpvia', dval);

                    if(via === 'mobile'){
                        return map['username-with-mobile-otp']; 
                    }

                    return map['username-with-email-otp'];  
                }
            }else{
                return map['username-with-email-otp'];  
            }
        }
    }
}

const loginTypeByParams = (req) => {
    let umap = {
        email:{
            otp:'otp',
            password:'password'
        },
        mobile:{
            otp:'otp',
            password:'password'
        },
        username:{
            otp:'email-otp',
            eotp:'email-otp',
            motp:'mobile-otp',
            password:'password'
        }
    };

    let type = req.helpers.json.val(req, 'params.id');
    let omap = req.helpers.json.val(req, 'params.subId');
    let lwith = req.helpers.json.val(umap, `${type}.${omap}`, false)

    if(umap[type] && lwith){
        return map[`${type}-with-${lwith}`]
    }else{
        if(type && omap){
            return map['email-with-password']
        }
    }

    return false;
}

module.exports = async (req) => {
    const loginwith = loginTypeByParams(req);

    if(loginwith){
        return loginwith;
    }else{
        const dv = req.helpers.random.uuid();
        const input = req.helpers.json.val(req, 'body.data.identifier', dv);

        if(input != dv){
            return await get(req, input, dv);
        }else{
            return map['email-with-password'];
        }
    }
}