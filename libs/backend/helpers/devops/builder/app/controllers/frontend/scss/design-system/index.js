const units = require('./units');
const theme = require('./themes');

const ds = {
    "base":{
        //props:require('./../schema/units/props'),
        reset:require('./../schema/units/reset.js'),
        numbers:require('./../schema/units/numbers-list.js'),
        fontSize:require('./../schema/units/font-sizes.js'),
        fontFamilies:require('./../schema/units/font-family.js'),
        'components':require('./../schema/units/components.js'),
        'app-variables':require('./../schema/units/app-variables.js'),
        
    }
}

const getGetDesignsSystems = async (appConfig, req, res, next) => {
    return ds;
}

const rootFile = async (appConfig, req, res, next, dsName) => {
    let rval = '';
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.designSystem');
    let map = {
        "./../helpers":true,
        "variables":true
    }

    for(const a in map){
        rval = req.helpers.scss.import.add(rval, a);
    }

    await req.helpers.file.writer.async.write(`${url}/_${dsName?dsName:'index'}.scss`, rval);
    return appConfig;
}

const createThemeFile = async (appConfig, req, dsystem) => {
    let rv = {};
    const dsScss = `@import "${dsystem.improtFrom}";
@import "./../../core";
`
    await req.helpers.file.writer.async.write(`${dsystem.bundlePath}.scss`, dsScss);
    
    if(dsystem && dsystem.outputPath && dsystem.bundlePath){
        rv[dsystem.outputPath] = `${dsystem.bundlePath}.scss`;
    }

    return rv;
}

const mapDesignSystems = async (appConfig, req, res, next, name) => {
    let map = `scssConfig.entries.cdn`;
    let dsDir = req.helpers.json.val(appConfig, 'scssConfig.designSystemDir', 'dsystem');
    let bundles = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');
    let item = await createThemeFile(appConfig, req, {
            improtFrom:`./../../${dsDir}/${name}`,
            bundlePath:`${bundles}/${dsDir}/${name}`,
            outputPath:`cdn/bundles/${dsDir}/${name}`,
        });
    let rv = req.helpers.json.val(appConfig, map, {});
        appConfig = req.helpers.json.set(appConfig, map, req.helpers.json.merge(rv, item));

    return appConfig;
}

exports.create = async (appConfig, req, res, next) => {
    const ds = await getGetDesignsSystems(appConfig, req, res, next);

    for(const a in ds){
        appConfig = await units.create(appConfig, req, res, next, ds[a]);
        appConfig = await rootFile(appConfig, req, res, next, a);
        appConfig = await theme.create(appConfig, req, res, next, ds[a]);
        appConfig = await mapDesignSystems(appConfig, req, res, next, a);
        appConfig = await theme.bundles(appConfig, req, res, next, ds[a]);
    }

    return appConfig;
}