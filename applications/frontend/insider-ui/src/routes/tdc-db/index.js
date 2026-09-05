const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        api: {
            name: 'api',
            view: 'api',
            path: 'api',
        },
        databases:{
            name: 'databases',
            view: 'databases',
            path: 'databases',
        },
        collections:{
            name: 'collections',
            view: 'collections',
            path: 'collections/:dbId',
        },
        collectionDetails:{
            name: 'collectionDetails',
            view: 'collection-details',
            path: 'collectionDetails/:action/:id?/:dbId?',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};