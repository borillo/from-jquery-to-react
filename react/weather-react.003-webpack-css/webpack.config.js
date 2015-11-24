module.exports = {
    entry: './weather.js',
    output: {
        filename: 'bundle.js',
        path: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
}
