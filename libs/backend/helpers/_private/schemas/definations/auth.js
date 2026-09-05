const hvalidation = (name) => {
    return {
        "type": "stringKey",
        "configs": {
            "aioconfig": {},
            "mongodb": {
                "trim":true,
                "default": {
                    "value":`''`,
                    "enable":true
                },
                "validate":`{
                    validator: async function (value) {
                        if (!value) {
                            return true;
                        }else{
                            const regex = /^([a-zA-Z0-9]{32})?$/;
                            if(regex.test(value)){
                                const existing = await this.constructor.findOne({${name}: value });

                                if(!existing){
                                    return true;
                                }else{
                                    return !(existing.${name} === value)
                                }
                            }else{
                                return false;
                            }
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message: 'Duplicate values are not allowed.'
                    }),
                }`,
            }
        }
    }
}

const info = () => {
    return {
        "type":"stringKey",
        "configs": {
            "aioconfig": {},
            "mongodb": {
                "trim":true,
                "default": {
                    "value":`''`,
                },
                "validate":`{
                    validator: async function (value) {
                        if(this.email || this.mobile || this.username){
                            return true;
                        }else{
                            return false
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message: 'This field is required.'
                    }),
                }`,
            }
        }
    }
}

const date = () => {
    return {
        "type":"date",
        "configs": {
            "aioconfig": {},
            "mongodb": {
                "default": {
                    "value":null, //`Date.now()`|null,
                    "enable":true,
                }
            }
        }
    }
}

const get = async (collectionName, schemas, req, extend) => {
    if(collectionName){
        const isobj = req.helpers.data.type.is(extend, 'object')
        const rval = {
            "collection":{
                "name":collectionName
            },
            "schema":{
                "email":info(),
                "mobile":info(),
                "username":info(),
                "lastLoginAt":date(),
                "lastPasswordChangeAt":date(),
                "emailHash":hvalidation('emailHash'),
                "mobileHash":hvalidation('mobileHash'),
                "usernameHash":hvalidation('usernameHash'),
                "passwordHash":hvalidation('passwordHash'),

                "isActive":{
                    "type":"boolean",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "default": {
                                "enable":true,
                                "value": false
                            }
                        }
                    }
                },

                "state":{
                    "type":`stringKey`,
                    "configs":{
                        "mongodb":{
                            "enum":{
                                "enable":true,
                                "value":`['VERIFICATION_PENDING', 'PARTIALLY_VERIFIED', 'REGISTERED', 'PARTIALLY_REGISTERED', 'GUEST']`
                            },
                            "default":{
                                "enable":true,
                                "value":`"VERIFICATION_PENDING"`,
                                "message":"This field is required"
                            }
                        }
                    }
                },
            }
        }

        if(isobj){
            return req.helpers.json.merge(rval, extend);
        }else{
            return rval;
        }
    }else{
        return false
    }
}

exports.get = get;