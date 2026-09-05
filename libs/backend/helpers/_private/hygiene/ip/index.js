const get = async (req) => {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress;

    return ip.replace(/^::ffff:/, '')
}

exports.get = get;