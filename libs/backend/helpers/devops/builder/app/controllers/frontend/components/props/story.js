const title = async (storybook, filsProps, compConfigs, alias, appConfig, req, res, next) => {
    let rv = [];
    let d = filsProps.dir.split(alias.raw.destPrefix+'/');
        d = req.helpers.string.replace.word(d[1], '-', ' ')
        d = d.split('/');

    if(filsProps?.name != 'index'){
        let rn = [];
        let n = filsProps.name.split('.');
        for(let b in n){
            if(n[b]){
                rn.push(req.helpers.string.transform.camelize(n[b]));
            }
        }
        d.push(rn.join(''));
    };

    for(let a in d){
        let item = d[a];
        if(item){
            let spl = item.split(' ');
            if(spl && spl.length > 0){
                let rn = [];
                for(let b in spl){
                    if(spl[b]){
                        rn.push(req.helpers.string.transform.camelize(spl[b]));
                    }
                }
                rv.push(rn.join(''));
            }else{
                rv.push(req.helpers.string.transform.camelize(item));
            }
        }
    }

    storybook.title = rv.join('/');
    storybook.component = `__REACT_COMPONENT_HOLDER__`;
    storybook.componentName = `${rv.slice(-1)[0]}`;

    return storybook;
}

const setPathDesct = (lbl, p) => {
    return `<br/><strong class="fm-md">${lbl}:</strong><code class="pd-2 bg-c00101 bdr-4 mr-l6 bdr-1 bdr-c00104">${p}</code><br/>`
}

