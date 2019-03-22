const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
     {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
     { test: /\.css$/, exclude: /node_modules/, use: ['style-loader','css-loader'] },
     {
        test: /\.(png|svg|gif|jpg)$/,
        exclude: /node_modules/,
        use: ['file-loader']
     },
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    publicPath: '/static/',
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
