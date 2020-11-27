# MongoEngine文档—元类Meta定义

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/translate.png)

[宅神kin](https://house.blog.csdn.net/) 2019-02-26 16:20:12 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 1828 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏 3

分类专栏： [数据库](https://blog.csdn.net/weixin_42042680/category_8082232.html) [# orm-MongoEngine](https://blog.csdn.net/weixin_42042680/category_9292524.html) 文章标签： [MongoEngine](https://www.csdn.net/gather_2f/MtjaQg5sMjE5NDQtYmxvZwO0O0OO0O0O.html) [meta](https://www.csdn.net/gather_27/MtTaEg0sNTM0NTItYmxvZwO0O0OO0O0O.html) [ORM](https://www.csdn.net/gather_25/MtTaEg0sMTkwNjUtYmxvZwO0O0OO0O0O.html) [flask](https://www.csdn.net/gather_20/MtTaEg0sMzMwODEtYmxvZwO0O0OO0O0O.html) [django](https://www.csdn.net/gather_25/MtTaEg0sMzU4NjUtYmxvZwO0O0OO0O0O.html)

# MongoEngine—元类Meta定义



### 文章目录

- [MongoEngine—元类Meta定义](https://house.blog.csdn.net/article/details/87937428#MongoEngineMeta_0)
- - - [基础设置](https://house.blog.csdn.net/article/details/87937428#_3)
    - [排序](https://house.blog.csdn.net/article/details/87937428#_21)
    - [索引](https://house.blog.csdn.net/article/details/87937428#_33)
    - [全局默认索引](https://house.blog.csdn.net/article/details/87937428#_57)
    - [复合索引](https://house.blog.csdn.net/article/details/87937428#_95)
    - [继承](https://house.blog.csdn.net/article/details/87937428#_107)
    - [抽象类](https://house.blog.csdn.net/article/details/87937428#_123)
    - [自定义查询集](https://house.blog.csdn.net/article/details/87937428#_140)
    - [全局检索](https://house.blog.csdn.net/article/details/87937428#_157)



### 基础设置

```python
class User(db.Documents):
    name = db.StringField()
    meta = {
        # 自定义集合名
        'verbose_name': '员工',
        # 自定义在数据库存储的集合名
        'collection': 'staff',
        # 最大文档数
        'max_documents': 1000,
        # 最大存储 2M
        'max_size': 2000000
    } 
    
12345678910111213
```

### 排序

```python
class BlogPost(Document):
    title = StringField()
    published_date = DateTimeField()

    meta = {
        'ordering': ['-published_date']
    }
1234567
```

### 索引

```python
class Page(Document):
    category = IntField()
    title = StringField()
    rating = StringField()
    created = DateTimeField()
    meta = {
        # 索引，加快查询速度
        'indexes': [
            'title',
            '$title',  # 文本索引
            '#title',  # hashed index
            ('title', '-rating'),
            ('category', '_cls'),
            {
                'fields': ['created'],
                'expireAfterSeconds': 3600
            }
        ]
    }
12345678910111213141516171819
```

### 全局默认索引

```python
class Page(Document):
    title = StringField()
    rating = StringField()
    meta = {
        'index_opts': {},
        'index_background': True,
        'index_cls': False,
        'auto_create_index': True,
        'index_drop_dups': True,
    }
    
1234567891011
```

**解释**

`index_opts` （可选的）

设置任何默认索引选项 - 请参阅[完整选项列表](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex)

`index_background` （可选的）

如果索引应在后台索引，请设置默认值

`index_cls` （可选的）

一种关闭_cls的特定索引的方法。

`auto_create_index` （可选的）

当这是True（默认）时，MongoEngine将确保每次运行命令时MongoDB中都存在正确的索引。可以在单独管理索引的系统中禁用此功能。禁用此功能可以提高性能。

`index_drop_dups` （可选的）

如果索引应该删除重复项，请设置默认值因为不再支持MongoDB 3.0 drop_dups。提出警告但没有效果

### 复合索引

```python
class Log(Document):
    location = PointField(auto_index=False)
    datetime = DateTimeField()

    meta = {
        'indexes': [[("location", "2dsphere"), ("datetime", 1)]]
    }
1234567
```

### 继承

继承文档字段

```python
class Page(Document):
    title = StringField(max_length=200, required=True)

    meta = {'allow_inheritance': True}  #这里要设置为True，默认是False

# Also stored in the collection named 'page'
class DatedPage(Page):
    date = DateTimeField()

123456789
```

### 抽象类

如果您想为一组Document类添加一些额外的功能，但您不需要或不需要继承的开销，则可以使用该 `abstract`属性`meta`。这不会打开文档继承，但可以让您保持代码干净：

```python
class BaseDocument(Document):
    meta = {
        'abstract': True,
    }
    def check_permissions(self):
        ...

class User(BaseDocument):
   ...

12345678910
```

### 自定义查询集

如果要添加自定义方法以与文档交互或过滤文档，[`QuerySet`](http://docs.mongoengine.org/apireference.html#mongoengine.queryset.QuerySet)可以继续扩展类。要使用自定义[`QuerySet`](http://docs.mongoengine.org/apireference.html#mongoengine.queryset.QuerySet)上的文档类，设置`queryset_class`为自定义类中 [`Document`](http://docs.mongoengine.org/apireference.html#mongoengine.Document)的`meta`词典：

```python
class AwesomerQuerySet(QuerySet):

    def get_awesome(self):
        return self.filter(awesome=True)

class Page(Document):
    meta = {'queryset_class': AwesomerQuerySet}

# To call:
Page.objects.get_awesome()
12345678910
```

### 全局检索

```python
class News(Document):
    title = StringField()
    content = StringField()
    is_active = BooleanField()

    meta = {'indexes': [
        {'fields': ['$title', "$content"],
         'default_language': 'english',
         'weights': {'title': 10, 'content': 2}
        }
    ]}
    
News(title="Using mongodb text search",
     content="Testing text search").save()

News(title="MongoEngine 0.9 released",
     content="Various improvements").save()
1234567891011121314151617
```

使用

```python
document = News.objects.search_text('testing').first()
document.title # may be: "Using mongodb text search"

document = News.objects.search_text('released').first()
document.title # may be: "MongoEngine 0.9 released"
```