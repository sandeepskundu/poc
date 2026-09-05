import Tabs from './tabs';
import configs from './configs';
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';
import ModelQuery from 'aio-app-ui-api-organisms//model-configs';
import ModelValidation from 'aio-app-ui-api-organisms/model-validation';
import ApiDetailsMappin from 'aio-app-ui-api-organisms/api-details-mapping';

const ValidationWrapper = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const id = helpers.random.id(10);

    const [details, setDetails] = useState({
        mapping:{
            "app":"",
            "type":"",
            "job":"",
            "method":"",
            "action":"",
            "version":"",
            "controller":""
        },
        dbDetails:{
            columns:{
                '_a':{},
                '_id':{},
                '_dbId':{},
            },
        },
        
        model:{
            /*--

            "response":{
                "exclude":{
                    "enable":true,
                    "kies":{
                        "ts":true,
                        "appId":true,
                        "schema":true
                    }
                }
            },

            "collSchema":{
                "_dbId":true,
                "appId":true,
                "schema":true,
                "collection.name":true,
                "_merchantId":true
            },

            --*/

            response:{
                exclude:{
                    enable:true,
                    kies:{
                        ts:true,
                        appId:true,
                        schema:true
                    }
                }
            },

            valuemap:{
                "kundu":{
                    "valuemap":{
                        "map":"id",
                        "from":"merchant",
                        "fallback":{
                            "map":"",
                            "from":"env"
                        }
                    }
                },
                "name.last":{
                    "valuemap":{
                        "map":"id",
                        "from":"body-item",
                        "fallback":{
                            "map":"",
                            "from":"env"
                        }
                    }
                }
            },

            md5Hash:{
                'name.middle':{
                    "nodes":{
                        "0":{
                            "map":"id",
                            "from":"body",
                            "fallback":{
                                "map":"",
                                "from":"env"
                            }
                        },
                        "1":{
                            "map":"id",
                            "from":"merchant",
                            "fallback":{
                                "map":"",
                                "from":"env"
                            }
                        }
                    }
                },
                'name.last':{
                    "nodes":{
                        "0":{
                            "map":"id",
                            "from":"body",
                            "fallback":{
                                "map":"",
                                "from":"env"
                            }
                        },
                        "1":{
                            "map":"id",
                            "from":"merchant",
                            "fallback":{
                                "map":"",
                                "from":"env"
                            }
                        }
                    }
                }
            },

            schemaSample:{
                kundu:{
                    kinala:{
                        hissar:true
                    }
                },
                name:{
                    last:'',
                    middle:{
                        last:true
                    }
                }
            },

            pagination:{
                enable:false,
                limit:{
                    min:5,
                    max:100,
                    default:7
                }
            },

            signature:{
                merge:{
                    enable:false
                },
        
                creation:{
                    enable:false,
                    nodes:{
                        _id:{
                            enable:false,
                            valueType:"objectId"
                        },
                        _userId:{
                            enable:false,
                            valueType:"objectId"
                        },
                        _mapId:{
                            enable:false,
                            valueType:"objectId"
                        },
                        _merchantId:{
                            enable:false,
                            valueType:"objectId"
                        }
                    }
                }
            },
            query:{
                hidden:{
                    enable:false,
                    columns:{
                        userId:false,
                        merchantId:true
                    }
                },
                runtime:{
                    enable:true,
                    configs:{
                        query:{
                            0:{
                                cloumn:"_id",
                                value:{
                                    from:"params",
                                    node:"id"
                                },
                                operation:{
                                    eq:{
                                        opType:"eq",
                                        enable:true
                                    }
                                }
                            },
                            1:{
                                cloumn:"_dbId",
                                value:{
                                    from:"params",
                                    node:"subId"
                                },
                                operation:{
                                    eq:{
                                        opType:"eq",
                                        enable:true
                                    }
                                }
                            }
                        },
                        logical:{
                            and:{
                                logical:{
                                    and:{
                                        query:{
                                            0:{
                                                cloumn:"_id_and_and",
                                                value:{
                                                    from:"params",
                                                    node:"id"
                                                },
                                                operation:{
                                                    eq:{
                                                        opType:"eq",
                                                        enable:true
                                                    }
                                                }
                                            },
                                            1:{
                                                cloumn:"_dbId",
                                                value:{
                                                    from:"params",
                                                    node:"subId"
                                                },
                                                operation:{
                                                    eq:{
                                                        opType:"eq",
                                                        enable:true
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    or:{
                                        query:{
                                            0:{
                                                cloumn:"_id",
                                                value:{
                                                    from:"params",
                                                    node:"id"
                                                },
                                                operation:{
                                                    eq:{
                                                        opType:"eq",
                                                        enable:true
                                                    }
                                                }
                                            },
                                            1:{
                                                cloumn:"_dbId",
                                                value:{
                                                    from:"params",
                                                    node:"subId"
                                                },
                                                operation:{
                                                    eq:{
                                                        opType:"eq",
                                                        enable:true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                query:{
                                    0:{
                                        cloumn:"_id",
                                        value:{
                                            from:"params",
                                            node:"id"
                                        },
                                        operation:{
                                            eq:{
                                                opType:"eq",
                                                enable:true
                                            }
                                        }
                                    },
                                    1:{
                                        cloumn:"_dbId",
                                        value:{
                                            from:"params",
                                            node:"subId"
                                        },
                                        operation:{
                                            eq:{
                                                opType:"eq",
                                                enable:true
                                            }
                                        }
                                    }
                                }
                            },
                            or:{
                                query:{
                                    0:{
                                        cloumn:"_id",
                                        value:{
                                            from:"params",
                                            node:"id"
                                        },
                                        operation:{
                                            eq:{
                                                opType:"eq",
                                                enable:true
                                            }
                                        }
                                    },
                                    1:{
                                        cloumn:"_dbId",
                                        value:{
                                            from:"params",
                                            node:"subId"
                                        },
                                        operation:{
                                            eq:{
                                                opType:"eq",
                                                enable:true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        validation:{
            request:{
                auth:{},
                body:{
                    "min":1,
                    "max":10,
                    "type":"list",
                    "required":"optional",
                    "message":{
                        "error":"Only put method is allowed",
                        "success":"Only put method is allowed"
                    }
                },
                methods:{
                    "get":{
                        "allowed":true,
                        "message":{
                            "error":"Only put method is allowed",
                            "success":"Only put method is allowed"
                        }
                    }
                },
                headers:{}
            },
            validation:{
                body:{
                    "_dbId":{
                        "valuemap":{
                            "selfMapped":false,
                            "map":"collection.dbId",
                            "from":"body-item",
                            "fallback":{
                                "map":"",
                                "from":"env"
                            }
                        },
                        "message":{
                            "en":{
                                "error":{
                                    "default":"Defaults error message",
                                    "checks":{
                                        "regex":"",
                                        "enums":"",
                                        "minvalue":"",
                                        "maxvalue":"",
                                        "minlength":"",
                                        "maxlength":"",
                                        "required":"This field is required."
                                    }
                                }, 
                                "success":{
                                    "default":"Defaults success message",
                                    "checks":{
                                        "regex":"",
                                        "enums":"",
                                        "minvalue":"",
                                        "maxvalue":"",
                                        "minlength":"",
                                        "maxlength":"",
                                        "required":"This field is required."
                                    }
                                }
                            }, 
                            "hi":{
                                "error":{
                                    "default":"HI - Defaults error message",
                                    "checks":{
                                        "regex":"",
                                        "enums":"",
                                        "minvalue":"",
                                        "maxvalue":"",
                                        "minlength":"",
                                        "maxlength":"",
                                        "required":"HI - This field is required."
                                    }
                                }, 
                                "success":{
                                    "default":"HI - Defaults success message",
                                    "checks":{
                                        "regex":"",
                                        "enums":"",
                                        "minvalue":"",
                                        "maxvalue":"",
                                        "minlength":"",
                                        "maxlength":"",
                                        "required":"HI - This field is required."
                                    }
                                }
                            }
                        },
                        "checks":{
                            "regex":{
                                "value":'672cac644a0dded765b5c3b2.6738829afbe779c7746626aa1.672cac644a0dded765b5c3b22.6738829afbe779c7746626aa3.672cac644a0dded765b5c3b24.6738829afbe779c7746626aa5.672cac644a0dded765b5c3b26.6738829afbe779c77466276aa.672cac8644a0dded765b5c3b2.6738829afb9e779c7746626aa',
                                "uivalue":'',
                                "bothAreSame":true
                            },
                            "enums":{
                                "value":'672cac644a0dded765b5c3b2.6738829afbe779c7746626aa1.672cac644a0dded765b5c3b22.6738829afbe779c7746626aa3.672cac644a0dded765b5c3b24.6738829afbe779c7746626aa5.672cac644a0dded765b5c3b26.6738829afbe779c77466276aa.672cac8644a0dded765b5c3b2.6738829afb9e779c7746626aa',
                                "uivalue":'',
                                "bothAreSame":true
                            },
                            "minlength":{
                                "value":2,
                                "uivalue":20,
                                "bothAreSame":true
                            },
                            "required":{
                                "value":"required",
                                "uivalue":"required",
                                "bothAreSame":true
                            }
                        }
                    }
                },
                query:{
                    "kundu":{

                    },
                    "sandeep":{
                        
                    }
                },
                params:{},
                headers:{},
                cookies:{}
            }
        }
    });

    const onDetailChange = (arg, type) => {
        let d = helpers.json.copy(details);

        switch (type) {
            case 'mapping':
                d.mapping = arg || {};
            break;
            case 'md5Hash':
                d.model.md5Hash = arg || {};
            break;
            case 'response':
                d.model.response = arg || {};
            break;
            case 'query':
                d.model.query = arg || {};
            break;
            case 'validation':
                d.validation = arg || {};
            break;
            case 'pagination':
                d.model.pagination = arg || {};
            break;
            case 'signature':
                d.model.signature = arg || {};
            break;
            case 'model-valuemap':
                d.model.valuemap = arg || {};
            break;
            default :
            break;
        }

        console.log(d);
        
        setDetails(d);
    }

    const ui = () => {
        return (
            <>
                {/*--<Tabs />--*/}

                <div className='full'>
                    <ApiDetailsMappin 
                        details={details}
                        configs={configs}
                        onChange={onDetailChange}
                        modified={helpers.json.val(details, 'mapping', {})}
                        //editable={mapping?true:false}
                    />

                    <div className='full'>
                        <ModelQuery 
                            details={details}
                            configs={configs}
                            onChange={onDetailChange}
                            modified={helpers.json.val(details, 'model', {})}
                        />
                    </div>

                    <div className='full'>
                        <ModelValidation 
                            details={details}
                            configs={configs}
                            onChange={onDetailChange}
                            modified={helpers.json.val(details, 'validation', {})}
                        />
                    </div>
                </div>
            </>
        )
    }

    return ui();
}

export default ValidationWrapper;