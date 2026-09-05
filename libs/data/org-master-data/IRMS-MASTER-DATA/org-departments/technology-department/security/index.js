module.exports = {
    details:{
        "details": {
            "value": "SECU"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Security",
        "description":"Security - A critical function within the Technology Department dedicated to protecting the company's digital assets, infrastructure, and data from unauthorized access, cyber threats, and vulnerabilities. This function involves implementing robust security architectures, enforcing access controls, conducting vulnerability assessments, and ensuring compliance with relevant regulations and standards. Security teams monitor systems for potential threats, respond to incidents, and conduct regular audits to maintain resilience against evolving risks. Beyond defense, the function promotes a security-first culture by providing guidelines, training, and best practices to all technology and business units.",
    },
    childs:{
        0:require('./network-security'),
        1:require('./application-security'),
        2:require('./cloud-security'),
        3:require('./identity-access-management'),
        4:require('./information-security'),
        5:require('./security-operations')
    }
}