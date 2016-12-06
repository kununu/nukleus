/* eslint-disable sorting/sort-object-props */

const base = require('./webpack.base');

module.exports = {
  ...base,
  module: {
    ...base.module,
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
    ]
  },
  sasslint: {
    configFile: '../.sass-lint.yml'
  }
};
