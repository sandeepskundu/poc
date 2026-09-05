module.exports = {
    map:require('./map'),
    role:require('./role'),
    from:require('./from'),
    actions:require('./actions'),

    rolebaseAccess:{
        permissons:{
            types:[
                {
                    id:'reader',
                    label:"Reader"
                }, {
                    id:'blocked',
                    label:"Blocked"
                }
            ]
        }
    },

    team:{
        types:{
            default:[
                {
                    id:'user',
                    label:'User access team'
                }, {
                    id:'accessrole',
                    label:'Access role team'
                }
            ]
        }
    },

    link:{
        for:[
            {
                id:'grp',
                label:"Group"
            }, {
                id:'emp',
                label:"Employer"
            }
        ],
        type:[
            {
                id:'grp',
                label:"Group"
            }, {
                id:'emp',
                label:"Employer"
            }, {
                id:'bsu',
                label:"Business Unit"
            }, {
                id:'bsv',
                label:'Business Vertical'
            }, {
                id:'dep',
                label:'Department'
            }, {
                id:'des',
                label:'Designation'
            }
        ]
    }
}