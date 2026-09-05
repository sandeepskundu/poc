const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: 'dashboard',
    },
    childs: {
        list:{
            name: 'list',
            view: 'list',
            path: 'list/:type?',
        },
        details: {
            name: 'details',
            view: 'details',
            path: 'details/:action/:appId?',
        },
        method: {
            name: 'method',
            view: 'method',
            path: 'method/:mode/:type/:appId/:parentId?/:methodId?',
        },
        controller: {
            name: 'controller',
            view: 'controller',
            path: 'controller/:type/:appId/:parentId?',
        },
        prepaireToBuild:{
            name: 'prepaire-to-build',
            view: 'prepaire-to-build',
            path: 'prepaireToBuild',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{}
};