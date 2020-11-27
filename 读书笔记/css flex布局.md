# css flex布局

### flex布局原理

+ flex 是 flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。
+ 当我们为父盒子设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
+ flex布局又叫伸缩布局 、弹性布局 、伸缩盒布局 、弹性盒布局 
+ 采用 Flex 布局的元素，称为 Flex 容器（flexcontainer），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex
  item），简称"项目"。

**总结**：就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式

### 父项常见属性

* display：flex|

+ flex-direction：row|row-reverse|column|column-reverse设置主轴的方向
+ justify-content：flex-start|flex-end|center|space-between|space-around|space-evenly设置主轴上的子元素排列方式
+ flex-wrap：nowrap|wrap|wrap-reverse设置子元素是否换行  
+ align-content：flex-start|flex-end|center|space-between|space-around|space-evenly设置侧轴上的子元素的排列方式（多行）
+ align-items：stretch|flex-start|flex-end|center|baseline设置侧轴上的子元素排列方式（单行）
+ flex-flow：row nowrap 复合属性，相当于同时设置了 flex-direction 和 flex-wrap

### flex布局子项常见属性

+ flex子项目占的份数 定义子项目分配剩余空间，用flex来表示占多少份数
+ align-self控制子项自己在侧轴的排列方式
+ order属性定义子项的排列顺序（前后顺序）