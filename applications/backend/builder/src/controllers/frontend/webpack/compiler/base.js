const app = require('./app');
const cdn = require('./cdn');
const helpers = require('helpers');
const webpack = require('webpack');
//const {DefinePlugin} = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
//const RemovePlugin = require('remove-files-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const plugins = (rval, appWebpack, webpackJson, appConfig) => {
    const appPlug = helpers.json.val(appWebpack, 'plugins', []);
    return rval.concat(appPlug);
}

const output = async (appWebpack, webpackJson, appConfig) => {
    let compress = helpers.json.val(appConfig, 'appConfig.compress');
    let compression = compress?'compressed':'uncompressed';
    const output = helpers.json.val(webpackJson, 'webpack.output', {
        clean:false,
    })

    output.path = `${output.path}/${compression}`;

    return output;
}

const mode = (appWebpack, webpackJson, appConfig) => {
    let compress = helpers.json.val(appConfig, 'appConfig.compress');
    return compress ? 'production' : 'development';
}

const copyStatics = (appWebpack, webpackJson, appConfig) => {
    let rv = [];

    console.log(appConfig)
    let bDir = helpers.json.val(appConfig, 'dirs.build');
    let sDir = helpers.json.val(appConfig, 'dirs.staticsDir');
    let compress = helpers.json.val(appConfig, 'appConfig.compress');
    let compression = compress?'compressed':'uncompressed';
    let statics = helpers.json.val(appConfig, 'appConfig.staticsDir', 'statics');
    let dirs = helpers.json.val(appConfig, 'appConfig.copyStaticsDirInBuild', ['fonts', 'images']);
    let bstatics = `${bDir}/${compression}/${statics}`;
    let vdirs = ['js', 'css'];

    for(const a in vdirs){
        let n = vdirs[a];
        rv.push({
            noErrorOnMissing:true,
            to:`${bstatics}_org/${n}`,
            from:`${bstatics}/${n}`,
        });
    }
    
    for(const a in dirs){
        let name = dirs[a];
        rv.push({
            noErrorOnMissing:true,
            to:`${bDir}/${statics}/${name}`,
            from:`${sDir}/${name}`,
        })
    }

    console.log(rv);

    return rv;
}

const addBase = (appWebpack, webpackJson, appConfig) => {
    return helpers.json.merge(appWebpack, {
        watch:true, //(process.env.APP_ENV === 'local'),
        mode:mode(appWebpack, webpackJson, appConfig),
        output:output(appWebpack, webpackJson, appConfig),
        plugins:plugins([
            new webpack.ProvidePlugin({
                React: 'react',
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),

            new MiniCssExtractPlugin(helpers.json.val(webpackJson, 'chunks.css', {})),

            new CompressionWebpackPlugin({
                minRatio:1,
                threshold:10240,
                algorithm:'gzip',
                test:/\.js$|\.css$|\.html$/,
                filename:'[path][name].gz[query]'
            }),

            new CopyPlugin({
                patterns:copyStatics(appWebpack, webpackJson, appConfig)
            }), 

            /*--new RemovePlugin({
                after: {
                    include: [
                        `${bundle}/${config.staticsDir}/js/`,
                        `${bundle}/${config.staticsDir}/css/`
                    ]
                }
            })--*/

            /*--
            new ModuleFederationPlugin({
                name: 'main',
            })----*/
        ], appWebpack, webpackJson, appConfig)
    });
}

const start = async (webpackJson, appConfig, type) => {
    let appWebpack = {};

    if(type === 'app'){
        appWebpack = await app.start(webpackJson, appConfig, type)
    }else{
        appWebpack = await cdn.start(webpackJson, appConfig, type)
    }

    appWebpack = addBase(appWebpack, webpackJson, appConfig);

    console.log(appWebpack);

    return appWebpack;
}

exports.start = async (webpackJson, appConfig, type) => {
    return start(webpackJson, appConfig, type)
}