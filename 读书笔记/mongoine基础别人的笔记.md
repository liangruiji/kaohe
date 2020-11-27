##### 连接数据库

> ![img](https:////upload-images.jianshu.io/upload_images/13121601-3fb6e1a8eeed7027.png?imageMogr2/auto-orient/strip|imageView2/2/w/920/format/webp)
>
> - connect("数据库名")
>    mongodb 没有配置用户权限，用的默认设置。
> - connect("数据库名", host="主机名",port=端口号，username=,password=)
>    要验证的方式

##### 定义 表

> - 定义 类,继承自Document
>    类名，就是mongodb的集合名
>
>   ![img](https:////upload-images.jianshu.io/upload_images/13121601-b9a9053a8d697c25.png?imageMogr2/auto-orient/strip|imageView2/2/w/767/format/webp)

#### 增删改查（CURD）

##### 增

> 实例化对象，添加属性，并调用 **.save()** 保存
>
> ![img](https:////upload-images.jianshu.io/upload_images/13121601-b35b3753f2bbe053.png?imageMogr2/auto-orient/strip|imageView2/2/w/394/format/webp)

##### 查

**查询条件可以写在objects()里,也可以写在filter()里**

- Student.**objects.first()**
   返回第一个文档，是一个Student object对象
   通过 "." 操作符拿到相应属性。
- Student.**objects.all()**
   返回所有文档， 是列表，由Student object对象组成。
- Student.**objects.filter()**
   查询条件，用关键字参数传进去。
   返回Student object对象组成的 列表
   若不存在，返回 空列表。
- Student.**objects.filter().first()**
   查询满足条件的第一条数据。

##### 字符串查询

表名.objects(字段__操作符=查询条件).order_by()...
 注意：字段后是2个下划线

> - exact 完全匹配
> - iexact 完全匹配（忽略大小写）
> - contains 包含该值
> - icontains 包含该值（忽略大小写）
> - startswith 以该字符串开始
> - istartswith 以该字符串开始（忽略大小写）
> - endswith 以该字符串结束
> - iendswith 以该字符串结束（忽略大小写）

> - ne 不等于
> - gt(e) 大于(等于)
> - lt(e) 小于(等于)
> - not 对操作符取反，比如 age__not__gt=18
> - in 后面是一个列表，比如 name__in=["林冲"，"令狐冲"],找出这两个人的数据，满足一条也可以，若都不存在，返回空列表。
> - nin in的取反
> - mod 取模，比如 age__mod=(2,0) 表示查询出age除以2，余数是0的数据。

> 多条件查询,使用Q，结合 "&" "|" 实现，
>  一个 Q 类，代表一个查询条件。
>  **from mongoengine.queryset.visitor import Q**
>  .objects(Q() & Q())

> - 使用**PyMongo语句查询**, raw前后都是双下划线。
>    表名.objects( **__ raw __**={} )

##### 排序

> - 声明 表 的时候，定义排序。
>
>   ![img](https:////upload-images.jianshu.io/upload_images/13121601-a6f7c4420c8437b7.png?imageMogr2/auto-orient/strip|imageView2/2/w/757/format/webp)
>
>   *
>
> - 查询的时候，排序。
>    **.order_by("+/-字段名")**
>    正负号，代表升降序。

##### 抽出指定 字段

> 调用 **.only()** 方法，括号内传入指定  字段。
>  可以链式调用,比如: 表名.objects.only().only()
>  后一个 only() 是添加字段

> **.exclude()**方法，与 .only()相反。
>  通过 **.reload("字段名")** 可以重载该字段。

##### 改 删

- update()
- update_one()
- delete()

写法：**update(操作符__字段=设置的值)**
 可以使用如下的操作符:

> - set 设置指定的值
> - unset 删除指定的值
> - inc 自增一个指定的值
> - dec 自减一个指定的值
> - push 在 list 中， 添加一个值
> - push_all 在 list 中， 添加多个值,多个值写成列表的形式。
> - pull 与push相反。
> - pull_all 与push_all相反。
> - add_to_set 当要添加的值存在，则忽略，不存在，则添加。

#### aggregation methods

- 表名.objects.**count()**
   计数。
- 表名.objects.**sum("字段名")**
   求和。
- 表名.objects.**average("字段名")**
   求平均数。
- 表名.objects.**item_frequencies("字段名")**
   返回的是一个字典，key是字段名，value是该字段出现的次数。
   参数 normalize:若为True, value将会是小数，所有字段的value相加为1.
- 表名.objects.**aggregate()**
   第一种写法：
   a = { 管道1：{ 表达式1 } }, { 管道2：{ 表达式2 } }
   表名.objects.aggregate(*a)
   注意 多个管道的时候， a前面要加个**星号**。
   第二张写法：
   表名.objects.aggregate({},{},{}...)
   直接用花括号的形式写，中间用逗号分隔。
- 表名.objects.distinct("字段名")
   返回一个列表，该字段名的值（不重复的）组成的一个列表。



0人点赞



[python3]()





作者：xyzcmu
链接：https://www.jianshu.com/p/be03a249f8f8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。