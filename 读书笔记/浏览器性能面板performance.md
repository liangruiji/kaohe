[TOC]



#### 控制面板

有六个选项

Screenshots: 截图,默认勾选，每一帧都会截图。

Memory: 内存消耗记录：勾选后可以看到各种内存消耗曲线

Disable JavaScript samples：选项开启会使工具忽略记录 JS 的调用栈

Network: 网络模拟，可以模拟在3G / 4G等网络条件下运行页面

Enable advanced paint instrumentation：详细记录某些渲染事件的细节

CPU：CPU限制，主要为了模拟低CPU下运行性能



默认情况下火焰图会记录已执行 JS 程序调用栈中的每层函数（精确到单个函数的粒度），非常详细。而开启「Disable JS Samples」后，火焰图只会精确到事件级别（调用某个 JS 文件中的函数是一个事件），忽略该事件下的所有 JS 函数调用栈。

#### 概览面板

##### 时间：毫秒

##### FPS:即时帧率图

##### CPU:即时CPU使用面积图，CPU图表中的各种颜色与Summary面板里的颜色是相互对应的

##### NET:

有一深紫色，一浅紫色的横条，分别一上一下，深紫色的网络请求优先级比较高，浅紫色区域内的网络请求优先级比较低一般是 low 和 lowest，估计是 Idle 空闲时间发出的请求



#### 线程面板

##### 1 . Frames

`Frames`：帧线程，鼠标悬浮绿色块可以看到fps

##### 2.timings中：显示几个阶段的时间戳

`FP` 首次绘制，浏览器第一次显示内容
 `FCP` 首次内容绘制 ，浏览器第一次显示来自DOM的内容
 `FMP` 首次重要绘制，在网页上，几乎总有一部分内容比其他部分更重要。 如果页面最重要的部分能迅速加载，用户可能不会注意到其余部分是否加载。【这部分内容往往只有开发者清楚，浏览器无法给出指标】
 `TTI` 可交互时间

##### 3. Main

`Main`：主线程，负责执行Javascript, 解析HTML/CSS, 完成绘制。
 可以看到主线程调用栈和耗时情况，每个长条都是一个事件，悬浮可以看到耗时和事件名

- x轴指时间
   最上面的第一条就是事件触发的地方，直到结束，这条线是最长的
- y轴指调用栈
   上面的event调用了下面的子event，越到下面数量越少（瀑布）

颜色代表各个事件类型，以下列出一些常见的事件

