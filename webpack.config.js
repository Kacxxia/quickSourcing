const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')
const config = {
    context: __dirname,
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'server', 'static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                exclude: /node_modules/,
                test: /jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                } 
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'static'),
        compress: true
    },
    devtool: "inline-source-map",
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
}

module.exports = config