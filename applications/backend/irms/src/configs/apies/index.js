const ahelpers = process.aioBeLibs('helpers/_private/apies/helpers');

const empInfo = require('./empInfo');
const orgStructs = require('./orgStructs');
const accessRoles = require('./acessRoles');
const apiAccessPresets = require('./apiAccessPresets');

const businessUnit = require('./business-units');
const businessVerticals = require('./business-verticals');

const employer = require('./employer');

const roles = require('./roles');
const departments = require('./departments');


const employementInfo = require('./employment-info');
const officeAdd = require('./office-address');

const accessMap = require('./access-map');
const accessRole = require('./access-role');
const accessPreset = require('./access-preset');

const app = require('./app');
const permission = require('./permission');

const team = require('./team');
const empTeam = require('./emp-team');

const ar = require('./ar') // Access roles
const rba = require('./rba') // Role base access
const ibp = require('./ibp'); // Item base permissons
const tbi = require('./tbi'); // Team by item
const tbu = require('./tbu'); // Team base user
const tbmbr = require('./tbmbr') // Team base map by role

const eat = require('./eat'); // Employer access team
const merchant = require('./merchant');


const buildInternal = async (rval, appConfig, req) => {

    rval = await ar.get(rval, appConfig, req);
    rval = await tbi.get(rval, appConfig, req);
    rval = await tbu.get(rval, appConfig, req);
    rval = await rba.get(rval, appConfig, req);
    rval = await ibp.get(rval, appConfig, req);
    rval = await tbmbr.get(rval, appConfig, req);

    rval = await eat.get(rval, appConfig, req);
    rval = await merchant.get(rval, appConfig, req);


    rval = await businessUnit.get(rval, appConfig, req);
    rval = await businessVerticals.get(rval, appConfig, req);

    rval = await employer.get(rval, appConfig, req);

    rval = await roles.get(rval, appConfig, req);
    rval = await departments.get(rval, appConfig, req);

    rval = await employementInfo.get(rval, appConfig, req);

    rval = await officeAdd.get(rval, appConfig, req);

    rval = await accessMap.get(rval, appConfig, req);
    rval = await accessRole.get(rval, appConfig, req);
    rval = await accessPreset.get(rval, appConfig, req);

    rval = await empInfo.get(rval, appConfig, req);

    rval = await app.get(rval, appConfig, req);
    rval = await permission.get(rval, appConfig, req);

    rval = await team.get(rval, appConfig, req);
    rval = await empTeam.get(rval, appConfig, req);

    return rval;
}

module.exports = async (rval, appConfig, req, res, next) => {
    /*--const rv = await req.helpers.json.merge(rval, await ahelpers.compiler({}, {
        auth:{
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
        },
        masterData:'orgMasterData'
    }, appConfig, req));

    
        const apiPresets = await req.helpers.json.merge({}, await ahelpers.compiler(await apiAccessPresets.get(appConfig, req), {
        masterData:'apiAccessPresets'
    }, appConfig, req));
    
    
    
    const acs = await req.helpers.json.merge({}, await ahelpers.compiler(await userRoles.get(appConfig, req), {
        masterData:'userRoles'
    }, appConfig, req)); --*/

    return await buildInternal([], appConfig, req);
}