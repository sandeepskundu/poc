const pconfig = {
    "enable":true,
    "configs":{
        "permissions":{
            "enable":true,
            "model":{
                "query":{
                    "hidden":{},
                    "runtime":{
                        "enable":true,
                        "configs":{
                            "query":{
                                "0":{
                                    "cloumn":"category",
                                    "value":{
                                        "from":"params",
                                        "map":"ids"
                                    },
                                    "operation":{
                                        "eq":{
                                            "enable":true,
                                            "opType":"eq"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const permissions = require('./permissions');

const lean = (req, obj) => {
    if(obj && obj.buffer && typeof obj.buffer === 'object' && Object.keys(obj.buffer).every(k => !isNaN(k))) {
        return Buffer.from(Object.values(obj.buffer)).toString('hex');
    }

    if(obj){
        let isList = req.helpers.data.type.is(obj, 'list');
        let isObj = req.helpers.data.type.is(obj, 'object');

        if(isList){
            return obj.map(item => lean(req, item));
        }else{
            if(isObj){
                let rv = {};
                for(const a in obj){
                    rv[a] = lean(req, obj[a]);
                }

                return rv;
            }
        }
    }

    return obj;
}

const validate = async (doc, raw, config, model, item, req, res, next) => {
    let pconf = req.helpers.json.val(config, 'permissions.configs');

    let rval = {
        doc:doc,
        code:'invalid'
    }

    if(pconf){
        rval = await permissions.init(doc, raw, config, model, item, req, res, next);

        if(rval.valid){
            return rval;
        }else{
            debugger;
        }
    }else{
        return rval // false;
    }
}


const relationData = async (doc, config, model, bodyItem, req, res, next) => {
    debugger;
}

const start = async (results, config, model, bodyItem, req, res, next) => {
    let rv = [];
    let is = req.helpers.json.val(config, 'permissions.enable', false);
        config.permissions = pconfig;

    for(let a in results){
        let doc = lean(req, results[a]._doc);
        let item = await req.helpers.mongoose.docHelpers.addRuntime(results[a], config, model, req, res, next);
            item = item.toJSON();

            //item = await relationData(item, config, model, bodyItem, req, res, next);


        if(doc.isac || is === true){
            let vd = await validate(doc, results[a], config, model, bodyItem, req, res, next);
            let ups = req.helpers.json.val(vd, 'data.access');

            if(vd && vd.valid){

                if(ups){
                    item.ups = ups;
                }
                
                rv.push(item);
            }else{
                rv.push(item);
            }
        }else{
            rv.push(item);
        }
    };


    return rv;






    

    if(is === true){
        let rv = [];

        for(let a in results){
            let vd = await validate(results[a], config, model, req, res, next);

            if(vd.valid){
                let ups = req.helpers.json.val(vd, 'data.access');
                let item = await req.helpers.mongoose.docHelpers.addRuntime(results[a], config, model, req, res, next);
                    item = item.toJSON();
                    item.ups = ups;
                    rv.push(item);
            };

            debugger;

            console.log(rv);
            //dump.push(results[a]);
            //refine.push(lean(results[a], req));
        }
    }else{
        return await addRuntime(results, config, model, req, res, next);
    }

    return await addRuntime(results, config, model, req, res, next);
}

exports.start = start;