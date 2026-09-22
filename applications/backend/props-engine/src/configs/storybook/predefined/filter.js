const schema = () => {
    return {
        type:'nested',
        ___:{
            nested:{
                mode:{
                    type:"enum",
                    dvalue:'includes',
                    description:"Defines the width of border on element align with the design system guidelines.",
                    ___:{
                        enum:{
                            from:'statics',
                            mapping:"filter.mode"
                        }
                    }
                },
                match:{
                    type:"enum",
                    dvalue:'lowercase',
                    description:"Defines the width of border on element align with the design system guidelines.",
                    ___:{
                        enum:{
                            from:'statics',
                            mapping:"filter.match"
                        }
                    }
                },
                keys:{
                    type:'nested',
                    description:'',
                    editorConfig:{
                        type:'indexJson'
                    },
                    ___:{
                        nested:{
                            0:{
                                type:'string',
                                dvalue:'label'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.filter = {
    type:'nested',
    editorConfig:{
        type:'indexJson',
        ___:{
            indexJson:{
                maxlength:5,
                minlength:1,
                schema:schema(),
                structure:'fixed' // flexible
            }
        }
    },
    description:`The filter prop supports multiple data structures to accommodate different use cases. It accepts either:

An object where each key is a numeric value and each corresponding value is an object containing the item's data.
An array of objects, where each object represents an individual item.

This flexibility allows the component to work with both indexed object-based data and standard array-based filters, making it easier to integrate with different data sources and application architectures.`,
    ___:{
        nested:{
            0:schema()
        }
    }
}