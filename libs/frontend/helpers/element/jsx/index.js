const css = require('./css');
const props = require('./props');
const builder = require('./builder');
const json = require('./../../json');
const template = require('./template');
const string = require('./../../string');
const random = require('./../../random');
const dtype = require('./../../data/type');

const dataAttrs = (props) => {
    let rval = {};
    let id = random.id(10);
    let attrs = json.get(props, 'dataAttrs', {});

    for(const a in attrs){
        if(json.get(attrs, a, id) != id){
            if(a.indexOf('data-') > -1){
                rval[a] = attrs[a];
            }else{
                rval[`data-${a}`] = attrs[a];
            }
        }
    }

    return rval;
}

const className = (props, cssClass) => {
    const rv = [];
    
    if(props && props.ds){
        const cls = css.get(props.ds);

        if(cls){
            rv.push(cls);
        }
    }

    if(cssClass){
        rv.push(cssClass);
    }

    return string.remove.dupCls(rv.join(' '));
}

const getClass = (props, cssClass) => {
    let cls = className(props, cssClass);

    if(cls){
        return {
            className:cls
        }
    }else{
        return {}
    }
}

const predefinedTheme = (props, cssClass) => {
    let rval = [];
    let prefix = {
        size:'sz',
        theme:'th',
        radius:'bdr',
        shadow:'shdw',
        color:'txt',
        border:'bdr',
        pairing:'cp',
        background:'bg',
        hcolor:'htxt',
        hborder:'hbdr',
        hpairing:'hcp',
        hbackground:'hbg',

        acolor:'atxt',
        bcolor:'btxt',
        aborder:'abdr',
        bborder:'bbdr',
        abackground:'abg',
        bbackground:'bbg',
        hacolor:'hatxt',
        hbcolor:'hbtxt',
        haborder:'habdr',
        hbborder:'hbbdr',
        habackground:'habg',
        hbbackground:'habg',
        
        font__d__size:'txt',
        font__d__family:'fm',
        font__d__heading:'dis',
        image__d__thumbnail:'thum',

        
        width:'w',
        height:'h',
        minWidth:'mw',
        minHeight:'mh',
    };

    let map = {
        'className':true
    }
    let pd = json.get(props, 'ds.predefined', {});

    if(cssClass){
        rval.push(cssClass);
    }

    for(let a in pd){
        if(pd[a]){
            if(prefix[a]){
                rval.push(`${prefix[a]}-${pd[a]}`);
            }else{
                if(map[a]){
                    rval.push(pd[a]);
                }
            }
        }
    }

    return string.remove.dupCls(rval.join(' '));
}

const attrs = (props, cssClass, type) => {
    const dAttrs = dataAttrs(props);
    const attrs = json.get(props, 'attrs', {}); 
    const cls = predefinedTheme(props, cssClass);
    const rval = json.merge({...attrs, ...dAttrs}, css.tooltip.get(props));

    if(type === 'attrs'){
        return rval;
    }

    if(type === 'class'){
        return getClass(props, cls);
    }

    return {...rval, ...getClass(props, cls)};
}

const getChild = (dsProps, createElement, child, props) => {
    if(child){
        return child;
    }else{
        let prp = {ds:dsProps, parent:props};
        let Content = json.get(dsProps, 'content', '');
        let fun = dtype.isFunction(Content);
        if(fun){
            return Content(prp)
        }else{
            let isJsx = dtype.isJsx(Content);
            if(isJsx){
                return React.createElement(React.Fragment, null, React.cloneElement(Content, prp));
            }else{
                return `${Content}`;
            }
        }
    }
}

const ds = (dsProps, createElement, child, cssClass, props) => {
    if(createElement){
        let cls = [];
        let mcls = json.val(dsProps, 'markup.class');

        if(cssClass){
            cls.push(cssClass);
        }

        if(mcls){
            cls.push(mcls);
        }

        return createElement(json.val(dsProps, 'markup.element', 'div'), attrs(dsProps, cls.join(' ')), getChild(dsProps, createElement, child, props));
    }else{
        return attrs(dsProps);
    }
}

/*-- 
    This method validates the components (passed this as compname) has pre-defined css theme or not. 
    If it has defined theme in css then make theme as blank and else return as false. 
---*/

const getCompThemeDs = (props, compname) => {
    return css.themeByComponent(props, compname);
}

exports.ds = ds;
exports.css = css;
exports.props = props;
exports.attrs = attrs;
exports.builder = builder;
exports.content = getChild;
exports.template = template;
exports.getChild = getChild;
exports.className = className;
exports.getCompThemeDs = getCompThemeDs;