![img](https://upload-images.jianshu.io/upload_images/12224162-81f8be370f17feaa.png?imageMogr2/auto-orient/strip|imageView2/2/w/636/format/webp)



##### 4 . Network

有很多黄色(js资源)，紫色(css资源)的时间轴



#### 统计面板

##### Summary

统计图：展示各个事件阶段耗费的时间

- `Scripting` 脚本

- `Rendering` 渲染

  rendering指的是重排（样式计算和布局等），

- `Painting` 绘制

  painting指重绘（颜色等）

- `Loading` 加载

- `ldle` 闲置

##### Bottom-Up

 排序：可以看到各个事件消耗时间排序
 (1)`self-time` 指除去子事件这个事件本身消耗的时间
 (2)`total-time` 这个事件从开始到结束消耗的时间（包含子事件）

##### Call Tree

 调用栈：`Main`选择一个事件，可以看到整个事件的调用栈（从最顶层到最底层，而不是只有当前事件）

##### Event Log

 事件日志
 (1) 多了个`start time`，指事件在多少毫秒开始触发的
 (2) 右边有事件描述信息

##### 各个时间包含的部分

###### Loading事件

| 事件             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| Parse HTML       | 浏览器执行HTML解析                                           |
| Finish Loading   | 网络请求完毕事件                                             |
| Receive Data     | 请求的响应数据到达事件，如果响应数据很大（拆包），可能会多次触发该事件 |
| Receive Response | 响应头报文到达时触发                                         |
| Send Request     | 发送网络请求时触发                                           |

###### Scripting事件

| 事件                    | 描述                                                 |
| ----------------------- | ---------------------------------------------------- |
| Animation Frame Fired   | 一个定义好的动画帧发生并开始回调处理时触发           |
| Cancel Animation Frame  | 取消一个动画帧时触发                                 |
| GC Event                | 垃圾回收时触发                                       |
| DOMContentLoaded        | 当页面中的DOM内容加载并解析完毕时触发                |
| Evaluate Script         | A script was evaluated.                              |
| Event                   | js事件                                               |
| Function Call           | 只有当浏览器进入到js引擎中时触发                     |
| Install Timer           | 创建计时器（调用setTimeout()和setInterval()）时触发  |
| Request Animation Frame | A requestAnimationFrame() call scheduled a new frame |
| Remove Timer            | 当清除一个计时器时触发                               |
| Time                    | 调用console.time()触发                               |
| Time End                | 调用console.timeEnd()触发                            |
| Timer Fired             | 定时器激活回调后触发                                 |
| XHR Ready State Change  | 当一个异步请求为就绪状态后触发                       |
| XHR Load                | 当一个异步请求完成加载后触发                         |

###### Rendering事件

| 事件              | 描述                            |
| ----------------- | ------------------------------- |
| Invalidate layout | 当DOM更改导致页面布局失效时触发 |
| Layout            | 页面布局计算执行时触发          |
| Recalculate style | Chrome重新计算元素样式时触发    |
| Scroll            | 内嵌的视窗滚动时触发            |

###### Painting事件

| 事件             | 描述                                 |
| ---------------- | ------------------------------------ |
| Composite Layers | Chrome的渲染引擎完成图片层合并时触发 |
| Image Decode     | 一个图片资源完成解码后触发           |
| Image Resize     | 一个图片被修改尺寸后触发             |
| Paint            | 合并后的层被绘制到对应显示区域后触发 |





#### 诊断

#### 【JS】

　　JavaScript 计算，特别是会触发大量视觉变化的计算会降低应用性能。 不要让时机不当或长时间运行的 JavaScript 影响用户交互

　　下面是一些常见 JavaScript 问题

　　1、大开销输入处理程序影响响应或动画

　　让浏览器尽可能晚地处理触摸和滚动，或者绑定侦听

　　2、时机不当的 JavaScript 影响响应、动画、加载

　　使用 `requestAnimationFrame`、使 DOM 操作遍布各个帧、使用网络工作线程

　　3、长时间运行的 JavaScript 影响响应

　　将纯粹的计算工作转移到web worker中。如果需要 DOM 访问权限，配合使用`requestAnimationFrame`

#### 【样式】

　　样式更改开销较大，在这些更改会影响 DOM 中的多个元素时更是如此。 只要将样式应用到元素，浏览器就必须确定对所有相关元素的影响、重新计算布局并重新绘制

　　点击 **Recalculate Style** 事件（以紫色显示）可以在 **Details** 窗格中查看更多相关信息。 如果样式更改需要较长时间，对性能的影响会非常大。 如果样式计算会影响大量元素，则需要改进另一个方面

![style](https://pic.xiaohuochai.site/blog/recalculate-style.png)

　　要降低 **Recalculate Style** 事件的影响，使用一些对渲染性能的影响较小的属性。如使用 transform 和 opacity 属性更改来实现动画，使用 `will-change` 或 `translateZ` 提升移动的元素

　　下面是一些常见的CSS问题

　　1、大开销样式计算影响响应或动画

　　任何会更改元素几何形状的 CSS 属性，如宽度、高度或位置；浏览器必须检查所有其他元素并重做布局。避免会触发重排的CSS属性

　　2、复杂的选择器影响响应或动画

　　嵌套选择器强制浏览器了解与所有其他元素有关的全部内容，包括父级和子级。尽量在CSS中引用只有一个类的元素

#### 【重排】

　　布局（或重排）是浏览器用来计算页面上所有元素的位置和大小的过程。 网页的布局模式意味着一个元素可能影响其他元素；例如`body`元素的宽度一般会影响其子元素的宽度以及树中各处的节点等等。这个过程对于浏览器来说可能很复杂。 一般的经验法则是，如果在帧完成前从 DOM 请求返回几何值，将发现会出现“强制同步布局”，在频繁地重复或针对较大的 DOM 树执行操作时这会成为性能的大瓶颈。

　　performance面板可以确定页面何时会导致强制同步布局。 这些 **Layout** 事件使用红色竖线标记

![layout](https://pic.xiaohuochai.site/blog/forced-synchronous-layout.png)

　　“布局抖动”是指反复出现强制同步布局情况。 这种情况会在 JavaScript 从 DOM 反复地写入和读取时出现，将会强制浏览器反复重新计算布局

#### 【重绘】

　　绘制是填充像素的过程。这经常是渲染流程开销最大的部分。 如果在任何情况下注意到页面出现卡顿现象，很有可能存在绘制问题。

　　合成是将页面的已绘制部分放在一起以在屏幕上显示的过程。 大多数情况下，如果坚持仅合成器属性并避免一起绘制，性能会有极大的改进，但是需要留意过多的层计数

　　一定不要使用下面的代码

```
* {
  will-change: transform;
  transform: translateZ(0);
}
```

　　这是以迂回方式说想要提升页面上的每个元素。此处的问题是创建的每一层都需要内存和管理，而这些并不是免费的。事实上，在内存有限的设备上，对性能的影响可能远远超过创建层带来的任何好处。每一层的纹理都需要上传到 GPU，使 CPU 与 GPU 之间的带宽、GPU 上可用于纹理处理的内存都受到进一步限制

　　如果大部分渲染时间花费在绘制上，即表示存在绘制问题

　　下面是一些常见的绘制问题

　　1、绘制风暴影响响应或动画

　　较大的绘制区域或大开销绘制影响了响应或动画，要避免绘制、提升将要移动到自有层的元素，使用变形和不透明度

　　2、层数激增影响动画

　　使用 translateZ(0) 过度提升过多的元素会严重影响动画性能，要谨慎提升到层，并且仅在了解这样会有切实改进时才提升到层

![image-20210208171038696](/Users/telking/Library/Application Support/typora-user-images/image-20210208171038696.png)

![image-20210208171137884](/Users/telking/Library/Application Support/typora-user-images/image-20210208171137884.png)

