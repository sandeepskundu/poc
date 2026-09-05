const storage = {};
const crJs = require('./../crpt');
const json = require('./../json');

const enabled = (config) => {
    return json.val(config, 'cache.enabled');
};

const flush = (configs, name) => {
    let n = name || json.val(configs, 'cache.name');

    if(n){
        delete storage[n];
    }
}

const store = (data, configs) => {
    let ttl = json.val(configs, 'cache.ttl');
    let name = json.val(configs, 'cache.name');

    if(name && !data.error){
        storage[name] = data;
    }

    if(ttl > 1){
        setTimeout(() => {
            flush(configs);
        }, ttl);
    }
}

const stored = (configs) => {
    const on = enabled(configs);

    if(on){
        let name = json.val(configs, 'cache.name');
        if(name && storage[name]){
            let onResp = json.val(configs, 'onResponse');

            if(onResp){
                onResp(storage[name], configs);
            }

            return true;
        }
    }

    return false;
}

const name = (arg) => {
    let on = enabled(arg);
    let configs = json.copy(arg);
    let url = json.val(arg, 'request.url', '');
    
    if(!on && url){
        let rv = {};
        let NA = '__NOT__DEFINED__';
        let cache = json.val(configs, 'cache.basedOn', {});
        let orders = ['url', 'data', 'method', 'params', 'query'];
        let others = json.val(configs, 'cache.basedOn.others', []);

        for(const a in orders){
            let type = orders[a];

            if(cache[type]){
                if(type === 'url' || type === 'method'){
                    let val = json.val(configs, `request.${type}`, '');

                    if(val){
                        rv[type] = val.toLowerCase();
                    }
                }else{
                    let val = json.val(configs, `request.${type}`, {});
                    let vallen = json.length(val);

                    if(vallen > 0){
                        rv[type] = val;
                    }
                }
            }
        }

        if(others && others.length > 0){
            for(const a in others){
                let map = others[a];

                if(map){
                    let vm = `request.${map}`;
                    let val = json.val(configs, vm, NA);

                    if(val != NA){
                        rv = json.set(rv, vm, val, false, true);
                    }
                }
            }
        }

        let rvl = json.length(rv);

        if(rvl > 0){
            let name = crJs.md5(JSON.stringify(rv));
                configs = json.set(configs, 'cache.name', name, false, true);
                configs = json.set(configs, 'cache.enabled', true, false, true);
        }
    }

    return configs;
}

const rId = (arg) => {
    let rval = json.copy(arg);
    let config = name({
        cache:{
            basedOn:{
                url:true,
                data:true,
                query:true,
                method:true,
                params:true,
            }
        },
        request:json.val(arg, 'request', {})
    });

    let id = json.val(config, 'cache.name', '');
        rval = json.set(rval, 'request.id', id, false, true);

    return rval;
}

const config = (arg) => {
    let configs = json.copy(arg)
        configs = rId(configs);
    
        return name(configs);
}

exports.name = name;
exports.flush = flush;
exports.store = store;
exports.config = config;
exports.stored = stored;
exports.enabled = enabled;