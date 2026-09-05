

module.exports = {
    types:{
        all:[
            {
                id:'fetch',
                label:"Read"
            }, {
                id:"create",
                label:'Write'
            }, {
                id:"update",
                label:"Update"
            }, {
                id:"remove",
                label:"Delete"
            }
        ]
    },
    permission:{
        type:{
            all:[
                {
                    id:0,
                    label:'Null and avoid'
                }, {
                    id:1,
                    label:'Not allowed'
                }, {
                    id:2,
                    label:'Allowed'
                }
            ]
        }
    }
}