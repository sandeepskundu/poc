const error = require('./errors');
const runtime = require('./runtime');
const transform = require('./transform');
const signature = require('./signature');

const addRuntime = async (docs, config, model, req, res, next) => {    
    let runtime = {
        req:req,
        res:res,
        next:next,
        model:model,
        config:config,
    }

    let obj = await req.helpers.data.type.isObject(docs);
    let list = await req.helpers.data.type.isArray(docs);

    if(list && docs && docs.length > 0){
        for(const a in docs){
            docs[a].runtime = runtime;
        }
    }else{
        if(docs && obj){
            docs.runtime = runtime;
        }
    }

    return docs;
}



exports.error = error;
exports.runtime = runtime;
exports.transform = transform;
exports.signature = signature;
exports.addRuntime = addRuntime;
exports.defaultValues = require('./default-values');