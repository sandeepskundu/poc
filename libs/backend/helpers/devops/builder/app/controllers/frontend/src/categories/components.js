const getCateDirPath = async (appConfig, req, name) => {
    return `${await req.helpers.json.val(appConfig, 'dirs.categoryDir')}/${name}`;   
}

const getCateCompDirPath = async (appConfig, req, name) => {
    return `${await getCateDirPath(appConfig, req, name)}/components`
}

const getCateViewsDirPath = async (appConfig, req, name) => {
    return `${await getCateDirPath(appConfig, req, name)}/views`;
}

const getComponentsViewsDirsPathByCategoryAndName = async (appConfig, req, name, viewName) => {
    let url = await getCateCompDirPath(appConfig, req, name);
    return `${url}/${viewName}`;
}

const getComponentsDirsInViewsByCategoryAndViewName = async (appConfig, req, cate, viewName, name) => {
    let url = await getComponentsViewsDirsPathByCategoryAndName(appConfig, req, cate, viewName);
    return `${url}/${name}`;
}

const createCategoryDir = async (appConfig, req, name) => {
    const url = await getCateDirPath(appConfig, req, name);
    await req.helpers.file.writer.async.dir(url);
    return appConfig;
}

const createCateCompDirPath = async (appConfig, req, name) => {
    const url = await getCateCompDirPath(appConfig, req, name);
    await req.helpers.file.writer.async.dir(url);
    return appConfig;
}

const createCateViewsDirPath = async (appConfig, req, name) => {
    const url = await getCateViewsDirPath(appConfig, req, name);
    await req.helpers.file.writer.async.dir(url);
    return appConfig;
}

const createViewsDirByCategoryName = async (appConfig, req, name) => {
    let url = await getCateViewsDirPath(appConfig, req, name);
    let views = req.helpers.json.val(appConfig, 'appConfig.viewTypes');

    for(const a in views){
        await req.helpers.file.writer.async.dir(`${url}/${views[a]}`);
    }

    return appConfig;
}

const createComponentsDirsInViewsByCategoryAndViewName = async (appConfig, req, name, viewName) => {
    let comps = req.helpers.json.val(appConfig, 'appConfig.componentType');

    for(const a in comps){
        let url = await getComponentsDirsInViewsByCategoryAndViewName(appConfig, req, name, viewName, comps[a]);
            await req.helpers.file.writer.async.dir(url);
    }

    return appConfig;
}


const createComponentsViewsDirsByCategory = async (appConfig, req, name) => {
    let views = req.helpers.json.val(appConfig, 'appConfig.viewTypes');
        views = ['common'].concat(views);

    for(const a in views){
        let view = views[a];
        let url = await getComponentsViewsDirsPathByCategoryAndName(appConfig, req, name, view);
            await req.helpers.file.writer.async.dir(url);
            appConfig = await createComponentsDirsInViewsByCategoryAndViewName(appConfig, req, name, view)
    }      
    
    return appConfig;
}


const createCategory = async (appConfig, req, name) => {
    appConfig = await createCategoryDir(appConfig, req, name);
    appConfig = await createCateCompDirPath(appConfig, req, name);
    appConfig = await createCateViewsDirPath(appConfig, req, name);
    appConfig = await createViewsDirByCategoryName(appConfig, req, name);
    appConfig = await createComponentsViewsDirsByCategory(appConfig, req, name);
    return appConfig;
}

const createCategoryByName = async (appConfig, req, res, next) => {
    //createCategory

    //appConfig = await createCategory(appConfig, req, req.helpers.json.val(appConfig, 'appConfig.defaultCategory'));

    return appConfig;
}
 
const create = async (appConfig, req, res, next) => {
    appConfig = await createCategory(appConfig, req, req.helpers.json.val(appConfig, 'appConfig.defaultCategory'));

    return appConfig;
}

exports.create = create;
exports.createCategoryByName = createCategoryByName;
