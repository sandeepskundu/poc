
const fs = require('fs');
const path = require('path');
const story = require('./story');
const props = require('./props');

const setProps = (arg, data, extra, alias, appConfig, req) => {
    const filsProps = path.parse(arg);
    if(filsProps && filsProps.ext === '.jsx'){
        props.create(arg, data, extra, alias, appConfig, req);
        story.create(arg, data, extra, alias, appConfig, req);
    }
}

const copy = async (appConfig, req, item, ) => {
    if(item && item.orgDir && item.destDir){
        await req.helpers.file.copy.async(item.orgDir, item.destDir);
    }
}

const compile = async (src, callback, extra, alias, appConf, req) => {
    await fs.readdirSync(src).forEach(async (file) => {
        let fp = src+'/'+file;
        let stat = await fs.statSync(fp);
        if(stat?.isDirectory()) {
            await compile(src+'/'+file, callback, extra, alias, appConf, req);
        } else {
            await fs.readFile(fp, 'utf8', async (err, data) => {
                callback(fp, err?'':data, extra, alias, appConf, req);
            });
		}
    });
}

const create = async (appConfig, req, res, next) => {
    const dirs = req.helpers.json.val(appConfig, 'webpackConfigs.libsDirsMap', {});

    for(const a in dirs){
        await copy(appConfig, req, dirs[a]);
        await compile(dirs[a].destDir, setProps, false, dirs[a], appConfig, req);   
    }

    delete appConfig.webpackConfigs.libsDirsMapConfig;

    return appConfig;
}

exports.create = create;