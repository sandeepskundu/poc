const start = async (from, name, req, extra) => {
    const schema = await process.aioBeLibs(`helpers/_private/schemas/definations/${from}`);
    const val = req.helpers.json.val(schema, `get`);
    const isobj = req.helpers.data.type.is(val, 'object');
    const func = req.helpers.data.type.is(val, 'function');
    const collname = req.helpers.string.transform.camelize(name);

    if(func){
        return await val(collname, await process.aioBeLibs(`helpers/_private/schemas/structures`), req, (extra || {}));
    }else{
        if(isobj){
            return req.helpers.json.merge(val, (extra || {}));
        }else{
            return false;
        }
    }
}

exports.start = start;