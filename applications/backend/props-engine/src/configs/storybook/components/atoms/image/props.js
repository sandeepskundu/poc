const helpers = process.uiHelpers();
const image = process.aioAppConfigs('storybook/raw/atoms/image');

module.exports = helpers.json.merge(helpers.json.get(image, 'props', {}), {});