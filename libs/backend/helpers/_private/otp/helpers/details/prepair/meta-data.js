const create = async (config, req, res) => {
    return {
        ip:req.helpers.json.val(req, 'aioHd.ip'),
        apiHash:req.helpers.json.val(req, 'aioHd.apiHash'),
        userAgent:req.helpers.json.val(req, 'headers.user-agent', '')
    }
}

exports.create = create;