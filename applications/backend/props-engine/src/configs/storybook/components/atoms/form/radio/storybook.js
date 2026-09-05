const helpers = process.uiHelpers();
const radio = process.aioAppConfigs('storybook/raw/atoms/form/radio');

module.exports = helpers.json.merge(helpers.json.get(radio, 'storybook', {}), {
    mockdata:{
        defaults:{
            label:{
                text:"Remember me"
            }
		},
        variants:{
            withDescription:{
                label:{
                    text:"Remember me"
                },
                description:{
                    text:"Save my login details for next time."
                }
            }
        }
    }
});