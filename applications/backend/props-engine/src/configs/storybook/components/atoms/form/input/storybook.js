const helpers = process.uiHelpers();
const input = process.aioAppConfigs('storybook/raw/atoms/form/input');

module.exports = helpers.json.merge(helpers.json.get(input, 'storybook', {}), {
    mockdata:{
        defaults:{
            label:'Label text',
            placeholder:'placeholder',
            description:'This is a hint text to help user.'
		},
        variants:{}
    }
});