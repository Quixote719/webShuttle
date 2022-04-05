const path = require('path');
const { resolveApp } = require('./paths');
const { merge } = require('webpack-merge')
// const webpack = require('webpack')
const common = require('./webpack.common')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isNeedSpeed = false

const config = merge(common, {
  // 模式
  mode: 'development',
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  // 开发模式，自动更新改动
  devServer: {
    static: './dist',
    hot: true
  },
  plugins:[ 
    // new webpack.HotModuleReplacementPlugin(),   //devServer.hot: true automatically add this plugin, don't have to config
    new ReactRefreshWebpackPlugin(),
  ]
}) 

module.exports = isNeedSpeed ? smp.wrap(config) : config
