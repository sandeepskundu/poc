const description = (rv, arg, name, tab, req, res, next) => {
    let tabs = req.helpers.json.tab(tab);
    let desc = req.helpers.json.get(arg, 'desc', name)
        rv += `\n${tabs}/**`;
        rv += `\n${tabs}* ${desc || name}`;
        rv += `\n${tabs}**/\n`;

    return rv;
}

const oneOf = (rval, enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next) => {
    let val = '';
    let from = req.helpers.json.get(props, '___.oneOf.from', '');
    let opts = req.helpers.json.get(props, '___.oneOf.options', '');
    let mapping = req.helpers.json.get(props, '___.oneOf.mapping', '');

    if(from && mapping){
        opts = req.helpers.json.get(enums, `${from}.${mapping}`, opts);
    }

    if(opts){
        val = JSON.stringify(opts.split('|'));
    }else{
        val = '[]';
    }

    rval.push(`${type}(${val || '[]'})`);

    return rval;
}

const shape = (rval, enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next) => {
    let tabs = req.helpers.json.tab(tab);
    let val  = parse(``, tab, enums, req.helpers.json.get(props, '___.shape', {}), doc, dirInfo, res, appConfig, alias, req, resp, next);
        rval.push(`${type}({${val}\n${tabs}})`);

    return rval;
}

const getvalue = (enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next) => {
    let rv = ['propTypes'];
    let required = req.helpers.json.get(props, 'required', false);

    switch (type) {
        case 'oneOf':
            rv = oneOf(rv, enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'shape':
            rv = shape(rv, enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next)
        break;
        default:
            rv.push(type);
    }

    if(required){
        rv.push('isRequired');
    }

    return rv.join('.');
}

const compile = (rval, enums, props, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next) => {
    let val = '';
    let tabs = req.helpers.json.tab(tab);
    let type = req.helpers.json.get(props, 'type');

    switch (type) {
        case 'any':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'string':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'number':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'bool':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'object':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'func':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'oneOf':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'jsx':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        case 'shape':
            val = getvalue(enums, props, type, name, tab, doc, dirInfo, res, appConfig, alias, req, resp, next);
        break;
        default:
    };

    if(val){
        rval += `${tabs}${name}:${val},`;
    }

    return rval;
}

const parse = (rval, tab, enums, props, doc, dirInfo, res, appConfig, alias, req, resp, next) => {
    let tb = tab+1;

    for(let a in props){
        rval = description(rval, props[a], a, tb, req, resp, next);
        rval = compile(rval, enums, props[a], a, tb, doc, dirInfo, res, appConfig, alias, req, resp, next);
    }

    return rval.replace(/,$/, "");
}

const replace = (rv, s, r) => {
    if(rv && s){
        rv = rv.replace(new RegExp(`${s}`, "g"), `${r}`)
    }
    return rv;
}

const build = (doc, dirInfo, res, appConfig, alias, req, resp, next) => {
   // let propTypes = '';
   // let ptypes = req.helpers.json.get(res, 'storybook.propTypes.data', {});
   // let enums = req.helpers.json.get(res, 'storybook.propTypes.enums', {});
    //let len = req.helpers.json.length(ptypes || {});

    //if(len > 0){
       // propTypes = parse(``, 0, enums, ptypes, doc, dirInfo, res, appConfig, alias, req, resp, next);
   // }

    //return doc.replace(new RegExp(`__PROP__TYPES__`, "g"), `propTypes = {${propTypes}\n}`);
    //return doc.replace(new RegExp(`__PROP__TYPES__`, "g"), `propTypes = {}`);

    return doc;
}

exports.build = build;