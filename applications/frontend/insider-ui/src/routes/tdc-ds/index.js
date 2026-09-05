const base = {
    home: {
        view: 'dashboard',
        name: 'dashboard',
        path: 'dashboard',
    },
    childs: {
        0:{
            name: 'ds-list',
            view: 'ds-list',
            path: 'dsList',
        },

        1:{
            name: 'ds-details',
            view: 'ds-details',
            path: 'dsDetails/:dsId',
        },

        2:{
            name: 'ds-themes',
            view: 'ds-themes',
            path: 'dsThemes/:dsId',
        },

        3:{
            name:'ds-theme-colors',
            view:'ds-theme-colors',
            path:'dsThemeColors/:dsId/:action/:themeId?',
        },


        100:{
            view:'component-props',
            name:'componentProps',
            path:'componentProps/:compId'
        },        

        

        fonts: {
            name: 'fonts',
            view: 'fonts',
            path: 'fonts',
        },
        colors: {
            name: 'colors',
            view: 'colors',
            path: 'colors',
        },
        cp: {
            name: 'cp',
            view: 'cp',
            path: 'cp',
        },
        elements: {
            name: 'elements',
            view: 'elements',
            path: 'elements',
        },
        preview: {
            name: 'preview',
            view: 'preview',
            path: 'preview',
        },
    },
};

module.exports = {
    desktop:base,
    tablet:{},
    mobile:{},
};
  