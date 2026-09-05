const path = process.nodeModules('path');

const bundleCheck = (req, res, referer, rval) => {
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv', 'prod');
    let bundles = req.helpers.json.val(req, 'appConfig.appConfig.buildBundles', {});

    for(let a in bundles){
        let matched = false;
        let pattern = (`/${a}`);
         
        if(referer.includes((`${pattern}/`))){
            matched = true;
        }else{
            if(referer.includes(pattern)){
                matched = true;
            }
        }

        if(matched){
            rval = a;
            break;
        }else{
            if(env === 'local'){
                rval = 'uncompressed';
            }
        }
    }

    return rval
}

const bundle = (req, res, next) => {
    let rval = 'compressed';
    let referer = req.headers.referer;
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv', 'prod');
    if(referer){
        rval = bundleCheck(req, res, referer, rval) 
    }else{
        if(env === 'local'){
            rval = 'uncompressed';
        }
    }

    return rval;
}

const sitePropsPath = async (req, res, next) => {
    const bDir = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
    return path.resolve(`./${bDir}/scripts/appConfig.json`);
}

exports.bundle = bundle;
exports.sitePropsPath = sitePropsPath;