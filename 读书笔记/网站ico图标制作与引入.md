# 网站ico图标制作与引入

### 1). 使用ico图标

* 首先把favicon.ico 这个图标放到根目录下。

* 再html里面，  head 之间 引入 代码。

  > <link rel="shortcut icon" href="favicon.ico"  type="image/x-icon"/>     

### 2). 制作ico图标

我们可以自己做的图片，转换为 ico图标，以便放到我们站点里面。

方法步骤：

* 首先把我们想要的切成图片。
* 要把图片转换为 ico 图标，我们借助于第三方转换网站：   http://www.bitbug.net/。  比特虫

总结：

```
代码：  <link rel="shortcut icon" href="favicon.ico"  type="image/x-icon"/>     
```

注意： 

1. 她（它）是显示在浏览器中的网页图标。
2. 它是图标形式，不是一个图片
3. 位置是放到 head 标签中间。
4. 后面的type="image/x-icon"  属性可以省略。（我相信你也愿意省略。）
5. 为了兼容性，请将favicon.ico 这个图标放到根目录下。





# 字体图标

图片是有诸多优点的，但是缺点很明显，比如图片不但增加了总文件的大小，还增加了很多额外的"http请求"，这都会大大降低网页的性能的。更重要的是图片不能很好的进行“缩放”，因为图片放大和缩小会失真。 我们后面会学习移动端响应式，很多情况下希望我们的图标是可以缩放的。此时，一个非常重要的技术出现了，额不是出现了，是以前就有，是被从新"宠幸"啦。。 这就是字体图标（iconfont).

###  1.  字体图标优点

```
可以做出跟图片一样可以做的事情,改变透明度、旋转度，等..
但是本质其实是文字，可以很随意的改变颜色、产生阴影、透明效果等等...
本身体积更小，但携带的信息并没有削减。
几乎支持所有的浏览器
移动端设备必备良药...
```

### 2.   字体图标使用流程

总体来说，字体图标按照如下流程：

<img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/fontt.png" />

### 3. 设计字体图标

假如图标是我们公司单独设计，那就需要第一步了，这个属于UI设计人员的工作， 他们在 illustrator 或 Sketch 这类矢量图形软件里创建 icon图标， 比如下图：

<img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/03.jpg" />

  之后保存为svg格式，然后给我们前端人员就好了。 

  其实第一步，我们不需要关心，只需要给我们这些图标就可以了，如果图标是大众的，网上本来就有的，可以直接跳过第一步，进入第三步。

### 4. 上传生成字体包

   当UI设计人员给我们svg文件的时候，我们需要转换成我们页面能使用的字体文件， 而且需要生成的是兼容性的适合各个浏览器的。

​    推荐网站： http://icomoon.io

* icomoon字库

IcoMoon成立于2011年，推出的第一个自定义图标字体生成器，它允许用户选择他们所需要的图标，使它们成一字型。 内容种类繁多，非常全面，唯一的遗憾是国外服务器，打开网速较慢。

* 阿里icon font字库

http://www.iconfont.cn/

这个是阿里妈妈M2UX的一个icon font字体图标字库，包含了淘宝图标库和阿里妈妈图标库。可以使用AI制作图标上传生成。 一个字，免费，免费！！

### 5. 下载兼容字体包

刚才上传完毕， 网站会给我们把UI做的svg图片转换为我们的字体格式， 然后下载下来就好了

当然，我们不需要自己专门的图标，是想网上找几个图标使用，以上2步可以直接省略了， 直接到刚才的网站上找喜欢的下载使用吧。



<img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/fontt1.png" />

<img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/fontt2.png" />

### 6. 字体引入到HTML

得到压缩包之后，我们得知字体图标 本质就是 字体文件。 注意这个压缩包不要删掉，我们后面还有用的。

![1498032122244](L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/1498032122244.png)

最后一步，是最重要的一步了， 就是字体文件已经有了，我们需要引入到我们页面中。

1. 首先把 fonts文件夹放入我们 根目录下 。

   <img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/11.png" />

   ##### 2. html标签内里面添加结构

    <img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/222.png" />

   ```css
    <span></span>  
   ```

   ##### 3. 在样式里面声明字体： 告诉别人我们自己定义的字体(一定注意字体文件路径的问题)

   ```css
   @font-face {
     font-family: 'icomoon';
     src:  url('fonts/icomoon.eot?7kkyc2');
     src:  url('fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'),
       url('fonts/icomoon.ttf?7kkyc2') format('truetype'),
       url('fonts/icomoon.woff?7kkyc2') format('woff'),
       url('fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
     font-weight: normal;
     font-style: normal;
   }
   //阿里字体库
@font-face {
     font-family: 'iconfont';
  src: url('../fonts/iconfont.eot');
     src: url('../fonts/iconfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/iconfont.woff') format('woff'),
       url('../fonts/iconfont.ttf') format('truetype'),
       url('../fonts/iconfont.svg#iconfont') format('svg');
   }
   ```
   
   ##### 4. 给盒子使用字体
   
   ```css
   span {
   		font-family: "icomoon";
   	}
   ```

### 7. 追加字体图标

   如果工作中，原来的字体图标不够用了，我们需要添加新的字体图标，但是原来的不能删除，继续使用，此时我们需要这样做

   把压缩包里面的selection.json 从新上传，然后，选中自己想要新的图标，从新下载压缩包，替换原来文件即可。

   <img src="L:/前端项目/01-03 前端开发基础/03-品优购电商项目资料/10.品优购-Day01/笔记/media/fontt5.png" />

### 拓展@ 常见字体格式

不同浏览器所支持的字体格式是不一样的，我们有必要了解一下有关字体格式的知识。

1. TureType(.ttf)格式

.ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；

1. OpenType(.otf)格式

.otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；

1. Web Open Font Format(.woff)格式

woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；

1. Embedded Open Type(.eot)格式

.eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；

1. SVG(.svg)格式

.svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+；

了解了上面的知识后，我们就需要为不同的浏览器准备不同格式的字体，通常我们会通过字体生成工具帮我们生成各种格式的字体，因此无需过于在意字体格式间的区别差异。