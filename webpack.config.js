var webpack = require('webpack')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/calendar.js',
    libraryTarget: 'umd',
    library: 'Calendar'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'nativejsx-loader',
        excludes: /node_modules/,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: ['lodash'],
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new ExtractTextPlugin('dist/calendar.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}
