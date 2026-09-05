const helpers = process.uiHelpers();
const body = process.aioAppConfigs('storybook/raw/atoms/accordion/body');
const heading = process.aioAppConfigs('storybook/raw/atoms/accordion/heading');
 
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const func = (desc) => {
    return {
        dvalue:null,
        type:'function',
        descripttion:desc || ''
    }
}

const string = (dval, desc) => {
    return {
        type:'string',
        dvalue:dval || '',
        descripttion:desc || ''
    }
}

const templates = () => {
    return {
        type:'nested',
        descripttion:'',
        ___:{
            nested:{
                header:{
                    type:'nested',
                    ___:{
                        nested:{
                            end:func(),
                            after:func(),
                            start:func(),
                            before:func(),
                            center:func()
                        }
                    }
                },
                body:{
                    type:'nested',
                    ___:{
                        nested:{
                            content:func()
                        }
                    }
                }
            }
        }
    }
}

const itemCallbacks = () => {
    return {
        type:'nested',
        descripttion:'',
        ___:{
            nested:{
                onOpen:func(),
                onClose:func(),
                onToggle:func()
            }
        }
    }
}

const callbacks = () => {
    return {
        type:'nested',
        descripttion:'',
        ___:{
            nested:{
                item:itemCallbacks(),
                header:helpers.json.get(heading, 'props.callbacks', {}),

            }
        }
    }
}

const ds = (desc, elm, arg) => {
    return helpers.json.merge({
        type:'predefined',
        description:desc || '',
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.configs',
                overwirte:{
                    markup:{
                        ___:{
                            nested:{
                                element:{
                                    dvalue:elm || 'div'
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
    }, arg || {});
}

const headerProps = () => {
    return {
        type:'nested',
        descripttion:'',
        ___:{
            nested:helpers.json.merge(helpers.json.get(heading, 'props', {}), {
                theme:null,
                childs:null,
                callbacks:null,
                wrapper:ds('')

            })
        }
    }
}

const bodyProps = () => {
    return {
        type:'nested',
        descripttion:'',
        ___:{
            nested:helpers.json.merge(helpers.json.get(body, 'props', {}), {
                theme:null,
                content:null,
                wrapper:ds('', '', {
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
                                                                    fontsize:{
                                                                        dvalue:'md'
                                                                    },
                                                                    padding:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{
                                                                                    dvalue:8
                                                                                },
                                                                                2:{
                                                                                    dvalue:12
                                                                                },
                                                                                3:{
                                                                                    dvalue:12
                                                                                },
                                                                                4:{
                                                                                    dvalue:12
                                                                                }
                                                                            }
                                                                        }
                                                                    }
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
                })
            })
        }
    }
}

module.exports = {
    wrapper:ds('', 'li', {
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
                                                    nested:{}
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
    }),
    body:bodyProps(),
    header:headerProps(),
    templates:templates(),
    callbacks:callbacks(),
    mapping:{
        type:'nested',
        descripttion:'',
        ___:{
            nested:{
                header:{
                    type:'nested',
                    ___:{
                        nested:{
                            end:string(),
                            after:string(),
                            start:string(),
                            before:string(),
                            center:string('heading')
                        }
                    }
                },
                body:{
                    type:'nested',
                    ___:{
                        nested:{
                            content:string('content')
                        }
                    }
                }
            }
        }
    },
    theme:{
        type:'nested',
        ___:{
            nested:{
                body:helpers.json.merge(helpers.json.get(body, 'props.theme', {}), {}),
                header:helpers.json.merge(helpers.json.get(heading, 'props.theme', {}), {
                    ___:{
                        nested:{
                            default:{
                                type:'nested',
                                ___:{
                                    nested:{
                                        wrapper:{
                                            ___:{
                                                nested:{
                                                    border:{
                                                        dvalue:'c00103'
                                                    },
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
}