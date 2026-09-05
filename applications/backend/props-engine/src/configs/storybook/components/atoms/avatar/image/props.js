const helpers = process.uiHelpers();
const avatar = process.aioAppConfigs('storybook/raw/atoms/avatar/image');

module.exports = helpers.json.merge(helpers.json.get(avatar, 'props', {}), {
    dsTheme:{
        ___:{
            predefined:{
                overwirte:{
                    radius:{
                        dvalue:'round'
                    }
                }
            }
        }
    },
});