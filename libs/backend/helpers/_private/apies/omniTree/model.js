const schema = {
    "key": true,
    "name": true,
    "mapId": true,
    "value": true,
    "details": true,
    "summary": true,
    "keyHash": true,
    "nameHash": true,
    "description": true,
}

const update = () => {
    return { ...schema, ...{} }
}

const get = async (req, extend) => {
    return req.helpers.json.merge({
        name:'',
        response: {
            exclude: {
                enable: true,
                kies: {
                    ts: true,
                    keyHash: true,
                    nameHash: true,
                }
            },
        },
        valuemap: {},
        md5Hash: {
            keyHash: {
                nodes: {
                    0: {
                        map: "runtimeUtils.merchantRootHash",
                        from: "appConfig"
                    },
                    1: {
                        map: "mapId",
                        from: "body-item",
                        ignoreValueCheck:true
                    },
                    2: {
                        map: "key",
                        from: "body-item"
                    }
                }
            },
            nameHash: {
                nodes: {
                    0: {
                        map: "runtimeUtils.merchantRootHash",
                        from: "appConfig"
                    },
                    1: {
                        map: "mapId",
                        from: "body-item",
                        ignoreValueCheck:true
                    },
                    2: {
                        map: "name",
                        from: "body-item"
                    }
                }
            }
        },

        schema: {
            default: schema,
            update: update()
        },

        signature: {
            merge: {
                enable: true
            },
            creation: {
                enable: true,
                nodes: {
                    _id: {
                        enable: true,
                        valueType: "objectId"
                    },
                    _merchantId: {
                        enable: true,
                        valueType: "objectId"
                    }
                }
            }
        },

        query: {
            byMerchantHash: {
                runtime: {},
                otherConfigs: {
                    doNotCheckQueryLength: true
                }
            },
            byId: {
                runtime: {
                    enable: true,
                    configs: {
                        query: {
                            0: {
                                cloumn: "_id",
                                value: {
                                    map: "id",
                                    from: "params"
                                },
                                operation: {
                                    eq: {
                                        enable: true,
                                        opType: "eq"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            byIdAndMapId: {
                runtime: {
                    enable: true,
                    configs: {
                        query: {
                            0: {
                                cloumn: "_id",
                                value: {
                                    map: "id",
                                    from: "params"
                                },
                                operation: {
                                    eq: {
                                        enable: true,
                                        opType: "eq"
                                    }
                                }
                            },
                            1: {
                                cloumn: "mapId",
                                value: {
                                    map: "mapId",
                                    from: "body"
                                },
                                operation: {
                                    eq: {
                                        enable: true,
                                        opType: "eq"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            mapId: {
                runtime: {
                    enable: true,
                    configs: {
                        query: {
                            0: {
                                cloumn: "mapId",
                                value: {
                                    map: "id",
                                    from: "params"
                                },
                                operation: {
                                    eq: {
                                        enable: true,
                                        opType: "eq"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        validation: {
            errors: {
                keyHash: {
                    mapTo: 'key',
                    messages: {
                        11000: 'Duplicate key is not allowed'
                    }
                },
                nameHash: {
                    mapTo: 'name',
                    messages: {
                        11000: 'Duplicate name is not allowed'
                    }
                }
            }
        },

        values: {
            infoDetails: {
                default: {},
                exclude: {},
                hardcoded: {},
            }
        }
    }, extend || {});
};

const compile = async (req, routeConf, globalConf) => {
    let rval = await get(req, {});
    let rmodel = req.helpers.json.get(routeConf, 'model', {});
    let gmodel = req.helpers.json.get(globalConf, 'model', {});
        rval = req.helpers.json.merge(rval, gmodel);
        rval = req.helpers.json.merge(rval, rmodel);

    return rval;
};

exports.get = get;
exports.compile = compile;