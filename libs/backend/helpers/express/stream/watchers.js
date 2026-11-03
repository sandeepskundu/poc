const watchers = new Map();

const get = async (req, id) => {
    if (watchers.has(id)) {
        return watchers.get(id);
    }else{
        return null
    }
}

const remove = async (req, id) => {
    watchers.delete(id)
};

const set = async (req, id, arg) => {
    watchers.set(id, arg);
}

exports.set = set;
exports.get = get;
exports.remove = remove;