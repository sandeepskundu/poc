const urlh = require('./../url');
const json  = require('./../json');
const uireq = require('./ui');
const dT = require('./../data');
const validator = require('./../validation');

const mergeQp = (conf) => {
    let uqp = urlh.universalQuery();
    let rqp = json.val(conf, 'request.query', {})

    return json.merge(uqp, rqp);
}

const compileResp = (validation) => {
    const rval = {
        data:{},
        valid:true
    }

    for(const a in validation){
        const item = validation[a];
        const v = json.get(item, 'validation', {});
        const isArr = dT.type.isArray(v);

        if(rval.valid && item.valid === false){
            rval.valid = false;
        }

        if((isArr && v.length > 0) || (!isArr && json.length(v) > 0)){
            rval.data[a] = json.get(item, 'validation', {});
        }
    }

    if(rval.valid){
        //mapDocs(validation, req, res, next);
    }

    return rval;
}

const datamap = (resp, req) => {
    const rv = {};
    const order = ['params', 'query', 'body'];
    const method = json.val(req, 'request.method', 'get')
    const vdata = json.val(resp, 'data.validation', {});

    for(const a in order){
        const on = order[a];

        if(vdata[on]){
            rv[on] = rv[on] || {};
            for(const b in vdata[on]){
                rv[on][b] = true;
            }
        }
    }

    if(method === 'put' || method === 'PUT'){
        rv.body = rv.body || {};
        rv.body['signature.id'] = true;
        rv.body['signature.token'] = true;
    }

    return rv;
}

const validate = (data, conf, req) => {
    const map = {};
    const values = {};
    const validation = json.val(conf, 'data.validation', {});
    const order = ['headers', 'params', 'query', 'body'];
    
    for(const a in order){
        const on = order[a];

        if(data[on] && validation[on]){
            const vconfig = validation[on];

            switch(on) {
                case 'headers':
                    // code block
                break;
                case 'params':
                    map[on] = validator.params(data[on], vconfig, values);
                break;
                case 'query':
                    map[on] = validator.query(data[on], vconfig, values);
                break;
                default:
                    map[on] = validator.body(data[on], vconfig, values);
            }
        }
    }

    let rval = compileResp(map);
        rval.datamap = datamap(conf, req);

    return rval;
}

const onResp = (vdata, reqConf, vConf, onresp) => {
    if(vdata.valid){
        reqConf.options = reqConf.options || {};
        reqConf.options.validate = false;
        reqConf = json.set(reqConf, 'request.datamap.map', json.val(vdata, 'datamap', {}), false, true);
        uireq.init(reqConf, onresp);
    }else{
        const resp = {
            valid:false,
            data:{
                validation:json.val(vdata, 'data', {}),
                data:json.val(reqConf, 'request.data', {}),
                query:json.val(reqConf, 'request.query', {}),
                params:json.val(reqConf, 'request.params', {}),
                headers:json.val(reqConf, 'request.headers', {})  
            }
        }

        if(onresp && dT.type.is(onresp, 'function')){
            onresp(resp, reqConf);
        }else{
            const onResp = json.val(reqConf, 'onResponse');

            if(onResp && dT.type.is(onResp, 'function')){
                onResp(resp, reqConf);
            }else{
                const dmaker = json.val(reqConf, 'dataMaker');

                if(dmaker && dT.type.is(dmaker, 'function')){
                    dmaker(resp, resp, reqConf, true);
                }else{
                    alert('Callback method is not defined')
                }
            }
        }
    }
}

const init = (reqConf, vConf, onresp) => {

    let endpoint = json.val(reqConf, 'options.endpoint');
        uireq.init({
            options:{},
            extra:{
                onResp:onresp,
                reqConf:reqConf
            },
            cache:{
                ttl:200000000,
                name:endpoint,
                enabled:true,
                basedOn:{
                    url:true
                }
            },
            request:{
                method:'get',
                url:urlh.endpoints.get(endpoint, true),
                datamap:{
                    map:{
                        body:{},
                        query:{}
                    }
                }
            },
            onResponse:(resp, config) => {
                let data = {
                    query:mergeQp(reqConf),
                    body:json.val(vConf, 'data.data', {}),
                    headers:json.val(vConf, 'headers', {}),
                    params:json.val(reqConf, 'request.params', {})
                };
                onResp(validate(data, resp, reqConf), reqConf, vConf, onresp);
            }
        });
}

exports.init = init;