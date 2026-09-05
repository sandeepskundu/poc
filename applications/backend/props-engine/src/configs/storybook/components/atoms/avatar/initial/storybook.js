const helpers = process.uiHelpers();
const avatar = process.aioAppConfigs('storybook/raw/atoms/avatar/initial');

module.exports = helpers.json.merge(helpers.json.get(avatar, 'storybook', {}), {});