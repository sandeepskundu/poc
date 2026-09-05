
const path = require('path');
const others = require('./others');
const chunks = require('./chunks');
const resolve = require('./resolve');

const nestedDirs = async (root, path, req) => {
    let rv = [root];
    if(path){
        let p = path.split('/');
        if(p && p.length > 0){
            for(let a in p){
                rv.push(p[a]);
                await req.helpers.file.writer.async.dir(rv.join('/'));
            }
        }
    }
}

const mapLibDirs = async (config, req) => {
    const libs = req.helpers.json.val(config, 'webpackConfigs.libsDirsMapConfig');
    if(libs){
        let rv = {};

        for(const a in libs){
            if(libs[a] && libs[a].orgDir && libs[a].destDir){
                let url = req.helpers.json.val(config, 'dirs.scrapDir');
                    await nestedDirs(url, libs[a].destDir, req);
                    rv[a] = {
                        aliasName:a,
                        raw:libs[a],
                        destDir:path.join(url, libs[a].destDir),
                        orgDir:req.helpers.devops.builder.utils.common.path.getUiCompsLibsDirPath(libs[a].orgDir)
                    }
            }
        };

        config.webpackConfigs.libsDirsMap = rv;
    }

    return config;
}

const entries = (config, req) => {
    const en = req.helpers.json.val(config, 'appConfig.entries', {});
    return req.helpers.json.merge({}, en);
}

const bundle = async (config, req) => {
    let app = req.helpers.json.val(config, 'dirs.app', '');
    let build = req.helpers.json.val(config, 'appConfig.buildDir');
    let compress = req.helpers.json.val(config, 'appConfig.compress');
    let compression = compress?'compressed':'uncompressed';
    return (`${app}/${build}`);
}

const output = async (config, req) => {
    return {
        clean:false,
        path:await bundle(config, req)
    };
}

const root = async (config, req) => {
    const bdir = await bundle(config, req);
    const rv = {
        output:await output(config, req),
        entry:await entries(config, req),
        resolve:await resolve.create(config, req),
        context:req.helpers.json.val(config, 'dirs.app', ''),
    }

    return {
        webpack:rv,
        chunks:await chunks.outputs(config, req),
        others:await others.create(config, req, bdir),
    };
}

const write = async (wJson, appConfig, req) => {
    const url = req.helpers.json.val(appConfig, 'dirs.scrapDir');
    await req.helpers.file.writer.async.write(`${url}/webpack/config.json`, JSON.stringify(wJson, null, 4))
}

const iconsEntry = async (appConfig, req) => {
    const rval = {};
    const staticsDir = req.helpers.json.val(appConfig, 'dirs.staticsDir');
    const iconFontsDir = req.helpers.json.val(appConfig, 'appConfig.iconFontsDir');
    const dirs = await req.helpers.file.reader.async.dirs(`${staticsDir}/${iconFontsDir}`);
    const bPath = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');

    for(const a in dirs){
        rval[`cdn/bundles/${iconFontsDir}/${dirs[a]}`] = `${bPath}/${iconFontsDir}/${dirs[a]}.scss`;
    };
    

    return {
        cdn:rval
    }
}

const entriesConfig = async (appConfig, req) => {
    let url = req.helpers.json.val(appConfig, 'dirs.scrapDir');
    let entry = req.helpers.json.val(appConfig, 'scssConfig.entries', {});
        entry = req.helpers.json.merge(entry, await iconsEntry(appConfig, req));

        await req.helpers.file.writer.async.write(`${url}/webpack/entries.json`, JSON.stringify(entry, null, 4))
    return appConfig;
}


const create = async (config, req) => {
    let wJson = await root(config, req);
        config = await mapLibDirs(config, req);
        config = await entriesConfig(config, req)
        await write(wJson, config, req);

    return wJson;
}

exports.create = create;