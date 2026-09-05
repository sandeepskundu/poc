const helpers = require('ui-helpers');

const parse = (props, rval) => {
    rval = rval || {
        props:{},
        nodemap:[],
        propmap:[],
    }

    if(props && helpers.data.type.is(props, 'object')){
        for(let a in props){
            let item = props[a];
            let type = helpers.json.get(item, 'type', 'any');
                if(type === 'shape'){
                    let d = parse(helpers.json.get(props[a], '___.shape', {}), {
                        nodemap:[...rval.nodemap, a],
                        propmap:[...rval.propmap, a, '___.shape'],
                        props:rval.props || {}
                    });
                    rval.props = helpers.json.copy(d.props);
                }else{
                    let m = [...rval.nodemap, a].join('.');

                    rval.props[m] = {
                        config:props[a],
                        propmap:[...rval.propmap, a].join('.')
                    }
                }
        }
    }
    
    return rval;;
}

const build = (props) => {
    return helpers.json.get(parse(props), 'props', {});
}

exports.build = build;