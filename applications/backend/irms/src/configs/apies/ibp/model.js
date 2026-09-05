const schema = {
    "type":true,
    "hashId":true,
    "itemId":true,
    "userId":true
}

const update = () => {
    return {...schema, ...{}}
}

module.exports = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                hashId:true
            }
        },
    },
    valuemap: {},

    md5Hash:{
        hashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"userId",
                    from:"body-item"
                },
                2:{
                    map:"itemId",
                    from:"body-item"
                }
            }
        },
    },

    schema:{
        default:schema,
        update:update()
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
        itemId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"itemId",
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
            hashId:{
                mapTo:'userId',
                messages:{
                    11000:'Duplicate user is not allowed'
                }
            }
        }
    },

    values:{
        infoDetails:{
            default:{},
            exclude:{},
            hardcoded:{},
        }
    }
}