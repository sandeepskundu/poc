const helpers = process.uiHelpers();
const base = require('./../props');
const icon = require('./../icon/props');
const image = require('./../image/props');

module.exports = helpers.json.merge(base || {}, helpers.json.merge(icon || {}, image || {}));