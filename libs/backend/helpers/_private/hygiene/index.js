const ip = require('./ip');
const apiHash = require('./api-hash');

exports.ip = ip;

exports.req = async (req) => {
    req.aioHd = {
        ip:await ip.get(req),
        apiHash:await apiHash.get(req)
    }
}