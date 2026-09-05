const express = require('express');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {
    next();
});


router.use(`/common`, require('./common'));
router.use(`/frontend`, require('./frontend'));

module.exports = router;