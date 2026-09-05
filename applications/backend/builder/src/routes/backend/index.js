const express = require('express');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {
    next();
});

router.use(`/app`, require('./app'));

module.exports = router;