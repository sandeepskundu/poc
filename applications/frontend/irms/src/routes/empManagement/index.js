const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        onboarding:{
            view:'onboarding',
            name:'onboarding',
            path:'onboarding/:action',
        },
        directory:{
            view:'directory',
            name:'directory',
            path:'directory/:action',
        },
        empProfile:{
            view:'empProfile',
            name:'empProfile',
            path:'empProfile/:action/:id',
        },
        updateProfile:{
            view:'updateProfile',
            name:'updateProfile',
            path:'updateProfile/:type/:action/:id',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};