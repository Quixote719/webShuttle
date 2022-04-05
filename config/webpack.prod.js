const paths = require('./paths');
const { resolveApp } = require('./paths');
const glob = require('glob')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

module.exports = merge(common, {
  // 模式
  mode: 'production',
  // 输出
  optimization: {
      runtimeChunk: true,
      moduleIds: 'deterministic',
      minimizer: [
      new TerserPlugin(),
      ],
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        // 重复打包问题
        cacheGroups:{
          vendors:{ // node_modules里的代码
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            // name: 'vendors', 一定不要定义固定的name
            priority: 10, // 优先级
            enforce: true 
          }
        }
      }
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: resolveApp('dist'),
    // 编译前清除目录
    clean: true
  },
  plugins:[
    // 打包体积分析，不需要则注释掉
    new BundleAnalyzerPlugin(),  
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`,  { nodir: true }),
    }),
  ]
})