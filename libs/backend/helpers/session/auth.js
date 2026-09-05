const session = process.aioBeLibs('helpers/_private/session');

const getAuthDetails = (req, res) => {
    return session.details(req);
}

const getSessionDetails = (req, res) => {
    let td = req.helpers.cookie.get(scName(), req, res);
        td = req.helpers.crypto.de(td);
    return req.helpers.jwt.verify(td);
}


exports.authDetails = getAuthDetails;
exports.sessionDetails = getSessionDetails
