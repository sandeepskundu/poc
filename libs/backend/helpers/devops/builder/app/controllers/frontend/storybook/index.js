const copyConfigs = async (appConfig, req, res, next) => {
    let dir = '.storybook';
    let culr = req.helpers.json.val(appConfig, 'dirs.app');
        //await req.helpers.file.copy.async(`${__dirname}/${dir}`, `${culr}/${dir}`);
    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    return await copyConfigs(appConfig, req, res, next);
}


const mapall = async (appConfig, req) => {
    let dir = req.helpers.json.get(appConfig, 'dirs.storybook.allCompConfigsDir', '');
    let confMapDir = req.helpers.json.get(appConfig, 'dirs.storybook.allCompConfigsMapJson', '');
    let comps = req.helpers.file.reader.sync.dirAndFileList(dir);

    if(confMapDir && comps && comps.files && comps.files.length > 0){
        let rv = {};
        for(let a in comps.files){
            let cd = await req.helpers.file.reader.async.init(comps.files[a], false, 'json');
            let pathmap = req.helpers.json.get(cd, 'component.path', '');
            let hash = req.helpers.json.get(cd, 'component.nameHash', '');

            if(pathmap && hash){
                rv[hash] = `${pathmap}`;
            }
        }

        await req.helpers.file.writer.async.write(confMapDir, JSON.stringify(rv, null, 4));
    }

    return appConfig;
}


exports.mapall = mapall;
exports.create = create;