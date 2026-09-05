const health = require('./health');
const siteprops = require('./siteprops');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});
const uiCacheVersion = require('./ui-cache-versions');

router.use((req, res, next) => {
    next();
});

const start = async (req, res, next) => {
    const utility = req.helpers.json.val(req, 'params.utility');
    switch (utility) {
        case 'siteporps':
            req.helpers.express.response.send('json', await siteprops(req, res, next), 200, req, res, next);
        break
        case 'uiCache':
            req.helpers.express.response.send('json', await uiCacheVersion(req, res, next), 200, req, res, next);
        break;
        case 'health':
            req.helpers.express.response.send('json', health(req, res, next), 200, req, res, next);
        break
        default:
            req.helpers.express.response.noFound('json', false, req, res, next)
    }
};


router.use(`/:utility?/:method?/:name?`, start);

module.exports = router;