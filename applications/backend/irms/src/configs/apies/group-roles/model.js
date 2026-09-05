const schema = {
    "code":true,
    "name":true,
    "band":true,
    "grade":true,
    "hashId": true,
    "nameHash": true,
    "codeHash": true,
    "bandHash": true,
    "gradeHash": true,
    "description": true,
    "departmentHash": true,
}

const update = () => {
    return {...schema, ...{hashId:false}}
}

module.exports = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                hashId:true,
                nameHash:true,
                codeHash:true,
                bandHash:true,
                gradeHash:true,
                departmentHash:true
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

    md5Hash:{
        hashId:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"departmentHash",
                    from:"body-item"
                },
                2:{
                    map:"number",
                    from:"random"
                }
            }
        },
        nameHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"departmentHash",
                    from:"body-item"
                },
                2:{
                    map:"name",
                    from:"body-item"
                }
            }
        },
        codeHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"departmentHash",
                    from:"body-item"
                },
                2:{
                    map:"code",
                    from:"body-item"
                }
            }
        },
        bandHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"departmentHash",
                    from:"body-item"
                },
                2:{
                    map:"band",
                    from:"body-item"
                }
            }
        },
        gradeHash:{
            nodes:{
                0:{
                    map:"runtimeUtils.merchantRootHash",
                    from:"appConfig"
                },
                1:{
                    map:"departmentHash",
                    from:"body-item"
                },
                2:{
                    map:"grade",
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
        departmentHash:{
            runtime:{
                enable:true,
                configs:{
                    query:{
                        0:{
                            cloumn:"departmentHash",
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
            nameHash:{
                mapTo:'name',
                messages:{
                    11000:'Duplicate name is not allowed'
                }
            },
            codeHash:{
                mapTo:'code',
                messages:{
                    11000:'Duplicate code is not allowed'
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