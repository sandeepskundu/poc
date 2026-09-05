const model = process.aioBeLibs('helpers/_private/auth/model');

module.exports = {
    "values":model.values.always,
    "md5Hash":{
        "passwordHash":model.md5Hash.password.md5Hash
    },

    "schema":{
        "passwordHash":true,
    },

    "valuemap": {},
}