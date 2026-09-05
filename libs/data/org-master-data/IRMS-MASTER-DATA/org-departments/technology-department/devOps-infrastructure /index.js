module.exports = {
    details:{
        "details": {
            "value": "DOPS"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"DevOps & Infrastructure",
        "description":"DevOps & Infrastructure is responsible for designing, building, and maintaining the technical foundation that supports the company’s software products and services. This function bridges the gap between software development and IT operations, ensuring that applications are delivered quickly, reliably, and securely. Key responsibilities include managing cloud and on-premise infrastructure, implementing Continuous Integration and Continuous Deployment (CI/CD) pipelines, monitoring system performance, automating operational processes, and maintaining robust security and compliance measures. The team also ensures scalability, high availability, and disaster recovery readiness, enabling smooth product releases and minimal downtime. By fostering a culture of automation, collaboration, and performance optimization, DevOps & Infrastructure plays a critical role in accelerating delivery cycles, reducing operational risks, and providing a stable, secure environment for the organization’s technology ecosystem.",
    },
    childs:{
        0:require('./configuration-management'),
        1:require('./monitoring-logging'),
        2:require('./collaboration-support')
    }
}