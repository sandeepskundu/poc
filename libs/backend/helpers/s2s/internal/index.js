const https = require('https');
const values = require('./values');
const helpers = process.uiHelpers();
const dmaker = require('./data-maker');
const axios = require('node-modules/axios/dist/browser/axios.cjs');


const UNDEFINED_VALUE = '___UNDEFINED___VALUE___';
const INTERNAL_DOMAIN = 'http://internal.sample.local/api'

const globalHeaders = {
    cookie:{
        enable:true,
    },
    'user-agent':{
        enable:true
    }
};

const agent = new https.Agent({
  rejectUnauthorized: process.env.ENV === 'production' && !!process.env.SSLAUTHORIZED,
});

const base = {
    request:{
        query:{},
        params:{},
        headers:{},
        method:'get',
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
        url:'http://localhost:1300/cdn/internal/:_hasId_:',
    },
    options:{
        timeout:100000,
        pathMap:"common.auth",
        baseURL:'apiBasePath',
        headersConfig:{
            cookie:{
                enable:false,
            },
        },
        valuemap:{
            data:{
                kundu:{
                    'map':'id',
                    'from':'params',
                    'fallback':{
                        'map':'',
                        'from':''
                    }
                }
            },
            query:{},
            headers:{},
            params:{
                id:{
                    'map':'id',
                    'from':'params',
                    'fallback':{
                        'map':'',
                        'from':''
                    }
                }
            }
        }
    },
}

const valueByType = (config, req, res, next, item, type) => {
    let rval = item || {};
    let maps = req.helpers.json.val(config, `options.valuemap.${type}`, {});

    return values.map(rval, maps, req, res, next)
}

const headers = (config, req, res, next, item) => {
    let rval = {};
    let header = helpers.json.get(req, 'headers', {});
    let cheaders = helpers.json.val(config, 'request.headers', {});
    let hconfigs = helpers.json.get(config, 'options.headersConfig', {});
        hconfigs = helpers.json.merge(globalHeaders, hconfigs);

    for(const a in hconfigs){
        const item = hconfigs[a];
        const enable = item.enable;

        if(enable){
            let val = helpers.json.val(header, a, UNDEFINED_VALUE);
            if(val != UNDEFINED_VALUE){
                rval[a] = val;
            }
        }
    }
  
    rval = helpers.json.merge(rval, valueByType(config, req, res, next, item, 'headers'))

    return helpers.json.merge(rval, cheaders);
};

const data = (config, req, res, next, item) => {
    let rval = req.helpers.json.val(config, 'request.data', {});
    let mapv = valueByType(config, req, res, next, item, 'data');

    return helpers.json.merge(mapv, rval);
}


const query = (config, req, res, next, item) => {
    let rval = req.helpers.json.val(config, 'request.query', {});
    let mapv = valueByType(config, req, res, next, item, 'query');

    return helpers.json.merge(mapv, rval);
}

const params = (config, req, res, next, item) => {
    let rval = req.helpers.json.val(config, 'request.params', {});
    let mapv = valueByType(config, req, res, next, item, 'params');

    return helpers.json.merge(mapv, rval);
}

const getUrl = (config, req, res, next, item) => {
    let url = req.helpers.json.val(config, 'request.url', '');
    
        //url = req.helpers.url.removeDomain(url);
        //url = req.helpers.url.sanitize(`${INTERNAL_DOMAIN}/${url}`);

    return req.helpers.url.addPathParams(url, params(config, req, res, next, item));
}

const getConfig = (config, req, res, next, item) => {
    let conf = helpers.json.merge(base, config || {});
    let method = helpers.json.val(conf, 'request.method', 'get');
        method = method.toLowerCase();

    let rval = {
        method:method,
        httpsAgent:agent,
        data:data(conf, req, res, next, item),
        url:getUrl(conf, req, res, next, item),
        params:query(conf, req, res, next, item),
        headers:headers(conf, req, res, next, item),
        timeout:helpers.json.val(conf, 'options.timeout', 10000)
        //baseURL:'https://some-domain.com/api/'
    }

    if(method === 'get'){
        delete rval.data;
    }

    return rval;
}

const request = async (configs, req, res, next, item) => {
    const conf = getConfig(configs, req || {}, res || {}, next || {}, item)
    try {
        return await axios(conf).then((resp) => {
            let headers = helpers.json.get(resp, 'headers', {});
            try {
                let d = helpers.json.get(resp, 'data');
                try {
                    return {
                        headers:headers,
                        resp:{
                            data:d,
                            status:helpers.json.get(resp, 'status'),
                        }    
                    };
                } catch (error) {
                    return {
                        headers:headers,
                        resp:{
                            data:{},
                            status:helpers.json.get(resp, 'status'),
                        }    
                    };
              }
            } catch (error) {
                return {
                    headers:headers,
                    resp:{
                        data:{},
                        status:helpers.json.get(resp, 'status'),
                    }
                };
            }
        }).catch((e) => {
            return {
                headers:{},
                resp:{
                    data:{},
                    status:helpers.json.get(e.response, 'status'),
                }
            };
        });
    } catch (error) {
        return {
            headers:{},
            resp:{
                data:{},
                status:404,
            }
        };
    };
}

const init = async (configs, req, res, next, item) => {
    let rval = {};
    let isobj = helpers.data.type.is(configs, 'object');
    let islist = helpers.data.type.is(configs, 'array');

    if(isobj && islist && configs && configs.length > 0){
        const pl = [];
        for (const a in configs) {
            pl.push(
                new Promise(async (resolve, reject) => {
                    resolve(await request(configs[a], req, res, next, item));
                }).then((resp) => {
                    return {
                        resp:resp,
                        conf:configs[a],
                    }
                })
            );
        };
        
        let resp = await Promise.all(pl);

        if(resp && resp.length > 0){
            for(const a in resp){
                rval = await dmaker.start(rval, resp[a], req, res, next, item);
            }
        }

        return rval;
    }else{
        if(isobj){
            return await request(configs, req, res, next, item);
        }else{
            return {};
        }
    }
}

exports.init = init;