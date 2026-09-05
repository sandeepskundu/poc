const json = require('./../../../json');

const mergeClsByType = (props, map, defaults, type, clsmap) => {
    let cls = [];
    let dmap = `${type}.${map}`; // Prepair map like dsTheme.wrapper or config.wrapper;
    let pconf = json.get(props, dmap, {}); // Props config
    let dconf = json.get(defaults, dmap, {}); // Defaults hardcode configs
    let dcls = json.get(dconf, clsmap, ''); // Defined css class in default config.
    let pcls = json.get(pconf, clsmap, ''); // Defined css class in pops config.

    if(dcls){
        cls.push(dcls);
    }

    if(pcls){
        cls.push(pcls);
    }

    cls = cls.join(' ');
    
    if(cls){
        pconf = json.set(pconf, clsmap, cls, false, true);
    }

    return json.merge(dconf, pconf);
}

const ds = (props, map, defaults) => {
    return mergeClsByType(props, map, defaults, 'config', 'ds.css.others');
}

const predefined = (props, map, defaults) => {
    return mergeClsByType(props, map, defaults, 'dsTheme', 'className');
}

exports.ds = ds;
exports.predefined = predefined;