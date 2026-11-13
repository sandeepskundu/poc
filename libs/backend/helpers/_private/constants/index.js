let map = {
    data:require('./data'),
    name:require('./name'),
    audit:require('./audit'),
    enums:require('./enums'),
    blood:require('./blood'),
    india:require('./india'),
    devops:require('./devops'),
    family:require('./family'),
    gender:require('./gender'),
    access:require('./access'),
    marital:require('./marital'),
    contact:require('./contact'),
    country:require('./country'),
    address:require('./address'),
    employment:require('./employment'),
    appConfigs:require('./app-configs'),
}

module.exports = async (req, extend) => {
    return map;
}