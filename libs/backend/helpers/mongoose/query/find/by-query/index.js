const mdb = process.nodeModules('mongoose');

const getmodel = async (collname, qp, single) => {
    let l = {};
    let col = (collname?collname.toUpperCase():'')

    Object.values(mdb.connection.models).map(model => {
        if(model?.modelName){
            l[model?.modelName.toUpperCase()] = model;
        }
    });

    return l[col] || null;
}

const init = async (collname, conf, qp, refine, single) => {
    let rv = {};
    let model = await getmodel(collname);

    if(model){
        let resp = await model.find({...{_deleted:0, ...(qp || {})}});

        if(resp && resp.length > 0){
            for(let a in resp){
                if(single){
                    if(refine && resp[a].toJSON){
                        return resp[a].toJSON();
                    }else{
                        return resp[a];
                    }
                }else{
                    if(refine && resp[a].toJSON){
                        rv[a] = resp[a].toJSON();
                    }else{
                        rv[a] = resp[a];
                    }
                }
            }

            return rv;
        }else{
            return null;
        }
    }

    return null;
}

exports.init = init;