const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        hierarchy:{
            view: 'hierarchy',
            name: 'hierarchy',
            path: 'hierarchy/:action/:id?',
        },
        apiPresets:{
            view: 'api-presets',
            name: 'apiPresets',
            path: 'apiPresets/:action/:id?',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};