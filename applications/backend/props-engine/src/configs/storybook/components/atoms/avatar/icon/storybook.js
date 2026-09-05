const helpers = process.uiHelpers();
const avatar = process.aioAppConfigs('storybook/raw/atoms/avatar/icon');

module.exports = helpers.json.merge(helpers.json.get(avatar, 'storybook', {}), {});