const init = async (req, res, next) => {
    await req.helpers.devops.script.history.init(req, res, next);
}

exports.init = init;