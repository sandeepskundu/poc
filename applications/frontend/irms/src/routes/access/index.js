const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: '',
    },
    childs: {
        map:{
            view: 'map',
            name: 'map',
            path: 'map/:action/:type/:mId/:id?',
        },
        role:{
            view: 'role',
            name: 'role',
            path: 'role/:action/:type/:mId/:id?',
        },
        preset:{
            view: 'preset',
            name: 'preset',
            path: 'preset/:action/:type/:accessMapParentId/:accessMapId/:presetId',
        },
        permissions:{
            view: 'permissions',
            name: 'permissions',
            path: 'permissions/:action/:code/:type/:pId/:id?',
        },


        roles:{
            view: 'roles',
            name: 'roles',
            path: 'roles/:action/:id?',
        },
        apiPresets:{
            view: 'api-presets',
            name: 'apiPresets',
            path: 'apiPresets/:action/:id?',
        },

        apiLinkesPresetsDetails:{
            view: 'api-linked-presets-details',
            name: 'apiLinkesPresetsDetails',
            path: 'apiLinkesPresetsDetails/:action/:id/:linkedPresetId',
        }
    }
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};