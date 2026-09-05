module.exports = {
    details:{
        "details": {
            "value": "DEVP"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Software Development",
        "description":"Software Development – A function within the Technology Department responsible for designing, coding, testing, and maintaining software applications that support the company’s operations and strategic goals. It collaborates with stakeholders to build scalable, secure, and user-friendly solutions, ensuring high performance and continuous improvement.",
    },
    childs:{
        0:require('./frontend-development'),
        1:require('./backend-development'),
        2:require('./full-stack-development'),
        3:require('./mobile-development')
    }
}