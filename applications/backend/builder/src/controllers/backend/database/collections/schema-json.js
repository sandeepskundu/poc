const compile = async (rval, map, data, appConfig, req, res, next) => {
    if(data){
        for(const a in data){
            let mapval = [...map, a];
            let item = data[a];
            if(item && item.___type){
                rval[mapval.join('.')] = true
            }else{
                rval = await compile(rval, mapval, item, appConfig, req, res, next)
            }
        }
    }

    return rval;
}

const start = async (data, appConfig, req, res, next) => {
    return await compile({}, [], data, appConfig, req, res, next);
}


exports.start = start;