const consts = async (req, extend) => {
    let rv = {};
    let rval = await process.aioBeLibs('helpers/_private/constants');
    let isfun = req.helpers.data.type.is(rval, 'function');

    if(isfun){
        rv = await rval(req)
    }else{
        rv = rval
    }

    let isObj = req.helpers.data.type.is(rv, 'object');
    let isExtObj = req.helpers.data.type.is(extend || {}, 'object');

    if(isObj && isExtObj){
        return req.helpers.json.merge(rv, extend || {});
    }

    return {}
}

exports.async = {
    init:async (req, paths, config, extend) => {
        return await req.helpers.json.enums(await consts(req, extend), paths, config)
    }
}