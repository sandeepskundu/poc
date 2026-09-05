const helpers = process.uiHelpers();
const container = process.aioAppConfigs('storybook/raw/atoms/container');

module.exports = helpers.json.merge(helpers.json.get(container, 'storybook', {}), {})