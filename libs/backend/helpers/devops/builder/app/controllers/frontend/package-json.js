const basePackageJson = {
    "scripts": {
        "compress": "webpack --config scrap/webpack/app.js",
        "uncompress": "webpack --config scrap/webpack/app-uc.js",
        "compress-cdn": "webpack --config scrap/webpack/cdn.js",
        "uncompress-cdn": "webpack --config scrap/webpack/cdn-uc.js",
        "compress-story": "webpack --config scrap/webpack/storybook.js",
        "uncompress-story": "webpack --config scrap/webpack/storybook-uc.js",
        "build": "npm-run-all --parallel cdn storybook app",
        "app": "npm-run-all --parallel compress uncompress",
        "cdn": "npm-run-all --parallel uncompress-cdn compress-cdn",
        "storybook":"npm-run-all --parallel uncompress-story compress-story",
        "dev": "npm-run-all --parallel uncompress uncompress-cdn uncompress-story"
    },
    "_moduleAliases": {
        "helpers":"./build/scripts/helpers",
        "ui-helpers":"./build/scripts/ui-helpers",
    },
    "devDependencies":{
        "compression": "^1.7.4",
        "@babel/core": "^7.23.3",
        "@babel/plugin-proposal-class-properties": "^7.18.6",
        "@babel/preset-env": "^7.23.3",
        "@babel/preset-react": "^7.23.3",
        "babel-jest": "^29.6.4",
        "babel-loader": "^9.1.3",
        "compression-webpack-plugin": "^10.0.0",
        "copy-webpack-plugin": "^11.0.0",
        "css-loader": "^6.8.1",
        "extract-text-webpack-plugin": "^3.0.2",
        "file-loader": "^6.2.0",
        "html-minimizer-webpack-plugin": "^5.0.0",
        "html-replace-webpack-plugin": "^2.6.0",
        "html-webpack-plugin": "^5.5.3",
        "mini-css-extract-plugin": "2.7.6",
        "sass": "^1.63.6",
        "ajv": "^7.2.4",
        "sass-loader": "^13.3.2",
        "stream-browserify": "^3.0.0",
        "style-loader": "^3.3.3",
        "terser-webpack-plugin": "^5.3.10",
        "url-loader": "^4.1.1",
        "webpack": "^5.88.1",
        "webpack-babel-jest": "^1.0.4",
        "webpack-cli": "^5.1.4",
        "webpack-dev-server": "^4.15.1",
        "crypto-browserify": "^3.12.0",
        "sass-resources-loader": "^2.2.5",
        "mini-css-extract-plugin": "^2.9.0",
        "react-aria-components": "^1.17.0",
        "prism-react-renderer": "^2.4.1",
        "react-json-view": "^1.21.3",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        //"react-router-dom": "^4.3.1",
        "react-router-dom": "^5.3.4"
    },
    "dependencies":{
        "https-browserify": "^1.0.0",
        "npm-run-all": "^4.1.5",
        "history": "^5.3.0",
        "stream-browserify": "^3.0.0",
    }
}

const storybookPackage = {
    "scripts": {
        //"storybook": "NODE_OPTIONS=--max-old-space-size=8192 storybook dev -p 6006",
        //"build-storybook": "NODE_OPTIONS=--max-old-space-size=8192 storybook build"
    },
    devDependencies:{}
}

const build = async (appConfig, req, res, next) => {
    let pJson = req.helpers.json.val(appConfig, 'packageJson', {});
        pJson = req.helpers.json.merge(storybookPackage, basePackageJson);
        appConfig.packageJson = req.helpers.json.merge(pJson, pJson);
    return await req.helpers.devops.builder.app.controllers.common.packageJson.build(appConfig, req, res, next);
}

exports.build = build;
exports.basePackageJson = basePackageJson;