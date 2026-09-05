module.exports = {
    "request":{
        "methods":{
            "put":{
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
            "type":"object",
            "required":"required",
            "message":{
                "error":"Pls provide correct data details",
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
                            "regex":"Please provide vaild id",
                            "minlength":"Please provide vaild id",
                            "maxlength":"Please provide vaild id",
                            "required":"Please provide vaild id"
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
            }
        },
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
            "pathPrefix":{
                "message":{
                    "error":{
                        "checks":{
                            "required":"Please provide vaild path prefix"
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":"^[A-Za-z-]+$",
                        "uivalue":'^[A-Za-z-]+$',
                        "bothAreSame":true
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
            "hasAtomicChilds":{
                "message":{
                    "error":{
                        "checks":{
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
            "parentId":{
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
                    "regex":{
                        "value":'^[a-zA-Z0-9]+$',
                        "uivalue":'^[a-zA-Z0-9]+$',
                        "bothAreSame":true
                    },
                    "minlength":{
                        "value":32
                    },
                    "maxlength":{
                        "value":32
                    },
                    "required":{
                        "value":"optional"
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
                        "value":"optional",
                        "uivalue":"optional",
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