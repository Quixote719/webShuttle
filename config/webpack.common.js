const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require('./paths');
const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
}
const {
  isEnvDevelopment,
  isEnvProduction
} = ctx
const lessRegex = /\.less$/;

loaderForStyle = isEnvProduction ? ['style-loader', MiniCssExtractPlugin.loader,] : ['style-loader']

module.exports = {
  // 入口
  entry: {
    index: './src/index.tsx',
  },
  output: {
    // 仅在生产环境添加 hash
    filename: isEnvProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
  },
  resolve:{
      alias: {
        '@': paths.appSrc, // @ 代表 src 路径
      },
      extensions:['.tsx', '.js'],
      symlinks: false,  // 不使用 symlinks（例如 npm link 或者 yarn link）
      modules: [
        'node_modules',
        paths.appSrc,
      ],
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules:[
      { // image
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [paths.appSrc],
        type: 'asset/resource',
      },
      { // font
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [
            paths.appSrc,
          ],
        type: 'asset/resource',
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          }
        ]
      },
      { //css
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          // style-loader 将 JS 字符串生成为 style 节点
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          // css-loader 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // Enable CSS Modules features
              modules: true,
              importLoaders: 1,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, less-loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
        ],
      },
      { //less
        test: lessRegex,
        include: paths.appSrc,
        use: [
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          // css-loader 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // Enable CSS Modules features
              modules: true,
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, less-loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          'less-loader'
        ],
      },
    ]
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'webpackDemo',
      template: paths.appPublic + '/index.html',
    }),
  ],
}