const configs = {
    message:{
        error:{
            default:'IN',
            checks:{
                image:{
                    mime:{
                        ext:'Only files with jpeg, jpg, gif extension are allowed'
                    },
                    limits:{
                        min:'Min value is 3',
                        max:'Max value is 6',
                        size:'Max file size is 10KB'
                    },
                    dimensions:{
                        ratio:"Invalid aspect ratio",
                        width:{
                            min:"Invalid min width",
                            max:"Invalid max width"
                        },
                        height:{
                            min:"Invalid min height",
                            max:"Invalid max height"
                        },
                    }
                }
            }
        }
    },
    checks:{
        image:{
            "dimensions":{
                "_ratio":{
                    "width":"591",
                    "height":1280
                },
                "width":{
                    "_min":10000,
                    "_max":10
                },
                "height":{
                    "_min":10000,
                    "_max":10
                }
            },

            "mime":{
                "type":"image",
                "ext":"^(.jpeg|.jpg|.gif|.json)$"
            },

            "limits":{
                "size":"10MB",
                "min":3,
                "max":6
            }
        }
    }
    

    /*--
        name:'',
        Destination:'',
        metadata:''
    ---*/
}

const mime = require('./mime');
const limits = require('./limits');
const json = require('./../../json');
const message = require('./../message');


const dvalidation = {
    mime:{},
    limits:{},
    dimensions:{}
};

const fieldname = (config, name, data, valuemap, index) => {
    let field = json.val(valuemap, 'validation.request.body.docs.keyPrefix', 'files');
        field = (field || 'files');

    if(typeof index === 'number' && index > -1){
        return `${field}_${index}`
    }else{
        return field;
    }
}

const getvalue = (config, name, data, valuemap, index) => {
    const fieldn = fieldname(config, name, data, valuemap, index);

    return json.val(valuemap, `multer.docs.${fieldn}`, []);
}

const required = (rval, value) => {
    const isreq = json.val(rval, 'validation.checks.required.value');

    if(isreq === 'required'){
        if(value && value.length > 0){
            return message.valid(rval, rval, 'required');
        }else{
            return message.invalid(rval, rval, 'required');
        }
    }else{
        return rval;
    }
}

const image = (rval, value, config, name, data, valuemap, index) => {
    const order = ['limits'];
    const fieldn = fieldname(config, name, data, valuemap, index);
    const checks = json.val(rval, 'validation.checks.image', dvalidation);

    for(const a in order){
        let name = order[a];
        let conf = checks[name] || null;

        if(conf){
            switch(name) {
                case 'limits':
                    rval = limits.start(rval, value, conf, fieldn, config, valuemap)
                break;
                case 'mime':
                    //rval = mime.start(rval, value, conf, fieldn);
                break;
                default:
            }
        }

        if(!rval.valid){
            break;
        }
    }

    return rval;
}

const validate = (config, name, data, valuemap, index) => {
    config = {...config, ...configs};
    
    let value = getvalue(config, name, data, valuemap, index)
    let rval = required({ 
        message:'',
        valid:true,
        error:false,
        validation:config,
    }, value);


    if(rval.valid){
        rval = image(rval, value, config, name, data, valuemap, index);
    }

    if(rval.valid){
        rval.docs = rval.docs || {};

        if(typeof index === 'number' && index > -1){
            rval.docs[index] = value;
        }else{
            rval.docs = value;
        }
    };

    return rval;
}

exports.mime = mime;
exports.validate = validate;