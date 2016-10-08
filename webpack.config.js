var webpack = require('webpack');

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
