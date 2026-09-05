const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use(`/list`, require('./list'));
router.use(`/details`, require('./details'));

module.exports = router;