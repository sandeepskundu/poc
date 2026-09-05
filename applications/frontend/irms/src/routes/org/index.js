const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        bu:{
            view: 'bu',
            name: 'bu',
            path: 'bu/:action/:eId/:id?'
        },
        bv:{
            view: 'bv',
            name: 'bv',
            path: 'bv/:action/:buId/:id?/:pId?'
        },
        roles:{
            view: 'roles',
            name: 'roles',
            path: 'roles/:action/:eId/:dpId/:id?'
        },
        offices:{
            view: 'offices',
            name: 'offices',
            path: 'offices/:action/:eId/:id?'
        },
        employers:{
            view: 'employers',
            name: 'employers',
            path: 'employers/:action/:id?'
        },
        departments:{
            view: 'departments',
            name: 'departments',
            path: 'departments/:action/:eId/:pId/:id?'
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};