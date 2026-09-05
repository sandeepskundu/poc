module.exports = {
    type:'nested',
    description:"Defines the visual color theme for the design system. This object allows you to configure text, background, border, and color-pairing values for UI components. Colors can be specified for different states, such as default and hover, to maintain a consistent and customizable user experience across the application",
    ___:{
        nested:{
            colorPairing:{
                description:"Defines the color pairings used by UI components. Pairings can be configured for different states, such as default and hover, to maintain consistent styling and support theme customization across the design system.",
                type:"nested",
                ___:{
                    nested:{
                        hover:{
                            type:"enum",
                            description:"Defines the color pairing applied to UI components in their hover state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.pairing",
                                }
                            }
                        },
                        default:{
                            type:"enum",
                            description:"Defines the color pairing applied to UI components in their default state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.pairing",
                                }
                            }
                        }
                    }
                }
            },
            background:{
                description:"Defines the background color used by UI components. Background can be configured for different states, such as default and hover, to maintain consistent styling and support theme customization across the design system.",
                type:"nested",
                ___:{
                    nested:{
                        hover:{
                            type:"enum",
                            description:"Defines the background color applied to UI components in their hover state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        },
                        default:{
                            type:"enum",
                            description:"Defines the background color applied to UI components in their default state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        }
                    }
                }
            },
            border:{
                description:"Defines the border color used by UI components. Border can be configured for different states, such as default and hover, to maintain consistent styling and support theme customization across the design system.",
                type:"nested",
                ___:{
                    nested:{
                        hover:{
                            type:"enum",
                            description:"Defines the border color applied to UI components in their hover state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        },
                        default:{
                            type:"enum",
                            description:"Defines the border color applied to UI components in their default state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        }
                    }
                }
            },
            text:{
                description:"Defines the text color used by UI components. Text can be configured for different states, such as default and hover, to maintain consistent styling and support theme customization across the design system.",
                type:"nested",
                ___:{
                    nested:{
                        hover:{
                            type:"enum",
                            description:"Defines the text color applied to UI components in their hover state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        },
                        default:{
                            type:"enum",
                            description:"Defines the text color applied to UI components in their default state.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.color",
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}