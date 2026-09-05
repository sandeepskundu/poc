const express = require('express');
const colors = require('./colors');
const typography = require('./typography');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {
    next();
});

router.use(`/colors`, colors);
router.use(`/typography`, typography);

module.exports = router;