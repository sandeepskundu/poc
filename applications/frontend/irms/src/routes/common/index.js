const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        eat:{
            view:'eat',
            name:'eat',
            path:'eat/:action/:linkFor/:mId/:id?'
        },
        ar:{
            view:'ar',
            name:'ar',
            path:'ar/:action/:linkFor/:mId/:id?'
        },
        rba:{
            view:'rba',
            name:'rba',
            path:'rba/:action/:linkType/:linkFor/:mId/:id?'
        },
        ibp:{
            view:'ibp',
            name:'ibp',
            path:'ibp/:action/:mId/:id?'
        },
        tbi:{
            view:'tbi',
            name:'tbi',
            path:'tbi/:action/:relation/:type/:mId/:id?'
        },
        tbu:{
            view:'tbu',
            name:'tbu',
            path:'tbu/:action/:relation/:type/:itemId/:mId/:id?'
        },
        tbmbr:{
            view:'tbmbr',
            name:'tbmbr',
            path:'tbmbr/:action/:mId/:id?'
        },
        bu:{
            view:'bu',
            name:'bu',
            path:'bu/:action/:eId/:id?'
        },
        bv:{
            view:'bv',
            name:'bv',
            path:'bv/:action/:buId/:id?/:pId?'
        },
        team:{
            view:'team',
            name:'team',
            path:'team/:action/:type/:mId/:id?'
        },
        offices:{
            view:'offices',
            name:'offices',
            path:'offices/:action/:eId/:id?'
        },
        roles:{
            view:'roles',
            name:'roles',
            path:'roles/:action/:linkFor/:dpId/:id?'
        },
        departments:{
            view:'departments',
            name:'departments',
            path:'departments/:action/:linkFor/:mId/:id?'
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};