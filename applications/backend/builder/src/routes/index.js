const api = require('./api');
const express = require('express');
const common = require('./common');
const backend = require('./backend');
const ds = require('./design-system');
const frontend = require('./frontend');

const router = express.Router({mergeParams:true});

router.use(`/api`, api);
router.use(`/dsystem`, ds);
router.use(`/common`, common)
router.use(`/backend`, backend);
router.use(`/frontend`, frontend);


router.use('/mongoose', async (req, res, next) => {
    const r = await req.helpers.mongoose.connection.init(req.appConfig, req.envProps);

    res.status(200).send(r);
})

module.exports = router;