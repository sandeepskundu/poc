module.exports = {
    details:{
        "details": {
            "value": "QUAS"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Quality Assurance (QA)",
        "description":"Quality Assurance (QA) - A function within the Technology Department responsible for ensuring that all software products and systems meet defined quality standards before release. QA teams plan and execute testing strategies, including functional, performance, security, and usability testing, to identify defects and verify that solutions meet business and user requirements. They work closely with development teams to ensure continuous improvement, minimize errors, and deliver reliable, high-performance products.",
    },
    childs:{
        0:require('./fullstack'),
        1:require('./manual-testing'),
        2:require('./automation-testing'),
        3:require('./performance-testing'),
        4:require('./security-testing'),
        5:require('./regression-testing')
    }
}