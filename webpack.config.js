var path = require('path');

var config = Object.create(require('./app.config.js'));

module.exports = {
    entry: path.join(__dirname, config.SRC, config.MAIN),
    output: {
        path: path.join(__dirname, config.DST_JS),
        filename: config.BUNDLE,
        sourceMapFilename: '[file].map'
    },
    devtool:'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
