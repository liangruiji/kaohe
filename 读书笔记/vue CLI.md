

~~~js
// vue.config.js
module.exports = {
  // 选项...
  publicPath: '/',  //部署应用包时的基本 URL
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: '',// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html',// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
	filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  pages: undefined, // Type: Object 
  
}
~~~



