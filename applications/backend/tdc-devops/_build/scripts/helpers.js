const uH = require('./ui-helpers');
const bH = require('./../../../../../libs/backend/helpers');
    
const start = () => {
    return uH.json.merge(uH, bH || {});
}
    
module.exports = start();