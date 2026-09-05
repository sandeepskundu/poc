const utils = require('./utils');

const base = {
    title:"",
    argTypes:{},
    component:'',
    tags:['autodocs'],
    parameters:{
        layout:"centered",
        docs:{
            description:{
                component:""
            }
        }
    }
}

const compile = async (storybook, type, config, req, res, next) => {
    return req.helpers.json.merge(base, storybook);
}

const getPropsByTypeAndMap = async (map, type, overwirte, config, req, res, next) => {
    return await compile(await utils.getConfigByTypeAndMap(map, type, overwirte, config, req, res, next), type, config, req, res, next);
}

exports.getByMap = async (map, config, req, res, next) => {
    return await getPropsByTypeAndMap(map, 'storybook', {}, req.helpers.json.merge({}, config || {}), req, res, next);
}