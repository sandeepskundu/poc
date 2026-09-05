const ds = require('./ds-props');


const action =  async (req, res, next) => {
    req.helpers.express.response.send('json', ds, 200, req, res, next);
}; 

exports.action = action;