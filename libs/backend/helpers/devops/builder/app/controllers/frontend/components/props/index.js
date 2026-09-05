const fs = require("fs");
const path = require('path');
const story = require('./story');
const helpers = require('helpers');
const enums = require('./../enums');
const propTypes = require('./types');

const replace = (rv, s, r) => {
    if(rv && s){
        rv = rv.replace(new RegExp(`${s}`, "g"), `${r}`)
    }
    return rv;
}

const defaultProps = (doc, arg, com, res, appConfig, alias, req, resp, next) => {
    //let props = req.helpers.json.get(res, 'props.default', {});
    //let p = req.helpers.json.prepair(`\n`, props, 0);
        //doc = replace(doc, 'Comp.__DEFAULT__PROP__', `Comp.defaultProps = {${p}\n}`);
       // doc = replace(doc, 'Comp.__DEFAULT__PROP__', `Comp.defaultProps = {}`);

    return doc;
}

const cleanup = (doc, req, resp, next) => {
    doc = doc.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "");
    return doc.replace(/\n\s*\n+/g, "\n\n");
}

const compile = (arg, com, res, appConfig, alias, req, resp, next) => {
    let cc = ``+com;
    //let cc = `import propTypes from 'prop-types';\n`+com;
    let props = req.helpers.json.get(res, 'props.default', {});
    let propsl = req.helpers.json.length(props);

    let p = req.helpers.json.prepair(`\n`, props, 1);
        cc = defaultProps(cc, arg, com, res, appConfig, alias, req, resp, next);
        cc = replace(cc, '__DEFAULT__PROP__VALUES__', `{${p}\n\t}`);
        cc = cleanup(cc, req, resp, next);
        cc = propTypes.build(cc, arg, res, appConfig, alias, req, resp, next);
    
        fs.writeFile([arg.dir, arg.base].join('/'), cc, (err) => {})
}

const props = async (arg, data, alias, appConfig, req, res, next) => {
    let dir = req.helpers.json.get(arg, 'dir', '');
    let name = req.helpers.json.get(arg, 'name', '');
    let prefix = req.helpers.json.get(alias, 'raw.destPrefix', '');

    if(dir && prefix){
        dir = dir.split(`${prefix}/`);
        if(dir[1]){
            const resp = await req.helpers.s2s.internal.init({
                name:'1',
                request:{
                    method:'post',
                    data:{
                        data:{
                            detailed:false,
                            map:`${dir[1]}/${name}`
                        }
                    },
                    url:'http://localhost:5000/props-engine/props/details/v1/byMap/fetch'
                }
            }, req, res, next);

            compile(arg, data, req.helpers.json.get(resp, 'resp.data.data', {}), appConfig, alias, req, res, next);
            story.create(arg, req.helpers.json.get(resp, 'resp.data.data', {}), alias, appConfig, req, res, next);
        }
    }
}

const create = async (arg, data, extra, alias, appConfig, req, res, next) => {
    const filsProps = path.parse(arg);
    if(filsProps && filsProps.ext === '.jsx'){
        await props(filsProps, data, alias, appConfig, req, res, next);
    }
}

exports.create = create;