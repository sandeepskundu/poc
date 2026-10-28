const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        documention:{
            view:'documention',
            name:'documention',
            path:'documention/:category?/:subcate?/:hash?',
        },
        uicomponent:{
            view:'ui-component',
            name:'uicomponent',
            path:'uicomponent/:hash',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};