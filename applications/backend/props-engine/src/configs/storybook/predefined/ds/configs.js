/*--{
    "ds":{
        "theme":{
            "colorPairing":{
                "default":"",
                "hover":"",
            },
            "background":{
                "default":"",
                "hover":"",
            },
            "text":{
                "default":"",
                "hover":"",
            },
            "border":{
                "default":"",
                "hover":"",
            },
        },
        'css':{
            "class":{
                'shadow':'',
                'radius':{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                'padding':{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                "margin":{
                    "1":'',
                    "2":'',
                    "3":'',
                    "4":''
                },
                'border':'',
                'family':'',
                'fontsize':''
            },
            "flags":{
                'noBorder':true,
                'rounded':false,
                'disabled':false,
                'isDisplay':true,
                'boxSizing':false,
            },
            'others':'',
        }
    },
    attrs:{
    },
    dataAttrs:{
    }
}--*/


const css = require('./css');
const theme = require('./theme');
const markup = require('./markup');
const tooltip = require('./tooltip');

module.exports = {
    markup:markup,
    tooltip:tooltip,
    content:{
        type:"any",
        description:"Accepts any valid value type, including <code>strings</code>, <code>numbers</code>, <code>booleans</code>, <code>functions</code>, <code>JSX elements</code>. The expected value depends on the component's implementation and the context in which the property is used.",
    },
    attrs:{
        type:'object',
        description:"Specifies additional HTML attributes to be applied to the component's root element, including standard attributes such as id, title, role, type, and class. This provides a flexible way to customize accessibility, identification, styling, and behavior without modifying the component itself.",
    },
    dataAttrs:{
        type:'object',
        description:"Defines one or more custom <code>data-*</code> attributes that will be added to the component's rendered HTML element. Common use cases include test selectors, tracking identifiers, and application-specific metadata.",
    },
    ds:{
        type:'nested',
        description:`This object contains the configuration settings used throughout the design system. It allows you to define visual properties such as color pairings, background colors, text colors, and border colors, ensuring consistent styling across components.<br/><br/> In addition to color-related settings, it supports various CSS properties, including shadows, border radius, margins, padding, borders, font family, and font size. It also provides configuration flags for common styling behaviors, such as disabling borders, applying rounded corners, adding disabled-state styling, selecting display or heading typography styles, and controlling box-sizing behavior.<br/><br/>Custom CSS classes can be supplied through the css.extra property, enabling component-specific styling extensions while preserving the design system's core configuration structure.`,
        ___:{
            required:false,
            nested:{
                predefined:{
                    type:'predefined',
                    ___:{
                        predefined:{
                            from:'statics',
                            mapping:'ds.preset',
                        }
                    }
                },
                css:css,
                theme:theme
            }
        }
    }
}