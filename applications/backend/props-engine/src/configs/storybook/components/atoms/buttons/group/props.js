const helpers = process.uiHelpers();
const button = process.aioAppConfigs('storybook/raw/atoms/form/button-group');

module.exports = helpers.json.merge(helpers.json.get(button, 'props', {}), {});