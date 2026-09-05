module.exports = {
    nowrapper:{
        description:"A wrapper element is the parent container that surrounds a component's internal elements, providing structural layout, styling, positioning, spacing, and interaction behavior. It serves as the root element through which styles, attributes, event handlers, and accessibility properties can be applied consistently across the component.",
        type:"boolean",
        dvalue:false
    },
    dsTheme:{
        type:'predefined',
        description:"Design System Theme Configuration is a centralized set of design tokens, styles, and visual properties that define the appearance and behavior of UI components across an application. It enables consistent customization of attributes such as colors, typography, spacing, sizing, borders, shadows, and states, ensuring a unified look and feel while supporting theming, branding, and accessibility requirements.",
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.preset',
                overwirte:{
                    outer:{
                        type:'enum',
                        ___:{
                            enum:{
                                from:'statics',
                                mapping:'global.spaces',
                            }
                        }
                    }
                }
            }
        }
    },
    config:{
        description:"The configuration supports design system–driven customization across various elements, including the avatar image, wrapper, and initials. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        type:"nested",
        ___:{
            nested:{
                image:{
                    dvalue:{},
                    type:'predefined',
                    description:"Default button",
                    ___:{
                        predefined:{
                            from:'statics',
                            mapping:'ds.configs',
                            overwirte:{
                                content:null,
                            }
                        }
                    }
                },
                wrapper:{
                    dvalue:{},
                    type:'predefined',
                    description:"Default button",
                    ___:{
                        predefined:{
                            from:'statics',
                            mapping:'ds.configs',
                            overwirte:{
                                content:null,
                            }
                        }
                    }
                }
            }
        }
    },
    image:{
        type:"nested",
        description:"Avatar Image is a visual representation of a user, group, or entity displayed within the Avatar component. It typically consists of a profile picture sourced from a local or remote image URL and serves as the primary visual identifier for the associated user or entity. When an avatar image is unavailable or fails to load, the component can fall back to displaying initials or a default placeholder.",
        ___:{
            nested:{
                src:{
                    type:'string'
                }   
            }
        }
    },
}