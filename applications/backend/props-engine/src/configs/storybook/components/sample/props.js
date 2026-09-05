module.exports = {
    predefined:{
        type:'predefined',
        description:"Selects a predefined design system preset containing a curated set of styling, layout, typography, and behavior configurations. Presets help ensure consistency and reduce the need for detailed configuration by applying commonly used design system settings.",
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.preset',
            }
        }
    },
    ds:{
        type:'predefined',
        description:"Specifies the design system configuration used to style and control the component. This object supports detailed customization of visual properties such as color themes, typography, spacing, borders, shadows, and component-specific styling options.",
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.configs',
                overwirte:{
                    ds:{
                        type:'nested',
                        ___:{
                            nested:{
                                theme:{
                                    type:'nested',
                                    ___:{
                                        nested:{
                                            background:{
                                                type:'nested',
                                                ___:{
                                                    nested:{
                                                        default:{
                                                            type:'string',
                                                            dvalue:'c00000'
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
    anything:{
        type:"any",
        dvalue:"anything",
        description:"Supports any valid data type, including strings, numbers, booleans, objects, arrays, functions, or custom values. The expected format depends on the specific component implementation.",
    },
    boolean:{
        type:"boolean",
        dvalue:true,
        description:"Controls whether the associated feature or behavior is enabled. Set to true to enable the functionality or styling, or false to disable it.",
    },
    string:{
        type:"string",
        dvalue:'string',
        description:"Specifies a string value for the associated property. The expected format and usage depend on the specific component or configuration option.",
    },
    number:{
        type:'number',
        dvalue:1234567890,
        description:"Specifies a numeric value for the associated property. The interpretation of the value depends on the component and may represent measurements, counts, percentages, durations, or other numeric settings.",
    },
    object:{
        type:'object',
        description:"Specifies a configuration object used to define one or more related settings. The supported properties and their values vary depending on the component or feature being configured.",
        dvalue:{
            key:'value'
        },
    },
    function:{
        type:'function',
        description:"Specifies a function to be invoked when the associated event or action occurs. This can be used to handle user interactions, customize behavior, or integrate component events with application logic.",
        dvalue:null,
    },
    enum:{
        type:'enum',
        description:"Specifies a value selected from a predefined set of supported options. Only the values defined by the component or design system are accepted.",
        ___:{
            enum:{
                from:'statics',
                mapping:"global.font.family"
            }
        }
    },
    jsx:{
        type:'jsx',
        description:"Accepts a valid JSX element (ReactElement) that will be rendered by the component. This enables flexible composition by allowing consumers to pass custom React components, HTML elements, icons, or other JSX content instead of plain text or configuration values.",
    },
    nested:{
        type:'nested',
        description:"Specifies a nested configuration structure that contains one or more levels of related properties. This allows complex settings to be organized logically and managed as a single configuration object.",
        ___:{
            required:true,
            nested:{
                name:{
                    type:'string',
                    dvalue:'Sandeep'
                },
                ln:{
                    type:"nested",
                     ___:{
                        nested:{
                            name:{
                                type:'string',
                                dvalue:'Sandeep'
                            },
                            ln:{
                                type:"string",
                                dvalue:'Kundu'
                            }
                        }
                    }
                }
            }
        }
    },
    compProp:{
        type:'compProps',
        description:"Contains the configuration-to-props mapping for the component. Values defined here are transformed into component props and applied when the component is rendered.",
        ___:{
            compProps:{
                mapping:'components/atoms/0/kundu',
            }
        }
    }
}