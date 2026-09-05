module.exports = {
    "request":{
        "methods":{
            "post":{
                "allowed":true,
                "message":{
                    "error":"Only put method is allowed",
                    "success":"Only put method is allowed"
                }
            }
        },
        "body":{
            "min":1,
            "max":10,
            "type":"object",
            "required":"required",
            "message":{
                "error":"Pls provide correct data details",
                "success":"Put method is allowed"
            }
        }
    },
    "validation":{
        "body":{
            "exposed":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Please provide vaild id",
                            "minlength":"Please provide vaild id",
                            "maxlength":"Please provide vaild id",
                            "required":"Please provide vaild id"
                        }
                    }
                },
                "checks":{
                    "checks":{
                        "enums":{
                            "value":{
                                "public":true,
                                "internally":true
                            },
                            "uivalue":{
                                "public":true,
                                "internally":true
                            }
                        }
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":'optional',
                        "bothAreSame":true
                    }
                }
            },
            "hasChilds":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Please provide vaild id",
                            "minlength":"Please provide vaild id",
                            "maxlength":"Please provide vaild id",
                            "required":"Please provide vaild id"
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":"required",
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":'optional',
                        "bothAreSame":true
                    }
                }
            },
            "description":{
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
                    "minLength":{
                        "value":10,
                        "uivalue":10,
                        "bothAreSame":true
                    },
                    "maxLength":{
                        "value":240,
                        "uivalue":240,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            },
            "name":{
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
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            }
        }
    }
}