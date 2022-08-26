

**前提条件**：

1. **子元素必须是块级元素才能实现宽度的继承**
2. 父级元素设置了宽度

属性 `width:100%；`使用情况主要有以下几种。

1. 当父级元素和子元素只是一般嵌套关系的时候，子元素继承父元素的宽。
2. 当子元素浮动时，也可以完整的继承父元素的宽。
3. 当子元素为`position: absolute;`的时候，这个时候子元素会逐级向上寻找是否有`position: relative;`的元素。如果有，则继承该元素；如果没有则宽度是相对于body而言。
4. 当子元素为`position: relative;`时，`width:100%`是基于父级元素，而不是找`position: relative;`的元素
5. --------**特殊**--------当元素被设置了`postion: fixed`的时候，是一直基于body的，其宽度就是body的宽度

**补充一点：不论`box-sizing`设置为`border-box`还是`content-box`,`width`继承的都是‘父’级元素的内容区的宽度**

参考:

https://segmentfault.com/a/1190000014406904

[width: 100%是相对于谁的?](https://www.lyblog.net/detail/286.html)
[如何让 height:100% 起作用?](http://www.webhek.com/post/css-100-percent-height.html)
[html body width height 100%使用](https://www.cnblogs.com/youxin/p/3345085.html)

作者：promise96319
链接：https://www.jianshu.com/p/0628464fc739
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

