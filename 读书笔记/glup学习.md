~~~
npm install --global gulp-cli
npm install --save-dev gulp
gulp --version
~~~

https://www.gulpjs.com.cn/docs/getting-started/quick-start/ 文档

##### 导出任务

任务（tasks）可以是 **public（公开）** 或 **private（私有）** 类型的。

公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 `gulp` 命令直接调用。

私有任务（Private tasks） 被设计为在内部使用，通常作为 `series()` 或 `parallel()` 组合的组成部分。

每个 gulp 任务都是一个异步 JavaScript 函数，它要么接受一个错误优先回调，要么返回一个流、promise、事件发射器、子进程或observable。由于一些平台限制，不支持同步任务。

##### 处理文件

src()

`src()` 接受 [glob](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs) 参数，并从文件系统中读取文件然后生成一个 [Node 流（stream）](https://nodejs.org/api/stream.html)。它将所有匹配的文件读取到内存中并通过流进行处理。

dest()

`dest()` 接受一个输出目录作为参数，并且它还会产生一个 [Node 流（stream）](https://nodejs.org/api/stream.html)，通常作为终止流。当它接收到通过管道（pipeline）传输的文件时，它会将文件内容及文件属性写入到指定的目录中。

流所提供的主要的 API 是 `.pipe()` 方法，用于连接转换流或可写流

大多数情况下，利用 `.pipe()` 方法将插件放置在 `src()` 和 `dest()` 之间，并转换流中的文件。

~~~
const { src, dest } = require('gulp');

exports.default = function() {
  return src('src/*.js')
    .pipe(dest('output/'));
}
~~~

##### 条件插件

~~~
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');

function isJavaScript(file) {
  // 判断文件的扩展名是否是 '.js'
  return file.extname === '.js';
}

exports.default = function() {
  // 在同一个管道（pipeline）上处理 JavaScript 和 CSS 文件
  return src(['src/*.js', 'src/*.css'])
    // 只对 JavaScript 文件应用 gulp-uglify 插件
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(dest('output/'));
}
~~~

##### 文件监控

gulp api 中的 `watch()` 方法利用文件系统的监控程序（file system watcher）将 [globs](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs) 与 [任务（task）](https://www.gulpjs.com.cn/docs/getting-started/creating-tasks) 进行关联。它对匹配 glob 的文件进行监控，如果有文件被修改了就执行关联的任务（task）。如果被执行的任务（task）没有触发 [异步完成](https://www.gulpjs.com.cn/docs/getting-started/async-completion) 信号，它将永远不会再次运行了。