const path = require('path')

module.exports = {
    entry: {
        inspectgui: './src/InspectGUI.js',
        grid: './src/Grid.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'lib')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}