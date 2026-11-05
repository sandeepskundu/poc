exports.engine = [
    {
        id: 'mongoDB',
        label: 'MongoDB',
    }, {
        id: 'postgreSQL',
        label: 'PostgreSQL',
    }, {
        id: 'mysql',
        label: 'MySQL',
    }, {
        id: 'oracle',
        label: 'Oracle',
    }, {
        id: 'sqlserver',
        label: 'SQLServer',
    }, {
        id: 'redis',
        label: 'Redis',
    }, {
        id: 'elasticsearch',
        label: 'Elasticsearch',
    }, {
        id: 'snowflake',
        label: 'Snowflake',
    }
]

exports.dbModel = [
    {
        id: 'document',
        label: 'Document',
    }, {
        id: 'key-value',
        label: 'Key-Value',
    }, {
        id: 'relational',
        label: 'Relational',
    }, {
        id: 'search',
        label: 'Search',
    }, {
        id: 'columnar',
        label: 'Columnar',
    }, {
        id: 'graph',
        label: 'Graph',
    }, {
        id: 'other',
        label: 'Other',
    }
]

exports.purposeType = [
    {
        id: 'primary',
        label: 'Primary (OLTP)',
    }, {
        id: 'analytics',
        label: 'Analytics (OLAP)',
    }, {
        id: 'cache',
        label: 'Cache',
    }, {
        id: 'reporting',
        label: 'Reporting'
    }
]

exports.dataSensitivity = [
    {
        id: 'public',
        label: 'Public',
    }, {
        id: 'internal',
        label: 'Internal',
    }, {
        id: 'confidential',
        label: 'Confidential',
    }, {
        id: 'restricted-PII',
        label: 'Restricted/PII'
    }
]

exports.status = [
    {
        id: 'active',
        label: 'Active',
    }, {
        id: 'planned',
        label: 'Planned',
    }, {
        id: 'deprecated',
        label: 'Deprecated',
    }, {
        id: 'decommissioned',
        label: 'Decommissioned'
    }
]