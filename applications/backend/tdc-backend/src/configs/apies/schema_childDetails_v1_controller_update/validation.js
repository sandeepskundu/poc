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
                        "value":"required",
                        "uivalue":"required",
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
                            "job":true,
                            "action":true,
                            "version":true
                        },
                        "uivalue":{
                            "job":true,
                            "action":true,
                            "version":true
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