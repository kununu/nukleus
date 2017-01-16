/* eslint-disable sorting/sort-object-props */
/* eslint-disable import/order */

const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars, import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  context: __dirname,
  entry: './app/index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: [
      __dirname,
      path.resolve(__dirname, 'app')
    ],
    alias: {
      nukleus: path.resolve(__dirname, '..', 'components'),
      utils: path.resolve(__dirname, '..', 'utils'),
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
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
      },
      {
        test: /\.txt/,
        loader: 'raw'
      }
    ]
  },
  postcss: [autoprefixer]
};
