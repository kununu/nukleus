const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
require("babel-polyfill");

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './playground/index.jsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: [
      __dirname,
      path.resolve(__dirname)
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint',
        query: {
          fix: true
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'sasslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main\.scss/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss!sass'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /main\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  },
  postcss: [autoprefixer],
  sasslint: {
    configFile: '.sass-lint.yml'
  }
};
