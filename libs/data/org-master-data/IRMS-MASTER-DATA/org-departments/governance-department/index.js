module.exports = {
    details:{
        "details": {
            "value": "GOVT"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Governance Department",
        "description":"Governance Department - The organizational unit responsible for establishing, monitoring, and enforcing policies, procedures, and ethical standards to ensure the company operates with transparency, accountability, and compliance with laws and regulations. This department oversees decision-making frameworks, risk management, and corporate conduct to safeguard the company's integrity and stakeholder interests."
    },
    childs:{
        0:require('./compliance'),
        1:require('./risk-management'),
        2:require('./internal-audit'),
        3:require('./corporate-affairs'),
        4:require('./admins')
    }
}