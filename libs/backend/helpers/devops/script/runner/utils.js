const getModel = async (req, type) => {
    return req.helpers.json.get(req, `mdb.models.${type === 'run'?'devopsscriptrun':'devopsscriptrunbucket'}`, {})
}

exports.getModel = getModel;