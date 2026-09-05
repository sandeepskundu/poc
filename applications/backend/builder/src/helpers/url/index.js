const url = require('url');

const qSerailize = (arg, encode) => {
    let r = "";
    for(let a in arg) {
        if(a){
            let val = arg[a];
            if(val || val === 0){
                if(encode){
                    r += a+"="+encodeURIComponent(val)+"&";
                }else{
                    r += a+"="+val+"&";
                }
                
            }   
        }
    }

    return r.slice(0, -1);
}

const serailize = (arg, encode) => {
    return qSerailize(arg, encode);
}

const parse = (u) => {
    if(u){
        u = u.replace('&amp;', '&');
        return url.parse(u, true);
    }else{
        return {}
    }
        
}

const query = (u, name) => {
    let rv = {};

    if(u){
        u = u.replace('&amp;', '&');
        rv = url.parse(u, true);

        if(rv && rv.query){
            rv = rv.query;
        }else{
            rv = {};
        }

        if(name){
            return rv[name]?rv[name]:false;
        }
    }
    
    return rv;
}

const getParams = (u, name) => {
    let rv = {};

    if(u){
        let parsed = parse(u);
            rv = parsed.query;

        if(name){
            return rv[name]?rv[name]:false;
        }
    }

    return rv;
}

const getHost = (u) => {
    let p = u.split('?');

    return p[0]
}

const getProps = (u) => {
    return {
        url:getHost(u),
        query:query(u)
    }
}

const sanitize = (u) => {
    if (u) {
        u = u.replace(/(?<!:)\/+/gm, '/');
    }
    return u;
}

exports.query = query;
exports.getHost = getHost;
exports.getProps = getProps;
exports.getParams = getParams;
exports.serailize = serailize;
exports.sanitize = sanitize;
exports.qSerailize = qSerailize;