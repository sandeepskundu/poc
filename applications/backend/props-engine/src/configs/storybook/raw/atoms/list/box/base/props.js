const helpers = process.uiHelpers();
const itembase = process.aioAppConfigs('storybook/raw/atoms/list/item/base');
const headerbase = process.aioAppConfigs('storybook/raw/atoms/list/header/base');
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const dataProp = helpers.json.get(storybook, 'predefined.data', {});
const itemCallbacks = helpers.json.get(itembase, 'props.callbacks', {})

const headerProps = () => {
    return helpers.json.merge(helpers.json.get(headerbase, 'props', {}), {
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
                                                                },
                                                                background:{
                                                                    dvalue:'c00102'
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
                item:func(''),
                category:func(''),
                noresults:func(''),
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

    switch:{
       type:'nested',
        ___:{
            nested:{
                selectedFirst:{
                    dvalue:false,
                    type:'boolean',
                    description:'When enabled, the selected item is pinned to the top of the list while the remaining items are displayed below.'
                },
                hideDisabled:{
                    dvalue:false,
                    type:'boolean',
                    description:'When enabled, the disabled item will not display in options list, if set as false will be display.'
                }
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

    category:{
        type:"nested",
        description:"The configuration enables design system–driven customization of the item's key elements, including the wrapper and the start, before, center, after, and end placeholders of the base item. Visual properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring consistency, accessibility, and adherence to application design standards across themes and use cases.",
        ___:{
            nested:headerProps()
        }
    },

    callbacks:{
        type:'nested',
        description:"A callback function is a function passed from a parent component to a child component through props, allowing the child component to execute logic in the parent when a specific event occurs.",
        ___:{
            nested:{
                item:itemCallbacks,
                header:itemCallbacks,
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
                },
                noresults:{
                    type:'predefined',
                    description:"Default button",
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
                                                dvalue:'li'
                                            }
                                        }
                                    }
                                },
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
                                                                        dvalue:'sm'
                                                                    },
                                                                    padding:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{
                                                                                    dvalue:16
                                                                                },
                                                                                2:{
                                                                                    dvalue:16
                                                                                },
                                                                                3:{
                                                                                    dvalue:16
                                                                                },
                                                                                4:{
                                                                                    dvalue:16
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
};