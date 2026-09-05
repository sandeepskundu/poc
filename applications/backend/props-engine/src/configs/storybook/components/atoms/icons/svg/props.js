const helpers = process.uiHelpers();
const svgicon = process.aioAppConfigs('storybook/raw/atoms/icons/svg');

module.exports = helpers.json.merge(helpers.json.get(svgicon, 'props', {}), {});