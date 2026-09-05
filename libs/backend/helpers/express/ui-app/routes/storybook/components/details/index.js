const byHashId = require('./byHashId');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use(`/byHashId`, byHashId);

module.exports = router;