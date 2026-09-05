module.exports = {
    details:{
        "details": {
            "value": "ADMN"
        },
        "hasChilds":false,
        "isAccessControlled":true,
        "name":"Admins",
        "description":"Admin is a top-tier administrator responsible for governance, configuration, and oversight across all subsidiaries, business units, or companies within a group. This role operates above individual company or department admins and ensures consistency, security, and compliance at the group level."
    },
    childs:{
        0:require('./users')
    }
}