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
        loader: '../html-template-loader.js'
      }
    ]
  }
};
