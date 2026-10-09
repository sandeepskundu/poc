const ds = require('./ds');
const props = require('./props');
const component = require('./component');


const buildInternal = async (rval, appConfig, req) => {
    rval = await ds.get(rval, appConfig, req);
    rval = await props.get(rval, appConfig, req);
    rval = await component.get(rval, appConfig, req);

    return rval;
}

module.exports = async (rval, appConfig, req, res, next) => {
    return await buildInternal(rval, appConfig, req);
}