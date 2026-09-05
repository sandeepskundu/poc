const fonts = require('./fonts');
const props = require('./props');
const reset = require('./reset');
const numbers = require('./number');
const variables = require('./app-variables');

const create = async (appConfig, req, res, next, data) => {
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.variables');
    let rval = await variables.create('', appConfig, req, data); // STEP - 1
        rval = await fonts.create(rval, appConfig, req, data); // STEP - 2
        rval = await reset.create(rval, appConfig, req, data); // STEP - 3
        rval = await props.create(rval, appConfig, req, data); // STEP - 4
        rval = await numbers.create(rval, appConfig, req, data); // STEP - 5
        await req.helpers.scss.rootFile(req, `${url}`, rval);
    return appConfig;
}

exports.create = create;