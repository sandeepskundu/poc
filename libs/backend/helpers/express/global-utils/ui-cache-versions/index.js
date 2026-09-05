const path = require('path');
const getDirPath = (req, res, next, name, dirType) => {
    let url = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv', 'prod');
    let statics = req.helpers.json.val(req, 'appConfig.appConfig.staticsDir');
    //let compress = req.helpers.json.val(req, 'appConfig.appConfig.compress');
    //let compression = compress?'compressed':'uncompressed';  
    let compression = (env != 'local')?'compressed':'uncompressed';

    if(dirType === 'org'){
        return path.resolve(`./${url}/${compression}/${statics}_org/${name}`);
    }else{
        return path.resolve(`./${url}/${compression}/${statics}/${name}`);
    }
}

const getDirsName = (req, res, next) => {
    let rval = {};
    let types = [];
    let enums = ['css', 'js'];
    let name = req.helpers.json.val(req, 'params.name');

    if(!name){
        const tname = req.helpers.json.val(req, 'query.types');
        if(tname){
            types = tname.split(',')
        }
    }else{
        if(name === 'all'){
            types = enums;
        }else{
            if(enums.indexOf(name) > -1){
                types.push(name);
            }
        }
    }

    if(types && types.length > 0){
        for(const a in types){
            const type = types[a];
            rval[type] = {
                cached:getDirPath(req, res, next, type),
                org:getDirPath(req, res, next, type, 'org'),
            }
        }
    }

    return rval;
}

const replacePath = (rval, arg, req) => {
    const opath = req.helpers.json.val(arg, 'org');
    const cpath = req.helpers.json.val(arg, 'cached');
    return rval.replace(new RegExp(opath, 'g'), cpath);
}

const replaceValue = (data, arg) => {
    if(arg && data){
        for(const a in arg){
            data = data.replace(new RegExp(a, 'g'), arg[a]);
        };
    }

    return data;
}

const replaceVersions = (data, type, versions) => {
    if(versions){
        data = replaceValue(data, (versions.universal || {}));
        data = replaceValue(data, (versions[type] || {}))
    };

    return data;
}


const versions = {
    universal:{
        '__________APP_WEB_CACHE_TIME__':'3'
    },
    css:{
        __CACHE_VERSION__:'21'
    }
}

const replaceAppCOnfig = (data, req, res, next) => {
    return replaceValue(data, {
        '__PATH_PREFIX__':req.helpers.json.val(req, 'appConfig.appConfig.pathPrefix'),
        '__FONT_CDN_PATH__':req.helpers.json.val(req, 'appConfig.appConfig.fontsCdnPath'),
        '__IMAGES_CDN_PATH__':req.helpers.json.val(req, 'appConfig.appConfig.imagesCdnPath'),
        '__APP_WEB_CACHE_TIME__':req.helpers.json.val(req, 'appConfig.appConfig.appWebCacheTime'),
    })
}

const start = async (req, res, next) => {
    let dirs = getDirsName(req, res, next);
    let rval = {
        status:true,
        message:"versions update sucessfully"
    }

    for(let a in dirs){
        if(dirs[a] && dirs[a].org){
            let d = await req.helpers.file.reader.sync.dirAndFileList(dirs[a].org);
            if(d?.files && d.files.length > 0){
                for(let b in d.files){
                    let furl = d.files[b];
                    let nurl = replacePath(furl, dirs[a], req);
                    let data = await req.helpers.file.reader.async.read(furl);
                        data = await replaceAppCOnfig(data, req, res, next);
                        data = await replaceVersions(data, a, versions);
                        await req.helpers.file.writer.async.write(nurl, data);
                }
            }
        }
    }

    return rval;
}

module.exports = start;