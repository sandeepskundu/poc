const path = require('path');
const uiHelpers = require('helpers');

const getBuildDir = (config) => {
    const bDir = uiHelpers.json.val(config, 'buildDir', 'build')
    return path.resolve(`./${bDir}`);
}

const getModelDir = (config) => {
    const bDir = getBuildDir(config);
    return path.resolve(`${bDir}/models`);
}

const getColumnsMapDir = (config) => {
    const bDir = getBuildDir(config);
    return path.resolve(`${bDir}/columns-map`);
}

const getModelQueryDir = (config) => {
    const bDir = getBuildDir(config);
    return path.resolve(`${bDir}/model-queries`);
}

exports.getBuildDir = getBuildDir;
exports.getModelDir = getModelDir;
exports.getColumnsMapDir = getColumnsMapDir;
exports.getModelQueryDir = getModelQueryDir;