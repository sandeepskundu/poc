const schema = {
    "isac":true,
    "hashId":true,
    "teamId":true,
    "itemId":true,
    "rolemap":true,
    "linkwith":true,
}

const update = () => {
    return {...schema, ...{itemId:false, isac:false}}
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
                    map:"linkwith",
                    from:"body-item"
                },
                2:{
                    map:"itemId",
                    from:"body-item"
                },
                3:{
                    map:"rolemap",
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
                mapTo:'rolemap',
                messages:{
                    11000:'Selected role map is already linked with existing team for this record.'
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