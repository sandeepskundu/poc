
const includes = async (req, res, next) => {
    let id = req.helpers.json.val(req, 'params.id', '');
    let inc = req.helpers.json.val(req, 'body.data.token', '');

    if(inc){
        let rval = req.helpers.crpt.decrypt(inc, id);
        
        if(rval){
            return req.helpers.json.val(rval, 'includes', {});
        }
    }

    return null;
}

module.exports = async (req, res, next) => {
    if(req.method === 'post' || req.method === 'POST'){
        let rv = {};
        let inc = await includes(req, res, next);
        let rval = await process.aioBeLibs('helpers/_private/constants');
        let isfun = req.helpers.data.type.is(rval, 'function');

        if(inc === 'all'){
            if(isfun){
                rv = await rval(req);
            }else{
                rv = rval;
            }

            await req.helpers.express.response.respByCode(200, req, res, next, {data:rv});
        }else{
            let resp = {};
            let dv = req.helpers.random.number();
            let inclen = req.helpers.json.length(inc);

            if(inclen > 0){
                if(isfun){
                    rv = await rval(req);
                }else{
                    rv = rval;
                }

                for(let a in inc){
                    if(inc[a] === true){
                        let val = req.helpers.json.val(rv, a, dv);

                        if(val != dv){
                            resp = req.helpers.json.set(resp, a, val, false, true);
                        }
                    }
                } 
            }

            await req.helpers.express.response.respByCode(200, req, res, next, {data:resp});
        }
    }else{
        req.helpers.express.response.noFound('json', false, req, res, next)
    }
}