## 取消行内元素默认间距

行内块元素默认有边距。

解决方法：

**方案一. 对父元素设置 font-size: 0;**

**方案二. 对父元素的 word-spacing 设置合理的负值**

~~~css
如：
* {
　　font-size: 0;
　　/*word-spacing: -10*/   /*具体的值可调试确定，且不同浏览器值不同*/
}
.box{
　　display: inline-block;
　　width: 100px;
　　height: 100px;
　　background-color: aquamarine;
　　border: 5px solid black;
} 
~~~

