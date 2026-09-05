const jwt = require('jsonwebtoken');

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

const config = () => {
    return {}
}

exports.sign = (value, key) => {
    return jwt.sign(data(value), secret(key), config());
}

exports.verify = (value, key) => {
    try {
        return jwt.verify(value, secret(key), config());
    } catch(e) {
        return null;
    }
}