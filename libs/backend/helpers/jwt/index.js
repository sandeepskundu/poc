const jwt = process.nodeModules('jsonwebtoken');

const data = (val) => {
    if(val && typeof val === 'object'){
        return val;
    }else{
        return {
            data:val
        }
    }
}

const secret = (key) => {
    return (key || 'AIOFOUNCATION');
}

const config = (conf) => {
    return conf || {};
}

exports.sign = (value, key, conf) => {
    return jwt.sign(data(value), secret(key), config(conf));
}

exports.verify = (value, key) => {
    try {
        return jwt.verify(value, secret(key), config());
    } catch(e) {
        return null;
    }
}