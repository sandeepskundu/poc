const helpers = process.uiHelpers();
const choice = require('./../choice');

module.exports = helpers.json.merge(helpers.json.get(choice, 'props', {}), {
    mode:null
})