const importCompAlias = (dirInfo, storybook, alias, req) => {
    let f = req.helpers.json.val(dirInfo, 'name');
    let aliasn = req.helpers.json.val(alias, 'aliasName');
    let c = req.helpers.json.val(storybook, 'componentName');
    let dir = dirInfo.dir.split(alias.raw.destPrefix+'/')[1];
    let repTo = req.helpers.json.val(alias, 'raw.storybook.replaceAliasPath.to', '');
    let repFrom = req.helpers.json.val(alias, 'raw.storybook.replaceAliasPath.from', '')

    if(aliasn){
        dir = dir.split(aliasn).pop();
        dir = (`${aliasn}/${dir}`);
    }

    if(f != 'index'){
        dir = (`${dir}/${f}`)
    }

    if(dir && repFrom && repTo){
        dir = req.helpers.string.replace.word(dir, repFrom, repTo);
    }

    return `import ${c} from '${dir}';`;
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

const description = async (storybook, filsProps, compConfigs, alias, appConfig, req, res, next) => {
    let descmap = 'parameters.docs.description.component';
    let desc = req.helpers.json.get(storybook, descmap, 'Descriptions of the component will display here');
        desc += '<br/>';
        desc += setPathDesct('Import path', importCompAlias(filsProps, storybook, alias, req));
        desc += setPathDesct('Component directory', getCompDirPath(alias, filsProps));
        desc += '<br/>'

    return req.helpers.json.set(storybook, descmap, desc, false, true);
}

const getImportBreakup = (storybook, filsProps, alias, req) => {
    let f = req.helpers.json.val(filsProps, 'name');
    let aliasn = req.helpers.json.val(alias, 'aliasName');
    let c = req.helpers.json.val(storybook, 'componentName');
    let dir = filsProps.dir.split(alias.raw.destDir+'/')[1];

    if(aliasn){
        dir = dir.split(aliasn).pop();
        dir = (`${aliasn}/${dir}`);
    }

    if(f != 'index'){
        dir = (`${dir}/${f}`)
    }

    return {
        name:c,
        alias:dir,
        nameHash:`c${req.helpers.crpt.md5(dir)}`
    }
}

const importComp = async (storybook, filsProps, alias, req) => {
    let imb = getImportBreakup(storybook, filsProps, alias, req);
    return `import ${imb.name} from '${imb.alias}';`;
}

const defaultExport = (rval, filsProps, storybook, alias, req) => {
    let arg = req.helpers.json.copy(storybook);
        delete arg.variants;
        delete arg.componentName;

    if(rval.length > 0){
        rval += `\n\n`;
    }
    
    rval += `export default {\n${req.helpers.json.prepair(``, arg, 0)}\n}`;
        
    return rval;
}

const writeStoryFile = async (filsProps, appConfig, storyConfig, alias, req, content) => {
    const dir = filsProps.dir.split(alias.raw.destDir+'/')[1];
    const category = req.helpers.json.val(alias, 'raw.destDir');
    const storybook = req.helpers.json.val(appConfig, 'dirs.storybookDir');
    await req.helpers.file.writer.async.write(`${storybook}/${category}/${dir}/${filsProps.name}.stories.jsx`, content);
}

const variants = async (content, compConfigs, storybook, filsProps, alias, req) => {
    let dprops = req.helpers.json.get(compConfigs, 'props.default', {});
    let defaults = req.helpers.json.get(storybook, 'mockdata.defaults', {});
    let variants = req.helpers.json.get(storybook, 'mockdata.variants', {});
        dprops = {args:req.helpers.json.merge(dprops, defaults)};
        content += `\n\nexport const Base = {\n${req.helpers.json.prepair(``, dprops, 0)}\n}`;

        for(let a in variants){
            if(variants[a]){
                content += `\n\nexport const ${req.helpers.string.transform.camelize(a)} = {\n${req.helpers.json.prepair(``, req.helpers.json.merge(dprops, {args:variants[a] || {}}), 0)}\n}`;
            }
        }
    
    return content;
}

const writeStoryJson = async (compConfigs, storybook, filsProps, alias, appConfig, req) => {
    let comp = getImportBreakup(storybook, filsProps, alias, req);
    let namehash = req.helpers.json.get(comp, 'nameHash', '');
    let dir = req.helpers.json.get(appConfig, 'dirs.storybook.allCompConfigsDir', '');
    let desc = req.helpers.json.get(storybook, 'parameters.docs.description.component', '');
        comp.path = req.helpers.json.get(storybook, 'title', '');
        compConfigs = req.helpers.json.set(compConfigs, 'storybook.details.parameters.docs.description.component', desc);
        compConfigs.component = comp;
        await req.helpers.file.writer.async.write(`${dir}/${namehash}.json`, JSON.stringify(compConfigs, null, 4));
}

const writeStorybookEntryFile = async (compConfigs, storybook, filsProps, alias, appConfig, req) => {
    let comp = getImportBreakup(storybook, filsProps, alias, req);
    let name = req.helpers.json.get(comp, 'name', '');
    let palias = req.helpers.json.get(comp, 'alias', '');
    let chash = req.helpers.json.get(comp, 'nameHash', '');
    let chunkSrc = req.helpers.json.get(appConfig, 'dirs.storybook.componentChunks.src', '');

    if(chunkSrc && chash){
        let jsx = `import ${name} from '${palias}';

const Comp = (() => {
    _siteProps_.comps = _siteProps_.comps || {};
    _siteProps_.comps['${chash}'] = (props) => ${name};
})();
        
export default Comp;`;
    await req.helpers.file.writer.async.write(`${chunkSrc}/${chash}.jsx`, jsx);
}
    
}

const create = async (filsProps, compConfigs, alias, appConfig, req, res, next) => {
    let compConf = JSON.parse(JSON.stringify(compConfigs));
    let storybook = req.helpers.json.get(compConfigs, 'storybook.details', {});
        storybook = await title(storybook, filsProps, compConfigs, alias, appConfig, req, res, next);
        storybook = await description(storybook, filsProps, compConfigs, alias, appConfig, req, res, next);

    let content = await importComp(storybook, filsProps, alias, req);
        content = await defaultExport(content, filsProps, storybook, alias, req);
        content = req.helpers.string.replace.word(content, `"__REACT_COMPONENT_HOLDER__"`, req.helpers.json.get(storybook, 'componentName'));
        content = await variants(content, compConfigs, storybook, filsProps, alias, req)

        //await writeStoryFile(filsProps, appConfig, storybook, alias, req, content);

        await writeStorybookEntryFile(compConf, storybook, filsProps, alias, appConfig, req);
        await writeStoryJson(compConf, storybook, filsProps, alias, appConfig, req);
        
}

exports.create = create;