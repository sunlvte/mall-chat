'use strict'
/*
 webpack default config
 */
const path = require('path');


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config  = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main'
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vaq':resolve('src/assets/vaq')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
module.exports = config
