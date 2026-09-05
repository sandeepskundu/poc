const helpers = process.uiHelpers();
const description = process.aioAppConfigs('storybook/raw/atoms/typography/text/description');

module.exports = helpers.json.merge(helpers.json.get(description, 'storybook', {}), {})