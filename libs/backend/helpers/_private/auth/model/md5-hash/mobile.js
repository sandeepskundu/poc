const hash = {
    "nodes":{
        "0":{
            "map":"runtimeUtils.merchantRootHash",
            "from":"appConfig"
        },
        "1":{
            "map":"org.mobile.iso2",
            "from":"body-item"
        },
        "2":{
            "map":"org.mobile.iso3",
            "from":"body-item"
        }, 
        "3":{
            "map":"org.mobile.isd",
            "from":"body-item"
        }, 
        "4":{
            "map":"org.mobile.number",
            "from":"body-item"
        }
    }
}

exports.md5Hash = hash;