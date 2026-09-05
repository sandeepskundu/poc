const permission = process.aioAppModels('permission');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const ppermission = process.aioBeLibs('helpers/_private/permission/details');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const findByUserByCate = async (cate, req, res, next) => {
    let results = [];

    let permissions = await permission.find.findByUserAndCode('APP', req, res, next);
        permissions = req.helpers.json.val(permissions, 'data.result', []);



    let permConfigs = {
        orders:['permission', 'access'],

        permission:{
            code:'APP',
        },
        access:{
            checks:{
                0:{
                    type:'group',
                    map:'',
                }
            }
        }
    }

        debugger;

    let up = await ppermission.get(req);

        console.log(ppermission, up);



    let search = {
        by:'permission' // access >>>>>>>>>>>>  Here permission is assigned access for perticular item to that user and access is by default granted access to that user or
    }








































































































































































































































    

    //let apps = await mongodb.query.find.init('app', {category:cate}, qp, req, res, next);
    //    apps = req.helpers.json.val(apps, 'data.result', {});

       // results = req.helpers.json.toList(apps);

    if(permissions && permissions.length > 0){
        for(let a in permissions){
            let perms = permissions[a];
            let appId = req.helpers.json.val(perms, 'itemId', '');
            let apps = await mongodb.query.find.init('app', {_id:appId, category:cate}, qp, req, res, next);
            let app = req.helpers.json.val(apps, 'data.result.0', {})
            let alen = req.helpers.json.length(app);

            if(alen > 0){
                app = app.toJSON();
                app.permissions = {
                    perms:req.helpers.json.val(perms, 'perms', {}),
                    access:req.helpers.json.val(perms, 'access', {})
                }
                results.push(app);
            }
        }
    }else{
        debugger;
    }

    if(results.length > 0){
        let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
            rval.data = {
                result:results
            };

        debugger;

        return rval;
    }else{
        return await req.helpers.express.response.noResult(req, res, next, {});
    }
}

exports.findByUserByCate = findByUserByCate;