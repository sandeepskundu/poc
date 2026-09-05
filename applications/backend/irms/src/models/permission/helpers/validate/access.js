const permission = process.aioAppModels('permission');

const permissions = async (itemId, type, code, match, req, res, next) => {
    let rv = true;
    let d = await permission.find.getAuthUserAccessByTypeItemIdAndCode(itemId, type, code, req, res, next);
    let acs = req.helpers.json.val(d, 'access', {});

    let random = req.helpers.random.number();
    let acsLen = req.helpers.json.length(acs || {});
    let matchLen = req.helpers.json.length(match || {});
    let ismObj = req.helpers.data.type.is(match, 'object');
    let isacsObj = req.helpers.data.type.is(acs, 'object');

    if((ismObj && isacsObj) && (acsLen > 0 && matchLen > 0)){
        for(let a in match){
            let aval = req.helpers.json.val(acs, a, random);
            let mval = req.helpers.json.val(match, a, random);

            if(mval != aval){
                rv = false;
                break;
            }
        }
    }else{
        return false;
    }

    return rv;
}

exports.permissions = permissions;