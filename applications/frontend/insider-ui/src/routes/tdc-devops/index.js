const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        0:{
            name: 'pipelines',
            view: 'pipelines',
            path: 'pipelines',
        },
        1:{
            name: 'ui-pipelines',
            view: 'ui-pipelines',
            path: 'ui-pipelines', 
        },
        2:{
            name:'prepair-ui-application',
            view: 'prepair-ui-application',
            path: 'prepair-ui-application', 
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};