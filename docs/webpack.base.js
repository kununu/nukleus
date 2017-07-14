/* eslint-disable sorting/sort-object-props */
/* eslint-disable import/order */

const path = require('path');
const webpack = require('webpack'); // eslint-disable-line no-unused-vars, import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      __dirname,
      path.resolve(__dirname),
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '..', 'node_modules')

    ],
    alias: {
      nukleus: path.resolve(__dirname, '..', 'components'),
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /kununu-logo\/index.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  autoprefixer
                ];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /kununu-logo\/index.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  autoprefixer
                ];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /main\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  autoprefixer
                ];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.txt/,
        loader: 'raw-loader'
      }
    ]
  }
};
