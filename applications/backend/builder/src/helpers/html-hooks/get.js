const helpers = require('helpers')

const maps = {
    'server':'_____SERVER__SIDE__HOOKS',
    'app':'_____APP__CREATE__TIME__HOOKS',
    'webpack':'_____WEBPACK__COMPILE__TIME__HOOKS',
}

const data = async (appConfig, type, keyPrefix, keyName) => {
    return `<div class="${type}">${keyPrefix}</div>`
}


const start = async (appConfig, type, key) => {
    const rval = {};
    const keies = helpers.json.val(appConfig, 'hooksKeyNames');

    for(const a in keies){
        rval[`${key}${a}`] = await data(appConfig, type, `${key}${a}`)
    }

    return rval;
}

const details = async (appConfig, type) => {
    let rval = {};

    if(maps[type]){
        rval = await start(appConfig, type, maps[type])
    }

    return rval;
}

exports.details = details;