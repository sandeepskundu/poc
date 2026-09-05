
const request = require('request');
const axiosr = require('./axios');

const init = (req, res, next, options) => {
    req.pipe(request(url)).on('error', err => {
        const msg = 'Error on connecting to the webservice.';
        console.error(msg, err);
        res.status(500).send(msg);
    }).pipe(res);
}

exports.init = init;
exports.axios = axiosr;