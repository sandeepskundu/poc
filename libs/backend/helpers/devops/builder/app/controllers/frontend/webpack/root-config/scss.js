const utilsPaths = async (config, req) =>  {
    const scrap = req.helpers.json.val(config, 'dirs.scrapDir');
    return [
        `${scrap}/scss/_index.scss`
    ]
}

const outputStyle = async (config, req) =>  {
    const compress = req.helpers.json.val(config, 'appConfig.compress');
    return compress?'compressed':'expanded'
}

const additionalData = async (config, req) => {
    let rval = {};
    let ad = req.helpers.json.val(config, 'scssConfig.additionalData', {});
    let adm = req.helpers.json.val(config, 'scssConfig.additionalDataMap', {})

    for(const a in ad){
        rval[a] = ad[a] || '';
    }

    for(const a in adm){
        rval[a] = req.helpers.json.val(config, adm[a]);
    }

    return rval;
}


const create = async (config, req) => {
    return {
        output:await outputStyle(config, req),
        uitlsPaths:await utilsPaths(config, req),
        additionalData:await additionalData(config, req)
    }
}

exports.create = create;