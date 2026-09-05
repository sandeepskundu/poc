const ui = require('./ui');
const json = require('./../json');

const config = (cb, req) => {
    return json.merge({
        options:{
            validate:true,
            _endpoint:'orgStructure.hierarchy.createRoot',
        },
        request:{
            method:'get'
        },
        onResponse:(resp, configs) => {
            setTimeout(() => {cb(json.val(resp, 'data', {}))}, 200);
        }
    }, (req || {}))
}

const init = (req, cb) => {
    if(cb){
        ui.init(config(cb, {...(req || {}), ...{responseDataMap:false}}))
    }
}

const create = (req, cb) => {
    init(json.merge(req || {}, {
        request:{
            method:'post'
        }
    }), cb)
}

const update = (req, cb) => {
    init(json.merge(req || {}, {
        request:{
            method:'put'
        }
    }), cb)
}

const _delete = (req, cb) => {
    init(json.merge(req || {}, {
        request:{
            method:'delete'
        }
    }), cb)
}

exports.create = create;
exports.update = update;
exports.delete = _delete;