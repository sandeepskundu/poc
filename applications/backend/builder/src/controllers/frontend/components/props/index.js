const fs = require("fs");
const path = require('path');
const helpers = require('helpers');

const replace = (rv, s, r) => {
    if(rv && s){
        rv = rv.replace(new RegExp(`${s}`, "g"), `${r}`)
    }
    return rv;
}

const unique = () => {
    return (`U${helpers.random.id(10, true)}`);
}

const getPropSetName = (type) => {
    let map = {
        __PROP__TYPES__:['p', 'r', 'o', 'p', 'T', 'y', 'p', 'e', 's'].join(''),
        __DEFAULT__PROP__:['d', 'e', 'f', 'a', 'u', 'l', 't', 'P', 'r', 'o', 'p', 's'].join('')
    }

    if(type && map[type]){
        return map[type]
    }else{
        return unique()
    }
}

const compileSotry = (data, config) => {
    //if(config?.sotrybook){
        data = replace(data, 'node-modules/react', "react");
        data = replace(data, 'node-modules/prop-types', "prop-types");    
    // }

    return data;
}

const propComment = (rv, arg, name) => {
    let comment = name;

    if(arg?.description){
        comment = arg.description;
    }

    rv += `\n\t/**`;
    rv += `\n\t* ${comment}`;
    rv += `\n\t**/`;

    return rv;
}

const setProps = (arg, name) => {
    let rv = [getPropSetName('__PROP__TYPES__')];
    if(arg?.type){
        switch(arg.type) {
            case 'oneOf':
                if(arg.value){
                    rv.push(`oneOf([${arg.value}])`);
                }else{
                    rv.push(`oneOf([])`);
                }
            break;
            case 'func':
                rv.push(arg.type);
            break;
            case 'bool':
                rv.push(arg.type);
            break;
            default:  
                rv.push(arg.type);
        }
    }

    if(arg.isRequired){
        rv.push('isRequired')
    }

    if(rv.length > 1){
        return `${rv.join('.')}`
    }

    return '""';
}

const getProp = (name, arg) => {
    let rv = propComment('', arg, name);
        rv += `\n    ${name}:${setProps(arg, name)}`;

    return rv;
}

const getValueByType = (val, fb) => {
    let rv = `""`;
    let value = val;

    if(typeof val === 'undefined'){
        value = fb;
    }

    const type = helpers.data.type.get(value);

    if(type){
        switch(type) {
            case 'boolean':
                rv = value;
            break;
            case 'number':
                rv = value;
            break;
            case 'string':
                rv = `"${value || ""}"`
            break;
            case 'object':
                rv = (`{\n${helpers.json.prepair(``, value || {}, 1)}\n${helpers.json.tab(1)}}`); //JSON.stringify(`${value || {}}`)
            break;
            case 'function':
            break;
            default:  
                rv = `"${value || ""}"`
        }
    }

    return rv;
}

const setDefaultProps = (arg, name) => {
    let rv = '""';

    if(arg?.type){
        switch(arg.type) {
            case 'dsObject':
                rv = getValueByType(arg.defaultValue);
            break;
            case 'oneOf':
                rv = getValueByType(arg.defaultValue);
            break;
            case 'func':
                rv = `undefined`
            break;
            case 'bool':
                rv = getValueByType(arg.defaultValue, true);
            break;
            default:  
                rv = getValueByType(arg.defaultValue);
        }
    }

    return rv;
}

const getDefaultProp = (rval, name, arg) => {
    if(arg?.isRequired){
        return rval;
    }else{
        rval.push(`\n\t${name}:${setDefaultProps(arg, name)}`);
    }

    return rval;
}

const propTypes = (rv, v, type) => {
    v = `${getPropSetName(type)} = ${v}`
    rv = replace(rv, type, v);
    return rv;
}

const getCompDirPath = (alias, loc, isAlias) => {
    let rv = '';
    if(alias){
        let lDir = loc.dir;
        let dir = alias.orgDir;
        let pdir = alias.raw.orgDir;
            dir = dir.split(pdir)[0];
            dir = dir.split('/');
            console.log(alias.raw);
            console.log(lDir);
            lDir = lDir.split(alias.raw.destDir)[1];

        
        if(isAlias){
            rv = `import ComponentName from ${alias.aliasName}${lDir}/${loc.name}`
        }else{
            rv = (dir.slice(-3).join('/')+pdir+lDir+'/'+loc.name);
        }      
    }

    if(isAlias){
        return rv;
    }else{
        return (`./${rv}`);
    }
}

const setImportAndDirPathProps = (alias, arg) => {
    return {};
    return {
        "importPath":{
            "description":"Button should be toggle or simple button",
            "type":"string",
            "defaultValue":getCompDirPath(alias, arg, true),
            "isRequired":false
        }, 
        "componentDirectory":{
            "description":"Button should be toggle or simple button",
            "type":"string",
            "defaultValue":getCompDirPath(alias, arg),
            "isRequired":false
        },
    }
}

const attrs = (alias, arg) => {
    return `data-import-path="${getCompDirPath(alias, arg, true)}" data-dir-path="${getCompDirPath(alias, arg)}"`
}

const mergeDefaultProps = (name, props) => {
    if(name && name.startsWith('__')){
        return false;
    }else{
        return helpers.json.merge(helpers.json.val(props, `__${name}`, {}), helpers.json.val(props, name, {}))
    }
}

const compile = (arg, com, res, appConfig, alias) => {
    let rv = '{';
    let dp = '{';
    let cc = `__IMPORT__PROP__TYPES__ from 'prop-types';\n`+com

    if(res?.props){
        let pl = [];
        let dpl = [];

        let impAcd = setImportAndDirPathProps(alias, arg);
            res.props = {...res.props, ...impAcd}

        for(const a in res.props){
            let iprops = mergeDefaultProps(a, res.props);
            if(iprops){
                pl.push(getProp(a, iprops));
                dpl = getDefaultProp(dpl, a, iprops)
            }
        };

        rv += (pl.join(',\n'));
        dp += (dpl.join(','))
    }

    rv += "\n}";
    dp += "\n}";

    cc = replace(cc, getPropSetName('__PROP__TYPES__'), getPropSetName());
    cc = replace(cc, getPropSetName('__DEFAULT__PROP__'), getPropSetName());
    cc = replace(cc, '__IMPORT__PROP__TYPES__', 'import propTypes');
    //cc = replace(cc, '__COMP__ATTRS__', attrs(alias, arg))

    cc = propTypes(cc, rv, '__PROP__TYPES__');
    cc = replace(cc, '__DEFAULT__PROP__VALUES__', dp);
    cc = propTypes(cc, dp, '__DEFAULT__PROP__');
    



    //
    
    fs.writeFile([arg.dir, arg.base].join('/'), compileSotry(cc, appConfig), (err) => {})
}

const props = (arg, data, alias, appConfig, req) => {
    fs.readFile([arg.dir, `index.props.json`].join('/'), 'utf8', (perr, pres) => {
        fs.readFile([arg.dir, `${arg.name}.props.json`].join('/'), 'utf8', (err, res) => {
            let resp = (perr?{}:JSON.parse(pres));
            let cres = (err?{}:JSON.parse(res));
            compile(arg, data, {...resp, ...cres}, appConfig, alias)
        });
    });
}

const create = async (arg, data, extra, alias, appConfig, req) => {
    const filsProps = path.parse(arg);
    if(filsProps && filsProps.ext === '.jsx'){
        props(filsProps, data, alias, appConfig, req);
    }
}

exports.create = create;