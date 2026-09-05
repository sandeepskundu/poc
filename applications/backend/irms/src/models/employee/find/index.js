const auth = process.aioBeLibs('helpers/_private/auth');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                vd:true,
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const personalInfoById = async (id, req, res, next, raw) => {
    let pi = await mongodb.query.find.init('empInfo', {mapId:id}, qp, req, res, next);
    let details = req.helpers.json.val(pi, 'data.result.0', {});
    let detailsLen = req.helpers.json.length(details);

    if(detailsLen > 0){

        if(raw){
            return details;
        }else{
            return await req.helpers.express.response.getRespByCode(200, req, res, next, {
                data:{
                    result:[{
                        pI:details
                    }]
                }
            })
        }
        
    }else{
        if(raw){
            return {}
        }else{
            return await req.helpers.express.response.noResult(req, res, next, {});
        }
    }
}

const detailsById = async (id, req, res, next, raw) => {
    let emps = await mongodb.query.find.init('emps', {_id:id}, qp, req, res, next);
    let details = req.helpers.json.val(emps, 'data.result.0', {});
    let detailsLen = req.helpers.json.length(details);

    if(detailsLen > 0){
        let item = await auth.helpers.response.send({data:details.toJSON()}, req, req, next);

        if(raw){
            return req.helpers.json.val(item, 'data', {});
        }else{
            let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
                rval.data = {
                    result:[{
                        cd:req.helpers.json.val(item, 'data', {})
                    }]
                };

            return rval;
        }
    } else{
        if(raw){
            return {};
        }else{
            return await req.helpers.express.response.noResult(req, res, next, {});
        }
        
    }
}

const employementInfoById = async (mapId, req, res, next, raw) => {
    let infos = await mongodb.query.find.refined('employmentInfo', {mapId:mapId}, qp, req, res, next);
    let details = req.helpers.json.val(infos, '0', {});
    let detailsLen = req.helpers.json.length(details);

    if(detailsLen > 0){
        details.bu = await mongodb.query.find.refined('businessUnit', {_id:details.bu}, qp, req, res, next, true);
        details.location = await mongodb.query.find.refined('officeAdd', {_id:details.location}, qp, req, res, next, true);
        details.designation = await mongodb.query.find.refined('roles', {_id:details.designation}, qp, req, res, next, true);
        details.bv = await mongodb.query.find.getByMap('businessVerticals', details.bv, '_id', {}, qp, req, res, next, true);
        details.department = await mongodb.query.find.getByMap('departments', details.department, '_id', {}, qp, req, res, next, true);

        if(details.employedBy === "GROUP"){

        }else{
            details.employer = await mongodb.query.find.refined('employer', {_id:details.employer}, qp, req, res, next, true);
        }

        if(raw){
            return details;
        }else{
            return await req.helpers.express.response.getRespByCode(200, req, res, next, {
                data:{
                    result:[details]
                }
            });
        }
    }else{
        if(raw){
            return {};
        }else{
            return await req.helpers.express.response.noResult(req, res, next, {});
        }
    };
}

const teams = async (mapId, req, res, next, raw) => {
    let rval = {};
    let list = await mongodb.query.find.refined('empTeam', {empId:mapId}, qp, req, res, next);
    let llen = req.helpers.json.length(list);
    let tqp = req.helpers.json.merge(qp, {
        response:{
            exclude:{
                kies:{
                    vd:false
                }
            },
        }
    })

    if(llen > 0){

        for(let a in list){
            let item = list[a];
            let type = req.helpers.json.val(item, 'type');
            let team = await mongodb.query.find.refined('team', {_id:item.teamId}, tqp, req, res, next);
            let detail = {
                type:req.helpers.json.val(item, 'type'),
                vd:req.helpers.json.val(team, '0.vd', {}),
                name:req.helpers.json.val(team, '0.name', ''),
                description:req.helpers.json.val(team, '0.description', '')
            }

            switch (type) {
                case 1:
                    rval['group'] = rval['group'] || [];
                    rval['group'].push(detail)
                break;
                case 2:
                    rval['merchant'] = rval['merchant'] || [];
                    rval['merchant'].push(detail)
                break;
            }
        }
    }

    return rval;
}

const getMultipleTypeDetailsById = async (types, id, req, res, next, raw) => {
    let rval = {};
    let map = {
        teams:teams,
        cd:detailsById,
        pI:personalInfoById,
        employement:employementInfoById
    }

    if(types){
        for(let a in types){
            if(types[a] && map[a]){
                let d = await map[a](id, req, res, next, true);
                    rval[a] = d || {};
            }
        }
    }

    let rl = req.helpers.json.length(rval);

    if(rl > 0){

        if(raw){
            return rval;
        }else{
            return await req.helpers.express.response.getRespByCode(200, req, res, next, {
                data:{
                    result:[rval]
                }
            });
        }
    }else{
        if(raw){
            return {}
        }else{
            return await req.helpers.express.response.noResult(req, res, next, {});
        }
    }
}

const allEmployeeByMerchant = async (req, res, next) => {
    const list = [];
    const emps = await mongodb.query.find.init('emps', {}, qp, req, res, next);
    const results = req.helpers.json.val(emps, 'data.result', []);

    for(const a in results){
        let u = await getMultipleTypeDetailsById({
            cd:true,
            pI:true
        }, results[a]._id.toString(), req, res, next, true);

        list.push({...{id:results[a]._id.toString()}, ...u});
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

exports.detailsById = detailsById;
exports.personalInfoById = personalInfoById;
exports.employementInfoById = employementInfoById;
exports.allEmployeeByMerchant = allEmployeeByMerchant;
exports.getMultipleTypeDetailsById = getMultipleTypeDetailsById;
