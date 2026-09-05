const create = (req, res, next) => {
    const id = req.helpers.uuid.create();
    const iId = req.helpers.uuid.create();

    return {
        firewallId:id,
        firewallToken:req.helpers.crpt.encrypt({
            "id":iId,
            "token":req.helpers.jwt.sign({
                "id":id
            }, iId)
        }, id)
    }
}


const validate = (req, res, next) => {
    let token = create(req, res, next);
        res.header('fwId', token.firewallId);
        res.header('token', token.firewallToken);
}

exports.validate = validate;