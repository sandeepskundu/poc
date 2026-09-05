exports.department = {
    enums:[
        {
            id:'DEPART', 
            label: 'Departments'
        }, {
            id:'ROLE',
            label:'Role'
        }, {
            id:'BAND',
            label:'Band'
        },  {
            id:'GRADE',
            label:'Grade'
        }
    ]
}

exports.access = {
    api:{
        presets:{
            types:[
                {
                    id:'ORG-GLOBAL',
                    label:'Org global access'
                }, {
                    id:'DEPART', 
                    label: 'Departments base presets'
                }, {
                    id:'ROLE',
                    label:'Role base presets'
                }
            ]
        }
    }
}