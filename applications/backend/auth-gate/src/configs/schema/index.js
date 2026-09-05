const config = require('./config');

exports.compiler = async (private, appConfig, req, res, next) => {
    const rval = [];
    const list = [
        await private.builder.start('auth', 'employess', req, {}),
        await private.builder.start('auth', 'users', req, config.users)
    ]

    for(const a in list){
        if(list[a]){
            rval.push(list[a]);
        }
    }

    return rval;
}
