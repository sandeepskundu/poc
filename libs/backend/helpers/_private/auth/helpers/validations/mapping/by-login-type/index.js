const utils = process.aioBeLibs('helpers/_private/utils');

const username = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.username.message,
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.username.value
            }
        }
    }
}

const email = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.email.message,
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.email.value
            }
        }
    }
}

const mobile = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.mobile.dom.message,
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.mobile.dom.value
            }
        }
    }
}

const vmapping = {
    "username-with-email-otp":{
        "wanted":{
            "validation.body.identifier":username()
        },
        "unwanted":{
            "validation.body.isd":true,
            "validation.body.iso2":true,
            "validation.body.iso3":true,
            "validation.body.otpvia":true,
            "validation.body.password":true
        }
    },
    "username-with-mobile-otp":{
        "wanted":{
            "validation.body.identifier":username()
        },
        "unwanted":{
            "validation.body.isd":true,
            "validation.body.iso2":true,
            "validation.body.iso3":true,
            "validation.body.password":true
        }
    },

    "username-with-password":{
        "wanted":{
            "validation.body.password":{},
            "validation.body.identifier":username()
        },
        "unwanted":{
            "validation.body.isd":true,
            "validation.body.iso2":true,
            "validation.body.iso3":true,
            "validation.body.otpvia":true,
        }
    },
    "email-with-password":{
        "wanted":{
            "validation.body.password":{},
            "validation.body.identifier":email()
        },
        "unwanted":{
            "validation.body.isd":true,
            "validation.body.iso2":true,
            "validation.body.iso3":true,
            "validation.body.otpvia":true,
        }
    },
    "mobile-with-password":{
         "wanted":{
            "validation.body.isd":{},
            "validation.body.iso2":{},
            "validation.body.iso3":{},
            "validation.body.password":{},
            "validation.body.identifier":mobile()
        },
        "unwanted":{
            "validation.body.otpvia":true
        }
    },
    'mobile-with-otp':{
        "wanted":{
            "validation.body.isd":{},
            "validation.body.iso2":{},
            "validation.body.iso3":{},
            "validation.body.identifier":mobile()
        },
        "unwanted":{
            "validation.body.otpvia":true,
            "validation.body.password":true
        }
    },
    "email-with-otp":{
        "wanted":{
            "validation.body.identifier":email()
        },
        "unwanted":{
            "validation.body.isd":true,
            "validation.body.iso2":true,
            "validation.body.iso3":true,
            "validation.body.otpvia":true,
            "validation.body.password":true
        }
    }
}

const remove = async (rval, type, model, req) => {
    let unwanted = req.helpers.json.val(vmapping, `${type}.unwanted`, {});

    for(const a in unwanted){
        if(unwanted[a]){
            req.helpers.json.remove(rval, a);
        }
    }

    return rval;
}

const compile = (rval, type, model, req) => {
    let wanted = req.helpers.json.val(vmapping, `${type}.wanted`, {});

    for(const a in wanted){
        const item = wanted[a];

        if(item){
            const isobj = req.helpers.data.type.is(item, 'object');

            if(isobj){
                let dv = req.helpers.json.val(rval, a, {});
                    dv = req.helpers.json.merge(dv, item);
                    req.helpers.json.remove(rval, a);
                    rval = req.helpers.json.set(rval, a, dv);
            }
        }
    }

    return rval;
}

const get = async (validation, model, req, res, next) => {
    let rval = req.helpers.json.copy(validation);
    let loginType = await model.helpers.checks.login.loginByType(req);
        rval = await remove(rval, loginType, model, req);
        rval = await compile(rval, loginType, model, req);

    return rval;
}

exports.get = get;