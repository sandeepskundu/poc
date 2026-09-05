const getKey = async (req, id) => {
    return `access/${id}`
}

const get = async (req, id) => {
    return await req.helpers.cache.file.get(req, await getKey(req, id));
}

const set = async (req, id, data) => {
    await req.helpers.cache.file.set(req, await getKey(req, id), data);
}

const del = async (req, id) => {
    await req.helpers.cache.file.del(req, await getKey(req, id));
}

exports.get = get;
exports.set = set;
exports.del = del;