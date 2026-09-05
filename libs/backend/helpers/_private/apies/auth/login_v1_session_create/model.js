const model = process.aioBeLibs('helpers/_private/auth/model');

module.exports = {
    "values":model.values.always,
    "md5Hash":{
        "emailHash":model.md5Hash.email.md5Hash,
        "mobileHash":model.md5Hash.mobile.md5Hash,
        "usernameHash":model.md5Hash.username.md5Hash,
        "passwordHash":model.md5Hash.password.md5Hash,
    },

    "schema":{
        "emailHash":true,
        "mobileHash":true,
        "usernameHash":true,
        "passwordHash":true,
    }
}