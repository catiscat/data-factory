const path = require('path');
const webpack = require('webpack');
const commonPlugins = require('./webpack/plugins');
const commonRules = require('./webpack/rules');
const Uglify = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: [
    path.join(__dirname, 'src/index')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    ...commonPlugins,
    new Uglify(),
    new webpack.BannerPlugin({ banner: `Last update: ${new Date().toString()}` })
  ],
  module: {
    rules: [
      ...commonRules
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
