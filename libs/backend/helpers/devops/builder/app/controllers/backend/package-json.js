const basePackageJson = {
    "_moduleAliases": {
        "aio-be-libs":"./../../../libs/backend/",
    },
    "devDependencies":{
        "portfinder": "^1.0.32",
    },
    "dependencies":{
        "svgtofont": "^6.5.1",
        "mongoose-paginate-v2": "^1.8.5"
    }
}

const build = async (appConfig, req, res, next) => {
    let pJson = req.helpers.json.val(appConfig, 'packageJson', {});
        pJson = req.helpers.json.merge({}, basePackageJson);
        appConfig.packageJson = req.helpers.json.merge(pJson, pJson);
    return await req.helpers.devops.builder.app.controllers.common.packageJson.build(appConfig, req, res, next);
}

exports.build = build;
exports.basePackageJson = basePackageJson;