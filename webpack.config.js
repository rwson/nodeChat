var webpack = require("webpack");
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
    entry: [
        `${__dirname}/public/js/index.js`
    ],
    output: {
        path: `${__dirname}/public/js/`,
        filename: "bundle.js"
    },
    plugins: [
        new InlineEnviromentVariablesPlugin({ NODE_ENV :"production" })
    ],
    module: {
        loaders: [
            {test: /\.js$/, loader: "jsx!babel"},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    }
};