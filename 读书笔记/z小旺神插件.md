![image-20210415152354819](/Users/telking/Library/Application Support/typora-user-images/image-20210415152354819.png)

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

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-03-23|2021-04-21&dateType=recent30&device=2&indexCode=uv,crtByrCnt,crtRate,guideToShortVideoUv,crtVldAmt&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~
/flow/v5/live/shop/source/tree.json?belong=all&dateRange=2021-04-22|2021-04-22&dateType=today&device=2&indexCode=uv&order=desc&orderBy=uv&page=1&pageSize=10
实时

~~~

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-21|2021-04-21&dateType=recent1&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-15|2021-04-21&dateType=recent7&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-03-23|2021-04-21&dateType=recent30&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10

https://sycm.taobao.com/flow/v5/shop/source/tree.json?dateRange=2021-03-24%7C2021-04-22&dateType=recent30&pageSize=10&page=1&order=desc&orderBy=uv&device=2&belong=all&indexCode=uv%2CcrtByrCnt%2CcrtRate&_=1619169034673&token=c61222158
~~~

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-21|2021-04-21&dateType=day&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-12|2021-04-18&dateType=week&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~
/flow/v6/shop/source/crowdtype/tree.json?belong=all&crowdType=new&dateRange=2021-04-21|2021-04-21&dateType=recent1&device=2&indexCode=uv,payByrCnt,payRate&order=desc&orderBy=uv&page=1&pageSize=10
新客
/flow/v6/shop/source/crowdtype/tree.json?belong=all&crowdType=old&dateRange=2021-04-21|2021-04-21&dateType=recent1&device=2&indexCode=uv,payByrCnt,payRate&order=desc&orderBy=uv&page=1&pageSize=10
老客
/flow/v6/shop/source/crowdtype/tree.json?belong=all&crowdType=mbr&dateRange=2021-04-21|2021-04-21&dateType=recent1&device=2&indexCode=uv,payByrCnt,payRate&order=desc&orderBy=uv&page=1&pageSize=10
会员
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-21|2021-04-21&dateType=recent1&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
整体
~~~

~~~
uv 访客数
crtByrCnt 下单买家数
crtRate 下单转化率
guideToShortVideoUv 引导短视频访客数
ipvUvRelate 引导商品访问数
newUv 新访客数
shopCltByrCnt 关注店铺数
cltItmCnt 商品收藏人数
cartByrCnt 加购人数
crtVldAmt 下单金额
payAmt 支付金额
payByrCnt 支付买家数
payRate 支付转化率
payPct 客单价
uvValue UV价值

expUv
directPayByrCnt 直接支付买家数
cltItmPayByrCnt 收藏商品支付买家数
fansPayByrCnt 粉丝支付买家数
ordItmPayByrCnt 加购商品-支付买家数


192 20.33
~~~

![image-20210422172341957](/Users/telking/Library/Application Support/typora-user-images/image-20210422172341957.png)

![image-20210423104239311](/Users/telking/Library/Application Support/typora-user-images/image-20210423104239311.png)

![image-20210423104331934](/Users/telking/Library/Application Support/typora-user-images/image-20210423104331934.png)

~~~
/flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-24|2021-04-24&dateType=recent1&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
flow/v5/shop/source/tree.json?belong=all&dateRange=2021-04-16|2021-04-22&dateType=recent7&device=2&indexCode=uv,crtByrCnt,crtRate&order=desc&orderBy=uv&page=1&pageSize=10
~~~

~~~

~~~

~~~
/flow/v6/live/item/source.json?dateRange=2021-04-27|2021-04-27&dateType=today&device=2&indexCode=uv&itemId=3399586689&order=desc&orderBy=uv
实时
~~~

![image-20210427111951603](/Users/telking/Library/Application Support/typora-user-images/image-20210427111951603.png)

~~~
访客数
访客数占比
下单转化率
下单买家数
下单金额
支付转化率
支付买家数
支付金额
客单价
uv价值
~~~

~~~
访客数  uv
下单买家数 crtByrCnt
下单转化率 crtRate
浏览量 pv
浏览量占比 pv
店内跳转人数 jpSelfUv
跳出本店人数 jpUv
收藏人数 cltCnt
收藏率 cltCnt/uv
加购人数 cartByrCnt
加购率 cartByrCnt/uv
支付金额 payAmt
支付件数 payItmCnt
支付买家数 payByrCnt
支付转化率 payRate
客单价 payAmt/payByrCnt
uv价值 payAmt/uv
直接支付买家数
收藏支付买家数
粉丝支付买家数
加购商品买家数
~~~



https://segmentfault.com/a/1190000020061167监听local变化

生意参谋 data 16进制数据解析还原

通过函数可以看出加密思路:`明文-->AES加密-->base64编码-->16进制编码-->16进制密文`

而解密思路则是放过来：`16进制密文--> 16进制编码-->base64编码-->AES加密-->明文`

![image-20210428120108744](/Users/telking/Library/Application Support/typora-user-images/image-20210428120108744.png)

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



~~~
商品名称及url
品牌名称
日期
总交易金额
促销价
交易金额

商品名称
类目名
日期
总交易金额
促销价
交易金额
~~~

xws/session/mc/mq/industryCustomer/customerTrend.json?cateId=50021948&dateRange=2021-04-28|2021-04-28&dateType=day&device=0&indexCode=&sellerType=-1

https://sycm.taobao.com/mc/buyerPortrait/listItemsByBrand.json?dateType=day&dateRange=2021-04-28%7C2021-04-28&cateId=50021948&seller=-1&brandId=22308972&_=1619680099614&token=c61222158

5000 2187

10000 7100

20000 23443

100000 396084

 客群指数  paymentPeriodPreference

搜索词偏好 searchWord_preference

属性偏好  property_preference

客群趋势 customerTrend

品牌偏好-交易商品榜	listItemsByBrand

类目偏好-交易商品榜 listItemsByCate

![image-20210430162012072](/Users/telking/Library/Application Support/typora-user-images/image-20210430162012072.png)

职业分析  

~~~
mc/mq/industryCustomer/getIndexValue.json?attrType=career&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1
~~~



top省份 

~~~
mc/mq/industryCustomer/getIndexValue.json?attrType=prov&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1
~~~

top城市

~~~
mc/mq/industryCustomer/getIndexValue.json?attrType=city&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1
~~~

支付金额分布

~~~
"mc/mq/industryCustomer/payFondness.json?attrType=price_prefer&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1"
~~~

品牌偏好排名

~~~
mc/buyerPortrait/listFondnessBrands.json?cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&page=1&pageSize=10&sellerType=-1
~~~

类目偏好排名

~~~
mc/buyerPortrait/listFondnessCates.json?cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&page=1&pageSize=10&sellerType=-1
~~~

年龄分析

~~~
"mc/mq/industryCustomer/getIndexValue.json?attrType=age&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1"
~~~

性别分析

~~~
"mc/mq/industryCustomer/getIndexValue.json?attrType=gender&cateId=50021948&dateRange=2021-04-29|2021-04-29&dateType=day&device=0&indexCode=payByrCntRate&sellerType=-1"
~~~

