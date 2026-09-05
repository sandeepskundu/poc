const helpers = process.uiHelpers();
const toggle = process.aioAppConfigs('storybook/raw/atoms/form/toggle');

module.exports = helpers.json.merge(helpers.json.get(toggle, 'storybook', {}), {
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