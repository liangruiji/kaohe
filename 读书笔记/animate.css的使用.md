# [animate.css的使用](https://www.cnblogs.com/xiaohuochai/p/7372665.html)

　[animate.css](https://daneden.me/animate/)是一个使用CSS3的[animation](http://www.cnblogs.com/xiaohuochai/p/5391663.html)制作的动画效果的CSS集合，里面预设了很多种常用的动画，且使用非常简单。本文将详细介绍animate.css的使用

 

### 引入

　　animate.css的最新版本是3.5.2，引入animate.css很容易，有以下几种方法

　　1、从官网下载

　　https://raw.github.com/daneden/animate.css/master/animate.css

　　2、通过npm安装

```
$ npm install animate.css
```

　　3、使用在线cdn

```
https://unpkg.com/animate.css@3.5.2/animate.min.css
```

### 效果演示

　　animate.css的使用非常简单，因为它是把不同的动画绑定到了不同的类里，所以想要使用哪种动画，只需要把通用类animated和相应的类添加到元素上就行了

https://animate.style/