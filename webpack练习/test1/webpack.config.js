/*
 * @Author: your name
 * @Date: 2022-04-21 14:16:12
 * @LastEditTime: 2022-04-22 09:53:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack练习/test1/webpack.confing.js
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
console.log(__dirname);
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "img/[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        exclude: /\.(html|css|s[ac]ss|js|gif|jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    })
  ],

  mode: "development",

  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};
