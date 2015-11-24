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
           },
           {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               loader: 'babel',
               query: {
                   presets:['es2015','react']
               }
           }
       ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".css"]
    }
}
