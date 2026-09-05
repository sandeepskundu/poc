exports.build = async (name, map, req, extend, list) => {
    if(name){
        const rval = {};
        const isobj = req.helpers.data.type.is(extend, 'object');
        const isListobj = req.helpers.data.type.is(list, 'object');
        const isListBool = req.helpers.data.type.is(list, 'boolean');

        for(const a in map){
            if(map[a] && ((isListobj && list[a]) || (isListBool))){
                let v = map[a];
                let n = `${name}/${a}`;
                let isobj = req.helpers.data.type.is(v, 'object');
                    n = req.helpers.url.sanitize(n);
                    n = n.replace(/^\/+/, '');

                if(isobj){
                    let func = req.helpers.data.type.is(v.get, 'function');

                    if(func){
                        rval[n] = await v.get(name, req);
                    }else{
                        rval[n] = v;
                    }
                }
            }
        }

        if(isobj){
            return req.helpers.json.merge(rval, extend);
        }else{
            return rval;
        }
    }else{
        return {}
    }
}

exports.compiler = async (rval, list, appConfig, req) => {
    for(let a in list){
        let incl = false;
        let name = list[a];
        let istemObj = req.helpers.data.type.is(list[a], 'object');

        if(istemObj){
            name = req.helpers.json.val(list[a], 'name', a);
            incl = req.helpers.json.val(list[a], 'include', false);
        }

        let api = await process.require(`${appConfig.dirs.beLib}/helpers/_private/apies/${a}`);
        let val = req.helpers.json.val(api, `get`);
        let isobj = req.helpers.data.type.is(val, 'object');
        let func = req.helpers.data.type.is(val, 'function');

        if(func){
            rval = await val(name, req, rval, incl);
        }else{
            if(isobj){
                rval = req.helpers.json.merge(val, rval);
            }
        }
    }

    return rval;
}