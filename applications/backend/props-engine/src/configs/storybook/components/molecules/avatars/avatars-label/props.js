const helpers = process.uiHelpers();
const titleProps = process.aioAppConfigs('storybook/components/atoms/typography/heading/h5/props');
const descriptionProps = process.aioAppConfigs('storybook/components/atoms/typography/text/props');

module.exports = {
    content:{
        type:'nested',
        description:"An object containing the content to display, including the title and description values.",
        ___:{
            nested:{
                title:{
                    type:"any",
                    description:"Accepts any valid value type, including <code>strings</code>, <code>numbers</code>, <code>booleans</code>, <code>functions</code>, <code>JSX elements</code>. The expected value depends on the component's implementation and the context in which the property is used.",
                },
                description:{
                    type:"any",
                    description:"Accepts any valid value type, including <code>strings</code>, <code>numbers</code>, <code>booleans</code>, <code>functions</code>, <code>JSX elements</code>. The expected value depends on the component's implementation and the context in which the property is used.",
                }
            }
        }
    },
    title:{
        type:'nested',
        description:"The configuration supports design system–driven customization for button wrapper element. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:helpers.json.merge(titleProps, {
                config:{
                    ___:{
                        compProps:{
                            overwirte:{
                                config:{
                                    ___:{
                                        predefined:{
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
                                }
                            }
                        }
                    }
                }
            })
        }
    },
    description:helpers.json.merge(descriptionProps.text, {
        ___:{
            predefined:{
                overwirte:{
                    content:null,
                    ds:{
                        ___:{
                            nested:{
                                predefined:{
                                    ___:{
                                        predefined:{
                                            overwirte:{
                                                font__d__size:{
                                                    dvalue:'xs'
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
    }),
    wrapper:{
        type:'predefined',
        description:"The configuration supports design system–driven customization for button wrapper element. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.configs',
                overwirte:{
                    content:null,
                    markup:{
                        type:'nested',
                        ___:{
                            nested:{
                                element:{
                                    dvalue:'div'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};