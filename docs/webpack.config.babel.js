/* eslint-disable sorting/sort-object-props */

const base = require('./webpack.base');

module.exports = {
  ...base,
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          fix: true
        }
      }
    ]
  }
};
