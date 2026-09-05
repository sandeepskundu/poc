const paths = async (rval, appConfig, req, arg) => {
    let rv = req.helpers.json.copy(rval || {});
    let bundle = '__BUNDLE_TYPE__';
    let pathPrefix = '__PATH_PREFIX__';
    let env = req.helpers.json.val(appConfig, 'appConfig.APP_ENV');
    let appPrefix = req.helpers.json.val(appConfig, 'appConfig.pathPrefix');

    if(env === 'local'){
        pathPrefix = appPrefix;
        bundle = 'uncompressed';
    }

    let fonts = req.helpers.json.val(appConfig, 'appConfig.fontsDir', 'fonts');
    let images = req.helpers.json.val(appConfig, 'appConfig.imagesDir', 'images');
    let statics = req.helpers.json.val(appConfig, 'appConfig.staticsDir');
        rv['fonts-dir-path'] = `/${pathPrefix}/${statics}/${fonts}`;
        rv['images-dir-path'] = `/${pathPrefix}/${statics}/${images}`;

    return rv;
}

const addComponents = async (rval, appConfig, req, units) => {
    let list = req.helpers.json.val(units, 'components', {});
    let rv = `\n\n$aio-components:(\n${await req.helpers.scss.list.prepair(``, list, 0)}\n);\n\n`;
    return (rval+rv);

}

const create = async (rval, appConfig, req, units) => {
    let rv = ``;
    let file = 'app-variables';
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.variables');
    let vars = req.helpers.json.val(units, 'app-variables', {});
        vars = await paths(vars, appConfig, req, vars);

        for(const a in vars){
            rv = rv+`$${a}:"${vars[a]}";\n`;
        }

        rv = await addComponents(rv, appConfig, req, units)
    
        await req.helpers.file.writer.async.write(`${url}/_${file}.scss`, rv);

    return req.helpers.scss.import.add(rval, file);
}

exports.create = create;