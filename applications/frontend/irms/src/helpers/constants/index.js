exports.access = {
    api:{
        presets:{
            code:[
                {
                    id:'ORG-GLOBAL',
                    label:'Org-wide access'
                }, {
                    id:'DEPART', 
                    label: 'Presets by department'
                }, {
                    id:'ROLE',
                    label:'Presets by role'
                }
            ]
        }
    }
}

exports.enums = {
    mappingLastIndexVal:{
        required:'__LAST__ITEM__ENUM__',
        optional:'fb72d5e5b3d14ac9e454ffe3fe6a879b' // helpers.crpt.md5('aio_aiodeals.com_aio')
    }
}