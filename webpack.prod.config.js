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
        "redux": 'Redux',
        "redux-thunk": 'ReduxThunk',
        "reselect": 'Reselect',
        "history": 'History',
        "babel-polyfill": '_babelPolyfill'
    }
}

module.exports = config
