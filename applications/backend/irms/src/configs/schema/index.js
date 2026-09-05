const empPi = require('./empPi');
const employmentInfo = require('./employment-info');

const businessUnit = require('./business-units');
const businessVerticals = require('./business-verticals');

const officeAddress = require('./office-address');

const roles = require('./roles');
const employer = require('./employer');
const departments = require('./departments');

const accessMap = require('./accessMap');
const accessRoles = require('./accessRole');
const accessPreset = require('./accessPreset');

const app = require('./app');
const team = require('./team');
const permission = require('./permission');

const empTeam = require('./emp-teams');

const ar = require('./access-role');
const tbi = require('./team-by-item');
const tbu = require('./team-base-user');
const rba = require('./role-based-access');
const ibp = require('./item-base-permission');
const tbmbr = require('./team-base-map-by-role');


const merchant = require('./merchant');
const eat = require('./employer-access-team');

exports.compiler = async (private, appConfig, req, res, next) => {
    return [
        await ar.get(private, appConfig, req),
        await tbi.get(private, appConfig, req),
        await tbu.get(private, appConfig, req),
        await ibp.get(private, appConfig, req),
        await rba.get(private, appConfig, req),
        await app.get(private, appConfig, req),
        await team.get(private, appConfig, req),
        await tbmbr.get(private, appConfig, req),
        await permission.get(private, appConfig, req),

        await empTeam.get(private, appConfig, req),


        await empPi.get(private, appConfig, req),
        await employmentInfo.get(private, appConfig, req),

        await accessMap.get(private, appConfig, req),
        await accessRoles.get(private, appConfig, req),
        await accessPreset.get(private, appConfig, req),

        await businessUnit.get(private, appConfig, req),
        await businessVerticals.get(private, appConfig, req),

        await roles.get(private, appConfig, req),
        await employer.get(private, appConfig, req),
        await departments.get(private, appConfig, req),

        await eat.get(private, appConfig, req),
        await merchant.get(private, appConfig, req),

        await private.builder.start('auth', 'emps', req, {schema:{}}),
        await private.builder.start('address', 'officeAdd', req, {schema:await officeAddress(private, appConfig, req)})
    ]
}
