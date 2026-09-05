const config = (arg) => {
    let a = arg || {};
    let rv = {...{
        maxAge:0,
        secure:false,
        httpOnly:true,
        domain:'internal.aiodeal.local' //'localhost',
    }, ...a}

    if((arg && arg.type === 'session') || rv.expires){
        delete rv.maxAge
    }

    if(arg && arg.delete){
        delete rv.delete
        rv.expires = (Date.now()+(2*1000))
    }

    return rv;
}

const get = (name, req) => {
    return req.helpers.json.val(req, `cookies.${name}`)
}

const set = (name, value, req, res, conf) => {
    if(name && value && res){
        if(conf && ((conf.maxAge > 1 || conf.type === 'session') || (conf.expires > Date.now()))){
            if(req){
                req.cookies = req.cookies || {};
                req.cookies[name] = value;
            };
        };

        res.cookie(name, value, config(conf))
    }
}

const del = (name, req, res) => {
    set(name, get(name, req, res), req, res, {
        maxAge:1,
        delete:true
    });
}

const valueIs = (name, value, req, res) => {
    return (value === get(name, req, res))
}

exports.get = get;
exports.set = set;
exports.del = del;
exports.valueIs = valueIs;