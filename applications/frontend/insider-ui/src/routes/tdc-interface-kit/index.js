const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: 'dashboard',
    },
    childs: {
        0:{
            name: 'uiComponents',
            view: 'ui-components',
            path: 'uiComponents/:action/:id?',
        },

        details: {
            name: 'details',
            view: 'details',
            path: 'details/:action/:appId?',
        },
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{}
};