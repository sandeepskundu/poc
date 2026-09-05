const colList = require('./list');
const types = require('./types');
const chelpers = require('./helper');
const schemaJson = require('./schema-json');
const tryRequire = process.nodeModules('try-require');
//const { minify } = process.nodeModules("terser");
    
const doRequire = (url, noRequire) => {
    if(noRequire){
        return url;
    }else{
        return tryRequire(url);
    }
}

const nested = async (rval, config, name, schemaData, appConfig, req, res, next) => {
    let childs = req.helpers.json.copy(config);
        childs.schema = req.helpers.json.val(config, 'childs', {});

    let rv = await compile(config, appConfig, req, res, next);
    let crv = await compile(childs, appConfig, req, res, next);
    let nodes = await req.helpers.json.val(rv, 'nodes', {});
    let cnodes = await req.helpers.json.val(crv, 'nodes', {});
        rval = chelpers.setNode(rval, {...nodes, ...cnodes}, name, config, req, res, next);

    return rval;
}

const compile = async (data, config, req, res, next) => {
    let rval = {
        nodes:{},
        childs:[],
    };
    let schema = req.helpers.json.val(data, 'schema', {});

    for(const a in schema){
        let item = schema[a];
        let type = req.helpers.json.val(item, 'type');

        switch (type) {
            case 'nested':
                rval = await nested(rval, item, a, data, config, req, res, next)
            break;
            case 'mix-nested':
                rval = await nested(rval, item, a, data, config, req, res, next)
            break;
            default:
                let actn = await req.helpers.json.val(types, `${type}.start`);
                if(actn){
                    rval = await actn(rval, item, a, data, config, req, res, next);
                }
        }
        
    }
    
    return rval;
}

const write = async (arg, modelConfig, appConfig, req, res, next) => {
    let rv = req.helpers.json.prepairApiSchema(``, arg, 0);
    let name = req.helpers.json.val(modelConfig, 'collection.name', '');
    let appDir = req.helpers.json.val(appConfig, 'dirs.app');
    let sp = req.helpers.json.val(appConfig, 'appConfig.paths.schema');
    let colSchema = await schemaJson.start(arg, appConfig, req, res, next);

    let content = `
const name = ['m', 'o', 'n', 'g', 'o', 'o', 's', 'e'].join('');
const mdb = process.nodeModules(name);
const helpers = process.aioBeLibs('helpers');
const mdbh = process.aioBeLibs('helpers/_private/mongodb');

const schema = {
${rv}
};

module.exports = {
    model:\`${name}\`,
    schema:schema
}`


    /*--
        var result = await minify(content, {
            compress: {
                dead_code: true,
                global_defs: {
                    DEBUG: false
                }
            }
        });

        await req.helpers.file.writer.async.write(`${appDir}/${sp}/${name}/index.js`, result.code);
    --*/

    await req.helpers.file.writer.async.write(`${appDir}/${sp}/${name}/index.js`, content);
    await req.helpers.file.writer.async.write(`${appDir}/${sp}/${name}/schema.json`, JSON.stringify(colSchema, null, 4));
}

const createRoot = async (list, appConfig, req, res, next) => {
    let content = ``;
    let appDir = req.helpers.json.val(appConfig, 'dirs.app');
    let sp = req.helpers.json.val(appConfig, 'appConfig.paths.schema');
        sp = `${appDir}/${sp}/index.js`;

    for(const a in list){
        if(list[a]){
            content = `${content}exports.${a} = require('./${a}');\n`
        }
    }

    await req.helpers.file.writer.async.write(sp, content);
}

const compiler = async (rval, schema, config, req, res, next) => {
    let compile = req.helpers.json.val(schema, 'compiler');
    let isfun = req.helpers.data.type.is(compile, 'function');
    let schemas = await doRequire(`${config.dirs.beLib}/helpers/_private/schemas`);

    if(isfun){
        let rv = await compile(schemas, config, req, res, next);
        let li = req.helpers.data.type.is(rv, 'array');

        if(li){
            rval = rval.concat(rv);
        }
    }

    return rval;
}

const getSchema = async (config, req, res, next) => {
    let schema = await doRequire(`${config.dirs.srcDir}/configs/schema`);
        schema = schema || {};
    let sList = schema.list || [];
    let list = await colList.start(config, req, res, next);
        sList = sList.concat(list);

    return compiler(sList, schema, config, req, res, next);
}

const start = async (config, req, res, next) => {
    let modules = {};
    let schemas = {};
    let sl = await getSchema(config, req, res, next);

    if(sl && sl.length > 0){
        for(const a in sl){
            let item = sl[a];
            let name = req.helpers.json.val(item, 'collection.name', '');
                modules[name] = true;
                schemas[name] = await compile(sl[a], config, req, res, next);
                schemas[name].collection = req.helpers.json.val(item, 'collection');
        }
    };

    for(const b in schemas){
        let item = req.helpers.json.val(schemas[b], 'nodes', {});
            await write(item, schemas[b], config, req, res, next);
    }

    await createRoot(modules, config, req, res, next);

    return config;
}

exports.start = start;