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
                exclude: /node_modules/,
                test: /jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-0']
                } 
            }
        ]
    },
    externals: {
        //    "react": 'React',
        //    "react-dom": 'ReactDOM'
        "redux": 'Redux',
        // "react-redux": 'ReactRedux',
        "redux-thunk": 'ReduxThunk',
        "reselect": 'Reselect',
        "history": 'History',
        "babel-polyfill": '_babelPolyfill'
    },
    devServer: {
        historyApiFallback: true,
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'static'),
        compress: true
    },
    devtool: "inline-source-map"
}

module.exports = config
