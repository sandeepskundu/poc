module.exports = {
    details:{
        "details": {
            "value": "MDIRMS"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Master data - IRMS",
        "description": "Master Data refers to the core, non-transactional data that is essential for a company's operations and is used consistently across multiple systems, departments, and processes.",
    },
    childs:{
        0:require('./org-departments'),
        1:require('./designations'),
        2:require('./designations-band-grades')
    }
}