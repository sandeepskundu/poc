const utils = process.aioBeLibs('helpers/_private/utils');

const blankOrUnique = (req, node, extend) => {
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
                                const existing = await this.constructor.findOne({${node}: value });

                                if(!existing){
                                    return true;
                                }else{
                                    return !(existing.${node} === value)
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

exports.blankOrUnique = blankOrUnique;