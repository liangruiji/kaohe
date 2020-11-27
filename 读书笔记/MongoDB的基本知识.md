#### 三个概念

##### 数据库 database

##### 集合 collection 多个文档组合成集合

##### 文档 document 一个最外的{}是一个文档

#### 安装与环境

Windows的安装和设置可以参考：http://www.w3cschool.cc/mongodb/mongodb-window-install.html；

Linux的安装和设置可以参考：http://www.w3cschool.cc/mongodb/mongodb-linux-install.html；

Mac OS X下的安装和设置：

- \1. 在https://www.mongodb.org/ 下载适合你的Mac的MongoDb;
- \2. 下载得到的文件是一个zip文件，解压，然后放到你想到的文件夹，比如/Users/Steven/MongoDB;
- \3. 创建一个你喜欢的文件夹来存储你的数据，比如/User/Steven/myData;
- \4. 打开Terminal，cd到2里面那个文件夹/Users/Steven/MongoDB，再cd bin;
- \5. 输入./mongod --dbpath /User/Steven/myData,等到出现类似“waiting for connections on port 27017”，说明MongoDB服务器已架设好，而数据将储存在myData里面；
- \6. 新打开一个Terminal, cd /Users/Steven/MongoDB/bin,然后运行./mongo;顺利的话它将出现一个interactive shell让你进行各种操作，而你的数据将储存在myData里

如果以上的各个步骤都运行顺利，就可以跳到下一节啦。

#### 基础命令

#### 数据库

##### 创建或切换数据库

~~~
use 数据库名字
~~~

##### 显示所有数据库

~~~
show databases
~~~



#### 集合

##### 添加集合

~~~
db.createCollection('集合的名字')
~~~

##### 显示当前数据库的所有集合

~~~
show collections
~~~

##### 删除集合

~~~
db.集合名.drop()
~~~



#### 插入

插入一个或多个文档

~~~
db.集合名.insert( {文档对象} ) 或 db.集合名.insert( [{文档对象1},{文档对象2}] )
~~~

`insert`操作有几点需要注意：

- 1. 不同key-value需要用逗号隔开，而key:value中间是用冒号；
- 2. 如果一个key有多个value，value要用[]。哪怕当前只有一个value，也加上[]以备后续的添加；
- 3. 整个“数据块”要用{}括起来；

如果你在`insert`之后看到`WriteResult({ "nInserted" : 1 })`，说明写入成功。



#### 查询并返回数据

~~~
db.集合名.find().pretty()
~~~

`find()`里面是空的，说明我们不做限制和筛选，`pretty()`输出的是经格式美化后的数据

##### 计数

~~~
db.集合名.find().count() //返回查询数据的个数
~~~

##### 与条件查询

~~~
db.集合名.find( {条件1属性名:值，！条件2属性名:值} ).pretty()
~~~

这里两个条件之间，是and的关系，只有同时满足两个条件才会被输出

**特别注意**：直接使用ObjectId查询数据：直接使用类似db.collection.find({_id:”xx”})式的代码是错误的们需要使用db.collection.find({_id:new ObjectId(“xx”)})

##### 或条件查询

~~~
db.集合名.find( $or:[{条件1属性名:值},{条件2属性名:值}] ).pretty()
~~~

查找符合条件1或者条件2的文档

##### 范围查询（属性值为数字时）

查询某个属性的值大于50的文档

~~~
db.集合名.find( {条件1属性名:{$gt:50}} ).pretty()
~~~

这里将比较符号归纳为下表。

| 符号   | 含义       | 示例                          |
| ------ | ---------- | ----------------------------- |
| `$lt`  | 小于       | `{'age': {'$lt': 20}}`        |
| `$gt`  | 大于       | `{'age': {'$gt': 20}}`        |
| `$lte` | 小于等于   | `{'age': {'$lte': 20}}`       |
| `$gte` | 大于等于   | `{'age': {'$gte': 20}}`       |
| `$ne`  | 不等于     | `{'age': {'$ne': 20}}`        |
| `$in`  | 在范围内   | `{'age': {'$in': [20, 23]}}`  |
| `$nin` | 不在范围内 | `{'age': {'$nin': [20, 23]}}` |




##### findOne :返回第一个符合条件的文档

~~~
db.集合名.findOne({条件1})
~~~

