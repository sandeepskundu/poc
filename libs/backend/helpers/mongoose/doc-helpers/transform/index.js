const values = require('./values');

const VAL_NOT_DEFINED = '__VALUE__IS__NOT__DEFINED__';

const transform = (rval, transform, virtuls, config, model, req, res, next) => {
    let doc = {};
    let temp = {}
    let kys = req.helpers.json.val(transform, 'kies', {});
    let kysl = req.helpers.json.length(kys);

    if(doc){
        try{
            doc = JSON.parse(JSON.stringify(rval));
        }catch (err){

        }            
    }

    if(kysl && kysl > 0){
        for(const a in kys){
            let vm = kys[a];

            if(vm && typeof(vm) === 'string'){
                let val = req.helpers.json.val(doc, a, VAL_NOT_DEFINED);

                if(val != VAL_NOT_DEFINED){
                    temp = req.helpers.json.set(temp, vm, val, false, true);
                }
            }
        }
    }

    let teml = req.helpers.json.length(temp);

    if(teml && teml > 0){
        rval.vd = temp;
    }

    return rval;
}

const mapkey = (rval, virtuls, config, model, req, res, next) => {
    let transf = req.helpers.json.val(config, 'response.transform', {});
        transf = req.helpers.json.merge({
            enable:true,
            kies:{
                "_id":'id'
            }
        }, transf);

    if(transf && transf.enable){
        rval = transform(rval, transf, virtuls, config, model, req, res, next)
    }

    return rval;
}

const delkey = (rval, req, res, next) => {
    for(const a in rval){
        if(a.indexOf('_') === 0){
            delete rval[a];
        }
    }

    return rval;
}

const parse = (rval, virtuls, config, model, req, res, next) => {
    rval = mapkey(rval, virtuls, config, model, req, res, next);

    return delkey(rval, virtuls, config, model, req, res, next);
}

const exclude = (item, exclude, virtuls, config, model, req, res, next) => {
    let kys = req.helpers.json.val(exclude, 'kies', {});
    let kysl = req.helpers.json.length(kys);

    if(kysl && kysl > 0){
        for(const a in kys){
            let vm = kys[a];

            if(vm){
                req.helpers.json.remove(item, a);
            }
        }
    }

    return item;
}

const start = (rval, virtuls, config, model, req, res, next) => {
    let excld = req.helpers.json.val(config, 'response.exclude', {})
        rval = parse(rval, virtuls, config, model, req, res, next);

    if(excld && excld.enable){
        rval = exclude(rval, excld, virtuls, config, model, req, res, next);
    }

    return values.start(rval, virtuls, config, model, req, res, next);
    
}

const init = (rval, doc, virtuls, appConfig) => {
    let runtime = doc.runtime;
    let req = runtime.req;
    let res = runtime.res || {};
    let next = runtime.next = {};
    let model = runtime.model || {};
    let config = runtime.config || {};

    return start(rval, virtuls, config, model, req, res, next);
}

exports.init = init;
exports.start = start;
exports.removePrivate = delkey;