const helpers = process.uiHelpers();
const itembase = process.aioAppConfigs('storybook/raw/atoms/tree-list/item');
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const dataProp = helpers.json.get(storybook, 'predefined.data', {});
const itemCallbacks = helpers.json.get(itembase, 'props.callbacks', {})

const itemProps = () => {
    return helpers.json.merge(helpers.json.get(itembase, 'props', {}), {
        callbacks:null,
        config:{
            ___:{
                nested:{
                    wrapper:{
                        ___:{
                            predefined:{
                                overwirte:{
                                    ds:{
                                        ___:{
                                            nested:{
                                                 predefined:{
                                                    ___:{
                                                        predefined:{
                                                            overwirte:{
                                                                border:{
                                                                    dvalue:'c10104'
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                css:{
                                                    ___:{
                                                        nested:{
                                                            class:{
                                                                ___:{
                                                                    nested:{
                                                                        border:{
                                                                            dvalue:'1'
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

const func = (desc) => {
    return {
        dvalue:null,
        type:'function',
        description:desc || ''
    }
}

module.exports = {
    templates:{
        type:'nested',
        description:"The templates prop defines the functions which return JSX templates for specific item like no-result, item and category cases.",
        ___:{
            nested:{
                item:func('')
            }
        }
    },

    expendable:{
        type:'nested',
        description:'',
        ___:{
            nested:{
                min:{
                    type:'number',
                    dvalue:1
                },
                max:{
                    type:'number',
                    dvalue:10
                },
                multiple:{
                    dvalue:false,
                    type:'boolean',
                    description:"Boolean value that determines whether multiple options can be selected. When set to true, users can select multiple options; when set to false, only a single option can be selected."
                }
            }
        }
    },

    mapping:{
        type:'nested',
        description:"The mapping prop defines the object key mapping used by the component. It specifies which property is used as the display label and which property is used as the selection value, enabling the component to work with different data structures without requiring data transformation.",
        ___:{
            nested:{
                childs:{
                    type:'nested',
                    dvalue:'childs',
                    description:'This prop maps the available child options for the given node.',
                    
                },
                label:{
                    type:'string',
                    dvalue:'label',
                    description:"This prop maps the list item lebel should be displayed from the given node.'"
                },
                selected:helpers.json.merge(dataProp, {
                    dvalue:{
                        0:'id'
                    }
                }),
                disabled:helpers.json.merge(dataProp, {
                    dvalue:{
                        0:'id'
                    }
                }),
                excluded:helpers.json.merge(dataProp, {
                    dvalue:{
                        0:'id'
                    }
                }),
            }
        }
    },

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

    item:{
        type:"nested",
        description:"The configuration enables design system–driven customization of the item's key elements, including the wrapper and the start, before, center, after, and end placeholders of the base item. Visual properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring consistency, accessibility, and adherence to application design standards across themes and use cases.",
        ___:{
            nested:itemProps()
        }
    },

    callbacks:{
        type:'nested',
        description:"A callback function is a function passed from a parent component to a child component through props, allowing the child component to execute logic in the parent when a specific event occurs.",
        ___:{
            nested:{
                item:itemCallbacks
            }
        }  
    },

    config:{
        type:"nested",
        description:"The configuration supports design system–driven customization across various elements, including the item, header, wrapper and noresults. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:{
                wrapper:{
                    type:'predefined',
                    description:"A wrapper is a parent/container element that holds and manages a group of related elements, such as a list, for layout, styling, or functionality purposes.",
                    ___:{
                        predefined:{
                            from:'statics',
                            mapping:'ds.configs',
                            overwirte:{
                                content:null,
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
                                            predefined:{
                                                ___:{
                                                    predefined:{
                                                        overwirte:{
                                                            radius:{
                                                                dvalue:'6'
                                                            },
                                                            border:{
                                                                dvalue:'c10104'
                                                            },
                                                            background:{
                                                                dvalue:'c00000'
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            css:{
                                                ___:{
                                                    nested:{
                                                        class:{
                                                            ___:{
                                                                nested:{
                                                                    borderNone:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{},
                                                                                2:{},
                                                                                3:{
                                                                                    dvalues:true
                                                                                },
                                                                                4:{}
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
};