const helpers = require('helpers')


const getEntry = async (webpackJson, appConfig) => {
    let url = helpers.json.val(appConfig, 'dirs.scrapDir')
    return await helpers.file.reader.async.init(`${url}/webpack/entries.json`, false, 'json')
}

const entry = async (webpackJson, appConfig) => {
    const ent = await getEntry(webpackJson, appConfig);
    return helpers.json.val(ent, 'cdn')
}

const base = async (webpackJson, appConfig) => {
    return {
        entry:await entry(webpackJson, appConfig)
    }
}

const start = async (webpackJson, appConfig, type) => {
    return await base(webpackJson, appConfig)
}

exports.start = start;