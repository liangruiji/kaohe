

# https://zhuanlan.zhihu.com/p/24357770

当一个网站依赖的代码越来越多，程序员发现这是一件很麻烦的事情：

1. 去 jQuery 官网下载 jQuery
2. 去 BootStrap 官网下载 BootStrap
3. 去 Underscore 官网下载 Underscore
4. ……



有些程序员就受不鸟了，一个[拥有三大美德](http://zhihu.com/question/48406009/answer/134182064)的程序员 [Isaac Z. Schlueter](https://link.zhihu.com/?target=https%3A//github.com/isaacs) （以下简称 Isaaz）给出一个解决方案：用一个工具把这些代码集中到一起来管理吧！



这个工具就是他用 JavaScript （运行在 Node.js 上）写的 npm，全称是 Node Package Manager

## Yarn是什么？

“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如[官方文档](https://link.zhihu.com/?target=https%3A//code.facebook.com/posts/1840075619545360)中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用npm时的坑了：
\- `npm install`的时候**巨慢**。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。
\- 同一个项目，安装的时候**无法保持一致性**。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。



