module.exports = {
    "request":{
        "methods":{
            "post":{
                "allowed":true,
                "message":{
                    "error":"Only post method is allowed",
                    "success":"Only post method is allowed"
                }
            }
        },
        "body":{
            "min":1,
            "max":10,
            "docs":{
                "keyPrefix":"images",
            },
            "type":"multipart",
            "required":"required",
            "message":{
                "error":"Pls provide correct data details",
                "success":"Put method is allowed"
            }
        }
    },
    "validation":{
        "body":{
            "image":{
                "message":{
                    "error":{
                        "checks":{
                            "required":"This field is required."
                        }
                    }, 
                    "success":{
                        "default":"IN",
                        "checks":{
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "image":{
                        mapping:{
                            field:'',
                            by:"field", // field|indexAndField
                        },

                        dimensions:{
                            ratio:{
                                width:4,
                                height:3
                            },
                            width:{
                                min:'',
                                max:''
                            },
                            height:{
                                min:'',
                                max:''
                            }
                        },

                        mime:{
                            type:'image',
                            ext:''
                        },

                        limits:{
                            size:'',
                            min:1,
                            max:2
                        }
                    }
                }
            }
        }
    }
}