const chunk = async (config, req) => {
    let compess = req.helpers.json.val(config, 'appConfig.compress');
    //return compess?'[id].[chunkhash]':'[name]';

    return '___WEBPACK___CHUNK___HASH___WEBPACK___';
};

const append = async (config, req, type) => {
    /*--if(config.webCacheTime){
        //qp = (`${qp}&wct=${config.webCacheTime}`)
    }--*/
    let qp = ('v=__appWebCacheVersion__&wcd=__appWebCacheTime__');
    let sd = req.helpers.json.val(config, 'appConfig.staticsDir');

    return {
        filename:(`${sd}/${type}/${await chunk(config, req)}.${type}?${qp}`),
        chunkFilename:(`${sd}/${type}/${await chunk(config, req)}.${type}?${qp}`)
    }
   
}


const outputs = async (config, req) => {
    let rv = {
        js:await append(config, req, 'js'),
        css:await append(config, req, 'css')
    }

    return rv;
}

exports.outputs = outputs;