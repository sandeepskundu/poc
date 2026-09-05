const ds = (elm) => {
    return {
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
                                    dvalue:elm || 'div'
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const content = () => {
    return {
        dvalue:'',
        type:"any",
        description:""
    }
}

const func = () => {
    return {
        dvalue:null,
        type:'function'
    }
}

const callback = (desc) => {
    return {
        description:desc || "A callback function is a function passed from a parent component to a child component through props, allowing the child component to execute logic in the parent when a specific event occurs.",
        type:"nested",
        ___:{
            nested:{
                onClick:func(),
                dsTheme:func(),
                beforeRender:func()
            }
        } 
    }
}

module.exports = {
    callbacks:{
        description:"A callback function is a function passed from a parent component to a child component through props, allowing the child component to execute logic in the parent when a specific event occurs.",
        type:"nested",
        ___:{
            nested:{
                end:callback(),
                after:callback(),
                start:callback(),
                before:callback(),
                center:callback(),
                wrapper:callback(),
            }
        }
    },

    childs:{
        type:'nested',
        description:"A prop used to pass childs content into a component. It can contain renderable React content such as JSX elements, strings, numbers, booleans, fragments, arrays of elements, or null/undefined. In some cases, it may also accept a function (render prop) that returns React content, allowing dynamic rendering based on component state or props.",
        ___:{
            nested:{
                start:content(),
                before:content(),
                center:content(),
                end:content(),
                after:content()
            }
        }
    },

    config:{
        type:'nested',
        description:"The configuration supports design system–driven customization across various elements, including the wrapper, start, before, center, after and end. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:{
                center:ds(),
                wrapper:ds(),
                end:ds(),
                after:ds(),
                start:ds(),
                before:ds(),
            }
        }
    }
}