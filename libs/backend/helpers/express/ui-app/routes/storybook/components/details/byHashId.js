const express = process.nodeModules('express');
const router = express.Router({mergeParams:true});

const details = async (req, res, next) => {
    let hash = req.helpers.json.get(req, 'params.hash', '')
    let url = req.helpers.json.get(req, 'appConfig.dirs.storybook.allCompConfigsDir', '');
    let rval = await req.helpers.file.reader.async.init(`${url}/${hash}.json`, false, 'json');
    let resp = req.helpers.express.response.getRespByCode(200, req, res, next, {data:rval});
        req.helpers.express.response.send('json', resp, 200, req, res, next);
}

router.get("/:hash", details);

module.exports = router;