/*
 webpack rules
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vueLoaderConfig = require('./vue-loader.conf');
const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
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
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['es2015']
    }
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.(?:png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
    loader: 'url-loader?limit=8192&name=images/[hash:8].[ext]',
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: false
          }
        }
      ],
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }
      ]
    })
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
  }
];
module.exports = rules;
