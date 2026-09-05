const dt = require('./../data');
const urlh = require('./../url');
const queue = require('./queue');
const cache = require('./cache');
const json  = require('./../json');
const byType = require('./by-type');
const rnadom = require('./../random');
const uiv = require('./ui-validation');
const axios = require('node-modules/axios/dist/browser/axios.cjs'); 

const DEFAULT_VALUE = "___UNDEFINED___VALUE___";
const VALIDATION_MAPPING = ['body', 'query', 'params', 'headers'];

const paths = {
    "common":{

    }
}

const upath = (conf) => {
    let endpoint = json.val(conf, 'options.endpoint');

    if(endpoint){
        return urlh.endpoints.get(endpoint);
    }else{
        return json.val(conf, 'request.url');
    }
    
    //let pmap = json.val(conf, 'options.pathMap');
    //return json.val(_siteProps_, `paths.${pmap}`, json.val(conf, 'request.url'));
}

const baseUrl = (conf) => {
    let base = json.val(conf, 'options.baseURL');
    let url = json.val(_siteProps_, `urls.${base}`, (base || '/'));

    return url;
}

const mapdate = (conf, type) => {
    let tmap = {
        'data':'body',
        'query':'query'
    }
    let d = json.val(conf, `request.${type}`, {});
    let disable = json.val(conf, `request.datamap.disable`, false);
    let map = json.val(conf, `request.datamap.map.${tmap[type]}`, false);

    if((disable === true || map === false) && tmap[type]){
        return d;
    }else{
        let rval = {};
        let dv = rnadom.uuid()

        for(const a in map){
            let v = json.val(d, a, dv);

            if(dv != v){
                rval = json.set(rval, a, v, false, true);
            }
        }

        return rval;
    };
}

const parseUrl = (url, conf) => {
    let params = json.val(conf, 'request.params', {});

    for(const a in params){
        url = url.replace(new RegExp(`:_${a}_:`, 'g'), `/${params[a]}`)
    }

    return urlh.sanitize(url);
}

const getUrl = (conf) => {
    let up = upath(conf);
    let base = baseUrl(conf);
    return urlh.mergeQp(parseUrl(up, conf), json.val(conf, 'query', {}))
    return parseUrl(`${base}/${up}`, conf);
}

const data = (conf) => {
    return {
        data:{...mapdate(conf, 'data'), ...{}}
    }
}

const params = (conf) => {
    return json.val(conf, 'request.query', {})
}

const headers = (conf) => {
    return json.val(conf, 'request.headers', {})
}

const getConfig = (conf) => {
    return {
        url:getUrl(conf),
        data:data(conf),
        params:params(conf),
        headers:{...{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        }, ...headers(conf)},
        method:json.val(conf, 'request.method', 'get'),
        timeout:json.val(conf, 'options.timeout', 10000)
        //baseURL:'https://some-domain.com/api/'
    }
}

const hasDataMaker = (resp, configs, error) => {
    let dmaker = json.val(configs, 'dataMaker')
    let isdmaker = helpers.data.type.is(dmaker, 'function');

    if(isdmaker){
        return dmaker;
    }else{
        return null;
    }
}

const mapResponse = (data, config) => {
    let rval = {};
    let resmap = json.val(config, 'responseDataMap');

        if(resmap){
            let to =  json.val(resmap, 'to', '')
            let from = json.val(resmap, 'from', 'data');
            let fallback = json.val(resmap, 'fallback', DEFAULT_VALUE);
            let datavalue = json.val(data, from, fallback);

            if(to && datavalue != DEFAULT_VALUE){
                rval = json.set(rval, to, datavalue, false, true);
            }
        }else{
            rval = data;
        }

    return rval;
}

const parseValidationMap = (map, validation, type) => {
    const rv = {};
    const vd = json.copy(validation);

    for(const a in VALIDATION_MAPPING){
        const name = VALIDATION_MAPPING[a];  
        if(map && map[name]){
            for(const b in map[name]){
                if(vd[b]){
                    rv[name] = rv[name] || {};
                    rv[name][b] = vd[b];
                    delete vd[b];
                }
            }
        }
    }

    return rv;
}

const mapValidation = (map, validation, type) => {
    if(type === 'object'){
        return parseValidationMap(map, validation, type)
    }else{
        if(type === 'list'){
            const rval = [];

            for(const a in validation){
                let len = json.length(validation[a] || {});

                if(validation[a] && len > 0){
                    let vm = parseValidationMap(map. validation[a], type);
                        rval.push(vm);
                }
            }

            if(rval.length > 0){
                return rval;
            }
        }
    }

    return {};
}

