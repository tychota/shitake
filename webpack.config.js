const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?100', './index.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100', /@shitake/],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      { test: /.proto$/, use: 'cop' },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new CopyPlugin([{ from: 'packages/**/*.proto', to: '[name].proto' }]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
