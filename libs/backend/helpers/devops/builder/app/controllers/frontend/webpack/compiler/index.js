const baseWb = require('./base');
const helpers = require('helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const additionalData = (webpackJson, config) => {
    let ad = ``;
    const arg = helpers.json.val(webpackJson, 'others.scss.additionalData', {});

    for(const a in arg){
        ad = `${ad}${a}:'${arg[a]}';`
    }

    return ad;
}


const baseRule = (webpackJson, config) => {
    return [
        {
            test: /\.js$|jsx/,
            exclude:/node_modules/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                },
            },
        }, {
            test: /\.s[ac]ss$/,
            exclude: /\.module.(s[ac]ss)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap:false,
                    },
                }, {
                    loader:'sass-loader',
                    options:{
                        sourceMap:false,
                        sassOptions: {
                            outputStyle:helpers.json.val(webpackJson, 'others.scss.output', 'compressed'),
                        },
                        additionalData:`${additionalData(webpackJson, config)}`,
                    }
                }, {
                    loader:'sass-resources-loader',
                    options:{
                        resources:helpers.json.val(webpackJson, 'others.scss.uitlsPaths', [])
                    },
                }
            ]
        }
    ]
}

const rules = (appWebpack, webpackJson, config) => {
    let base = baseRule(webpackJson, config);
    let arule = helpers.json.val(appWebpack, 'module.rules', [])
    return base.concat(arule);
}

const start = async (webpackJson, config, type) => {
    let appWebpack = await baseWb.start(webpackJson, config, type);
        appWebpack = await helpers.json.merge(appWebpack, {
            module:{
                rules:await rules(appWebpack, webpackJson, config)
            },
            resolve:{
                fallback: {
                    url:require.resolve('url'),
                    buffer:require.resolve("buffer"),
                    http:require.resolve('stream-http'),
                    https:require.resolve('https-browserify'),
                    stream:require.resolve('stream-browserify'),
                    crypto:require.resolve('crypto-browserify'),
                    'process/browser':require.resolve('process/browser')
                }
            }
        })

        appWebpack = helpers.json.merge(helpers.json.val(webpackJson, 'webpack', {}), appWebpack);

    return appWebpack;
}

module.exports = async (webpackJson, config, type) => {
    return await start(webpackJson, config, type)
}