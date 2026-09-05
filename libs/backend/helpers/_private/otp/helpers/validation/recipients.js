const vuitls = process.aioBeLibs('helpers/_private/utils/validations');

const mobilev = () => {
    return vuitls.get('mobile.details')
}

const emailv = () => {
    return vuitls.get('email.id')
}

const init = async (config, req, res) => {
    let rval = {
        valid:true,
        validation:{}
    };

    let validation = {
        recipients:{}
    }

    const dv = req.helpers.random.uuid();
    const email = req.helpers.json.val(config, 'recipients.email', dv);
    const mobile = req.helpers.json.val(config, 'recipients.mobile', dv);

    if(email != dv || mobile != dv){
        if(email != dv){
            validation.recipients.email = emailv()
        }

        if(mobile != dv){
            validation.recipients.mobile = mobilev();
        }

        rval = req.helpers.validation.body(config, validation);
    }else{
        rval.valid = false;
        rval.validation = {
            recipients:{
                value:"",
                error:true,
                valid:false,
                message:"A recipient is required. You must enter either an email address or a mobile number.",
            }
        }
    }

    return rval;
}

exports.init = init;