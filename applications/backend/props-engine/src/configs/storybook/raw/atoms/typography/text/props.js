module.exports = {
    text:{
        type:'predefined',
        description:"The configuration supports design system–driven customization for button wrapper element. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.configs',
                overwirte:{
                    markup:{
                        type:'nested',
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
    }
}