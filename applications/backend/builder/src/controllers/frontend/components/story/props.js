const helpers = require('helpers');

const mergeDefaultProps = (name, props) => {
    if(name && name.startsWith('__')){
        return false;
    }else{
        return helpers.json.merge(helpers.json.val(props, `__${name}`, {}), helpers.json.val(props, name, {}))
    }
}

const mergedGloballyProps = (rval) => {
    rval.args = rval.args || {};
    rval.args.attrs = rval.args.attrs || {};
    rval.args.dataAttrs = rval.args.dataAttrs || {};

    return rval;
}

const baseProps = (dirInfo, storyConfig, alias, req) => {
    let rv = {
        args:{}
    };

    if(storyConfig?.props){
        for(const a in storyConfig.props){
            const iprops = mergeDefaultProps(a, storyConfig.props);
            if(iprops && typeof iprops.defaultValue != 'undefined'){
                rv.args[a] = iprops.defaultValue;
            }
        };
    }

    return mergedGloballyProps(rv);
}

const components = (content, dirInfo, storyConfig, alias, req, base) => {
    if(storyConfig?.componentTypes){
        let arg = req.helpers.json.copy(storyConfig.componentTypes);
            delete arg.base;
            delete arg.Base;

        if(storyConfig.componentTypes.base){
            arg.Base_1 = storyConfig.componentTypes.base;
        }

        for(let a in arg){
            content += `\n\nexport const ${a.charAt(0).toUpperCase() + a.slice(1)} = {\n${req.helpers.json.prepair(``, {...base, ...{args:arg[a]}}, 0)}\n}`;
        }
    }

    return content;
}

const create = async (content, dirInfo, storyConfig, alias, req) => {
    let base = baseProps(dirInfo, storyConfig, alias, req);
        content += `\n\nexport const Base = {\n${req.helpers.json.prepair(``, base, 0)}\n}`;
        content = components(content, dirInfo, storyConfig, alias, req, base);
    return content;
}


exports.create = create;