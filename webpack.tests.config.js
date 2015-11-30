var Promise = require('es6-promise').Promise;
var path = require('path');
var webpack = require('webpack');

var port = 7070;
var hostName='localhost';

module.exports = {
    entry: './tests/index.js',
    output: {
        filename: 'test.build.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        path: path.join(__dirname, "./dist/js"),
        publicPath: 'http://'+hostName+':'+port+'/tests/'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /.jsx?$/,
                loaders: ['react-hot','babel-loader?optional=runtime'],
                include: path.join(__dirname, "./tests/")
            }, {
                test: /\.scss$/,
                loader: 'null-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer:{
        host:hostName,
        port : port
    }
};