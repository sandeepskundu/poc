const map = require('./map');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use(`/map`, map);

module.exports = router;