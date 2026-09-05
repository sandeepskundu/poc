const employee = process.aioAppModels('employee');
const permission = process.aioAppModels('permission');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        let must = {
            manager:true
        }
        let id = req.helpers.json.val(req, 'params.id', '');
        let type = req.helpers.json.val(req, 'params.subId', '');
        let vaild = await permission.helpers.validate.access.permissions(id, type, 'APP', must, req, res, next);

        if(vaild){
            let resp = await permission.find.getAccessByTypeAndItemId(id, type, req, res, next);
            let results = req.helpers.json.val(resp, 'data.result', []);

            if(results && results.length > 0){
                let rval = [];

                for(let a in results){
                    let item = results[a];
                    let ud = await employee.find.getMultipleTypeDetailsById({
                        cd:true,
                        pI:true,
                        employement:false
                    }, item.userId, req, res, next, true);
                    let udl = req.helpers.json.length(ud);

                    if(udl > 0){
                        item.ud = {...{id:item.userId}, ...ud};
                        rval.push(item);
                    }
                }

                if(rval.length > 0){
                    return await req.helpers.express.response.getRespByCode(200, req, res, next, {
                        data:{
                            result:rval
                        }
                    });
                }else{
                    return await req.helpers.express.response.noResult(req, res, next, {});
                }
            }else{
                return results;
            }
        }else{
            return req.helpers.express.response.noAccess(req, res, next, {})
        }
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}