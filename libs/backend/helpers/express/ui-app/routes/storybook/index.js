const components = require('./components');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use(`/components`, components);

module.exports = router;