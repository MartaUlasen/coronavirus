const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.js');

const devConfig = {
    ...baseConfig,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: baseConfig.output.path,
        publicPath: '/',
        compress: true,
        port: 3000,
        historyApiFallback: true,
        https: false,
        open: true,
        inline: true,
        hot: true,
        proxy: {
            'http://localhost:3000/api': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
                logLevel: 'debug',
            },
            'http://localhost:3000/users/login': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
                logLevel: 'debug',
            },
            'http://localhost:3000/users/logout': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
                logLevel: 'debug',
            },
        },
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: false,
                    emitWarning: true,
                },
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader?configFile=../tsconfig.webpack.json',
                    },
                ],
            },
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },
            {
                test: /\.(s?)css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: { 
                                localIdentName: '[local]___[hash:base64:5]'
                            },
                            localsConvention: 'camelCaseOnly',
                            sourceMap: true,
                        }
                    },
                    'sass-loader?sourceMap',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, '../src/styles/variables.scss'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    },
                  },
                ],
            },
        ],
        noParse: [/\.min\.js/],
    },
};

devConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
);

module.exports = devConfig;
