module.exports = {
    details:{
        "details": {
            "value": "TECH"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Technology Department",
        "description":"Technology Department - The organizational unit responsible for developing, implementing, and maintaining the company's technology infrastructure, software systems, and digital solutions. It ensures operational efficiency, drives innovation, supports business processes, and safeguards information security. This department also researches emerging technologies to enhance competitiveness and deliver strategic value.",
    },
    childs:{
        0:require('./software-development'),
        1:require('./quality-assurance'),
        2:require('./devOps-infrastructure '),
        3:require('./security'),
        4:require('./data-science-analytics'),
        5:require('./database-administration')
    }
}