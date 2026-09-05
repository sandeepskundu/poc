const map = {
    cart:require('./cart'),
    user:require('./user'),
    login:require('./login'),
    account:require('./account')
}

exports.compile = () => {
    return map;
}