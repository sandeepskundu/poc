const helpers = process.uiHelpers();
const icon = process.aioAppConfigs('storybook/raw/atoms/icons');
const row = process.aioAppConfigs('storybook/raw/atoms/content-row');
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const excludeThemeAndPredefined = () => {
    return {
        ___:{
            predefined:{
                overwirte:{
                    ds:{
                        ___:{
                            nested:{
                                theme:null,
                                predefined:null
                            }
                        }
                    }
                }
            }
        }
    }
}


const themeColors = (desc, arg) => {
    return {
        type:'nested',
        description:desc || '',
        ___:{
            nested:helpers.json.merge(storybook.predefined.utils.preset.getByList(['colors']), arg || {})
        }
    }
}

module.exports = helpers.json.merge(helpers.json.get(row, 'props', {}), {
    theme:{
        type:'nested',
        ___:{
            nested:{
                default:{
                    type:'nested',
                    ___:{
                        nested:{
                            end:themeColors('', {}),
                            start:themeColors('', {}),
                            center:themeColors('', {}),
                            after:themeColors('', {}),
                            before:themeColors('', {}),
                            wrapper:themeColors('', {
                                hbackground:{
                                    dvalue:'c00102'
                                }
                            }),
                        }
                    }
                },
                selected:{
                    type:'nested',
                    ___:{
                        nested:{
                            end:themeColors('', {}),
                            start:themeColors('', {}),
                            center:themeColors('', {}),
                            after:themeColors('', {}),
                            before:themeColors('', {}),
                            wrapper:themeColors('', {
                                background:{
                                    dvalue:'c00103'
                                }
                            }),
                        }
                    }
                },
                disabled:{
                    type:'nested',
                    ___:{
                        nested:{
                            end:themeColors('', {}),
                            start:themeColors('', {}),
                            center:themeColors('', {}),
                            after:themeColors('', {}),
                            before:themeColors('', {}),
                            wrapper:themeColors('', {
                                color:{
                                    dvalue:'c00105'
                                },
                                background:{
                                    dvalue:'c00101'
                                }
                            }),
                        }
                    }
                },

            }
        }
    },
    toggleElement:{
        type:"enum",
        dvalue:'wrapper',
        description:"",
        ___:{
            enum:{
                from:'statics',
                mapping:"accordion.header.toggleElement"
            }
        }
    },
    expendIcon:{
        type:'nested',
        description:'',
        ___:{
            nested:{
                exclude:{
                    dvalue:false,
                    type:'boolean'
                },
                show:{
                    dvalue:true,
                    type:'boolean'
                },
                state:{
                    type:"enum",
                    dvalue:'default',
                    description:"",
                    ___:{
                        enum:{
                            from:'statics',
                            mapping:"tree.row.states"
                        }
                    }
                },
                placement:{
                    type:"enum",
                    dvalue:'end',
                    description:"",
                    ___:{
                        enum:{
                            from:'statics',
                            mapping:"content.row.childs"
                        }
                    }
                },
                names:{
                    type:'nested',
                    ___:{
                        nested:{
                            selected:{
                                type:'string',
                                dvalue:'minus'
                            },
                            default:{
                                type:'string',
                                dvalue:'plus'
                            }
                        }
                    }
                },
                config:{
                    type:'nested',
                    ___:{
                        nested:helpers.json.merge(helpers.json.get(icon, 'props', {}), {
                            config:{
                                ___:{
                                    predefined:{
                                        overwirte:{
                                            svg:{
                                                ___:{
                                                    nested:{
                                                        size:{
                                                            dvalue:'20px'
                                                        }
                                                    }
                                                }
                                            },
                                            icon:{
                                                ___:{
                                                    nested:{
                                                        size:{
                                                            dvalue:'20'
                                                        }
                                                    }
                                                }
                                            },
                                            dataAttrIconConfig:{
                                                dvalue:true,
                                                type:'boolean'
                                            },
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            }
        }
    },
    config:{
        ___:{
            nested:{
                start:excludeThemeAndPredefined(),
                center:excludeThemeAndPredefined(),
                after:excludeThemeAndPredefined(),
                before:excludeThemeAndPredefined(),
                end:{
                    ___:{
                        predefined:{
                            overwirte:{
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
                                                                    margin:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{
                                                                                    dvalue:0
                                                                                },
                                                                                2:{
                                                                                    dvalue:0
                                                                                },
                                                                                3:{
                                                                                    dvalue:0
                                                                                },
                                                                                4:{
                                                                                    dvalue:10
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
                },
                wrapper:{
                    ___:{
                        predefined:{
                            overwirte:{
                                markup:{
                                    ___:{
                                        nested:{
                                            element:{
                                                dvalue:'div'
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
                                                                    cursor:{
                                                                        dvalue:''
                                                                    },
                                                                    fontsize:{
                                                                        dvalue:'md'
                                                                    },
                                                                    family:{
                                                                        dvalue:'md'
                                                                    },
                                                                    padding:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{
                                                                                    dvalue:12
                                                                                },
                                                                                2:{
                                                                                    dvalue:12
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
});