##### limit()和skip()

如果结果很多而你只想显示其中一部分，可以用`limit()`和`skip()`，前者指明输出的个数，后者指明从第二个结果开始数

~~~
db.集合名.find().limit(2).skip(1).pretty()
~~~

**值得注意的是**，在数据库数量非常庞大的时候，如千万、亿级别，最好不要使用大的偏移量来查询数据，因为这样很可能导致内存溢出。此时可以使用类似如下操作来查询：

```
from bson.objectid import ObjectId
collection.find({'_id': {'$gt': ObjectId('593278c815c2602678bb2b8d')}})复制代码
```

这时需要记录好上次查询的`_id`。

##### 查询返回文档的一部分属性

find的第二个参数是用来控制输出的，1表示要返回，而0则表示不返回。默认值是0，但`_id`是例外，因此如果你不想输出`_id`，需要显式地声明

~~~
db.集合名.find( {条件1},{需要返回的属性名1:1,！需要返回的属性名2:1} ).pretty()
~~~



#### 更新

update()

语法结构是：

db.collection.update( criteria, objNew, upsert, multi )

参数:

criteria - 查询需要更新的项;

objNew - 更新的对象或者 $ operators (例如 $inc) 这样的操作因子

upsert - 是否是 "upsert"; 也就是说如果记录不存在是否插入新的记录

multi - 是否所有满足criteria的在整个文档都更新

注意：在缺省情况下，update()只会更新第一个满足条件的项。如果需要修改所以的满足条件的

项的话，需要使用multi这个标志位。

下面出现的upsert均表示：如果存在就更新，如果不存在就插入。

注意：

1、update方法只更新一条记录
默认情况下update只更新符合查询条件的第一条找到的记录。如果想更新所有符合条件的记录，需要手动添加 multi 这个参数。

2、update方法的更新参数
像下面这个语句
myColl.update( { _id: X }, {name: "Joe", age: 20 });
会把符合条件的原纪录按照{name: "Joe", age: 20 }完整替换，而不是简单的将name设为"Joe"，age设为20.
如果只想更改这2个值，而不是替换完整对象，应该写
myColl.update( { _id: X },{$set: {name: "Joe", age: 20 }});

update第一个参数里表明要选取的对象，第二个表明要改动的数据，默认只会更新第一个。

~~~
db.集合名.update({查询条件名1:值}, {$set:{更新属性名1:值}})
~~~

##### 自增更新

~~~
db.集合名.update({查询条件名1:值}, {$inc:{更新属性名1:自增值}})
~~~

##### 多个同时更新

要多个同时更新，要在update的第三个参数里设置`{multi:true}`

~~~
db.集合名.update({查询条件名1:值}, {$inc:{更新属性名1:自增值}}, {multi:true})
~~~

注意，以上的更新操作会替换掉原来的值，所以如果你是想在原有的值得基础上增加一个值的话，则应该用`$push`

##### 如果值为数组，需要添加值

~~~
db.集合名.update({查询条件名1:值}, {$push:{更新属性名1:新增的值}})
~~~

##### MO操作符

##### $inc

​	{ $inc : { field : value } }

如果fileid在前面的object部分，则按value值递增；反之，则将fieid赋值为value.

##### $set

​	{ $set : { field : value } }

将field设置为value,$set 支持所有的数据类型。

##### $unset

​	{ $unset : { field : 1} }

删除指定的field.

##### $push

​	{ $push : { field : value } }

如果fileld是个数组的话，将value追加到数组中；

如果fileld没有定义，那么就将fileld赋值为数组[value];

如果fileld已经存在但不是数组的话，就会报错！

##### $addToSet

​	{ $addToSet : { field : value } }

只有当这个value不在这个数组里的时候才会添加valuse到数组中。

主持增加多个值，例如：

{ $addToSet : { a : { $each : [ 3 , 5 , 6 ] } } }

##### $pop

​	{ $pop : { field : 1  } }

删除数组中最后一个元素。

同理：

删除数组中第一个元素：

{ $pop : { field : -1  } }

##### $pull

​	{ $pull : { field : _value } }

如果field是个数组的话，删除里面出现的所有字段值。

如果fileld存在但不是个数组，就会报错。

{ $pull : { field : {field2: value} } } 删除和field2中匹配的所有元素 

