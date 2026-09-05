const schema = {
    "hashId":true,
    "itemId":true,
    "teamId":true,
    "userId":true
}

const update = () => {
    return {...schema, ...{itemId:false, userId:false}}
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
                    map:"itemId",
                    from:"body-item"
                },
                2:{
                    map:"userId",
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
        byTeamId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"teamId",
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
                    11000:'User is already linked with another team for this record.'
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