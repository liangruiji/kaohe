

popup页面的css文件是在哪里的



con.js中发送信息，监听响应并执行cs_hot_update_unzip.js文件

bg.js中监听信息，发送请求获得cs_hot_update_unzip.js文件并响应给con.js

pop.js请求pop_v3.html并加到pop.html的body中，运行pop_hot_update.js，里面主要是一些交互



conhtml.js 里主要是一些声明了html变量



cs_hot_update_unzip.js 主要是根据不同网址，发送不同信息，然后在bg中获得不同js文件

~~~
小旺神插件适配的页面主要有
1、淘宝详情页
2、淘宝生意参谋
3、淘宝直通车
4、京东详情页
详情页下载、评价下载、手机京东、评价分析、问答分析
5、京东商智


生意参谋需要账号密码
雅轩斋旗舰店:刘芸   
ab123456
是上面这个，要验证手机的，在群里面直接找王幸


优质价值词=支付金额*访客平均价值*商品平均价值（公用流量大词数值越大越好，品牌词小词刷单词综合分析）
访客平均价值=支付金额/访客
商品平均价值=支付金额/在线商品数
预估转化件数=搜索人气*支付转化率
平均交易指数=交易指数/预估转化件数
UV价值=交易金额/访客人数
搜索占比=搜索人数/访客人数。搜索人数占总访问人数的比率。
竞争度：竞争度=搜索人气*点击率*转化率/在线商品数*10000。数字越大，竞争越小；数字越小，竞争越大。
即竞争度数值大的关键词要比数值小的关键词好。
~~~

##### vue.config.js中

1.有dist生成文件的对应关系



##### bg中：

1.请求xws中的bg_hot_update_unzip.js，并运行，

2.监听来着init.js中的信息，根据不同信息，获得不同的js代码并回应，

##### Init.js中

1.根据不同网址，获得本地的配置信息，有的话发送配置信息（如：js代码请求地址）到bg中，

2.请求获得不同配置信息，有本地配置的话，判断版本号，大于的话发送更新后的配置信息，没本地配置，就发送请求获得的配置信息。并储存到storage中

3.监听bg回应，运行回应中的js代码

##### pop.js中

1.请求pop_v3.html并加到pop.html的body中

2.请求到pop_hot_update.js并运行，里面主要是popup的一些交互



##### js/jd_init.js中：  对应 Jdsz/jd_init.js

1.京东页面时，bg回应给init.js的js代码

2.会根据不同的京东页面（京东详情页和京东商智），获得本地配置信息，如果有就发送给bg。

3.请求获得不同页面的配置信息，有本地配置的话，判断版本号，大于的话发送更新后的配置信息。没本地配置就发送新请求到的配置到bg中，并储存到storage中。如果有信息里css链接地址，都通过DOM操作把css链接注入到head标签中

3.监听bg的回应，并运行回应中的js代码



##### Dist/js/jd_item.js中    对应jd_item/index.js

1.是实际页面中的代码，包括html，插入的位置，

2.这里创建vue实例



startsWith()函数 字符串原型方法

decodeURIComponent(escape(msg.content)) 函数

chrome.runtime.getURL()将插件安装目录中的相对路径转换为标准URL。

```
decodeURIComponent(encodedURI)
function getUrlKey(url, name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
这个函数的作用
src/assets/js/public.js
```

这个运行模式，可以在改的时候理解下这个图，这个图看得明白了那证明cj-tpl是怎样运行的也是比较清楚了

![企业微信截图_57ebbe12-090d-4a59-8e28-0342b8c5e866](/web/www/kaohe/读书笔记/img/小旺神插件.png)

生意参谋转化流程图

https://weixin.processon.com/home/view/link/607cf8dee4b0550adb7c798e

![企业微信截图_710831b0-7702-4205-bd27-0efe8fac0e0f](/web/www/kaohe/读书笔记/img/流程图.png)

window.postmessage 用法

内容页面设置的localStorage会在加载内容页面的网页中







https://segmentfault.com/a/1190000020061167监听local变化

生意参谋 data 16进制数据解析还原

通过函数可以看出加密思路:`明文-->AES加密-->base64编码-->16进制编码-->16进制密文`

而解密思路则是放过来：`16进制密文--> 16进制编码-->base64编码-->AES加密-->明文`



Tracker

baxia-punish

baxia-punish captcha  pc-ajax 

 baxia-dialog auto 

x5secdata

**`match()`** 方法检索返回一个字符串匹配正则表达式的结果。

5&&6,8逗号语法

if语句里判断条件中的逗号

~~~
var a,b,c=5;

if(a=2,b=3,c==4){var d="test"}    
~~~

Location replace() 方法











