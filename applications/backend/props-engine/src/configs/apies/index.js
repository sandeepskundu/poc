const ds = require('./ds');
const db = require('./db');
const props = require('./props');
const devOps = require('./devOps');
const component = require('./component');
const apiHelpers = process.aioBeLibs('helpers/_private/apies/helpers');

const buildPrefdefined = async (rval, appConfig, req) =>  {
    const rv = await apiHelpers.compiler({}, {
        /*--auth:{
            name:'emps',
            include:{
                '/login/v1/cpwd/create':true,
                '/login/v1/fpwd/create':true,
                '/login/v1/logout/fetch':true,
                '/login/v1/details/fetch':true,
                '/login/v1/verify/create':true,
                '/login/v1/session/create':true,
                '/account/v1/details/create':true,
                '/account/v1/username/create':true,
                '/account/v1/password/create':true
            }
        },--*/
        omniTree:{
            name:'kundu',
            model:{
                name:'sandeep'
            }
        },
        /*--masterData:'orgMasterData'--*/
    }, appConfig, req);

    debugger;

    return req.helpers.json.merge(rval, rv);
}


const buildInternal = async (rval, appConfig, req) => {
    rval = await db.get(rval, appConfig, req);
    rval = await ds.get(rval, appConfig, req);
    rval = await props.get(rval, appConfig, req);
    rval = await devOps.get(rval, appConfig, req);
    rval = await component.get(rval, appConfig, req);
    rval = await buildPrefdefined(rval, appConfig, req);

    return rval;
}

module.exports = async (rval, appConfig, req, res, next) => {
    return await buildInternal(rval, appConfig, req);
}