{ $pull : { field : {$gt: 3} } }删除数组中大于 3 的所有元素

{ $pull : { field : {$elemMatch: {field2: value }} } } 删除和field2内嵌元素匹配的所有元素

##### $pullAll

​	{ $pullAll : { field : value_array } }

#### 删除

删除符合条件的所有文档

~~~
db.集合名.remove({'tags':'romance'})
~~~

限制删除个数

~~~
db.集合名.remove({'tags':'romance'},删除的个数)
~~~

如果不加任何限制：

```
db.集合名.remove()
```

会删除这个集合下的所有文档。



#### 索引和排序

### 索引操作

> mongo的_id字段自带主键索引，自增唯一，默认是一个12字节的ObjectId。
>
> 建索引index会加快查找速度但会让插入速度降低，注意不要为每个KEY都加上index，这样虽然查询快，但插入速度就大大降低了，如你每次都从collection中提取一半以上的数据，这个时候不用index速度更快
>
> [官方文档](http://docs.mongoing.com/manual-zh/tutorial/sort-results-with-indexes.html) [索引原理](http://www.mongoing.com/archives/2797) [索引类型](http://itbilu.com/database/mongo/VJG8tei0g.html) [mongodb之使用explain和hint性能分析和优化](http://www.cnblogs.com/huangxincheng/p/5737222.html) [explain输出参数](http://itbilu.com/database/mongo/V1WFKy-Cl.html)
>
> ```js
> db.people.createIndex({"username" : 1})   // 对people中的username建立索引,多个索引用逗号隔开，1或－1表示建立索引的顺序，网上大多数用ensureIndex 是过时废弃的函数
> db.blog.createIndex({"author.name": 1)  // 对子文档建立索引的方式，内嵌文档使用“点操作符”来创建索引
> db.foo.createIndex({page: 1}, {name: 'I_page'})   //给这个索引命名，索引名是由mongodb自动建立的，你也可以指定自己想的名字，只需要传入第二个参数
> db.book.createIndex({ISBN: 1}, {unique:1, sparse: 1}) //unique索引，就像是关系数据库里的主键一样，值是唯一的 ,{sparse: true}稀疏索引是仅包含有被索引字段的文档的索引
> db.colA.createIndex({book: 1, page: 1}) // 复合查询是有顺序的，查询字段要在索引中存在，且顺序一致，否则不会用索引,比如db.colA.find().sort({'page':1})和db.colA.find().sort({'page':1, 'book':1})是无效
> db.colA.createIndex({book: 'text'}) //文本索引
> db.map.createIndex({gps: '2d'}, {min: -1000, max: 1000}) // 创建地理空间索引时，索引值不再是±1，而是'2d'。min和max指定平面范围，默认-180~180
> db.Users.dropIndex(‘Name_1')  //删除索引Name_1  
> db.Users.dropIndex() 是删除所有索引db.Users.getIndexes() // 列出索引
> db.Users.getIndexkeys() // 列出建有索引的字段
> db.people.createIndex({"username" : 1}, {"background" : true})    //索引会阻塞前台使用，数据大的要用background：true在后台操作才不会阻塞使用，如果是false的话，阻塞任何对该collection的操作，直到索引完成
> db.colA.reIndex()  // 重建索引重建index，它的原理就是先drop索引，然后重新创建索引
> db.colA.find({age : {$gt : 10}, username : "sally"}).explain()  // SQL中的explain一样的作用，查看索引使用情况。
> db.colA.find().hint({'page_1': 1}) // 强制使用指定索引
> ```

~~~
db.集合名.ensureIndex({需要设置索引的属性名:1})
~~~

##### 输出排序

按照属性名来排序，1是升序，-1是降序。默认是1。

~~~
db.集合名.find().sort({属性名:1}).pretty()
~~~

返回所有索引，包括其名字

~~~
db.集合名.getIndexes()
~~~

删除对应的索引

~~~
db.集合名.dropIndex('index_name')
~~~



#### 查询文档的一个属性在集合中有多少类型

$group:{_id:'$属性名',！自定义输出属性名:{$sum:累计的数值} }

~~~
db.集合名.aggregate( [{$group:{_id:'$属性名'}}] )
~~~

查询属性种类并计算每个种类有多少个

~~~
db.集合名.aggregate( [{$group:{_id:'$属性名',num:{$sum:1}}}] )
~~~

查询属性种类并累计某个属性

~~~
db.集合名.aggregate( [ { $group:{_id:'$属性名',num:{$sum:'$需要累计的属性名'}} } ] )
~~~

$sum 求和

$avg 求平均

$first 求第一个数



#### All or Nothing?

MongoDB支持单个文档内的原子化操作(atomic operation)，这是说，可以将多条关于同一个文档的指令放到一起，他们要么一起执行，要么都不执行。而不会执行到一半。有些场合需要确保多条执行一起顺次执行。比如一个场景：一个电商网站，用户查询某种商品的剩余数量，以及用户购买该种商品，这两个操作，必须放在一起执行。不然的话，假定我们先执行剩余数量的查询，这是假定为1，用户接着购买，但假如这两个操作之间还加入了其它操作，比如另一个用户抢先购买了，那么原先购买用户的购买的行为就会造成数据库的错误，因为实际上这种商品以及没有存货了。但因为查询剩余数量和购买不是在一个“原子化操作”之内，因此会发生这样的错误[[2\]](http://www.tutorialspoint.com/mongodb/mongodb_atomic_operations.htm)。

MongoDB提供了`findAndModify`的方法来确保atomic operation。比如这样的：

```
db.movie.findAndModify(
			{
			query:{'title':'Forrest Gump'},
			update:{$inc:{likes:10}}
			}
		      )
```

query是查找出匹配的文档，和find是一样的，而update则是更新likes这个项目。注意由于MongoDB只支持单个文档的atomic operation，因此如果query出多于一个文档，则只会对第一个文档进行操作。

`findAndModify`还支持更多的操作，具体见：http://docs.mongodb.org/manual/reference/command/findAndModify/。



#### 文本搜索

除了前面介绍的各种深度查询功能，MongoDB还支持文本搜索。对文本搜索之前，我们需要先对要搜索的key建立一个text索引。假定我们要对标题进行文本搜索，我们可以先这样：

```
db.movie.ensureIndex({title:'text'})
```

接着我们就可以对标题进行文本搜索了，比如，查找带有"Gump"的标题：

```
db.movie.find({$text:{$search:"Gump"}}).pretty()
```

注意text和search前面的$符号。

这个例子里，文本搜索作用不是非常明显。但假设我们要搜索的key是一个长长的文档，这种text search的方便性就显现出来了。MongoDB目前支持15种语言的文本搜索。

#### 正则表达式

MongoDB还支持基于正则表达式的查询。如果不知道正则表达式是什么，可以参考[Wikipedia](http://en.wikipedia.org/wiki/Regular_expression)。这里简单举几个例子。比如，查找标题以`b`结尾的电影信息：

```
db.movie.find({title:{$regex:'.*b$'}}).pretty()
```

也可以写成：

```
db.movie.find({title:/.*b$/}).pretty()
```

查找含有'Fight'标题的电影：

```
db.movie.find({title:/Fight/}).pretty()
```

注意以上匹配都是区分大小写的，如果你要让其不区分大小写，则可以：

```
db.movie.find({title:{$regex:'fight.*b',$options:'$i'}}).pretty()
```

`$i`是insensitive的意思。这样的话，即使是小写的fight，也能搜到了。



这里将一些功能符号再归类为下表。

| 符号      | 含义           | 示例                                                | 示例含义                           |
| --------- | -------------- | --------------------------------------------------- | ---------------------------------- |
| `$regex`  | 匹配正则表达式 | `{'name': {'$regex': '^M.*'}}`                      | `name`以M开头                      |
| `$exists` | 属性是否存在   | `{'name': {'$exists': True}}`                       | `name`属性存在                     |
| `$type`   | 类型判断       | `{'age': {'$type': 'int'}}`                         | `age`的类型为`int`                 |
| `$mod`    | 数字模操作     | `{'age': {'$mod': [5, 0]}}`                         | 年龄模5余0                         |
| `$text`   | 文本查询       | `{'$text': {'$search': 'Mike'}}`                    | `text`类型的属性中包含`Mike`字符串 |
| `$where`  | 高级条件查询   | `{'$where': 'obj.fans_count == obj.follows_count'}` | 自身粉丝数等于关注数               |

