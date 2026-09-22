const helpers = require('ui-helpers');

const parse = (props, rval, maponly) => {
    rval = rval || {
        props:{},
        nodemap:[],
        propmap:[],
    }

    const mapnode = (arg, n, prps, last) => {
        let m = [...arg.nodemap, n]
        arg.props[m.join('.')] = {
            //nodemap:m,
            propmap:[...arg.propmap, n].join('.'),
            config:prps[n],
            last:last
        }

        return rval;
    }

    if(props && helpers.data.type.is(props, 'object')){
        for(let a in props){
            let item = props[a];
            let type = helpers.json.get(item, 'type', 'any');
                if(type === 'nested'){
                        rval = mapnode(rval, a, props, false);
                    let d = parse(helpers.json.get(props[a], '___.nested', {}), {
                        nodemap:[...rval.nodemap, a],
                        propmap:[...rval.propmap, a, '___.nested'],
                        props:rval.props || {}
                    });

                    if(maponly){
                        rval.props = helpers.json.merge(rval.props || {}, d.props || {});
                    }else{
                        rval.props = helpers.json.copy(d.props);
                    }
                }else{
                    rval = mapnode(rval, a, props, true);
                }
        }
    }
    
    return rval;;
}

const build = (props, maponly) => {
    return helpers.json.get(parse(props, false, maponly), 'props', {});
}

exports.build = build;