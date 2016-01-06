var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/calendar.js',
     libraryTarget: "var",
     library: "Calendar"
  },
  externals: {
    "lodash": "_",
    "jquery": "$"
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: path.join(__dirname, 'loaders/jst-loader')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
