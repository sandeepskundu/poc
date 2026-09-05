const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        0:{
            view: 'apps',
            name: 'apps',
            path: 'apps'
        },
        1:{
            view: 'apps-list',
            name: 'apps-list',
            path: 'apps/list/:type'
        },
        2:{
            view: 'app-details-form',
            name: 'app-details-form',
            path: 'app/details/:type/:id?'
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};