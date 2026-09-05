const siteProps = require('./site-props');

module.exports = (app, config) => {
    const express = process.nodeModules('express');
    const router = express.Router({ mergeParams: true });

        router.use((req, res, next) => {
            next();
        });

        router.post((`/siteProps`), (req, res, next) => {
            siteProps(req, res, next, app);
        });
        
    return router;
};