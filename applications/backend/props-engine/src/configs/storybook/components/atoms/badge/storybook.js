const helpers = process.uiHelpers();
const badge = process.aioAppConfigs('storybook/raw/atoms/badge');

module.exports = helpers.json.merge(helpers.json.get(badge, 'storybook', {}), {});