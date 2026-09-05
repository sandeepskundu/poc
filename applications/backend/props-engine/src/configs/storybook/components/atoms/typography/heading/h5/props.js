const helpers = process.uiHelpers();
const heading = process.aioAppConfigs('storybook/raw/atoms/typography/heading/h5');

module.exports = helpers.json.merge(helpers.json.get(heading, 'props', {}), {});