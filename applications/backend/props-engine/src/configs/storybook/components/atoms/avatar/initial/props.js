const helpers = process.uiHelpers();
const avatar = process.aioAppConfigs('storybook/raw/atoms/avatar/initial');

module.exports = helpers.json.merge(helpers.json.get(avatar, 'props', {}), {
    dsTheme:{
        ___:{
            predefined:{
                overwirte:{
                    radius:{
                        dvalue:'round'
                    },
                    border:{
                        dvalue:'c00103'
                    },
                    background:{
                        dvalue:'c00102'
                    }
                }
            }
        }
    }
});