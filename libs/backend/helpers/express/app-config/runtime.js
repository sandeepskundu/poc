const DEFAULT_VALUE = '____DEFAULT__VALUE__IS__NOT__DEFINED___'

const merchantRootHash = async (req, res, next) => {
    const rv = [];
    const md = await req.helpers.merchant.details(req, res, next);
    const id = await req.helpers.json.val(md, 'id', '');

        if(id){
            rv.push(id);
            rv.push('root');
        }

        if(rv && rv.length > 0){
            return req.helpers.crypto.md5(rv.join(''));
        }else{
            return null;
        }
}

const start = async (req, res, next) => {
    return {
        merchantRootHash:await merchantRootHash(req, res, next)
    }
}

exports.parse = async (req, res, next) => {
    let appConfig = req.helpers.json.val(req, 'appConfig', {});
        appConfig.runtimeUtils = await start(req, res, next);

    return appConfig;
}