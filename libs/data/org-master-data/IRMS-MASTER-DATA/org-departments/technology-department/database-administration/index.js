module.exports = {
    details:{
        "details": {
            "value": "DBA"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Database Administration (DBA)",
        "description":"Database Administration (DBA) – The Database Administration function is responsible for designing, implementing, managing, and securing the organization’s databases to ensure reliable, efficient, and secure access to data. This team handles database architecture, schema design, and optimization for high performance, scalability, and availability. DBAs manage installations, configurations, backup and recovery strategies, and disaster recovery planning to protect against data loss. They enforce security policies, control access, monitor system health, and troubleshoot issues to maintain continuous database operations. Additionally, the team supports application development, data integration, and analytics initiatives by providing optimized and accessible datasets. By maintaining the integrity, performance, and compliance of databases, Database Administration plays a crucial role in enabling informed business decisions and seamless technology operations.",
    },
    childs:{
        0:require('./database-maintenance-optimization'),
        1:require("./backup-recovery"),
        2:require('./security-access-management'),
        3:require('./compliance-auditing')
    }
}