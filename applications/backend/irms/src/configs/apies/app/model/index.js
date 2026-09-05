module.exports = {
    query:require('./query'),
    schema:require('./schema'),
    md5Hash:require('./md5-hash'),
    response:require('./response'),
    valuemap:require('./valuemap'),
    signature:require('./signature'),

    permissions:{
        enable:true,
        configs:{
            permissions:{
                enable:true,
                checks:{
                    code:'APP'
                }
            }
        }
    }
}