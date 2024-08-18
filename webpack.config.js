const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index.js', // Simplified entry point as a single string
  resolve: {
    fallback: {
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      assert: require.resolve('assert-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
      vm: require.resolve('vm-browserify') // Added vm fallback if needed
    }
  },
  target: 'web',
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zipcore-lib.min.js',
    library: {
      name: 'zipcore',
      type: 'umd'
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
};
