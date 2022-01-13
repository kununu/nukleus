const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules|main\.scss/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:5]",
          },	
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
      'sass-loader'
    ]
  });
  config.module.rules.push({
    test: /main\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
      'sass-loader'
    ]
  });
  config.resolve.alias = {
    utils: path.resolve(__dirname, "../utils"),
    defaultOptions: path.resolve(__dirname, "./defaultOptions"),
  }
  return config;
};
