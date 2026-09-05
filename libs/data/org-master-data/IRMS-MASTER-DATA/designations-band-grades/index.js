module.exports = {
    details:{
        "details": {
            "value": "DGBG"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Designations band & grades",
        "description":"Designations band & grades",
    },
    childs:{
        0:require('./band'),
        1:require('./grades')
    }
}