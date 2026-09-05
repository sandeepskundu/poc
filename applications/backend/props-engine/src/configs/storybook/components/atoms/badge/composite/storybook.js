const helpers = process.uiHelpers();
const base = require('./../storybook');
const icon = require('./../icon/storybook');
const image = require('./../image/storybook');

module.exports = helpers.json.merge(base || {}, helpers.json.merge(icon || {}, image || {}));