js中方法链的实现原理

~~~
a.filetrs().some()
~~~



https://chrome.google.com/webstore/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle
这个插件可以用下，把页面下载到本地，存为html文件。画页面时比截图好用，适合保存一些需要充值会员后才能看的页面

https://www.uisdc.com/b-side-design-specification
超详细！总监出品的B端设计规范指南（一）：布局

https://www.uisdc.com/b-side-design-specification-2
超详细！总监出品的B端设计规范指南（二）：字体

https://www.uisdc.com/b-terminal-product-design
从大厂实战中，总结了这份B端产品设计规范



计算属性不能传值

过滤器里this不指向vue实例，不能使用this访问数据

谁说传不了参的，闭包忘了？但不会缓存了与方法一致了

~~~
:data="closure(item, itemName, blablaParams)"

computed: {
 closure () {
   return function (a, b, c) {
        /** do something */
        return data
    }
 }
}
~~~



tapd 集成了 draw.io 流程图网站

