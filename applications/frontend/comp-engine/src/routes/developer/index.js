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
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};