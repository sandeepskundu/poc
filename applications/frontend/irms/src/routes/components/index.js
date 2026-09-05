const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        dot:{
            view:'dot',
            name:'dot',
            path:'dot',
        },
        image:{
            view:'image',
            name:'image',
            path:'image',
        },
        avatar:{
            view:'avatar',
            name:'avatar',
            path:'avatar',
        },
        badge:{
            view:'badge',
            name:'badge',
            path:'badge',
        },
        bubble:{
            view:'bubble',
            name:'bubble',
            path:'bubble',
        },
        inputs:{
            view: 'inputs',
            name: 'inputs',
            path: 'inputs',
        },
        buttons:{
            view: 'buttons',
            name: 'buttons',
            path: 'buttons',
        },
        buttonGroup:{
            view: 'button-group',
            name: 'buttonGroup',
            path: 'buttonGroup',
        },

        typography:{
            view: 'typography',
            name: 'typography',
            path: 'typography',
        },
        divider:{
            view:'divider',
            name:'divider',
            path:'divider',
        },
        contentRow:{
            name:'contentRow',
            path:'contentRow',
            view:'content-row'
        },

        listBox:{
            name:'listBox',
            path:'listBox',
            view:'list-box'
        },

        listItem:{
            name:'listItem',
            path:'listItem',
            view:'list-item'
        },

        listHeader:{
            name:'listHeader',
            path:'listHeader',
            view:'list-header'
        },
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};