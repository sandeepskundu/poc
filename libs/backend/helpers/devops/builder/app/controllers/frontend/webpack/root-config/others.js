const scss = require('./scss');

const copy = async (config, req, bundle) => {
    const statics = req.helpers.json.val(config, 'appConfig.staticsDir', 'statics');
    return [
        {
            noErrorOnMissing:true,
            to:`${bundle}${statics}_org/js`,
            from:`${bundle}${statics}/js`,
        }, {
            noErrorOnMissing:true,
            to:`${bundle}${statics}_org/css`,
            from:`${bundle}${statics}/css`,
            
        },
    ]
}

const publicPath = async (config, req) => {
    const pathPrefix = req.helpers.json.val(config, 'appConfig.pathPrefix');
    const placeholder = req.helpers.json.val(config, 'appConfig.chunksDomainPlaceholder');
    return `${placeholder}${pathPrefix}/`
}

const htmlFile = async (config, req) =>  {
    const scrap = req.helpers.json.val(config, 'dirs.scrapDir');
    return {
        inject: 'body',
        template:`${scrap}/index.html`,
    }
}

const create = async (config, req, bundle) => {
    return {
        scss:await scss.create(config, req),
        copy:await copy(config, req, bundle),
        publicPath:await publicPath(config, req),
        htmlWebpackPlugin:await htmlFile(config, req),
    }
}

exports.create = create;