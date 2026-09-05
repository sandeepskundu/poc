const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        roles:{
            view: 'roles',
            name: 'roles',
            path: 'roles/:action/:dpId/:id?'
        },
        departments:{
            view: 'departments',
            name: 'departments',
            path: 'departments/:action/:mId/:id?'
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};