module.exports = {
    type:'nested',
    description:'Defines styling-related configuration for a component, including properties such as shadows, border radius, margins, padding, borders, font family, and font size. It also supports flags for common styling behaviors, such as disabling borders, applying rounded corners, enabling disabled-state styles, selecting display or heading typography variants, and controlling box-sizing behavior.<br/><br/>Additional custom CSS classes can be provided through the css.extra property, allowing component-specific styling extensions while maintaining consistency with the design system.',
    ___:{
        nested:{
            class:{
                type:'nested',
                description:"Provides styling-related configuration options for the component. Use this object to customize layout, spacing, typography, borders, corner radius, and shadow effects while maintaining alignment with the design system's visual standards.",
                ___:{
                    nested:{
                        border:{
                            type:"enum",
                            description:"Defines the width of border on element align with the design system guidelines.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.css.border"
                                }
                            }
                        },
                        cursor:{
                            type:"enum",
                            description:"Defines the cursor style (e.g., pointer, wait, or default). Use this property to ensure cursor behavior aligns with the design system guidelines.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.css.cursor"
                                }
                            }
                        },
                        family:{
                            type:"enum",
                            description:"Specifies the font family used by the component. Use this property to select the appropriate typeface according to the design system's typography guidelines.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.font.family"
                                }
                            }
                        },
                        fontsize:{
                            type:"enum",
                            description:"Specifies the font size used by the component. Use this property to control text scaling in accordance with the design system's typography guidelines.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.font.size"
                                }
                            }
                        },
                        borderNone:{
                            type:'nested',
                            description:"Determines whether the border is hidden on a specific side of the component (top, right, bottom, or left). When enabled, the border for that side is not rendered, regardless of any configured border styles or widths",
                            ___:{
                                nested:{
                                    1:{
                                        type:'boolean',
                                        description:"Determines whether the top border of the component is hidden. When enabled, the top border is not rendered."
                                    },
                                    2:{
                                        type:'boolean',
                                        description:"Determines whether the right border of the component is hidden. When enabled, the right border is not rendered"
                                    },
                                    3:{
                                        type:'boolean',
                                        description:"Determines whether the bottom border of the component is hidden. When enabled, the bottom border is not rendered"
                                    },
                                    4:{
                                        type:'boolean',
                                        description:"Determines whether the left border of the component is hidden. When enabled, the left border is not rendered"
                                    }
                                }
                            }  
                        },
                        margin:{
                            type:'nested',
                            description:"Specifies the margin applied to the component. Use this property to control the amount of space outside the component's boundaries",
                            ___:{
                                nested:{
                                    1:{
                                        type:"enum",
                                        description:"Defines the external spacing applied to the top of the component.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    2:{
                                        type:"enum",
                                        description:"Defines the external spacing applied to the right of the component.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    3:{
                                        type:"enum",
                                        description:"Defines the external spacing applied to the bottom of the component.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    4:{
                                        type:"enum",
                                        description:"Defines the external spacing applied to the left of the component.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        padding:{
                            type:'nested',
                            description:"Specifies the padding applied to the component. Use this property to control the internal spacing between the content and the component's edges",
                            ___:{
                                nested:{
                                    1:{
                                        type:"enum",
                                        description:"Specifies the padding applied to the top edge of the component. Use this property to adjust the vertical spacing between the component's content and its upper boundary.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    2:{
                                        type:"enum",
                                        description:"Specifies the padding applied to the right edge of the component. Use this property to adjust the vertical spacing between the component's content and its right boundary.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    3:{
                                        type:"enum",
                                        description:"Specifies the padding applied to the bottom edge of the component. Use this property to adjust the vertical spacing between the component's content and its bottom boundary.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    },
                                    4:{
                                        type:"enum",
                                        description:"Specifies the padding applied to the left edge of the component. Use this property to adjust the vertical spacing between the component's content and its left boundary.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.spaces"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        radius:{
                            type:'nested',
                            description:"Specifies the corner radius applied to the component. Use this property to control how rounded or sharp the component's corners appear, in accordance with the design system's styling guidelines.",
                            ___:{
                                nested:{
                                    1:{
                                        type:"enum",
                                        description:"Specifies the corner radius applied to the top corners of the component. Use this property to control the rounding of the upper edge while maintaining independent styling for the remaining corners.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.radius"
                                            }
                                        }
                                    },
                                    2:{
                                        type:"enum",
                                        description:"Specifies the corner radius applied to the bottom corners of the component. Use this property to control the rounding of the upper edge while maintaining independent styling for the remaining corners.",
                                        ___:{
                                            enum:{
                                                from:'statics',
                                                mapping:"global.radius"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        shadow:{
                            type:"enum",
                            description:"Defines the shadow effect applied to the component. Use this property to control the depth and visual elevation of the element, helping distinguish it from surrounding content.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.shadow"
                                }
                            }
                        }
                    }
                }
            },
            flags:{
                type:'nested',
                description:'Defines styling-related flags that control common visual behaviors, such as disabling borders, applying rounded corners, enabling disabled-state styles, selecting display or heading typography variants, and configuring box-sizing behavior.',
                ___:{
                    nested:{
                        noBorder:{
                            type:'boolean',
                            description:"Controls whether the component border is rendered. When set to true, any border styles defined through the component's border properties are ignored and no border is displayed. When set to false, the configured border styles are applied and rendered in the output."
                        },
                        rounded:{
                            type:'boolean',
                            description:"Controls whether rounded corners are applied to the component. When set to true, the component is rendered with rounded borders using the configured border-radius values. When set to false, no rounded corner styling is applied, and the component is rendered with square corners."
                        },
                        disabled:{
                            type:'boolean',
                            description:"Controls whether the global disabled CSS class is applied to the component. When set to true, the component is rendered with the disabled styling defined by the design system. When set to false, the disabled CSS class is not applied."
                        },
                        isDisplay:{
                            type:'boolean',
                            description:"Controls whether the text is rendered using the design system's heading typography styles. When set to true, the text is displayed using the appropriate heading variant defined by the design system. When set to false, the text is rendered using the default body text styling."
                        },
                        boxSizing:{
                            type:'boolean',
                            description:"Controls whether the CSS box-sizing: border-box behavior is applied to the component. When set to true, padding and border widths are included within the component's specified width and height. When set to false, the default box-sizing behavior is used, where padding and borders are calculated separately from the component's dimensions."
                        },
                        animation:{
                            type:"enum",
                            description:"Specifies the animation to be applied to the component. Use this property to reference a predefined animation that controls how the component appears, transitions, or responds to user interactions.",
                            ___:{
                                enum:{
                                    from:'statics',
                                    mapping:"global.animations"
                                }
                            }
                        }
                    }
                }
            },
            others:{
                type:'string',
                description:'Custom CSS classes, separated by spaces, can be provided through this property to apply component-specific styling extensions while maintaining consistency with the design system.'
            },
        }
    }
}