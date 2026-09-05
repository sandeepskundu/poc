const basePackageJson = {
    "license":"ISC",
    "name":"__APPNAME__",
    "author":"__AUTHOR__",
    "version":"__VERSION__",
    "description": "__APP_DESCRIPTION__",
    "scripts": {
        "start":"node __BUILD_DIR__/__SCRIPTS_DIR__/server.js",
        "start-dev":"nodemon --inspect=__INSPECT_AT__ __BUILD_DIR__/__SCRIPTS_DIR__/server.js"
    },
    "_moduleAliases": {
        "node-modules":(`./node_modules/`),
        "helpers": "./__BUILD_DIR__/__SCRIPTS_DIR__/helpers"
    },
    "devDependencies": {
        "cookie-parser": "^1.4.6",
        "deepmerge": "^4.3.1",
        "nodemon": "^3.0.1",
        "path": "^0.12.7",
        "buffer": "^6.0.3",
    },
    "dependencies": {
        "axios": "^1.4.0",
        "cors": "^2.8.5",
        "crypto-js": "^4.1.1",
        "deepmerge": "^4.3.1",
        "dotenv": "^16.3.1",
        "es6-promise": "4.2.8",
        "express": "^4.18.2",
        "express-xss-sanitizer": "^1.1.6",
        "jsonwebtoken": "^9.0.2",
        "module-alias": "^2.2.3",
        "process": "^0.11.10", 
        "request": "^2.88.2",
        "stream-http": "^3.2.0",
        "try-require": "^1.2.1",
        "universal-cookie": "^4.0.4",
        "url": "^0.11.1",
        "xml2js": "^0.6.2",
        "fs-extra": "^11.2.0",
        "mongoose": "^8.7.1",
        "multer": "^2.0.1",
        "image-size": "^2.0.2",
        "swagger-ui-express": "^5.0.0",
        "json-schema-compare": "^0.2.2",
    }
}

const inspectAt = (appConfig, req) => {
    let port = req.helpers.json.val(appConfig, 'appConfig.ports.public');
    let insp = req.helpers.json.val(appConfig, 'appConfig.inspectAt', 21);
        port = `${port}`.substr(0, 2);
        insp = `${port}${insp}`;

    return parseInt(insp);
}

const replace = (rval, appConfig, map, req) => {
    for(const a in map){
        rval = rval.replace(new RegExp(a, 'g'), map[a]);
    }

    return rval;
}

const update = async (packageJson, appConfig, req) => {
    let rval = JSON.stringify(packageJson);
        rval = replace(rval, appConfig, {
            __AUTHOR__:req.helpers.json.val(appConfig, 'appInfo.author'),
            __VERSION__:req.helpers.json.val(appConfig, 'appInfo.version'),
            __APPNAME__:req.helpers.json.val(appConfig, 'appConfig.pathPrefix'),
            __APP_DESCRIPTION__:req.helpers.json.val(appConfig, 'appInfo.description'),
            __BUILD_DIR__:req.helpers.json.val(appConfig, 'appConfig.buildDir', 'build'),
            __SCRIPTS_DIR__:req.helpers.json.val(appConfig, 'appConfig.scriptDir', 'scripts'),
            
        }, req);

        rval = replace(rval, appConfig, {
            __INSPECT_AT__:inspectAt(appConfig, req),
        }, req)


    return JSON.parse(rval);
}

const writeNodemon = async (appConfig, req, res, next) => {
    const json = {
        "watch": [
            "./../../../"
        ],
        "ignore": [
            
        ],
        "delay": "3"
    }
    const url = req.helpers.json.val(appConfig, 'dirs.app');
    //await req.helpers.file.writer.async.write(`${url}/nodemon.json`, JSON.stringify(json, null, 4))
}

const write = async (pJson, appConfig, req, res, next) => {
    const url = req.helpers.json.val(appConfig, 'dirs.app');;
    await req.helpers.file.writer.async.write(`${url}/package.json`, JSON.stringify(pJson, null, 4))
}

const build = async (appConfig, req, res, next) => {
    let pJson = req.helpers.json.val(appConfig, 'packageJson', {});
        pJson = req.helpers.json.merge(basePackageJson, pJson);
        pJson = await update(pJson, appConfig, req);
        await write(pJson, appConfig, req, res, next);
        await writeNodemon(appConfig, req, res, next);
        delete appConfig.packageJson;

    return appConfig;
}

exports.build = build;
exports.basePackageJson = basePackageJson;