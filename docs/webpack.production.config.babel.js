const webpack = require('webpack'); // eslint-disable-line no-unused-vars, import/no-extraneous-dependencies

const base = require('./webpack.base');

module.exports = {
  ...base,
  mode: 'production',
  output: {
    ...base.output,
    publicPath: '/nukleus/build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
