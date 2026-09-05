const helpers = process.uiHelpers();
const item = process.aioAppConfigs('storybook/raw/atoms/accordion/item');
 
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
};

const dataProp = helpers.json.get(storybook, 'predefined.data', {});

const func = (desc) => {
    return {
        dvalue:null,
        type:'function',
        descripttion:desc || ''
    }
}

const itemProps = () => {
    return {
        type:'nested',
        description:'',
        ___:{
            nested:helpers.json.merge(helpers.json.get(item, 'props', {}), {
                theme:null,
                mapping:null,
                templates:null,
                callbacks:null,
                header:{
                    ___:{
                        nested:{
                            wrapper:{
                                ___:{
                                    predefined:{
                                        overwirte:{
                                            ds:{
                                                ___:{
                                                    nested:{
                                                        css:{
                                                            ___:{
                                                                nested:{
                                                                    class:{
                                                                        ___:{
                                                                            nested:{
                                                                                border:{
                                                                                    dvalue:1
                                                                                },
                                                                                borderNone:{
                                                                                    ___:{
                                                                                        nested:{
                                                                                            1:{
                                                                                                dvalue:false
                                                                                            }, 
                                                                                            2:{
                                                                                                dvalue:true
                                                                                            },
                                                                                            3:{
                                                                                                dvalue:true
                                                                                            },
                                                                                            4:{
                                                                                                dvalue:true
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    }
}

const mapping = () => {
    return helpers.json.get(item, 'props.mapping', {});
}

const templates = () => {
    return helpers.json.get(item, 'props.templates', {});
}

const callbacks = () => {
    return helpers.json.merge(helpers.json.get(item, 'props.callbacks', {}), {
        ___:{
            nested:{
                onToggle:func()
            }
        }
    });
}

module.exports = {
    item:itemProps(),
    mapping:mapping(),
    templates:templates(),
    callbacks:callbacks(),
    data:{
        type:'nested',
        ___:{
            nested:{
                list:dataProp,
                selected:dataProp,
                disabled:dataProp,
                excluded:dataProp
            }
        }
    },
    multiple:{
        dvalue:false,
        type:'boolean'
    },
    bindJsComponents:{
        dvalue:true,
        type:'boolean'
    },
    wrapper:{
        type:'predefined',
        description:'',
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.configs',
                overwirte:{
                    markup:{
                        ___:{
                            nested:{
                                element:{
                                    dvalue:'ul'
                                }
                            }
                        }
                    },
                    ds:{
                        ___:{
                            nested:{
                                theme:null,
                                predefined:null,
                                css:{
                                    ___:{
                                        nested:{
                                            class:{
                                                ___:{
                                                    nested:{
                                                        border:{},
                                                        radius:{}
                                                    }
                                                }
                                            },
                                            flags:{
                                                ___:{
                                                    nested:{
                                                        animation:{
                                                            dvalue:'anim'
                                                        }
                                                    }
                                                }
                                            }
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
    theme:helpers.json.merge(helpers.json.get(item, 'props.theme', {}), {
        ___:{
            nested:{
                body:{
                    ___:{
                        nested:{
                            default:{
                                ___:{
                                    nested:{
                                        wrapper:{
                                            ___:{
                                                nested:{
                                                    background:{
                                                        dvalue:''
                                                    }
                                                }
                                            }
                                        }
                                    }         
                                }
                            },
                            selected:{
                                ___:{
                                    nested:{
                                        wrapper:{
                                            ___:{
                                                nested:{
                                                    background:{
                                                        dvalue:''
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
                wrapper:{
                    type:'nested',
                    ___:{
                        nested:helpers.json.merge(storybook.predefined.utils.preset.getByList(['colors']), {
                            background:{}
                        })
                    }
                }
            }
        }
    })
};