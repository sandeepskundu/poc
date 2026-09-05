const helpers = process.uiHelpers();
const button = process.aioAppConfigs('storybook/raw/atoms/form/button');

module.exports = helpers.json.merge(helpers.json.get(button, 'storybook', {}), {})