const start = (rval, virtuls, config, model, req, res, next) => {

    if(config && config.values){
        let excld = req.helpers.json.val(config, 'values.exclude', {});

        for(const a in excld){
            if(excld[a]){
                req.helpers.json.remove(rval, a);
            }
        }
    }
    
    
    return rval;
}

exports.start = start;