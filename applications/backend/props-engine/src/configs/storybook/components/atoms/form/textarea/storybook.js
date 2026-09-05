const helpers = process.uiHelpers();
const textarea = process.aioAppConfigs('storybook/raw/atoms/form/textarea');

module.exports = helpers.json.merge(helpers.json.get(textarea, 'storybook', {}), {
    mockdata:{
        defaults:{
            label:'Label text',
            placeholder:'placeholder',
            description:'This is a hint text to help user.'
		},
        variants:{}
    }
});