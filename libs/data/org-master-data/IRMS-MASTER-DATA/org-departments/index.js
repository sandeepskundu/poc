module.exports = {
    details:{
        "details": {
            "value": "ORGD"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Organization Departments",
        "description":"Organization Department Master Data is the authoritative, structured list of all departments within a organization, along with their key attributes, identifiers, and hierarchy. It serves as the central reference for defining departmental structures, relationships, and responsibilities across the organization.",
    },
    childs:{
        0:require('./founding-department'),
        1:require('./governance-department'),
        2:require('./technology-department'),
        3:require('./hr-department')
    }
}