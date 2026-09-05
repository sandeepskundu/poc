const path = require('path');
const helpers = require('helpers')

const getEntry = async (webpackJson, appConfig) => {
    let url = helpers.json.val(appConfig, 'dirs.scrapDir')
    return await helpers.file.reader.async.init(`${url}/webpack/entries.json`, false, 'json')
}

const entry = async (webpackJson, appConfig) => {
    const ent = await getEntry(webpackJson, appConfig);
    return helpers.json.val(ent, 'cdn')
}

const base = async (webpackJson, appConfig, type) => {
    let rval = {};
    let src = helpers.json.get(appConfig, 'dirs.storybook.componentChunks.src', '');
    let dest = helpers.json.get(appConfig, 'dirs.storybook.componentChunks.dest', '')
    let list = await helpers.file.reader.sync.dirAndFileList(src);
    for(let a in list.files){
        let file = list.files[a];
        let name = path.basename(file);
            rval[`${dest}/${helpers.string.replace.word(name, '.jsx', '')}`] = file
    }


    if(type === 'storybook'){
        return {
            entry:rval,
            externals: {
                'react':'React',
                'react-dom':'ReactDOM',
            },
        }
    }else{
        return {
            entry:await entry(webpackJson, appConfig, type)
        }
    }
}


const start = async (webpackJson, appConfig, type) => {
    return await base(webpackJson, appConfig, type)
}

exports.start = start;