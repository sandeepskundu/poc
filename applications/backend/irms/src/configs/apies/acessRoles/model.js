const schema = {
    "code": true,
    "name": true,
    "hashId": true,
    "parentId": true,
    "codeHash": true,
    "hasChilds": true,
    "nameHashId": true,
    "description": true,
    "isAccessControlled": true
}

const actions = {
    "actions.fetch":true,
    "actions.update":true,
    "actions.create":true,
    "actions.remove":true
}

const details = () => {
    return {...schema, ...actions}
}

const update = () => {
    return {...schema, ...{hashId:false, parentId:false}}
}

const updateDetails = () => {
    return {...update(), ...actions}
}

module.exports = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                exposed:true,
                nameHashId:true
            }
        },
        transform:{
            enable:true,
            kies:{
                _id:"id"
            }
        }
    },
    valuemap: {
        rootParentId:{
            valuemap: {
                map:"runtimeUtils.merchantRootHash",
                from:"appConfig"
            }
        }
    },

    md5Hash:{
        nameHashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"parentId",
                    from:"body-item"
                },
                2:{
                    map:"name",
                    from:"body-item"
                }
            }
        },
        rootNameHashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"name",
                    from:"body-item"
                }
            }
        },
        itemHashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"parentId",
                    from:"body-item"
                },
                2:{
                    map:"number",
                    from:"random"
                }
            }
        },
        rootHashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"number",
                    from:"random"
                }
            }
        },
        childCodeHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"parentId",
                    from:"body-item"
                },
                2:{
                    map:"code",
                    from:"body-item"
                }
            }
        },
        rootCodeHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"code",
                    from:"body-item"
                }
            }
        }
    },

    schema:schema,
    schemaByType:{
        update:update(),
        details:details(),
        updateDetails:updateDetails()
    },

    signature:{
        merge:{
            enable:true
        },
        creation:{
            enable:true,
            nodes:{
                _id:{
                    enable:true,
                    valueType:"objectId"
                },
                _merchantId:{
                    enable:true,
                    valueType:"objectId"
                }
            }
        }
    },

    query:{
        byId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"_id",
                            value:{
                                map:"id",
                                from:"params"
                            },
                            operation:{
                                eq:{
                                    enable:true,
                                    opType:"eq"
                                }
                            }
                        }
                    }
                }
            }
        },
        hashId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"hashId",
                            value:{
                                map:"id",
                                from:"params"
                            },
                            operation:{
                                eq:{
                                    enable:true,
                                    opType:"eq"
                                }
                            }
                        }
                    }
                }
            }
        },
        parentId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"parentId",
                            value:{
                                map:"id",
                                from:"params"
                            },
                            operation:{
                                eq:{
                                    enable:true,
                                    opType:"eq"
                                }
                            }
                        }
                    }
                }
            }
        },
        merchantRootHash:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"parentId",
                            value:{
                                from:"appConfig",
                                map:"runtimeUtils.merchantRootHash"
                            },
                            operation:{
                                eq:{
                                    "enable":true,
                                    "opType":"eq"
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    validation:{
        errors:{
            nameHashId:{
                mapTo:'name',
                messages:{
                    11000:'Duplicate'
                }
            },
            typeHash:{
                mapTo:'type',
                messages:{
                    11000:'Duplicate'
                }
            },
            codeHash:{
                mapTo:'code',
                messages:{
                    11000:'Duplicate'
                }
            }
        }
    },

    values:{
        infoDetails:{
            default:{},
            exclude:{},
            hardcoded:{
                hasChilds:false
            },
        },
        parentDetail:{
            default:{},
            exclude:{},
            hardcoded:{
                hasChilds:true
            },
        },
        rootDetails:{
            default:{},
            exclude:{},
            hardcoded:{
                hasChilds:true
            },
        }
    }
}