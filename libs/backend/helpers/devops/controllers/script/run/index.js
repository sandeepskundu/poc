const init = async (req, res, next, payload) => {
    await req.helpers.devops.script.runner.init(req, res, next, payload);
}

exports.init = init;