const getModelConfig = async (req, res, next) => {
    const m = req.helpers.json.get(req, 'runtime.model.config', req.helpers.json.val(req, 'dbUtils.model'));

    return m || (await req.helpers.express.docs.json.get('model', req, res, next));
};

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

const ENUMS = {
    ACTIONS:{
        fetch:'FIND',
        update:'UPDATE',
        create:'CREATE',
        remove:'DELETE'
    }
}

const getAction = async (req, fallback, res) => {
    let enable = req.helpers.json.get(req, 'runtime.model.config.audit.enable', false);
    let apiDisabled = req.helpers.json.get(req, 'runtime.validationConfig.audit.disable', false);

    if(enable && !apiDisabled){
        let list = req.helpers.data.type.isArray(req.helpers.json.val(req, 'body.data', {}));
        let auditConf = req.helpers.json.get(req, 'runtime.validationConfig.audit', {});
        let name = req.helpers.json.get(auditConf, `actions.${list?'list':'single'}`, '');
        let auditEnums = req.helpers.json.get(req, 'runtime.model.config.audit.enums', '');
            auditEnums = (auditEnums?auditEnums.split('|'):[]);
        /*--
            {
                actions:{
                    list:'',
                    single:'',
                    default:'',
                    enums:''
                }
            }

        --*/

        if(!name){
            name = req.helpers.json.get(auditConf, 'actions.default', '')
        }

        if(!name){
            name = req.helpers.json.get(ENUMS, `ACTIONS.${req.helpers.json.get(req, 'params.jobMethod', '')}`, 'ANONYMOUS');
        }
        
        let enums = await req.helpers.enums.builder.async.init(req, ['audit.actions.defaults'], {node:'id', regex:false});
            enums = [...enums, ...auditEnums];

        if(enums.indexOf(name) > -1){
            return name;
        }else{
            return (enums.indexOf(fallback) > -1)?fallback:'';
        }
    }
}

exports.getModel = getModel;
exports.getAction = getAction;