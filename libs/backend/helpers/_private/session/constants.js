module.exports = {
    EXPIRY:{
        AUTH:'30D',
        SESSION:'365D'
    },
    COOKIE:{
        SSO:['ss', 'oT', 'ok', 'en'].join(''),
        WINDOW:['ws', 'T', 'ok', 'en'].join(''),
    },
    SECRETS:{
        JWT:'JWTSESSIONAIOFOUNDATIONJWTSESSION',
        CRYPTO:'CRYPTOSESSIONAIOFOUNDATIONCRYPTOSESSION',
    }
}