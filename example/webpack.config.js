const path = require('path')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    path.resolve(__dirname, 'main.js')
  ],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 8080,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
