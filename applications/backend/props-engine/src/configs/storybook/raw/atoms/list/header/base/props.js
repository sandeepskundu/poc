const helpers = process.uiHelpers();
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}
const baseItem = process.aioAppConfigs('storybook/raw/atoms/list/item/base');

module.exports = helpers.json.merge(helpers.json.get(baseItem, 'props', {}), {
    config:{
        ___:{
            nested:{
                wrapper:{
                    ___:{
                        predefined:{
                            overwirte:{
                                ds:{
                                    ___:{
                                        nested:{
                                            theme:null,
                                            predefined:null,
                                            css:{
                                                ___:{
                                                    nested:{
                                                        class:{
                                                            ___:{
                                                                nested:{
                                                                    family:{
                                                                        dvalue:'md'   
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
})