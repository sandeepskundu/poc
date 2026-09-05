const helpers = process.uiHelpers();
const baseProps = require('./../image/props');
const iconProps = require('./../icon/props');
const initialProps = require('./../initial/props');
const labelsProps = process.aioAppConfigs('storybook/components/molecules/avatars/avatars-label/props');

module.exports = helpers.json.merge(baseProps, {
    icon:helpers.json.merge(helpers.json.get(iconProps, 'avatar', {}), {}),
    initial:helpers.json.merge(helpers.json.get(initialProps, 'avatar', {}), {})
});