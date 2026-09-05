const express = require('express');
const router = express.Router({mergeParams:true});

const create = require('./create');


router.post(`/create`, create.routeAction);
router.use(`/app/update`, () => {debugger;});




module.exports = router;