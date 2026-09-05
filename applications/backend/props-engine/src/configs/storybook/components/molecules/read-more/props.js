const helpers = process.uiHelpers();
const props = process.aioAppConfigs('storybook/components/atoms/typography/text/description/props');

module.exports = helpers.json.merge(props || {}, {
    content:{
        type:"any",
        description:"Accepts any valid value type, including <code>strings</code>, <code>numbers</code>, <code>booleans</code>, <code>functions</code>, <code>JSX elements</code>. The expected value depends on the component's implementation and the context in which the property is used.",
    },
    toggle:{
        ___:{
            nested:{
                enabled:null
            }
        }
    },
    description:{
        ___:{
            compProps:{
                overwirte:{
                    text:{
                        ___:{
                            predefined:{
                                overwirte:{
                                    content:null
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});