var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/calendar.js',
    libraryTarget: 'var',
    library: 'Calendar'
  },
  externals: {
    'lodash': '_',
    'jquery': '$'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'nativejsx-loader',
        excludes: /node_modules/,
        query: {
          variablePrefix: '_',
          declarationType: 'let'
        }
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
