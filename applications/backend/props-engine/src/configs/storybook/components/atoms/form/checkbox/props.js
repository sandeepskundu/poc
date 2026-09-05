const helpers = process.uiHelpers();
const checkbox = process.aioAppConfigs('storybook/raw/atoms/form/checkbox');

module.exports = helpers.json.merge(helpers.json.get(checkbox, 'props', {}), {});