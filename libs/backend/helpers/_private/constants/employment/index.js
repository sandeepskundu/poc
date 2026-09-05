module.exports = {
    team:{
        type:[{
            "id": "grp",
            "label":"Group"
        }, {
            "id": "sub",
            "label":"Subsidiary"
        }]
    },
    band:require('./band'),
    type:require('./type'),
    status:require('./status'),
    grades:require('./grade'),
    workMode:require('./work-mode'),
    employedBy:require('./employed-by')
}