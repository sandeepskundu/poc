const helpers = process.uiHelpers();
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const func = () => {
    return {
        dvalue:null,
        type:'function'
    }
}

const predefined = () => {
    return {
        type:'predefined',
        ___:{
            predefined:{
                from:'statics',
                mapping:'ds.preset',
                overwirte:{
                   theme:null
                }
            }
        }
    }
}

const presets = (arg) => {
    return helpers.json.merge({
        type:'nested',
        ___:{
            nested:{
                default:predefined(),
                filled:predefined(),
                invalid:predefined(),
                focused:predefined(),
                readonly:predefined(),
                disabled:predefined()
            }
        }
    }, arg || {})
}

const themes = () => {
    return {
        type:'nested',
        ___:{
            nested:{
                text:null,
                border:null,
                background:null,
                colorPairing:null,
                default:storybook.predefined.ds.theme,
                filled:storybook.predefined.ds.theme,
                invalid:storybook.predefined.ds.theme,
                focused:storybook.predefined.ds.theme,
                readonly:storybook.predefined.ds.theme,
                disabled:storybook.predefined.ds.theme
            }
        }
    }
}

const inputPredefined = (arg) => {
    return helpers.json.merge({
        ___:{
            predefined:{
                overwirte:{
                    theme:{
                        ___:{
                            enum:{
                                mapping:"input.theme"
                            }
                        }
                    }
                }   
            }
        }
    }, (arg || {}))
}

const inputPreset = () => {
    return presets({
        ___:{
            nested:{
                default:inputPredefined({
                    ___:{
                        predefined:{
                            overwirte:{
                                theme:{
                                    dvalue:'000'
                                },
                                size:{
                                    dvalue:'xl'
                                }
                            }   
                        }
                    }
                }),
                filled:inputPredefined(),
                invalid:inputPredefined(),
                focused:inputPredefined(),
                readonly:inputPredefined(),
                disabled:inputPredefined()
            }
        }
    })
}

const wrapper = () => {
    return {
        type:'nested',
        ___:{
            nested:{
                attrs:storybook.predefined.ds.configs.attrs,
                dataAttrs:storybook.predefined.ds.configs.attrs,
                ds:{
                    type:'nested',
                    ___:{
                        nested:{
                            theme:themes(),
                            predefined:inputPreset(),
                            css:storybook.predefined.ds.css
                        }
                    }
                }
            }
        }
    }
}

const configDs = (arg) => {
    return helpers.json.merge({
        type:'nested',
        ___:{
            nested:{
                attrs:storybook.predefined.ds.configs.attrs,
                dataAttrs:storybook.predefined.ds.configs.attrs,
                ds:{
                    type:'nested',
                    ___:{
                        nested:{
                            theme:themes(),
                            predefined:presets(),
                            css:storybook.predefined.ds.css
                        }
                    }
                }
            }
        }
    }, arg || {})
}

