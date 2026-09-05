const helpers = process.uiHelpers();
const input = process.aioAppConfigs('storybook/raw/atoms/form/input');

module.exports = helpers.json.merge(helpers.json.get(input, 'props', {}), {
    autocomplete:null
});