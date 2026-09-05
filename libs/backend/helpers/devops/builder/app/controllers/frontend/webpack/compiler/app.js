const helpers = require('helpers')
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReplaceHtmlText = require('html-replace-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

const getMinimizer = (rval, webpackJson, appConfig) => {
    compress = helpers.json.val(appConfig, 'appConfig.compress');
    if(compress){
        rval.push(new HtmlMinimizerPlugin());
        rval.push(new TerserPlugin({
            extractComments: true,
        }))
    };

    return rval;
}

const output = (webpackJson, appConfig) => {
    let rv = helpers.json.val(webpackJson, 'chunks.js', {});
    let pPath = helpers.json.val(webpackJson, 'others.publicPath');
    let compess = helpers.json.val(appConfig, 'appConfig.compress');
    
    let chunk = (compess?'[id].[chunkhash]':'[name]');
    let placeholder = '___WEBPACK___CHUNK___HASH___WEBPACK___';
    
    if(rv.filename){
        rv.filename = rv.filename.replace(new RegExp(placeholder, "g"), chunk);
    }

    if(rv.chunkFilename){
        rv.chunkFilename = rv.chunkFilename.replace(new RegExp(placeholder, "g"), chunk);
    }

    if(pPath){
        rv.publicPath = pPath;
    };

    return rv;
}

const main = (webpackJson, appConfig) => {
    const src = helpers.json.val(appConfig, 'dirs.srcDir')
    return `${src}/categories/index.jsx`
}

const base = (webpackJson, appConfig) => {
    let compress = helpers.json.val(appConfig, 'appConfig.compress');
    return {
        entry:{
            main:main(webpackJson, appConfig)
        },
        output:output(webpackJson, appConfig),
        module: {
            rules: []
        },
        optimization: {
            minimize:compress || false,
            minimizer:getMinimizer([], webpackJson, appConfig),
            splitChunks: {
                chunks(chunk) {
                    return (chunk?.name?.indexOf('-views-') > -1)
                },
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin(helpers.json.val(webpackJson, 'others.htmlWebpackPlugin', {})),
            new ReplaceHtmlText(helpers.json.val(appConfig, 'webpackConfigs.replaceHtmlText', []))
        ]
    }
}

const start = (webpackJson, appConfig, type) => {
    return base(webpackJson, appConfig)
}

exports.start = start;