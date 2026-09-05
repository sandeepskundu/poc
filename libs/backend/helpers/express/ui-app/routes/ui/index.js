module.exports = (config) => {
    let helpers = process.helpers();
    let express = process.nodeModules('express');
    let router = express.Router({ mergeParams: true });
    let statics = helpers.json.val(config, 'appConfig.staticsDir');
    let map = '/:category?/:page?/:p1?/:p2?/:p3?/:p4?/:p5?/:p6?';

        router.get((`/${statics}/:webCacheTime?/js/*`), require('./scripts-css'));
        router.get((`/${statics}/:webCacheTime?/css/*`), require('./scripts-css'));
        router.get((`/${statics}/:webCacheTime?/fonts/*`), require('./img-fonts'));
        router.get((`/${statics}/:webCacheTime?/icons/*`), require('./img-fonts'));
        router.get((`/${statics}/:webCacheTime?/images/*`), require('./img-fonts'));
        router.get(map, require('./html'));
        router.get((map+'/*'), require('./html'));
        router.get(('*'), require('./html'));
        
    return router;
};