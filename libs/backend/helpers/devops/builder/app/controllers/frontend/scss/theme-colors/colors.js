const create = async (rval, appConfig, req, data) => {
    let file = 'theme-colors';
    let rv = await compile(appConfig, req, data);
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.variables');
    return rval;
}

exports.create = create;