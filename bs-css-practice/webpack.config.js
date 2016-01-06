var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
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
