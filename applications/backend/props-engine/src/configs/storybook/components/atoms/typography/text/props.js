const helpers = process.uiHelpers();
const text = process.aioAppConfigs('storybook/raw/atoms/typography/text');

module.exports = helpers.json.merge(helpers.json.get(text, 'props', {}), {});