# MongoEngine文档—字段类型

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/translate.png)

[宅神kin](https://house.blog.csdn.net/) 2018-08-15 00:11:57 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 6312 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏 5

分类专栏： [数据库](https://blog.csdn.net/weixin_42042680/category_8082232.html) [# orm-MongoEngine](https://blog.csdn.net/weixin_42042680/category_9292524.html) 文章标签： [mongoengine](https://www.csdn.net/gather_2f/MtjaQg5sMjE5NDQtYmxvZwO0O0OO0O0O.html) [pymongo](https://www.csdn.net/gather_23/MtTaEg0sMTM2NjUtYmxvZwO0O0OO0O0O.html) [ORM](https://www.csdn.net/gather_25/MtTaEg0sMTkwNjUtYmxvZwO0O0OO0O0O.html) [flask](https://www.csdn.net/gather_20/MtTaEg0sMzMwODEtYmxvZwO0O0OO0O0O.html) [django](https://www.csdn.net/gather_25/MtTaEg0sMzU4NjUtYmxvZwO0O0OO0O0O.html)

> 关于mongoengine的内容太少了，只能去查阅文档，将文档中常用的内容记录在这，感谢谷歌翻译。。 有翻译不当的地方感谢指出。

### 连接

```
connect
connect（db = None，alias ='default'，** kwargs ）
1
```

### 多数据库支持

```
register_connection
register_connection(
	alias="default",
    db=None,
    name=None,
    host=None,
    port=None,
    username=None,
    password=None
    )
123456789
```

`models`中切换

```python
from MongoEngine import *

class User(Document):
    name = StringField()
    meta = {
        "db_alias": "default"
    }
1234567
```

### 字段

`StringField` 字符串

`URLField` Url

`EmailField` 邮箱地址字段

`Intfield` 32位整数

`LongField` 64位整数

`FloatField` 浮点数字段

`DecimalField` 定点十进制

`BooleanField` 布尔

`DateTimeField` 时间

`ComplexDateTimeField` 精确毫秒级时间

`EmbeddedDocumentField` 嵌入式文档，有声明的document_type

`GenericEmbeddedDocumentField` 通用嵌入式文档

`DynamicField` 动态字段类型

`ListField` 列表字段

`EmbeddedDocumentListField` 嵌入式有文件的List字段

`SortedListField` 排序的列表字段，确保始终检索为已排序的列表

`DictField` 字典

`MapField` 名称映射到指定字段

`ReferenceField` 文档引用

```bash
# 使用reverse_delete_rule可以处理删除字段引用的文档时应该发生的情况。
DO_NOTHING（0） - 不做任何事情（默认）。
NULLIFY（1） - 更新对null的引用。
CASCADE（2） - 删除与参考相关的文档。
DENY（3） - 防止删除参考对象。
PULL（4） - 从ListField参考文献中拉出参考

初始化参考字段。

参数：	
dbref - 将引用存储DBRef 为ObjectId.id 或.id。
reverse_delete_rule - 确定删除引用对象时要执行的操作
123456789101112
LazyReferenceField
GenericReferenceField
```

`BinaryField` 二进制数据字段

`FileField` GirdFS存储字段

`ImageField` 图像文件存储字段

```
SequenceField
ObjectIdField
UUIDField
GridFSProxy
ImageGridFsProxy
ImproperlyConfigured
```

### 查询

返回所有文档

> all()

包括所有字段

> all_fields()

```python
post = BlogPost.objects.exclude('comments').all_fields()
1
```

返回的不是Document实例 而是pymongo值

> as_pymongo()

限制单个批处理中返回的文档数

> batch_size()

创建副本

> clone()

查询中添加注释

> comment(text)

数量

> count(with_limit_and_skip=False)

创建新对象，返回保存的对象实例

> create(**kwargs)

删除查询匹配 的文档

> delete（*write_concern= None*，*_from_doc_delete = False*，*cascade_refs = None* ）

| 参数： | **write_concern** - 向下传递额外的关键字参数，这些参数将用作结果`getLastError`命令的选项 。例如， 将等到至少两个服务器已记录写入并将强制主服务器上的fsync。`save(..., write_concern={w: 2, fsync: True}, ...)`**_from_doc_delete** - 从文档删除调用时为True，因此信号将被触发，因此不要循环。 |
| ------ | ------------------------------------------------------------ |
|        | 返回已删除的文档数量                                         |

执行js代码

> exec_js(*code*,*fields, **options)

| 参数： | **code** - 要执行的一串Javascript代码**fields** - 您将在函数中使用的字段，它们将作为参数传递给您的函数**选项** - 您希望函数可用的选项（通过`options`对象在Javascript中访问） |
| ------ | ------------------------------------------------------------ |
|        |                                                              |

处理如何加载此文档的字段

> fields（*_only_called= False*，*** kwargs* ）

仅包含字段的子集：

```python
posts = BlogPost.objects().fields（author = 1，title = 1）
1
```

排除特定字段：

```python
posts = BlogPost.objects().fields（comments = 0）
1
```

要检索数组元素的子范围：

```python
posts = BlogPost.objects().fields（slice__comments = 5）
1
```

过滤, 别名`__call__()`

> filter()

匹配的第一个对象

> first()

将json数据转换为未保存的对象

> from_json(json_data)

提示， 在对多个字段进行查询时，将索引字段作为提示传递，若索引不存在，提示不会执行任何操作 可以极大提高查询性能

> hint(index=None)

通过其id检索一组文档

> in_bulk(object_ids)

| 参数：     | **object_ids** - `ObjectId`s 的列表或元组             |
| ---------- | ----------------------------------------------------- |
| 返回类型： | ObjectIds的dict作为键，集合特定的Document子类作为值。 |

批量插入文档

> insert()

返回整个查询文档集中字段中存在的所有项的字典及其对应的频率。这对于生成标记云或搜索文档很有用。

> item_frequencies（*field*，*normalize = False*，*map_reduce = True* ）

返回的文档数限制为n，也可以用切片,如`User.objects[:5]`

> limit(n)

服务器上终止查询前等待ms毫秒

> max_time_ms(ms)

更新并返回更新的文档。 基于新 参数返回修改之前或之后的文档。如果没有文档与查询匹配且upsert为false，则返回`None`。如果 upserting和new为false，则返回`None`。 如果full_response参数是`True`，则返回值将是来自服务器的整个响应对象，包括’ok’和’lastErrorObject’字段，而不仅仅是修改后的文档。这很有用，主要是因为’lastErrorObject’文档包含有关命令执行的信息。

> modify(*upsert= False*，*full_response = False*，*remove = False*，*new = False*，*** update* )

| 参数： | **upsert** - 如果文档不存在则插入（默认`False`）**full_response** - 从服务器返回整个响应对象（默认情况下`False`，不适用于PyMongo 3+）**删除** - 删除而不是更新（默认`False`）**new** - 返回更新而不是原始文档（默认`False`）**更新** - Django样式的更新关键字参数 |
| ------ | ------------------------------------------------------------ |
|        |                                                              |

将结果包装在document对象中

> next()

转换非缓存查询集

> no_cache()

解除对此查询集的结果引用

> no_dereference()

仅返回此文档实例，不返回继承文档

> no_sub_classes()

仅加载此文档的子集

> only()

only（）是可链接的并且将执行union ::所以使用以下内容它将同时获取：[title和author.name](http://xn--titleauthor-c14s.name/)：

```
post = BlogPost.objects.only('title').only('author.name')
1
```

结果通过key来指定顺序，升降序

> order_by(*keys)

不返回document实例，按顺序返回特定值或元组值 可以与`no_dereference()`关闭解除一起使用

> scalar(*field)

使用文本索引开始文本搜索

> search_text(text,language=None)

返回结果前跳过n个文档

> skip(n)

查询时启用或禁用默认的超时

> timeout(enabled)

将查询集转换为json

> to_json()

更新

> update(*upsert= False*，*multi = True*，*write_concern = None*，*full_result = False*，*** update* )



| 参数： | **upsert** - 如果文档不存在则插入（默认`False`）**multi** - 更新多个文档。**write_concern** - 向下传递额外的关键字参数，这些参数将用作结果`getLastError`命令的选项 。例如， 将等到至少两个服务器已记录写入并将强制主服务器上的fsync。`save(..., write_concern={w: 2, fsync: True}, ...)`**full_result** - 返回完整的结果字典，而不仅仅是更新的数字，例如return。`{'n': 2, 'nModified': 2, 'ok': 1.0, 'updatedExisting': True}`**更新** - Django样式的更新关键字参数 |
| ------ | ------------------------------------------------------------ |
|        |                                                              |

