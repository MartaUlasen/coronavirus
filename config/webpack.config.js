
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.join(__dirname, '../src/');
const distPath = path.join(__dirname, '../dist/');

module.exports = {
    context: srcPath,
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            './index.tsx',
        ],
    },
    output: {
        path: distPath,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', srcPath],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.ico',
            inject: true,
        }),
    ],
};
