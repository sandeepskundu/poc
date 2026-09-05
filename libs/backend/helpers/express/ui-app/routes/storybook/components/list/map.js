const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

const getMap = async (req, res, next) => {
    let url = req.helpers.json.get(req, 'appConfig.dirs.storybook.allCompConfigsMapJson', '');
    let rval = await req.helpers.file.reader.async.init(url, false, 'json');
    let resp = req.helpers.express.response.getRespByCode(200, req, res, next, {data:rval});
        req.helpers.express.response.send('json', resp, 200, req, res, next);
}

router.get("/", getMap);

module.exports = router;