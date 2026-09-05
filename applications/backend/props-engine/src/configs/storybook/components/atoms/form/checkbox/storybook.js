const helpers = process.uiHelpers();
const checkbox = process.aioAppConfigs('storybook/raw/atoms/form/checkbox');

module.exports = helpers.json.merge(helpers.json.get(checkbox, 'storybook', {}), {
    mockdata:{
        defaults:{
            label:{
                text:"Remember me"
            },
            description:{
                text:"Save my login details for next time."
            }
		},
        variants:{}
    }
});