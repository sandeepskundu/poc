const values = require('./../values');
const md5Hash = require('./../md5-hash');

module.exports = {
    "valuemap":{},
    "values":values.always,
    "md5Hash":{
        "emailHash":md5Hash.email.md5Hash,
        "mobileHash":md5Hash.mobile.md5Hash
    },

    "schema":{
        "email":true,
        "mobile":true,
        "emailHash":true,
        "mobileHash":true
    },

    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        }
    }
}