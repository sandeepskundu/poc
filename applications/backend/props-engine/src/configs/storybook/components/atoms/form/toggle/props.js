const helpers = process.uiHelpers();
const toggle = process.aioAppConfigs('storybook/raw/atoms/form/toggle');

module.exports = helpers.json.merge(helpers.json.get(toggle, 'props', {}), {});