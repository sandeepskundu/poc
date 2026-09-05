const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const getModel = async (req, res, next) => {
    return req.helpers.json.merge(await req.helpers.express.docs.json.get('model', req, res, next), qp)
}

const getMapping = async (item, req, res, next) => {
    let rval = []
    let t = req.helpers.json.val(item, 'linkFor', '');
    let map = req.helpers.json.val(item, 'mapping', '');
    let mapl = map.split('.');
        t = t.toUpperCase();

    if(t){
        rval.push(t);
    }

    if(mapl && mapl.length > 0){
        for(const a in mapl){
            let cm = await mongodb.query.find.init('ar', {_id:mapl[a]}, qp, req, res, next);
            let code = req.helpers.json.val(cm, 'data.result.0.code', '');

            if(code){
                rval.push(code)
            }
            
        }
    }

    if(rval.length > 1){
        item.codemap = rval.join('.');
    }

    return item;
}

const parse = async (resp, req, res, next) => {
    const list = [];
    const results = req.helpers.json.val(resp, 'data.result', []);

    for(const a in results){
        let result = results[a].toJSON();
            result = await getMapping(result, req, res, next);
            list.push(result);
    }

    if(list.length > 0){
        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:{
                result:list
            }
        });
    }else{
        return await req.helpers.express.response.noResult(req, res, next, {});
    }
}

const byMapIdAndLinkFor =  async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('rba', {mapId:id}, await getModel(req, res, next), req, res, next), req, res, next); 
}

exports.byMapIdAndLinkFor = byMapIdAndLinkFor;