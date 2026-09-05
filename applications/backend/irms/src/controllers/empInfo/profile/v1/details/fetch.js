const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');



module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        const qp = {
            response:{
                exclude:{
                    enable:true,
                    kies:{
                        ts:true,
                        vd:true,
                        mapId:true
                    }
                },
            },
            query:{
                runtime:{
                    enable:true,
                    configs:{
                        query:{
                            0:{
                                cloumn:"mapId",
                                value:{
                                    map:"userId",
                                    from:"auth"
                                },
                                operation:{
                                    eq:{
                                        enable:true,
                                        opType:"eq"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        const pi = await mongodb.query.find.init('empInfo', {}, qp, req, res, next);

        const rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
            rval.data = {
                cd:req.helpers.json.val(ad, 'cd', {}),
                pI:req.helpers.json.val(pi, 'data.result.0', {})
            }

        return rval;
    }else{
        //return await auth.module.insert.save.withouthOtp(req.helpers.json.val(req, 'body.data', {}), req, res, false, false);
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}