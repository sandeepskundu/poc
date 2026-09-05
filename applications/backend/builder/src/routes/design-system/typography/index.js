const fonts = require('./fonts');
const express = require('express');
const router = express.Router({mergeParams:true});

router.get(`/fonts`, fonts.routeAction);

module.exports = router;