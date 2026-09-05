const ptoken = require('./token');

const get = async (respData, config, model, req, res, next) => {
    const ps = {
        has:{
            limit:req.helpers.json.val(respData, 'limit', 0),
            counter:req.helpers.json.val(respData, 'pagingCounter', 0),
            next:req.helpers.json.val(respData, 'hasNextPage', false),
            prev:req.helpers.json.val(respData, 'hasPrevPage', false),
        },
        state:{
            current:req.helpers.json.val(respData, 'page', 0),
            prev:req.helpers.json.val(respData, 'prevPage', 0),
            next:req.helpers.json.val(respData, 'nextPage', 0),
        },
        total:{
            pages:req.helpers.json.val(respData, 'totalPages', 0),
            records:req.helpers.json.val(respData, 'totalDocs', 0)
        }
    };

    const pt = await req.helpers.jwt.sign(ps);
    const token = await ptoken.en(pt, req, res, next);

    return {
        token:token,
        pId:req.helpers.crypto.md5(JSON.stringify(ps)),
        has:{
            limit:req.helpers.json.val(respData, 'limit', 0),
            next:req.helpers.json.val(respData, 'hasNextPage', false),
            prev:req.helpers.json.val(respData, 'hasPrevPage', false),
        },
        state:{
            current:req.helpers.json.val(respData, 'page', 0),
            prev:req.helpers.json.val(respData, 'prevPage', 0),
            next:req.helpers.json.val(respData, 'nextPage', 0),
        },
        total:{
            records:req.helpers.json.val(respData, 'totalDocs', 0)
        }
    }
}

exports.get = get;