const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules|main\.scss/,
    use: [
      'style-loader',
      'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
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
  defaultConfig.module.rules.push({
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
  defaultConfig.resolve.alias = {
    utils: path.resolve(__dirname, "../utils"),
    defaultOptions: path.resolve(__dirname, "./defaultOptions"),
  }
  return defaultConfig;
};
