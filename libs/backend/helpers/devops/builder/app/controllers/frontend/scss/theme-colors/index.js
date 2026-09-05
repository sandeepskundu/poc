const gradient = require('./gradients');
const theme = require('./../schema/theme/base');

const colors = async (data, appConfig, req, res, next) => {
    let code = {};
    for(const a in data){
        let ai = data[a];
        for(const b in ai.types){
            let bi = ai.types[b];
            let bn = parseInt(b);
            if(bn <= 9){
                bn = `${a}0${b}`;
            }else{ 
                bn = `${a}${b}`;
            }
            for(const c in bi.shades){
                let cn = parseInt(c);
                if(cn <= 9){
                    cn = `${bn}0${c}`;
                }else{ 
                    cn = `${bn}${c}`;
                }

                code[cn] = bi.shades[c];
                code[cn].cc = cn;
            }
        }
    }

    return code;
}

const createVars = (rv, colors) => {
    for(const a in colors){
        rv = `${rv}\n\t--c${a}:${colors[a].hex};`
    }
    return rv;
}

const createThemeFile = async (appConfig, req, theme) => {
    let rv = {};
    await req.helpers.file.writer.async.write(`${theme.bundlePath}.scss`, `@import "${theme.improtFrom}"`);
    if(theme && theme.outputPath && theme.bundlePath){
        rv[theme.outputPath] = `${theme.bundlePath}.scss`;
    }
    return rv;
}


const mapThemes = async (appConfig, req, res, next, theme) => {
    let map = `scssConfig.entries.cdn`;
    let tDir = req.helpers.json.val(appConfig, 'scssConfig.themeColorDir', 'themes-colors');
    let bundles = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');
    let item = await createThemeFile(appConfig, req, {
            improtFrom:`./../../${tDir}/${theme}`,
            bundlePath:`${bundles}/${tDir}/${theme}`,
            outputPath:`cdn/bundles/${tDir}/${theme}`,
        });

    let rv = req.helpers.json.val(appConfig, map, {});
        appConfig = req.helpers.json.set(appConfig, map, req.helpers.json.merge(rv, item));

    return appConfig;
}

const colorsCode = async (rval, appConfig, req, data) => {
    for(const a in data){
        rval.push(`'c${a}'`);
    }

    return rval
}

const gradients = async (rval, appConfig, req, data) => {
    for(const a in data){
        rval.push(`'g${a}'`);
    }

    return rval
}

const themeColorsVars = async (appConfig, req, color, greds) => {
    let rv = await colorsCode([], appConfig, req, color || {});
        rv = await gradients(rv, appConfig, req, greds || {});
        rv = `$theme-colors:(\n${rv.join(',\n')}\n);`;

    return rv;
}


const create = async (appConfig, req, res, next) => {
    let hasTheme = req.helpers.json.val(appConfig, 'scssConfig.hasTheme');

    if(hasTheme){
        for(const a in theme){
            let data = req.helpers.json.val(theme[a], 'data.color.data.colors');
            let gred = req.helpers.json.val(theme[a], 'data.gradients.data.gradients');
            let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.themeColorDir');
            let color = await colors(data, appConfig, req, res, next);
            let greds = await colors(gred, appConfig, req, res, next);
            let vars = await themeColorsVars(appConfig, req, color, greds);
            let code = req.helpers.json.val(theme[a], 'id');
            let variables = createVars(``, color);
                variables = await gradient.create(variables, greds, appConfig, req, res, next);
                code = code || req.helpers.uuid.create();
                await req.helpers.file.writer.async.write(`${url}/${code}.scss`, `:root{\n${variables}\n}\n\n${vars}\n @include build-theme-colors();`);
                appConfig = await mapThemes(appConfig, req, res, next, code);
        }
    };

    return appConfig;
}

exports.create = create;