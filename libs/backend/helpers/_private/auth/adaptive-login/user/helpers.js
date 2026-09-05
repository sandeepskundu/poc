const setReqData = async (config, req, parentReq, res, next) => {
    let dmap = req.helpers.json.val(config, 'datamap', {});

    for(let a in dmap){
        if(dmap[a]){
            req[a] = req.helpers.json.val(parentReq, `${a}.${dmap[a]}`, {});
        }
    }
}

const mapValidationResp = async (rval, config, req) => {
    let rv = {};
    let vdata = req.helpers.json.val(rval, 'data', {});
    let datamap = req.helpers.json.val(config, 'datamap', {});

    for(const a in datamap){
        let vm = {};
        let tvali = datamap[a];
        let rtvali = tvali?tvali.replace(/^data\./, ''):'';

        if(rtvali){
            tvali = rtvali;
        }

        if(tvali){
            let dmv = req.helpers.json.val(vdata, a);

            for(const b in dmv){
                if(b === 'otp'){
                    vm = req.helpers.json.set(vm, `${tvali}`, dmv[b], false, true);
                }else{

                    vm = req.helpers.json.set(vm, `${tvali}.${b}`, dmv[b], false, true);
                }
            }

            rv[a] = vm;
        }        
    }

    delete rval.data;
    rval.data = rv;

    return rval;
}

exports.setReqData = setReqData;
exports.mapValidationResp = mapValidationResp;