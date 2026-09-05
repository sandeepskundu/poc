const json = require('./../../json');
const dtype = require('./../../data');

const list = (options) => {
    let isObj = dtype.type.is(options, 'object');

    if(isObj){
        let rval = [];

        for(let a in options){
            rval.push(options[a]);
        }

        return rval;
    }else{
        return options;
    }
}

const filter = (rval, search, filter, config) => {
    let keys = [];
    let keyval = json.get(filter, 'keys', []);
    let list = json.get(rval, 'unfiltered', []);
    let isstring = dtype.type.is(search, 'string');
    let mode = json.get(filter, 'mode', 'includes');
    let match = json.get(filter, 'match', 'lowercase');

    if(search && isstring && match === 'lowercase'){
        search = search.toLowerCase();
    }

    if(keyval){
        if(dtype.type.is(keyval, 'string')){
            keys.push(keyval);
        }else{
            if(dtype.type.is(keyval, 'list')){
                keys = keyval;
            }else{
                if(dtype.type.is(keyval, 'object')){
                    for(let a in keyval){
                        keys.push(keyval[a]);
                    }
                }
            }
        }
    }

    if(keys && keys.length > 0 && list && list.length > 0){
        list = list.filter((item, index) => {
            let valid = false;

            for(let a in keys){
                let k = keys[a];
                let value = json.get(item, k, '');
                let isstring = dtype.type.is(value, 'string');

                if(value && isstring){
                    value = value.trim();
                }
    
                if(value && isstring && match === 'lowercase'){
                    value = value.toLowerCase();
                }

                switch (mode) {
                    case "startswith":
                        valid = value.startsWith(search);
                    break;
                    case "endswith":
                        valid = value.endsWith(search);
                    break;
                    case "exact":
                        valid = (value === search);
                    break;
                    case "includes":
                    default:
                        valid = value.includes(search);
                }

                if(valid){
                    break;
                }
            }

            if(valid){
                rval.filtered = rval.filtered || [];
                rval.filtered.push(item);
            }

            return !valid;
        });
    }

    rval.unfiltered = list;
    
    return rval;
}

/*--

HOW TO USE 

init(
{0:{label:"Sandeep Kundu"}}, 
'sa',
{
0:{
    mode:"includes",
    keys:['label']
}
},
{
match:"lowercase"
}
)

--*/

const init = (option, query, filters) => {
    let results = {
        filtered:[],
        unfiltered:list(option)
    }
    let search = query;
    let isObj = dtype.type.is(option, 'object');
    let isstring = dtype.type.is(search, 'string');
    
        /*--filters = { // Just commented bcz of sample example.
            0:{
                mode:"includes",
                keys:['label']
            }
        }--*/

    if(isstring && search){
        search = search.trim();
    }

    if(search){
        for(const a in filters){
            results = filter(results, search, filters[a]);
        }
    }

    let rl = json.get(results, 'filtered', []);

    if(rl && rl.length > 0){
        if(isObj){
            let rv = {};

            for(let a in rl){
                rv[a] = rl[a];
            };

            return rv;
        }else{
            return rl;
        }
    }else{
        if(isObj){
            return {}
        }else{
            return []
        }
    }
}

exports.init = init;