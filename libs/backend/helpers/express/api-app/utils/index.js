const constants = require('./constants');
const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

router.use((req, res, next) => {
    next();
});

const start = async (req, res, next) => {
    const utility = req.helpers.json.val(req, 'params.utility');
    switch (utility) {
        case 'consts':
            await constants(req, res, next);
        break
        default:
            req.helpers.express.response.noFound('json', false, req, res, next)
    }
};


router.use(`/:utility/:id`, start);

module.exports = router;