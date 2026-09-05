const base = {
    home: {
        view: 'login',
        name: 'login',
        path: '',
    },
    childs: {
        password:{
            view: 'password',
            name: 'password',
            path: 'password/:action/:otpToken?/:trackId?',
        },
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};