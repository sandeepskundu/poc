const helpers = process.uiHelpers();
const avatarProps = process.aioAppConfigs('storybook/components/atoms/avatar/image/props');
const labelsProps = process.aioAppConfigs('storybook/components/molecules/avatars/avatars-label/props');

module.exports = {
    labels:{
        type:'nested',
        description:"The configuration supports design system–driven customization for button wrapper element. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:helpers.json.merge(labelsProps, {})
        }
    },
    avatar:{
        type:'nested',
        description:"The configuration supports design system–driven customization for button wrapper element. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:helpers.json.merge(avatarProps, {
                nowrapper:{
                    dvalue:true,
                },
                config:{
                    ___:{
                        nested:{
                            image:{
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
                                                                                margin:{
                                                                                    type:'nested',
                                                                                        ___:{
                                                                                        nested:{
                                                                                            1:{
                                                                                                dvalue:0
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
            })
        }
    },
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