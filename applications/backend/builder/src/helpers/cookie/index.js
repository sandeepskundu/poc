const config = (arg) => {
    let a = arg || {};
    let rv = {...{
        maxAge:0,
        secure:false,
        httpOnly:true,
        domain:'localhost',
    }, ...a}

    if(arg && arg.type === 'session'){
        delete rv.maxAge
    }

    return rv;
}

const get = (name, req, res) => {
    return req.helpers.json.val(req, `cookies.${name}`)
}

const set = (name, value, req, res, conf) => {
    if(name && value && res){
    
        if(conf && (conf.maxAge > 1 || conf.type === 'session')){
            if(req){
                req.cookies = req.cookies || {};
                req.cookies[name] = value;
            };
        };

        res.cookie(name, value, config(conf))
    }
}

const del = (name, req, res) => {
    set(name, get(name, req, res), {
        maxAge:1
    }, req, res)
}

const valueIs = (name, value, req, res) => {
    return (value === get(name, req, res))
}

exports.get = get;
exports.set = set;
exports.del = del;
exports.valueIs = valueIs;