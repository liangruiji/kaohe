# [css水平居中的几种方式](https://www.cnblogs.com/Ryan368/p/11321758.html)

**1.** 子元素为行内元素时，父元素使用 text-align: center; 实现子元素的水平居中；

**2.** 子元素为块级元素时，

　　**2.1.** 将子元素设置 margin: 0 auto; 实现居中；

　　**2.2.** 将子元素设置 display: inline-block，然后可使父元素使用text-align:center实现居中；

　　**2.3.** 根据父元素采用绝对定位，右移父元素宽度的一半，再左移自身宽度的一半；

**3.** 父元素使用flex布局，

　　**3.1.** 子元素无论是行内还是块级，采用 align-self: center; 实现水平居中；

　　**3.2.** 子元素无论是行内还是块级，采用 margin: 0 auto; 实现水平居中；

 

***** 用类似的方法，我们也可以实现元素的垂直居中 *****

比如用flex布局，设置 flex-direction: row; 则子元素可以使用 align-self: center; 实现其垂直居中

~~~html
<style>
* {
　　margin: 0;
}
　　.outer-box1{
　　　　width: 200px;
　　　　height: 200px;
　　　　border: 5px solid black;
　　　　/* 对父元素设置此样式，则其内的行内元素实现居中 */
　　　　text-align: center;
　　　　position: relative;
　　}
　　.box1{
　　　　width: 50px;
　　　　height: 50px;
　　　　background-color: green;
　　　　/* 对块级的子元素设置此样式实现其居中 */
　　　　margin-left:auto;
　　　　margin-right:auto;
　　}
　　.box2{
　　　　width: 50px;
　　　　height: 50px;
　　　　background-color: purple;
　　　　/* 对块级的子元素设置display: inline-block，然后父元素使用text-align:center实现其居中 */
　　　　display: inline-block;
　　}
　　.box3{
　　　　width: 50px;
　　　　height: 50px;
　　　　background-color: pink;
　　　　/* 父元素采用绝对定位，右移父元素宽度的一半，再左移自身宽度的一半 */
　　　　position: absolute;
　　　　left: 50%;
　　　　transform: translateX(-50%) /* 移动元素本身50% */
　　}
　　.outer-box2{
　　　　/* 采用flex布局实现水平居中 */
　　　　display: flex;
　　　　/* 设置主轴方向，使项目从上往下排列 */
　　　　flex-direction: column;
　　　　margin-top: 10px;
　　　　width: 200px;
　　　　height: 200px;
　　　　border: 5px solid black;
　　}
　　.box4{
　　　　width: 50px;
　　　　height: 50px;
　　　　background-color: orange;
　　　　/* 在父元素采用flex布局时，设置此样式实现子元素水平居中 */
　　　　align-self: center;
　　}
　　.box5{
　　　　width: 50px;
　　　　height: 50px;
　　　　background-color: brown;
　　　　/* 在父元素采用flex布局时，设置此样式实现子元素水平居中,把0去掉实现水平、垂直方向都居中 */
　　　　margin: 0 auto;
　　}
　　.words2{
　　　　align-self: center;
　　}
　　.words3{
　　　　margin: 0 auto;
　　}
</style>
</head>
<body>
　　<div class="outer-box1">
　　　　<div class="box1"></div>
　　　　<div class="box2"></div>
　　　　<div class="box3"></div>
　　</div>
　　<div class="outer-box2">
　　　　<div class="box4"></div>
　　　　<div class="box5"></div>
　　　　<i class="words2">aaa</i>
　　　　<i class="words3">bbb</i>
　　</div>
</body>
~~~

