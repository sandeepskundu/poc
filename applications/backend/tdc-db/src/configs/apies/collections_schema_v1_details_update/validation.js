module.exports = {
    "request":{
        "methods":{
            "put":{
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
        "params":{
            "id":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"App ID is not valid",
                            "maxlength":"App ID is not valid",
                            "required":"App ID is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            }
        },
        "body":{
            "appId":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"App ID is not valid",
                            "maxlength":"App ID is not valid",
                            "required":"App ID is required."
                        }
                    }, 
                    "success":{
                        "checks":{}
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "dbId":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"DB ID is not valid",
                            "maxlength":"DB ID is not valid",
                            "required":"DB ID is required."
                        }
                    }, 
                    "success":{
                        "checks":{}
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "collection.name":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Collection name is not in valid format",
                            "required":"Collection name is required."
                        }
                    },
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z-]+$',
                        "uivalue":'^[a-zA-Z-]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "collection.description":{
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
                        "value":2,
                        "uivalue":2,
                        "bothAreSame":true
                    },
                    "maxLength":{
                        "value":240,
                        "uivalue":240,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "schema":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Additional data can have only object values",
                            "required":"Default collections object is required filed"
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "signature.id":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Please provide vaild signature id",
                            "minlength":"Please provide vaild signature id",
                            "maxlength":"Please provide vaild signature id",
                            "required":"Signature id is required"
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z0-9]+$',
                        "uivalue":'^[a-zA-Z0-9]+$',
                        "bothAreSame":true
                    },
                    "minlength":{
                        "value":24
                    },
                    "maxlength":{
                        "value":24
                    },
                    "required":{
                        "value":"required"
                    }
                }
            },
            "signature.token":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"Please provide vaild signature token",
                            "required":"Signature token is required"
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":32
                    },
                    "required":{
                        "value":"required"
                    }
                }
            }
        }
    }
}