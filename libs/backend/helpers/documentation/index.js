const swagger = require('./swagger');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {next()});

router.use(`/swagger`, swagger);

module.exports = router;