const getValidation = (resp, configs, error) => {
    let vm = json.val(resp, 'data.validationMap');

    if(vm){
        let v = json.val(resp, 'data.validation');
        let li = dt.type.is(v, 'array');
        let obj = dt.type.is(v, 'object');

        if(li){
            return mapValidation(vm, v, 'list')
        }else{
            if(obj){
                return mapValidation(vm, v, 'object')
            }
        }

        return {};
    }else{
        return json.val(resp, 'data.data', {})
    }
}

const onResp = (resp, configs, error) => {
    //const t = crypto.decrypt(resp.headers.token, resp.headers.fwid);

    const onResp = json.val(configs, 'onResponse');
    const err = json.val(resp, 'data.error', {});
    const ecode = json.val(err || {}, 'code', 'PASS');

    if(ecode === 'INVALID_REQ_DATA'){
        const resd = {
            valid:false,
            data:{
                validation:getValidation(resp, configs, error),
                data:json.val(configs, 'request.data', {}),
                query:json.val(configs, 'request.query', {}),
                params:json.val(configs, 'request.params', {}),
                headers:json.val(configs, 'request.headers', {})  
            }
        }

        if(onResp){
            onResp(resd, configs);
        }

        setTimeout(() => {
            queue.clean(configs, resd);
        }, 0);
    }else{
        let data = json.val(resp, 'data', {});
        let cenable = cache.enabled(configs);
        let dmaker = hasDataMaker(resp, configs, error);

        if(dmaker){
            data = {
                data:dmaker(data, resp, configs, error)
            }
        };

        if(cenable && !error){
            cache.store(data, configs);
        }

        data.uiUtils = {
            fresh:true,
            wait:false
        }

        if(onResp){
            onResp(mapResponse(data, configs), configs);
        }

        setTimeout(() => {
            queue.clean(configs, data);
        }, 0);
    }
}

const onQueResp = (resp, configs, onResolve) => {
    let res = mapResponse(resp, configs);

    if(onResolve){
        onResolve(res, configs, true);
    }
}

const init = (conf, onresp) => {
    /*--
        helpers.request.ui.init({
            cache:{
                name:"",
                ttl:2000,
                enabled:true,
                basedOn:{
                    url:true,
                    data:true,
                    query:true,
                    method:true,
                    params:true,
                    others:true
                }
            },
            request:{
                params:{},
                headers:{},
                method:'post',
                data:{
                    data:{
                        schema:{
                            k:{
                                sk:{
                                    s:"kundu"
                                }
                            }
                        },
                        collection:{
                            name:"Kundu",
                            dbId:"6737058b985ce50cc1f02b41"
                        },
                        signature: {
                            id: "67496840cc8946516c194c3f",
                            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ5Njg0MGNjODk0NjUxNmMxOTRjM2YiLCJfbWVyY2hhbnRJZCI6IjY3MmNhYzY0NGEwZGRlZDc2NWI1YzNiMiIsImlhdCI6MTczMjg2NDA2NH0.eP3ABl6kb6GxUkHQsC5oUp1DxqScmxpfXx8HJBmL94c"
                        }
                    }
                },
                url:'http://localhost:9900/api/merchant-admin/collections/schema/v1/details/create/abcdefghijklmnorqrtsuv?id=KKKKSKSKSKSKSKSKSKSKSKSKSKS',
            },
            options:{
                validate:true,
                timeout:100000,
                pathMap:"common.auth",
                baseURL:'apiBasePath',
                endpoint:'roles.createChildRole'
            },
            onResponse:(resp, config) => {
                debugger;
            }
        })
    --*/

    const rconfig = cache.config(conf);
    const validate = json.val(conf, 'options.validate');

    if(validate){
        let endpoint = json.val(conf, 'options.endpoint');

        if(endpoint){
            let vconf = getConfig(rconfig);
            let vurl = urlh.endpoints.get(endpoint, true);

            if(vurl){
                uiv.init(conf, vconf, onresp);
            }else{
                alert('Request url is defined for validation. Pls retry again.') 
            }
        }else{
            alert('Request endpoint map is defined. Pls retry again.')
        }
    }else{
        const queued = queue.check(rconfig);
        const stored = cache.stored(rconfig);
        const reqconf = getConfig(rconfig);

        if(queued && !stored){
            axios.default(reqconf).then((resp) => {
                onResp(resp, rconfig)
            }).catch((error) => {
                onResp(error.response, rconfig, true);
            });
        }else{
            if(!stored){
                queue.add(rconfig, onQueResp, onresp);  
            }
        }
    }
}

exports.init = init;
exports.byType = byType;