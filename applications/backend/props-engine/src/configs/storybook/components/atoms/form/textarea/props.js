const helpers = process.uiHelpers();
const textarea = process.aioAppConfigs('storybook/raw/atoms/form/textarea');

module.exports = helpers.json.merge(helpers.json.get(textarea, 'props', {}), {
});