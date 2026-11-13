const modelByName = async (name, req, res) => {
    let rv =  req.helpers.json.get(req, `mdb.models.${name.toLowerCase()}`, false);
    
    if(rv){
        return rv;
    }else{
        return req.helpers.json.get(req, `mdb.models.${name}`, false)
    }
}

const getModel = async (req, res) => {
    let enable = req.helpers.json.get(req, 'runtime.model.config.audit.enable', false);

    if(enable){
        
        let collection = req.helpers.json.get(req, 'runtime.model.config.audit.collection', '');

        if(collection){
            return await modelByName(collection, req, res)
        }else{
            let mname = req.helpers.json.get(req, 'runtime.model.config.name', '');
            let suffix = req.helpers.json.get(req, 'runtime.model.config.audit.suffix', '');

            if(!suffix){
                suffix = 'Audit'
            }

            if(suffix && mname){
                return await modelByName(`${mname}${suffix}`, req, res);
            }
        }
    }

    return false;
}

exports.getModel = getModel;