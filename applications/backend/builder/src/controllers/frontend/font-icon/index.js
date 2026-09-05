const svgtofont = require("svgtofont");

const parse = async (data, appConfig, req, arg) => {
    let rval = {};

    for(const a in data){
        rval[a] = {
            unicode:data[a].encodedCode.replace(/\\/g, "") 
        }
    };

    return rval;
}

const fontFamily = async (appConfig, req, arg) => {
    const iconFontsDir = req.helpers.json.val(appConfig, 'appConfig.iconFontsDir');

    return {
        "name":`${arg.name}`,
        "prefix":arg.prefix || arg.name,
        "path":`${iconFontsDir}/${arg.name}`
    }
}

const scss = async (data, appConfig, req, arg) => {
    let d = await parse(data, appConfig, req, arg);
    let family = await fontFamily(appConfig, req, arg);
    let rval = `@import "./../../dsystem/base";`;
        rval = `${rval}\n\n$${arg.name}-icons:(\n${req.helpers.scss.list.prepair(``, d, 0)}\n);`;
        rval = `${rval}\n\n$${arg.name}-icons-family:(\n${req.helpers.scss.list.prepair(``, family, 0)}\n);`;
        rval = `${rval}\n\n@include build-icons($${arg.name}-icons-family, $${arg.name}-icons);`

    return rval;
}

const prepirsList = async (appConfig, req, arg) => {
    const buildDir = req.helpers.json.val(appConfig, 'dirs.build');
    const fontsDir = req.helpers.json.val(appConfig, 'appConfig.fontsDir');
    const iconFontsDir = req.helpers.json.val(appConfig, 'appConfig.iconFontsDir');
    const staticsDirName = req.helpers.json.val(appConfig, 'appConfig.staticsDir');
    const path = `${buildDir}/${staticsDirName}/${fontsDir}/${iconFontsDir}/${arg.name}/info.json`;
    const data = await req.helpers.file.reader.async.init(path, false, 'json');
    const bPath = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.bundles');
    const filePath = `${bPath}/${iconFontsDir}/${arg.name}.scss`;
    const c = await scss(data, appConfig, req, arg);
    await req.helpers.file.writer.async.write(filePath, c);
}

const font = async (appConfig, req, arg) => {
    const buildDir = req.helpers.json.val(appConfig, 'dirs.build');
    const staticsDir = req.helpers.json.val(appConfig, 'dirs.staticsDir');
    const iconFontsDir = req.helpers.json.val(appConfig, 'appConfig.iconFontsDir');
    const staticsDirName = req.helpers.json.val(appConfig, 'appConfig.staticsDir');
    const fontsDir = req.helpers.json.val(appConfig, 'appConfig.fontsDir');

    await svgtofont({
        css:false,
        fontName:arg.name,
        startUnicode:0xA00,
        generateInfoData:true,
        svgicons2svgfont:{
            normalize:true
        },
        src:`${staticsDir}/${iconFontsDir}/${arg.name}`, // svg path
        dist:`${buildDir}/${staticsDirName}/${fontsDir}/${iconFontsDir}/${arg.name}`, // output path
    }).then(async () => {
        await prepirsList(appConfig, req, arg)
    });
}

const create = async (appConfig, req) => {
    const staticsDir = req.helpers.json.val(appConfig, 'dirs.staticsDir');
    const iconFontsDir = req.helpers.json.val(appConfig, 'appConfig.iconFontsDir');
    const dirs = await req.helpers.file.reader.async.dirs(`${staticsDir}/${iconFontsDir}`);

    for(const a in dirs){
        await font(appConfig, req, {name:dirs[a]});
    }

    return appConfig;
}

exports.create = create;