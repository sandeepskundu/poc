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
                "error":"Put method is allowed - kskskskk",
                "success":"Put method is allowed"
            }
        }
    },
    "validation":{
        "body":{
            "appId":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }, 
                    "success":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":23,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":23,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            },
            "dbId":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }, 
                    "success":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":23,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":23,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            },
            "type":{
                "message":{
                    "error":{
                        "checks":{
                            "enums":"Please provide valid type",
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
                    "enums":{
                        "value":{
                            "controller":true,
                        },
                        "uivalue":{
                            "controller":true,
                        },
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