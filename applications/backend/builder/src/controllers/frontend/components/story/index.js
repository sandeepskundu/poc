const fs = require('fs');
const path = require('path');
const props = require('./props');

const defaultProps = {
    "title": "",
    "component": "Button",
    "parameters":{
        "layout":"centered"
    },
    "tags": ["autodocs"],
    "argTypes": {}
};

const replace = (rv, s, r) => {
    if(rv && s){
        rv = rv.replace(new RegExp(`${s}`, "g"), `${r}`)
    }
    return rv;
}

const title = (rval, dirInfo, appConfig, alias, req) => {
    let rv = [];
    let dir = req.helpers.json.val(appConfig, 'dirs.storybookDir');
    let d = dirInfo.dir.split(alias.raw.destDir+'/');//replace(dirInfo.dir, `${dir}/`, '');
        d = d[1];
        d = replace(d, `-`, ' ');
        d = d.split('/');

        if(dirInfo?.name != 'index'){
            let rn = [];
            let n = dirInfo.name.split('.');

            for(let b in n){
                if(n[b]){
                    rn.push(n[b].charAt(0).toUpperCase() + n[b].slice(1));
                }
            }

            d.push(rn.join(''));
        }

        for(let a in d){
            let item = d[a];

            if(item){
                let spl = item.split(' ');
                if(spl && spl.length > 0){
                    let rn = [];
                    for(let b in spl){
                        if(spl[b]){
                            rn.push(spl[b].charAt(0).toUpperCase() + spl[b].slice(1));
                        }
                    }
                    rv.push(rn.join(''));
                }else{
                    rv.push(item.charAt(0).toUpperCase() + item.slice(1));
                }
            }
        }

    rval.component = `__REACT_COMPONENT_HOLDER__`;
    rval.componentName = `${rv.slice(-1)[0]}`;
    rval.title = rv.join('/');

    return rval;
}

const setPathDesct = (lbl, p) => {
    return `<br /><strong>${lbl}:</strong><code>${p}</code>`
}

const getCompDirPath = (alias, dirInfo) => {
    let rv = '';
    if(alias){
        let lDir = dirInfo.dir;
        let dir = alias.orgDir;
        let pdir = alias.raw.orgDir;
            dir = dir.split(pdir)[0];
            dir = dir.split('/');
            lDir = lDir.split(alias.raw.destDir)[1];
            rv = (dir.slice(-3).join('/')+alias.raw.orgDir+lDir+'/'+dirInfo.name);
    }

    return (`./${rv}`);
}

const importComp = (dirInfo, storyConfig, alias, req) => {
    let f = req.helpers.json.val(dirInfo, 'name');
    //let dir = req.helpers.json.val(dirInfo, 'dir');
    let aliasn = req.helpers.json.val(alias, 'aliasName');
    let c = req.helpers.json.val(storyConfig, 'componentName');
    let dir = dirInfo.dir.split(alias.raw.destDir+'/')[1];

    if(aliasn){
        dir = dir.split(aliasn).pop();
        dir = (`${aliasn}/${dir}`);
    }

    if(f != 'index'){
        dir = (`${dir}/${f}`)
    }

    return `import ${c} from '${dir}';`;
}

const defaultExport = (rval, dirInfo, storyConfig, alias, req) => {
    let arg = req.helpers.json.copy(storyConfig);
        delete arg.componentName;

    if(rval.length > 0){
        rval += `\n\n`;
    }
    
    rval += `export default {\n${req.helpers.json.prepair(``, arg, 0)}\n}`;
        
    return rval;
}

const setComponent = (rval, dirInfo, storyConfig, alias, req) => {
    return replace(rval, `"__REACT_COMPONENT_HOLDER__"`, req.helpers.json.get(storyConfig, 'componentName'));
}

const extendImportPathInDesc = (rval, dirInfo, appConfig, storyConfig, alias, req) => {
    let imprt = importComp(dirInfo, storyConfig, alias, req);
        rval.parameters = rval.parameters || {};
        rval.parameters.docs = rval.parameters.docs || {};
        rval.parameters.docs.description = rval.parameters.docs.description || {};
        rval.parameters.docs.description.component = rval.parameters.docs.description.component || 'Descriptions of the component will display here';
        rval.parameters.docs.description.component += "<br/>";
        rval.parameters.docs.description.component += setPathDesct('Import path', imprt);
        rval.parameters.docs.description.component += setPathDesct('Component directory', getCompDirPath(alias, dirInfo));
        rval.parameters.docs.description.component += "<br/><br/>";

    return rval;
}

const getConfig = (dirInfo, appConfig, storyConfig, alias, req) => {
    let conf = {...defaultProps, ...storyConfig};
        return title(conf, dirInfo, appConfig, alias, req);
}

const writeStoryFile = async (dirInfo, appConfig, storyConfig, alias, req, content) => {
    const dir = dirInfo.dir.split(alias.raw.destDir+'/')[1];
    const category = req.helpers.json.val(alias, 'raw.destDir');
    const storybook = req.helpers.json.val(appConfig, 'dirs.storybookDir');
    await req.helpers.file.writer.async.write(`${storybook}/${category}/${dir}/${dirInfo.name}.stories.jsx`, content);
}

const parse = async (dirInfo, appConfig, storyConfig, alias, req) => {
    let config = await getConfig(dirInfo, appConfig, req.helpers.json.val(storyConfig, 'storybook', {}), alias, req);
        config = await extendImportPathInDesc(config, dirInfo, appConfig, config, alias, req);
    let content = await importComp(dirInfo, config, alias, req);
        content = await defaultExport(content, dirInfo, config, alias, req);
        content = await setComponent(content, dirInfo, config, alias, req);
        return await props.create(content, dirInfo, storyConfig, alias, req);
}

const create = async (dirInfo, data, extra, alias, appConfig, req) => {
    const filsProps = path.parse(dirInfo);
    const basePropsJson = `${filsProps.dir}/index.props.json`;
    const namePropsJson = `${filsProps.dir}/${filsProps.name}.props.json`;
    const baseProps = await req.helpers.file.reader.async.init(basePropsJson, false, 'json');
    const nameProps = await req.helpers.file.reader.async.init(namePropsJson, false, 'json');
    const config = await req.helpers.json.merge(baseProps || {}, nameProps || {});
    const content = await parse(filsProps, appConfig, config, alias, req);

    await writeStoryFile(filsProps, appConfig, config, alias, req, content);
}


exports.create = create;