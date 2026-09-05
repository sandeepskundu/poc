const helpers = process.uiHelpers();
const heading = process.aioAppConfigs('storybook/raw/atoms/typography/heading');

module.exports = helpers.json.merge(helpers.json.get(heading, 'storybook', {}), {});