const helpers = process.uiHelpers();
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const badge = process.aioAppConfigs('storybook/raw/atoms/badge');
const dataProp = helpers.json.get(storybook, 'predefined.filter', {});
const input = process.aioAppConfigs('storybook/raw/atoms/form/input');
const list = process.aioAppConfigs('storybook/raw/atoms/list/box/base');

const func = () => {
    return {
        dvalue:null,
        type:'function'
    }
}

const get = (arg) => {
    return helpers.json.get(arg, 'props', {})
}

const templates = () => {
    return {
        listbox:helpers.json.get(list, 'props.templates', {}),
        option:{
            type:"nested",
            description:"This contains all display-related text content used across different use cases.",
            ___:{
                nested:helpers.json.get(list, 'props.item.___.nested.childs.___.nested', {})
            }
        }
    };
}

module.exports = {
    data:helpers.json.get(list, 'props.data', {}),
    switch:helpers.json.get(list, 'props.switch', {}),
    multiselect:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:{
                palcement:{
                    type:"enum",
                    dvalue:'bottom',
                    enum:{
                        from:'statics',
                        mapping:"autocomplete.multiple.placement"
                    }
                },
                templates:{
                    tag:func(),
                    wrapper:func()
                },
                badge:{
                    type:'nested',
                    ___:{
                        nested:helpers.json.merge(helpers.json.get(badge, 'props', {}), {
                            avatars:null,
                            content:null,
                            icons:{
                                ___:{
                                    nested:{
                                        left:null,
                                        right:{
                                            ___:{
                                                compProps:{
                                                    overwirte:{
                                                        config:{
                                                            ___:{
                                                                predefined:{
                                                                    overwirte:{
                                                                        icon:{
                                                                            ___:{
                                                                                nested:{
                                                                                    size:{
                                                                                        dvalue:18
                                                                                    },
                                                                                    name:{
                                                                                        dvalue:'close'
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
                                                                                                            cursor:{
                                                                                                                dvalue:'cp'
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
                            },
                            config:{
                                ___:{
                                    nested:{
                                        wrapper:{
                                            ___:{
                                                predefined:{
                                                    overwirte:{
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
                                                                    predefined:{
                                                                        ___:{
                                                                            predefined:{
                                                                                overwirte:{
                                                                                    color:{},
                                                                                    background:{},
                                                                                    size:{
                                                                                        dvalue:'xs'
                                                                                    },
                                                                                    radius:{
                                                                                        dvalue:'4'
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
                                                                                            fontsize:{},
                                                                                            margin:{
                                                                                                ___:{
                                                                                                    nested:{
                                                                                                        1:{
                                                                                                            dvalue:10
                                                                                                        },
                                                                                                        2:{
                                                                                                            dvalue:10
                                                                                                        },
                                                                                                        3:{
                                                                                                            dvalue:0
                                                                                                        },
                                                                                                        4:{
                                                                                                            dvalue:0
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                },
                                                                                others:{
                                                                                    dvalue:'nowrap'
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
                },

                wrapper:{
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
                                                            color:{},
                                                            background:{}
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
                                                                    fontsize:{},
                                                                    padding:{
                                                                        ___:{
                                                                            nested:{
                                                                                1:{
                                                                                    dvalue:4
                                                                                },
                                                                                2:{
                                                                                    dvalue:10
                                                                                },
                                                                                3:{
                                                                                    dvalue:8
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
    },

    templates:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:templates()
        }
    },
    mapping:helpers.json.merge(helpers.json.get(list, 'props.mapping', {}), {
        description:"Defines the mapping between data fields and component properties. It specifies which keys from the provided data source should be used for specific purposes, such as display labels, values component-related attributes. This allows the component to work with different data structures without requiring data transformation.",
        ___:{
            nested:{
                childs:{
                    dvalue:'childs'
                },
                value:{
                    type:'string',
                    dvalue:'label'
                },
                label:{
                    dvalue:'label'
                },
                selected:{
                    dvalue:{
                        0:'id'
                    }
                },
                disabled:{
                    dvalue:{
                        0:'id'
                    }
                },
            }
        }
    }),
    position:{
        type:"enum",
        dvalue:'bottom',
        description:"Enables or disables the autocomplete functionality.",
        ___:{
            enum:{
                from:'statics',
                mapping:"autocomplete.positions"
            }
        }
    },
    input:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:helpers.json.merge(get(input), {
                readonly:null,
                autocomplete:null,
            })
        }
    },
    listbox:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:helpers.json.merge(get(list), {
                data:null,
                switch:null,
                mapping:null,
                templates:null,
                item:{
                    ___:{
                        nested:{
                            childs:null
                        }
                    }
                },
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
                                                        css:{
                                                            ___:{
                                                                nested:{
                                                                    class:{
                                                                        ___:{
                                                                            nested:{
                                                                                shadow:{
                                                                                    dvalue:'md'
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
    },
    selection:{
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

    searchable:{
        dvalue:true,
        type:'boolean',
        description:"Boolean value that determines whether the options list can be searched. When set to true, a search input is displayed to filter available options; when set to false, search functionality is disabled."
    },

    open:{
        dvalue:false,
        type:'boolean',
        description:"Boolean value that controls the visibility of the options list. When set to true, the options list is displayed; when set to false, the options list is hidden."
    },

    closeOn:{
        type:'nested',
        description:'',
        ___:{
            nested:{
                blur:{
                    type:'boolean',
                    description:'',
                    dvalue:true
                },
                select:{
                    type:'boolean',
                    description:'',
                    dvalue:true
                },
                remove:{
                    type:'boolean',
                    description:'',
                    dvalue:true
                }
            }
        }
    },

    openOn:{
        type:'nested',
        description:'',
        ___:{
            nested:{
                focus:{
                    type:'boolean',
                    description:'',
                    dvalue:false
                },
                search:{
                    type:'boolean',
                    description:'',
                    dvalue:false
                },
                inputToggle:{
                    dvalue:true,
                    type:'boolean',
                    description:""
                },
            }
        }
    },

    callback:{
        type:"nested",
        description:"An object containing event handler functions that are invoked in response to various component interactions or state changes. It allows consumers to provide custom behavior for supported events in a centralized manner.",
        ___:{
            nested:{
                onOpen:func(),
		        onClose:func(),
                onSelect:func(),
                onRemove:func(),
                onChange:{
                    type:"nested",
                    ___:{
                        nested:{
                            selected:func(),
                            afterFilter:func(),
                            beforeFilter:func(),
                            afterListUpdate:func()
                        }
                    }
                },
            }
        }
    },

    filter:{
        type:'nested',
        description:"",
        ___:{
            nested:{
                logics:helpers.json.get(storybook, 'predefined.filter', {}),
                callback:{
                    type:'nested',
                    description:"",
                    ___:{
                        nested:{
                            doFilter:func()
                        }
                    }
                },
                startOn:{
                    type:"enum",
                    dvalue:'onChange',
                    description:"Defines the width of border on element align with the design system guidelines.",
                    ___:{
                        enum:{
                            from:'statics',
                            mapping:"filter.startOn"
                        }
                    }
                }
            }
        }
    },

    content:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:{
                noResult:{
                    type:"nested",
                    description:"",
                    ___:{
                        nested:{
                            default:{
                                type:"any",
                                dvalue:"No selectable items found"
                            },
                            orginial:{
                                type:"any",
                                dvalue:"No selectable items found"
                            },
                            filtered:{
                                type:"any",
                                dvalue:"filtered"
                            }
                        }
                    }
                }
            }
        }
    },

    /*--
    
    allowDeselect:{
        dvalue:true,
        type:'boolean',
        description:"oolean value that determines whether a selected option can be deselected. When set to true, users can clear their current selection by selecting it again or using the component's deselect action. When set to false, a selected option cannot be deselected."
    },

    templates:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:{
                list:{
                    type:'any'
                },
                trigger:{
                    type:'any'
                },
                noResult:{
                    type:"nested",
                    description:"",
                    ___:{
                        nested:{
                            default:{
                                type:'any'
                            },
                            orginial:{
                                type:'any'
                            },
                            filtered:{
                                type:'any'
                            }
                        }
                    }
                }
            }
        }
    },

    noresult:{
        type:'predefined',
        description:"The configuration supports design system–driven customization across various elements, including the avatar image, wrapper, and initials. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
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
                                    dvalue:'p'
                                }
                            }
                        }
                    }
                }
            }
        }
    }--*/
}

























































/*--
const func = () => {
    return {
        type:'function'
    }
}

const icon = () => {
    return {
        type:'compProps',
        description:"Specifies the icon to display for selected options or items. This icon provides a visual indication that an option is currently selected.",
        ___:{
            asroot:false,
            compProps:{
                from:'statics',
                mapping:'raw/atoms/icons',
                overwirte:{
                    enabled:{
                        type:'boolean',
                        dvalue:true,
                    },
                    content:{
                        type:'any'
                    },
                    placement:{
                        type:'enum',
                        dvalue:'end',
                        ___:{
                            enum:{
                                options:'start|before|center|after|end'
                            }
                        }
                    },
                    config:{
                        ___:{
                            predefined:{
                                overwirte:{
                                    icon:{
                                        ___:{
                                            nested:{
                                                name:{
                                                    dvalue:'check'
                                                }
                                            }
                                        }
                                    },
                                    ds:{
                                        ___:{
                                            nested:{}
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

const stateDs = () => {
    return {
        ___:{
            predefined:{
                overwirte:{
                    markup:null,
                    ds:{
                        ___:{
                            nested:{
                                css:null
                            }
                        }
                    }
                }
            }
        }
    }
}

const stateListboxDs = () => {
    return {
        type:'compProps',
        description:"",
        ___:{
            asroot:false,
            compProps:{
                from:'statics',
                mapping:'raw/atoms/list/box',
                overwirte:{
                    data:null,
                    mapping:null,
                    defaults:null,
                    callbacks:null,
                    config:{
                        ___:{
                            nested:{
                                item:{
                                    ___:{
                                        nested:{
                                            childs:null,
                                            config:{
                                                ___:{
                                                    nested:{
                                                        end:stateDs(),
                                                        start:stateDs(),
                                                        after:stateDs(),
                                                        before:stateDs(),
                                                        center:stateDs(),
                                                        wrapper:stateDs()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                header:{
                                    ___:{
                                        nested:{
                                            childs:null,
                                            config:{
                                                ___:{
                                                    nested:{
                                                        end:stateDs(),
                                                        start:stateDs(),
                                                        after:stateDs(),
                                                        before:stateDs(),
                                                        center:stateDs(),
                                                        wrapper:stateDs()
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

module.exports = {

    /*--
    open:{
        dvalue:false,
        type:'boolean',
        description:"Boolean value that controls the visibility of the options list. When set to true, the options list is displayed; when set to false, the options list is hidden."
    },
    multiple:{
        dvalue:false,
        type:'boolean',
        description:"Boolean value that determines whether multiple options can be selected. When set to true, users can select multiple options; when set to false, only a single option can be selected."
    },
    searchable:{
        dvalue:true,
        type:'boolean',
        description:"Boolean value that determines whether the options list can be searched. When set to true, a search input is displayed to filter available options; when set to false, search functionality is disabled."
    },
    allowDeselect:{
        dvalue:true,
        type:'boolean',
        description:"oolean value that determines whether a selected option can be deselected. When set to true, users can clear their current selection by selecting it again or using the component's deselect action. When set to false, a selected option cannot be deselected."
    },
    closeOnSelect:{
        dvalue:true,
        type:'boolean',
        description:"Boolean value that determines whether the options list should close automatically after an option is selected. When set to true, the list closes upon selection; when set to false, the list remains open."
    },

    filter:{

    },

    keymap:{
        type:"nested",
        description:"Defines the mapping between data fields and component properties. It specifies which keys from the provided data source should be used for specific purposes, such as display labels, values component-related attributes. This allows the component to work with different data structures without requiring data transformation.",
        ___:{
            nested:{
                label:{
                    type:'any',
                    dvalue:'label',
                    description:""
                },
                selection:{
                    type:'any',
                    dvalue:'value',
                    description:""
                }
            }
        }
    },
    content:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:{
                noResult:{
                    type:"nested",
                    description:"",
                    ___:{
                        nested:{
                            default:{
                                type:"any",
                                dvalue:"No selectable items found"
                            },
                            orginial:{
                                type:"any",
                                dvalue:"No selectable items found"
                            },
                            filtered:{
                                type:"any",
                                dvalue:"filtered"
                            }
                        }
                    }
                }
            }
        }
    },

    templates:{
        type:"nested",
        description:"This contains all display-related text content used across different use cases.",
        ___:{
            nested:{
                list:{
                    type:'any'
                },
                trigger:{
                    type:'any'
                },
                noResult:{
                    type:"nested",
                    description:"",
                    ___:{
                        nested:{
                            default:{
                                type:'any'
                            },
                            orginial:{
                                type:'any'
                            },
                            filtered:{
                                type:'any'
                            }
                        }
                    }
                }
            }
        }
    },
    dropdown:{
        type:'compProps',
        description:"Defines the dropdown element or configuration used to display the list of available options. It controls the rendering and behavior of the dropdown menu within the component.",
        ___:{
            asroot:false,
            compProps:{
                from:'statics',
                mapping:'raw/atoms/popover',
                overwirte:{
                    controls:{
                        ___:{
                            nested:{
                                arrow:{
                                    dvalue:false
                                },
                                mode:{
                                    dvalue:"react"
                                },
                                toggle:{
                                    dvalue:"click"
                                },
                                position:{
                                    dvalue:"bottom-right"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    input:{
        type:'compProps',
        description:"Defines the input element or configuration used for user interaction. It controls the rendering and behavior of the input field, including how users enter, view, or modify values.",
        ___:{
            asroot:false,
            compProps:{
                from:'statics',
                mapping:'raw/atoms/form/input',
                overwirte:{}
            }
        }
    },
    callback:{
        type:"nested",
        description:"An object containing event handler functions that are invoked in response to various component interactions or state changes. It allows consumers to provide custom behavior for supported events in a centralized manner.",
        ___:{
            nested:{
                onOpen:func(),
		        onClose:func(),
                onSelect:func(),
                onRemove:func(),
                onChange:{
                    type:"nested",
                    ___:{
                        nested:{
                            afterFilter:func(),
                            beforeFilter:func(),
                            afterListUpdate:func()
                        }
                    }
                },
            }
        }
    },

    selectedIcon:icon(),

    listbox:{
        type:'nested',
        description:"Defines the list box element or configuration used to render and manage the collection of available options. It controls the appearance, behavior, and interactions of the options list within the component.",
        ___:{
            nested:{
                default:{
                    type:'compProps',
                    description:"",
                    ___:{
                        asroot:false,
                        compProps:{
                            from:'statics',
                            mapping:'raw/atoms/list/box',
                            overwirte:{}
                        }
                    }
                },
                disabled:stateListboxDs(),
                selected:stateListboxDs()
            },
            
        }
    },

    noresult:{
        type:'predefined',
        description:"The configuration supports design system–driven customization across various elements, including the avatar image, wrapper, and initials. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
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
                                    dvalue:'p'
                                }
                            }
                        }
                    }
                }
            }
        }
    }--* /
} --*/