const schema = {
    "dob":true,
    "name":true,
    "photo":false,
    "gender":true,
    "mapId":true,
    "marital":true,
    "country":true,
}

module.exports = {
    response:{
        exclude:{
            enable:true,
            kies:{
                mapId:true
            }
        },
    },
    valuemap: {
        rootParentId:{
            valuemap: {
                map:"runtimeUtils.merchantRootHash",
                from:"appConfig"
            }
        }
    },

    md5Hash:{},

    schema:{
        default:schema,
        update:{...schema, ...{mapId:false}}
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
        byMapId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"mapId",
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
    },

    validation:{
        errors:{
            
        }
    },

    values:{
        infoDetails:{
            default:{},
            exclude:{},
            hardcoded:{
                hasChilds:false
            },
        }
    }
}