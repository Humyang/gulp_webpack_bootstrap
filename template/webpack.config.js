var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        // hot: 'webpack/hot/dev-server',
        // server: 'webpack-dev-server/client?http://localhost:8080',
        index: './js/index.js',
        about: './js/about.js'
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: "js/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('commons', 'js/commons.js',["index","about"])
    ]
}
