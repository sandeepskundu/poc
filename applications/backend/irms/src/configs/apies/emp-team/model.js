const schema = {
    "type": true,
    "empId": true,
    "mapping": true,
    "uniqueHash": true
}

const update = () => {
    return {...schema}
}

module.exports = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                uniqueHash:true,
            }
        },
    },
    valuemap: {},

    md5Hash:{
        uniqueHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"type",
                    from:"body-item"
                },
                2:{
                    map:"empId",
                    from:"body-item"
                },
                3:{
                    map:"mapping",
                    from:"body-item"
                }
            }
        }
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
        byIdAndType:{
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
                        }, 
                        1:{
                            cloumn:"type",
                            value:{
                                map:"subId",
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
        empId:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"empId",
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
        }
    },

    validation:{
        errors:{
            uniqueHash:{
                mapTo:'mapping',
                messages:{
                    11000:'Duplicate team is not allowed'
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