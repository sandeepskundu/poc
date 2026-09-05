const props = require('./props');


const buildInternal = async (rval, appConfig, req) => {
    rval = await props.get(rval, appConfig, req);

    debugger;

    return rval;
}

module.exports = async (rval, appConfig, req, res, next) => {
    return await buildInternal(rval, appConfig, req);
}