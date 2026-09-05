const getPath = async (req, key) => {
    let md = req.helpers.merchant.details(req);
    let rpath = req.helpers.path.get.rootRepo();
        rpath = req.helpers.string.remove.dot(`${rpath}/_cache/${md.id}/${key}`);

    return req.helpers.url.sanitize(`${rpath}.json`);
}

const getTtl = async (req, ttl) => {
    if(ttl){
        let isnum = req.helpers.data.type.is(ttl, 'number');
        
        if(isnum){
            return (Date.now()+ttl)
        }else{
            let isstr = req.helpers.data.type.is(ttl, 'string');
            let ms = req.helpers.date.timestamp.valueIn(ttl, 'MS');

            if(isstr && ms){
                return (Date.now()+ms)
            }
        }
    }

    return null;
}

const del = async (req, key) => {
    req.helpers.file.writer.async.remove(await getPath(req, key));
}
    
const get = async (req, key) => {
    const record = await req.helpers.file.reader.async.init(await getPath(req, key), false, 'json');
    const data = req.helpers.json.val(record, 'data');
    const expat = req.helpers.json.val(record, 'meta.expiresAt');

    if (expat && Date.now() > expat) {
        del(req, key)
        return null;
    }else{
        return data;
    }
}
    
const set = async (req, key, data, ttl) => {
    if(key && data){
        await req.helpers.file.writer.async.write(await getPath(req, key), JSON.stringify({
            data:data,
            meta:{
                expiresAt:await getTtl(req, ttl)
            }
        }));
    }
}

/*--

GET  ===>  await req.helpers.cache.file.get(req, 'location/of/cache/file');
DEL  ===>  await req.helpers.cache.file.del(req, 'location/of/cache/file');
SET  ===>  await req.helpers.cache.file.set(req, 'location/of/cache/file', data, 10);

--*/

exports.set = set;
exports.get = get;
exports.del = del;