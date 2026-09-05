
const fs = require('fs');
const path = require('path');
const props = require('./props');

const setProps = async (arg, data, extra, alias, appConfig, req, res, next) => {
    const filsProps = path.parse(arg);
    if(filsProps && filsProps.ext === '.jsx'){
        await props.create(arg, data, extra, alias, appConfig, req, res, next);
    }
}

const copy = async (appConfig, req, item) => {
    if(item && item.orgDir && item.destDir){
        await req.helpers.file.copy.async(item.orgDir, item.destDir);
    }
}

const compile = async (src, callback, extra, alias, appConf, req, res, next) => {
    await fs.readdirSync(src).forEach(async (file) => {
        let fp = src+'/'+file;
        let stat = await fs.statSync(fp);
        if(stat?.isDirectory()) {
            await compile(src+'/'+file, callback, extra, alias, appConf, req, res, next);
        } else {
            let data = await req.helpers.file.reader.async.read(fp);
                await callback(fp, data || '', extra, alias, appConf, req, res, next);
		}
    });
}

const create = async (appConfig, req, res, next) => {
    const dirs = req.helpers.json.val(appConfig, 'webpackConfigs.libsDirsMap', {});

    for(const a in dirs){
        await copy(appConfig, req, dirs[a]);
        await compile(dirs[a].destDir, setProps, false, dirs[a], appConfig, req, res, next);   
    }

    delete appConfig.webpackConfigs.libsDirsMapConfig;

    return appConfig;
}

exports.create = create;