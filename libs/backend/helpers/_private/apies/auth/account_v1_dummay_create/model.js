const model = process.aioBeLibs('helpers/_private/auth/model');

module.exports = {
    "valuemap":{},
    "values":model.values.always,
    "md5Hash":{
        "emailHash":model.md5Hash.email.md5Hash,
        "mobileHash":model.md5Hash.mobile.md5Hash
    },

    "schema":{
        "email":true,
        "mobile":true,
        "emailHash":true,
        "mobileHash":true
    }
}