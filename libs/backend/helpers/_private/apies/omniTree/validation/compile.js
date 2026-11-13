const byType = async (rval, type, req, routeConf, globalConf) => {
    let rmodel = req.helpers.json.get(routeConf, `validation.validation.${type}`, {});
    let gmodel = req.helpers.json.get(globalConf, `validation.validation.${type}`, {});
        rval = req.helpers.json.merge(rval, gmodel);
        rval = req.helpers.json.merge(rval, rmodel);

    return rval;
}

const body = async (rval, req, routeConf, globalConf) => {
    return await byType(rval, 'body', req, routeConf, globalConf);
}

const params = async (rval, req, routeConf, globalConf) => {
    return await byType(rval, 'params', req, routeConf, globalConf);
}


exports.body = body;
exports.params = params;