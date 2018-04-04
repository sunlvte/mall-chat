'use strict'
/*
 webpack debug config
 */
const path = require('path');
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
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue:  isPro ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      '@': resolve('src'),
      'vaq':resolve('src/assets/vaq')
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: rules
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
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
