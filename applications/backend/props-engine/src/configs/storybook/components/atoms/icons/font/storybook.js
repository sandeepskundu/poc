const helpers = process.uiHelpers();
const fonticon = process.aioAppConfigs('storybook/raw/atoms/icons/font');

module.exports = helpers.json.merge(helpers.json.get(fonticon, 'storybook', {}), {});