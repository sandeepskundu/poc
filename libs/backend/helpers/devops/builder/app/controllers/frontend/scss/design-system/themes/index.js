
const themes = require('./../../schema/theme/base');

const themeDir = async (appConfig, req, res, name) => {
    let theme = req.helpers.json.val(appConfig, 'scssConfig.themesDir', 'themes');
    let scssDir = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.scss');
    return `${scssDir}/${theme}/${name}`;
}

const rootFile = async (appConfig, req, map, dir, dsName) => {
    let rval = '';

    for(const a in map){
        rval = req.helpers.scss.import.add(rval, a);
    };

    await req.helpers.file.writer.async.write(`${dir}/_${dsName?dsName:'index'}.scss`, rval);
    return appConfig;
}

const createTheme = async (appConfig, req, res, name, data) => {
    let map = {};
    let theme = req.helpers.json.val(data, 'data.theme', {});
    let dir = await themeDir(appConfig, req, res, name);

    for(const a in theme){
        let t = `$${a}:(\n${await req.helpers.scss.list.prepair(``, theme[a], 0)}\n);\n\n`;
            map[a] = true;
            await req.helpers.file.writer.async.write(`${dir}/_${a}.scss`, t);

    }

    await rootFile(appConfig, req, map, dir);
}

const create = async (appConfig, req, res, next, data) => {
    let hasDesignSystem = req.helpers.json.val(appConfig, 'scssConfig.hasDesignSystem');

    if(hasDesignSystem){
        for(const a in themes){
            await createTheme(appConfig, req, res, a, themes[a]);
        }
    }
    return appConfig;
}

const createThemeFile = async (appConfig, req, name, data) => {
    let dsScss = `@import "./../../themes/${name}";
@import './../../dsystem/${name}';
@include build-theme();`
    let bundle = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');
    let theme = req.helpers.json.val(appConfig, 'scssConfig.themesDir', 'themes');
    await req.helpers.file.writer.async.write(`${bundle}/${theme}/${name}.scss`, dsScss);
}

const bundles = async (appConfig, req, res, next, data) => {
    let map = `scssConfig.entries.cdn`;
    let entries = req.helpers.json.val(appConfig, map, {});
    let bundle = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');
    let theme = req.helpers.json.val(appConfig, 'scssConfig.themesDir', 'themes');

    for(const a in themes){
        let entry = {};
        let output = `cdn/bundles/${theme}/${a}`;
            entry[output] = `${bundle}/${theme}/${a}.scss`;

            appConfig = req.helpers.json.set(appConfig, map, req.helpers.json.merge(entries, entry));
            await createThemeFile(appConfig, req, a, themes[a]);
    }

    return appConfig;
}

exports.create = create;
exports.bundles = bundles;