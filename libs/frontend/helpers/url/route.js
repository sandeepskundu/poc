
const json = require('./../json');
const urlHelpers = require('./index');
const constants = require('./../constants');

const params = (arg) => {
    return urlHelpers.mergeParams('', json.val(arg, 'params', {}), true)
}

const query = (arg) => {
    return urlHelpers.mergeQp('', json.val(arg, 'query', {}), true);
}

const validateParams = (route, arg) => {
    const rval = {
        valid:true,
        params:{},
        invalid:{}
    }

    const prms = params(arg);
    const VAL_NO_DEFINED = '___VALUE__NOT__DEFINED___'
    const pProps = json.val(route, 'route.pProps', {});

    for(const a in pProps){
        const value = json.val(prms, a, VAL_NO_DEFINED);
        const optional = json.val(pProps[a], 'optional');

        if(optional){
            if(value != VAL_NO_DEFINED){
                rval.params[a] = value;
            }else{
                rval.params[a] = '';
            }
        }else{
            if(value === VAL_NO_DEFINED){
                rval.valid = false;
                rval.invalid[a] = true;
            }else{
                rval.params[a] = value;
            }
        }
    }

    return rval;
}

const redirect = (map, arg, getUrl) => {
    let route = constants.route.get(map);
    let pvalid = validateParams(route, arg);
    let url = json.get(route, 'route.path.withParams');

    if(pvalid.valid){
        if(url){
            url = urlHelpers.mergeQueryAndParams(`/${url}`, {
                query:query(arg),
                params:pvalid.params || {}
            })
        }
    }else{
        alert('Invalid url params');
    }

    if(url){
        if(getUrl){
            return url;
        }else{
            urlHelpers.redirect(url);
        }
    }else{
        alert('Url is not defined');
    }
}

const getUrl = (map, arg) => {
    return redirect(map, arg, true);
}

exports.getUrl = getUrl;
exports.redirect = redirect;