module.exports = {
    types:{
        all:[
            {
                id:1,
                label:"Group/Merchant Global Access"
            }, {
                id:2,
                label:'Group/Merchant department wise access'
            }, {
                id:3,
                label:'Group/Merchant role base access'
            }, {
                id:4,
                label:'Group/Merchant team base access'
            }, {
                id:5,
                label:'Group/Merchant user assigned access'
            }, {
                id:6,
                label:"Employer global Access"
            }, {
                id:7,
                label:'Employer department wise access'
            }, {
                id:8,
                label:'Employer role base access'
            }, {
                id:9,
                label:'Employer team base access'
            }, {
                id:10,
                label:'Employer user assigned access'
            }
        ]
    },
    enums:{
        all:{
            1:'GROUP.GLOBAL',
            2:'GROUP.DEPARTMENT',
            3:'GROUP.ROLE',
            4:'GROUP.TEAM',
            5:'GROUP.USER-ASSIGNED',
            6:'EMPLOYER.GLOBAL',
            7:'EMPLOYER.DEPARTMENT',
            8:'EMPLOYER.ROLE',
            9:'EMPLOYER.TEAM',
            10:'EMPLOYER.USER-ASSIGNED',
        }
    }
}