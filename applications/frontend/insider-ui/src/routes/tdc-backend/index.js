const base = {
    home: {
        view: 'home',
        name: 'home',
        path: 'home',
    },
    childs: {
        0: {
            name: 'masterData',
            view: 'master-data',
            path: 'masterData',
        },
        1: {
            name: 'masterDataList',
            view: 'master-data-list',
            path: 'masterDataList/:action/:id?',
        }
    }
}; 

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};