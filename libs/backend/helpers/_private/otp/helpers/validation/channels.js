const validation = process.aioBeLibs('helpers/_private/utils/validations');

const enablev = async (req) => {
    return await validation.build(req, 'universal.require', {
        message: {
            error: {
                checks: {
                    mustbe:"Please enable this channel for further communication",
                    required: "Please enable this channel for further communication"
                }
            }
        },
        checks:{
            mustbe:{
                value:true,
            }
        }
    });
}

const templateId = async (req) => {
    return await validation.build(req, 'universal.templateId')
}

const init = async (config, req, res) => {
    let rval = {
        valid:true,
        validation:{}
    };

    const dv = req.helpers.random.uuid();
    const email = req.helpers.json.val(config, 'recipients.email', dv);
    const mobile = req.helpers.json.val(config, 'recipients.mobile', dv);

    if(email != dv || mobile != dv){
        let validation = {}

        if(email != dv){
            validation["configs.channels.email.enable"] = await enablev(req);
            validation["configs.channels.email.template.id"] = await templateId(req)
        };

        if(mobile != dv){
            let sms = req.helpers.json.val(config, 'configs.channels.sms.enable', dv);
            let whatsapp = req.helpers.json.val(config, 'configs.channels.whatsapp.enable', dv);

            if(sms != dv || whatsapp != dv){
                if(sms != dv){
                    validation["configs.channels.sms.enable"] = await enablev(req);
                    validation["configs.channels.sms.template.id"] = await templateId(req)
                }

                if(whatsapp != dv){
                    validation["configs.channels.whatsapp.enable"] = await enablev(req);
                    validation["configs.channels.whatsapp.template.id"] = await templateId(req)
                }
            }else{
                validation["configs.channels.sms.enable"] = await enablev(req);
                validation["configs.channels.sms.template.id"] = await templateId(req)
            }
        }

        rval = req.helpers.validation.body(config, validation);
    }else{
        rval.valid = false;
        rval.validation = {
            configs:{
                channels:{
                    value:"",
                    error:true,
                    valid:false,
                    message:"A recipient is required. You must enter either an email address or a mobile number.",
                }
            }
        }
    }

    return rval;
}

exports.init = init;