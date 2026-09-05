const helpers = process.uiHelpers();
const radio = process.aioAppConfigs('storybook/raw/atoms/form/radio');

module.exports = helpers.json.merge(helpers.json.get(radio, 'props', {}), {});