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
            "collection.id":{
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
            "parentId":{
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
                        "value":32,
                        "uivalue":32,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":32,
                        "uivalue":32,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
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
                        "value":"optional",
                        "uivalue":"optional",
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
                            "method":true,
                        },
                        "uivalue":{
                            "method":true,
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
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            }, 

            "model":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Model node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.response":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.response.exclude":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.response.exclude.enable":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.response.exclude.kies":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "model.schemaSample": {
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "model.valuemap":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.pagination":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.pagination.enable":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.signature":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.signature.merge":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.signature.merge.enable":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.signature.creation":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.signature.creation.enable": {
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.query":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.query.hidden":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.query.hidden.enable": {
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.query.hidden.columns":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "model.query.runtime.enable":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "model.query.runtime.configs":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.body":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            //"validation.request.body.type": true,

            "validation.request.body.message":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.body.message.error":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.body.message.success":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.get":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.get.allowed":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.get.message":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            //"validation.request.methods.get.message.error": true,
            //"validation.request.methods.get.message.success": true,

            "validation.request.methods.post.allowed":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.post.message":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.put.allowed":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.put.message":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            //"validation.request.methods.put.message.error": true,
            //"validation.request.methods.put.message.success": true,

            "validation.request.methods.post.allowed":{
                "message":{
                    "error":{
                        "checks":{
                            "enable":"This node can have only enable values",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "boolean":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "validation.request.methods.post.message":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },

            // "validation.request.methods.delete.message.error": true,
            // "validation.request.methods.delete.message.success": true,

            "validation.validation":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "validation.validation.body":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "validation.validation.query":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "validation.validation.params":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "validation.validation.headers":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "validation.validation.cookies":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"This node can have only object value.",
                            "required":"This field is required."
                        }
                    },
                },
                "checks":{
                    "object":{
                        "value":"required"
                    },
                    "required":{
                        "value":"optional",
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