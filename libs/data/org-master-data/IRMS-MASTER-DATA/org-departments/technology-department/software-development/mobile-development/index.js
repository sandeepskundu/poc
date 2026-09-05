module.exports = {
    details:{
        "details": {
            "value": "MOBL"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Mobile Development",
        "description":"Mobile Development - A sub-function of Software Development dedicated to designing, building, and maintaining applications for mobile devices across platforms such as iOS and Android. It focuses on performance optimization, responsive design, and integration with backend services to deliver seamless, secure, and user-friendly mobile experiences.",
    },
    childs:{
        0:require('./ios-development'),
        1:require('./android-development')
    }
}