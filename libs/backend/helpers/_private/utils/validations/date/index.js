const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const date = (req, extend) => {
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "date":"Invalid date",
                    "regex":utils.regex.date.format.YYYY_MM_DD.message,
                    "required":req.helpers.json.val(messages, 'default.required'),
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.date.format.YYYY_MM_DD.value
            },
            "required":{
                "value":"required"
            },
            "date":{
                "value":{
                    "range":{
                        "_datemap":{
                            "from":"body-item",
                            "map":"date"
                        },
                        "details":{
                            "year":{
                                "min":{
                                    "count":200,
                                    "type":'minus'
                                },
                                "max":{
                                    "count":200,
                                    "type":'minus',
                                }
                            },
                            "days":{
                                "min":{
                                    "count":0,
                                    "type":'minus',
                                },
                                "max":{
                                    "count":0,
                                    "type":'minus',
                                }
                            }
                        }
                    }
                }
                
            }
        }
    }, (extend || {}));
}

const adult = async (req, extend) => {
    return await date(req, req.helpers.json.merge({
        "checks":{
            "date":{
                "value":{
                    "range":{
                        "details":{
                            "year":{
                                "min":{
                                    "count":18,
                                    "type":'minus'
                                },
                                "max":{
                                    "count":100,
                                    "type":'minus'
                                }
                            },
                            "days":{
                                "min":{
                                    "count":0,
                                    "type":'minus'
                                },
                                "max":{
                                    "count":1,
                                    "type":'minus'
                                }
                            }
                        }
                    }
                }
            }
        }
    }, (extend || {})))
}

exports.adult = adult;