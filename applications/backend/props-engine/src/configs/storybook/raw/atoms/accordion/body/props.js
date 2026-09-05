const helpers = process.uiHelpers();
const row = process.aioAppConfigs('storybook/raw/atoms/typography/text/description');
const storybook = {
    predefined:process.aioAppConfigs('storybook/predefined')
}

const description = () => {
    return {
        type:"nested",
        description:"",
        ___:{
            nested:helpers.json.merge(helpers.json.get(row, 'props', {}), {

            })
        }
    }
}

const themeColors = (desc, arg) => {
    return {
        type:'nested',
        description:desc || '',
        ___:{
            nested:helpers.json.merge(storybook.predefined.utils.preset.getByList(['colors']), arg || {})
        }
    }
}

module.exports = {
    content:{
        type:'any',
        dvalue:'',
    },
    theme:{
        type:'nested',
        ___:{
            nested:{
                default:{
                    type:'nested',
                    ___:{
                        nested:{
                            wrapper:themeColors('', {}),
                        }
                    }
                },
                selected:{
                    type:'nested',
                    ___:{
                        nested:{
                            wrapper:themeColors('', {}),
                        }
                    }
                },
                disabled:{
                    type:'nested',
                    ___:{
                        nested:{
                            wrapper:themeColors('', {}),
                        }
                    }
                }
            }
        }
    },
    description:description()
}