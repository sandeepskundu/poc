const key = ['M', 'O', 'N', 'G', 'O', '_', 'D', 'B', '_', 'T', 'O', 'K', 'E', 'N'].join('');

const signature = async (appConfig, helpers) => {
    return helpers.json.val(appConfig, 'appInfo.appId', '');
}

const parse = async (appConfig, helpers) => {
    const sign = await signature(appConfig, helpers);
    const config = helpers.json.val(appConfig, `envs.runtime.${key}`, {});

    return {
        connection:sign?helpers.json.val(config, 'connection', ''):''
    }
}

const encript = async (rval, appConfig, helpers) => {
    let config = await parse(appConfig, helpers);
        rval = rval || {};
        rval[key] = await helpers.jwt.sign(config, await signature(appConfig, helpers));

    return rval;
}

const decript  = async (appConfig, helpers) => {
    let token = helpers.json.val(process.env, key, '');
    let rval = helpers.jwt.verify(token, await signature(appConfig, helpers));
    let sign = await signature(appConfig, helpers);
        rval = rval || {};
        rval.connection = sign?rval.connection:'';

    return rval;
}

exports.key = key;
exports.decript = decript;
exports.encript = encript;