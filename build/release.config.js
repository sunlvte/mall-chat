'use strict'
/*
 webpack default config
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rules = require('./rules');
const isPro= process.env.NODE_ENV === 'production';
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config  = {
  target: 'web',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main'
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue:  isPro ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      '@': resolve('src'),
      'vaq':resolve('src/assets/vaq')
    }
  },
  devtool: false,
  module: {
    rules: rules
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      ecma: 6
    }),
    new ExtractTextPlugin({
      filename: '[hash:8].css',
      allChunks: true
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../themes/default/views/layout.html'),
    //   filename: path.resolve(__dirname, '../tempfile/views/layout.html'),
    //   favicon: path.resolve(__dirname, '../tempfile/views/favicon.ico'),
    // }),
  ]
};
module.exports = config