const icon = (arg) => {
    return helpers.json.merge({
        type:'compProps',
        description:"",
        ___:{
            asroot:false,
            compProps:{
                from:'statics',
                mapping:'raw/atoms/icons',
                overwirte:{
                    config:{
                        ___:{
                            predefined:{
                                overwirte:{
                                    icon:{
                                        ___:{
                                            nested:{
                                                name:{
                                                    dvalue:''
                                                }
                                            }
                                        }
                                    },
                                    ds:{
                                        ___:{
                                            nested:{
                                                theme:themes(),
                                                predefined:presets()
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
    }, arg || {})
}

module.exports = {
    value:{
        dvalue:'',
        type:"any",
        description:"Specifies the current value displayed in the input field. Use this prop to manage the input's state externally in a controlled component pattern. Pair it with the onChange callback to handle user input and update the value as needed."
    },

    defaultValue:{
        dvalue:'',
        type:"any",
        description:"Sets the initial value displayed in the input field. Use this prop when you want the component to manage its own state internally. Unlike value, updates to defaultValue after the initial render will not change the current input value."
    },

    label:{
        dvalue:'',
        type:"string",
        description:"Specifies the label displayed alongside the input field. Labels help users understand the purpose of the input and improve accessibility by clearly identifying the information being requested. Use meaningful and concise labels to enhance usability and form clarity."
    },

    id:{
        dvalue:'',
        type:"string",
        description:"Specifies a unique id for the input element. This value is commonly used to associate the input with its corresponding label via the htmlFor attribute, improving accessibility and enabling easier DOM targeting for testing, scripting, and styling purposes. Ensure the id is unique within the page."
    },

    name:{
        dvalue:'',
        type:"string",
        description:"Specifies the name attribute for the input element. This value is used as the key when the form data is submitted and helps identify the input's value on the server or during form processing. Use a meaningful and unique name that reflects the purpose of the field."
    },

    type:{
        type:"enum",
        dvalue:'text',
        description:"Specifies the input type, which controls how the field accepts and validates user input. Common values include <code>text</code>, <code>email</code> and <code>password</code>. Choosing the appropriate type helps improve user experience, accessibility, and browser-native validation.",
        ___:{
            enum:{
                from:'statics',
                mapping:"form.input.type"
            }
        }
    },

    error:{
        dvalue:'',
        type:"string",
        description:"Specifies the error message to display when the input is in an invalid or error state. This text helps users understand what went wrong and how to correct their input. Typically used in conjunction with validation logic to provide clear and actionable feedback."
    },

    description:{
        dvalue:'',
        type:"string",
        description:"Specifies supplementary text displayed alongside the input field to help users understand its purpose, expected format, or any special requirements. Use descriptive text to provide helpful instructions without cluttering the main label or interface."
    },

    placeholder:{
        dvalue:'',
        type:"string",
        description:"Specifies the placeholder content shown inside the input when it is empty. Use placeholder text to provide an example or indicate the expected input format. Placeholder text should complement, not replace, the input label, as it disappears once the user enters a value."
    },

    maxLength:{
        dvalue:100,
        type:"number",
        description:"Specifies the maximum allowed length of the input value. Once the limit is reached, additional characters cannot be entered. Use this prop to enforce input constraints and help ensure data consistency and validation requirements are met."
    },

    minLength:{
        dvalue:2,
        type:"number",
        description:"Specifies the minimum number of characters that must be entered for the input value to be considered valid. This prop is commonly used for form validation to ensure users provide sufficient information before submission. Use it in conjunction with validation feedback to clearly communicate input requirements."
    },

    debounceDelay:{
        dvalue:500,
        type:"number",
        description:"Specifies the amount of time (in milliseconds) to wait after the user's last input before triggering change-related actions, such as validation, filtering, or API requests. Debouncing helps reduce unnecessary updates and improves performance by limiting the frequency of event handling during rapid user input."
    },

    eye:{
        dvalue:true,
        type:"boolean",
        description:"Displays an eye icon within the input field that allows users to toggle the visibility of password content. When enabled, users can switch between password and text input types, making it easier to verify their input while maintaining a secure default state. This prop is typically used with password fields to enhance usability and reduce input errors."
    },

    invalid:{
        dvalue:false,
        type:"boolean",
        description:"Sets the validation state of the input. When true, the input is visually marked as invalid and can be used to trigger error styling, validation messages, and accessibility attributes. Use this prop alongside error or custom validation logic to provide clear feedback when user input does not meet the required criteria."
    },

    disabled:{
        dvalue:false,
        type:"boolean",
        description:"Disables the input field, preventing users from entering, modifying, or interacting with its value. When enabled, the component is visually styled to indicate its inactive state and is excluded from standard user interactions and form submissions where applicable. Use this prop when the input should be temporarily unavailable based on application state or user permissions."
    },

    required:{
        dvalue:false,
        type:"boolean",
        description:"Marks the input field as mandatory. When enabled, users are required to provide a value before the form can be successfully submitted. This prop can trigger browser-native validation and is commonly used alongside visual indicators and validation messages to communicate required fields clearly."
    },

    readonly:{
        dvalue:false,
        type:"boolean",
        description:"Prevents users from editing the input value while still allowing the field to receive focus, be selected, and have its contents copied. Unlike a disabled input, a read-only input remains interactive for viewing purposes and is included in form submissions. Use this prop when displaying information that should be visible but not editable."
    },

    clearable:{
        dvalue:false,
        type:"boolean",
        description:"Displays a clear icon or action within the input field when a value is present. When triggered, the input value is reset to an empty state, providing a convenient way for users to clear their input without manually deleting the content. This prop is particularly useful for search fields and other frequently edited inputs."
    },

    prefix:{
        dvalue:false,
        type:"boolean",
        description:"Specifies an element, text, or icon to be displayed at the beginning of the input field. Prefix content provides additional context for the expected input, such as currency symbols, country codes, or descriptive icons, while remaining visually attached to the input control. Use this prop to enhance clarity and improve the overall user experience."
    },

    suffix:{
        dvalue:false,
        type:"boolean",
        description:"Specifies an element, text, or icon to be displayed at the end of the input field. Suffix content can be used to provide additional context, such as units of measurement, status indicators, action buttons, or decorative icons. Use this prop to enhance usability and help users better understand the expected input or its associated actions."
    },

    callback:{
        description:"Provides event callbacks that allow consumers to respond to user actions and component lifecycle events. Use these handlers to capture input changes, manage focus states, perform validation, trigger side effects, and integrate the component with application logic. Each callback receives relevant event data to help manage and synchronize component behavior.",
        type:"nested",
        ___:{
            nested:{
                onCut:func(),
                onCopy:func(),
                onBlur:func(),
                onEnter:func(),
                onFocus:func(),
                onInput:func(),
                onPaste:func(),
                onSelect:func(),
                onKeyUp:func(),
                onKeyDown:func(),
                onChange:func(),
                onChangeEnd:func(),
                onChangeStart:func(),
                onBeforeInput:func(),
                onCompositionEnd:func(),
                onCompositionStart:func(),
                onCompositionUpdate:func()
            }
        }
    },

    icons:{
        type:'nested',
        description:"The configuration supports design system–driven customization across various icons with-in button component, including the left and right icon. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:{
                left:icon(),
                right:icon(),
                clear:icon({
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
                                                            name:{
                                                                dvalue:'close'
                                                            }
                                                        }
                                                    }
                                                },
                                                ds:{
                                                    ___:{
                                                        nested:{
                                                            theme:themes(),
                                                            predefined:presets(),
                                                            css:{
                                                                ___:{
                                                                    nested:{
                                                                        class:{
                                                                            ___:{
                                                                                nested:{
                                                                                    cursor:{
                                                                                        dvalue:'cp'
                                                                                    },
                                                                                    margin:{
                                                                                        ___:{
                                                                                            nested:{
                                                                                                1:{
                                                                                                    dvalue:0
                                                                                                },
                                                                                                2:{
                                                                                                    dvalue:8
                                                                                                },
                                                                                                3:{
                                                                                                    dvalue:0
                                                                                                },
                                                                                                4:{
                                                                                                    dvalue:0
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    },
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
        }
    },

    autocomplete:{
        type:'nested',
        description:"Configuration object that controls the autocomplete behavior, including enabling/disabling, position of options from inputbox, and options list.",
        ___:{
            nested:{
                show:{
                    dvalue:false,
                    type:"boolean",
                    description:"Display or hide autocomplete options list."
                },
                enable:{
                    dvalue:false,
                    type:"boolean",
                    description:"Enables or disables the autocomplete functionality."
                },
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
                options:{
                    type:"any",
                    description:"Accepts any valid value type, including <code>strings</code>, <code>numbers</code>, <code>booleans</code>, <code>functions</code>, <code>JSX elements</code>. The expected value depends on the component's implementation and the context in which the property is used.",
                },
                multiple:{
                    type:'nested',
                    description:'',
                    ___:{
                        nested:{
                            palcement:{
                                type:"enum",
                                dvalue:'bottom',
                                enum:{
                                    from:'statics',
                                    mapping:"autocomplete.multiple.placement"
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    config:{
        type:'nested',
        description:"The configuration supports design system–driven customization across various icons with-in button component, including the left and right icon. Properties such as size, shape, border, background color, and typography can be configured through the design system, ensuring visual consistency, accessibility, and alignment with application design standards across different themes and use cases.",
        ___:{
            nested:{
                wrapper:wrapper(),
                error:configDs(),
                label:configDs(),
                asterisk:configDs(),
                description:configDs()
            }
        }
    }
}