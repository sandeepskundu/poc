const route = require('./route');
const json = require('./../json');
const dtype = require('./../data/type');
const url = require('node-modules/url');
const endpoints = require('./endpoints')

const qSerailize = (arg, encode) => {
    let rv = [];
    for(let a in arg) {
        if(a){
            let val = arg[a];
            if(val || val === 0){
                if(encode){
                    rv.push(`${a}=${encodeURIComponent(val)}`)
                }else{
                    rv.push(`${a}=${val}`)
                }
                
            }   
        }
    }

    return rv.join('&');
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
        u = u || window?.location?.href

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
            return rv[name] || false;
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

    if(u){
        if(u.slice(-1) === '/'){
            u = u.substring(0, (u.length-1));
        }
    }

    return u;
}

const param = (name) => {
    const prms = json.val(_siteProps_, 'router.params', {});

    return prms[name] || prms;
}

const addPathParams = (url, arg) => {
    let params = arg || {};

    for(const a in params){
        url = url.replace(new RegExp(`:_${a}_:`, 'g'), `/${params[a]}`)
    }

    return sanitize(url);
}

const removeDomain = (url) => {
    if(url){
        url = url.replace(/^.*\/\/[^\/]+/, '')
    }

    return url;
}

const universalQuery = (url) => {
    let rval = {};
    let prefix = 'aiouni_'
    let qps = query(url || (window?.location?.href || ''))
    /*--let qps = json.val(_siteProps_, 'pageRequest.query', {});

        if(url){
            qps = query(url)
        }
    --*/

    for(const a in qps){
        if(a.indexOf(prefix) === 0){
            rval[a] = qps[a];
        }
    }

    return rval;
}

const mergeQp = (url, arg, getObj) => {
    let uqp = universalQuery();
    let uprops = getProps(url || '');
    let isobj = dtype.is(arg, 'object');
    let islist = dtype.is(arg, 'array');
    let qps = {...uqp, ...uprops.query};
    
    if(arg && isobj && !islist){
        qps = json.merge(qps, arg);
    }

    if(getObj){
        return qps;
    }

    if(uprops.url){
        if(json.length(qps) > 0){
            return sanitize(`${uprops.url}?${serailize(qps)}`)
        }else{
            return sanitize(`${uprops.url}`);
        }
    }else{
        return '';
    }
}

const mergeParams = (url, arg, getObj) => {
    let parms = param();
    let isobj = dtype.is(arg, 'object');
    let islist = dtype.is(arg, 'array');
    
    if(arg && isobj && !islist){
        parms = json.merge(parms, arg);
    }

    if(getObj){
        return parms;
    }

    if(url){
        return addPathParams(url, parms)
    }else{
        return '';
    }
}

const mergeQueryAndParams = (url, arg) => {
    url = mergeQp(url, arg.query);
    url = mergeParams(url, arg.params);

    return url;
}

const redirect = (url) => {
    window.location.href = mergeQp(url);
}

exports.query = query;
exports.param = param;
exports.route = route;
exports.mergeQp = mergeQp;
exports.getHost = getHost;

exports.sanitize = sanitize;
exports.redirect = redirect;
exports.getProps = getProps;
exports.getParams = getParams;
exports.serailize = serailize;
exports.endpoints = endpoints;
exports.qSerailize = qSerailize;
exports.mergeParams = mergeParams;
exports.removeDomain = removeDomain;
exports.addPathParams = addPathParams;
exports.universalQuery = universalQuery;
exports.mergeQueryAndParams = mergeQueryAndParams;