const internalApi = require('./internal-api');

const encode = async (type, req, arg) => {
    switch (type) {
        case 'INTERNAL_API':
            return await internalApi.encode(req, arg)
        break;
        default:
            return null
    }
}

const decode = async (type, req, value) => {
    switch (type) {
        case 'INTERNAL_API':
            return await internalApi.decode(req, value)
        break;
        default:
            return null
    }
}

exports.encode = encode;
exports.decode = decode;