var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/calendar.js'
  },
  module: {
    loaders: [
      {
        test: require.resolve("./src/index"),
        loader: "expose?Calendar"
      },
      {
        test: /\.html$/,
        loader: path.join(__dirname, 'loaders/html-template-loader.js')
      }
    ]
  }
};
