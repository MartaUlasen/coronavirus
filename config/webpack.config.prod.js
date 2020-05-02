const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const prodConfig = {
    ...baseConfig,
    mode: 'production',
    module: {
        rules: [
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: { 
                                localIdentName: '[hash:base64:5]'
                            },
                            localsConvention: 'camelCaseOnly',
                            sourceMap: true,
                        }
                    },
                    'sass-loader',
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
                        name: 'assets/[contenthash].[ext]',
                        limit: 8192,
                    },
                  },
                ],
            },
        ],
    },
};

prodConfig.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
);

prodConfig.output.publicPath = '/v2/';

module.exports = prodConfig;
