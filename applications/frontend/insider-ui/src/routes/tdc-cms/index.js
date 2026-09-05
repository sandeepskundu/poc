const base = {
    home: {
        view: 'home',
        name: 'home',
        path: 'home',
    },
    childs: {
        0: {
            name: 'cmsData',
            view: 'cms-data',
            path: 'cmsData',
        },
        1: {
            name: 'cmsDataList',
            view: 'cms-data-list',
            path: 'cmsDataList/:action/:id?',
        },
        2: {
            name: 'uiTemplateList',
            view: 'ui-template-list',
            path: 'uiTemplateList/:action/:id?',
        }
    }
}; 

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};