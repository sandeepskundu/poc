const sg = {
    home: {
      view: 'dashboard',
      name: 'dashboard',
      path: 'dashboard',
    },
    childs: {
      details: {
        name: 'details',
        view: 'details',
        path: 'details/:action/:appId?',
      },
      prepaireToBuild:{
        name: 'prepaire-to-build',
        view: 'prepaire-to-build',
        path: 'prepaireToBuild',
      }
    }
  };

module.exports = {
    desktop: sg,
    tablet: {
     
    },
    mobile: {
      
    },
  };