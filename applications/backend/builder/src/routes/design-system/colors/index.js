const codes = require('./codes');
const express = require('express');
const router = express.Router({mergeParams:true});

router.get(`/codes`, codes.routeAction);

module.exports = router;