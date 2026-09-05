const express = require('express');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {
    next();
});

router.use(`/appListByType/:appType`, require('./appListByType'));

module.exports = router;