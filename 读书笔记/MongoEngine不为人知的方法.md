# MongoEngine文档—高级用法

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[宅神kin](https://house.blog.csdn.net/) 2019-02-24 22:57:14 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 9593 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏 18

分类专栏： [数据库](https://blog.csdn.net/weixin_42042680/category_8082232.html) [# orm-MongoEngine](https://blog.csdn.net/weixin_42042680/category_9292524.html) 文章标签： [MongoEngine](https://www.csdn.net/gather_2f/MtjaQg5sMjE5NDQtYmxvZwO0O0OO0O0O.html) [ORM](https://www.csdn.net/gather_25/MtTaEg0sMTkwNjUtYmxvZwO0O0OO0O0O.html) [pymongo](https://www.csdn.net/gather_23/MtTaEg0sMTM2NjUtYmxvZwO0O0OO0O0O.html) [django](https://www.csdn.net/gather_25/MtTaEg0sMzU4NjUtYmxvZwO0O0OO0O0O.html) [flask](https://www.csdn.net/gather_20/MtTaEg0sMzMwODEtYmxvZwO0O0OO0O0O.html)

版权

# MongoEngine不为人知的方法

> 之前发了个博客写的是[MongoEngine的入门文档](https://blog.csdn.net/weixin_42042680/article/details/81676972)，在清楚了建表的字段类型，学会如何查询之后，我们来聊聊MongoEngine不常用但很有用的其他方法。

### 文章目录

- [MongoEngine不为人知的方法](https://house.blog.csdn.net/article/details/87909424#MongoEngine_0)
- - - [1.get查询容错](https://house.blog.csdn.net/article/details/87909424#1get_5)
    - [2.with_id使用](https://house.blog.csdn.net/article/details/87909424#2with_id_20)
    - [3.filter中字符查询-contains使用](https://house.blog.csdn.net/article/details/87909424#3filtercontains_30)
    - [4.不包含查询](https://house.blog.csdn.net/article/details/87909424#4_38)
    - [5.list转querySet](https://house.blog.csdn.net/article/details/87909424#5listquerySet_48)
    - [6.querySet转dict](https://house.blog.csdn.net/article/details/87909424#6querySetdict_55)
    - [7.Serializer处理](https://house.blog.csdn.net/article/details/87909424#7Serializer_64)
    - [8. item_frequencies的使用](https://house.blog.csdn.net/article/details/87909424#8_item_frequencies_106)
    - [9.scalar](https://house.blog.csdn.net/article/details/87909424#9scalar_122)
    - [10.in_bulk](https://house.blog.csdn.net/article/details/87909424#10in_bulk_128)
    - [11.唯一性约束](https://house.blog.csdn.net/article/details/87909424#11_149)
    - [12.跳过文档验证保存](https://house.blog.csdn.net/article/details/87909424#12_160)
    - [13.使用pymongo语法](https://house.blog.csdn.net/article/details/87909424#13pymongo_175)



### 1.get查询容错

```python
# 查询某个用户时，get方法有则返回queryset,无则报错User.DoesNotExist
user = User.objects.get(name="xx")
# 为防止报错, 有则返回queryset，无则返回None
user = User.objects.filter(name="xx")
if user:
    user = user[0]
# 或者
user = User.objects.filter(name="xx").first()
# 进一步优化
user = User.objects(name="xx").first()
12345678910
```

### 2.with_id使用

```python
# mongo默认id类型为ObjectId，所以使用id查询时，需将str转换为ObjectId
from bson import ObjectId
user = User.objects.get(id=ObjectId(user_id))
# 优化
user = User.objects.with_id(user_id)
12345
```

### 3.filter中字符查询-contains使用

```python
# contains包含，icontains包含(忽略大小写)
# 模糊检索时对象属性包含所查询字符,如name为abc,输入ab
user = User.objects.filter(name__contains=search_str)
123
```

### 4.不包含查询

这个功能让我找了好久…知道怎么写的时候眼泪掉下来

```python
# 包含contains 不包含not__contains
# 姓名不包含aa的人
user = User.objects.filter(name__not__contains="aa")
123
```

### 5.list转querySet

```python
# 多对多查询时，查询到某对象关联的列表集，进一步使用filter时报错非querySet
set_role = Role.objects.filter(pk__in=[i.pk for i in role_list if i])
12
```

### 6.querySet转dict

```python
user = User.objects.get(name="xxx")
# 需⚠️的是，若将此功能作为结果集的serializer使用，不应该包含外键关联字段
# 用fields方法过滤指定字段也不起作用
user_dict = user.to_mongo().to_dict()
1234
```

### 7.Serializer处理

```python
# 自定义函数
# 序列化处理，排除指定字段
def m2d_exclude(obj, *args):
    model_dict = obj.to_mongo().to_dict()
    if args:
        list(map(model_dict.pop, list(args)))
    if "_id" in model_dict.keys():
        model_dict["_id"] = str(model_dict["_id"])
    return model_dict

# 序列化处理，只返回特定字段
def m2d_fields(obj, *args):
    model_dict = obj.to_mongo().to_dict()
    if args:
        fields = [i for i in model_dict.keys() if i not in list(args)]
        list(map(model_dict.pop, fields))
    if "_id" in model_dict.keys():
        model_dict["_id"] = str(model_dict["_id"])
    return model_dict
12345678910111213141516171819
```

**调用**

```python
class Role(db.Document):
    name = db.StringField(verbose_name="角色名称")
    desc = db.StringField(verbose_name="职责描述")
    permission = db.ListField(db.ReferenceField(Permission, reverse_delete_rule=4), verbose_name="权限")
    staff = db.ListField(db.ReferenceField(Staff, reverse_delete_rule=4), verbose_name="关联员工")
    
    
role = Role.objects.get(name="管理员")
result = m2d_exclude(role, "permission", "staff")
# 或
result = m2d_fields(role, "name", "desc", "_id")
1234567891011
```

![img](http://qiniu.s001.xin/9kbpp.jpg)

### 8. item_frequencies的使用

文档是这么写的:**返回整个查询文档集中字段存在的所有项的字典及其对应的频率**，即某字段所有值的集合(去重)和结果出现次数，简单来说就是group_by

**想到的应用场景**

1. 一个班级所有人的数学成绩，不及格的多少人，60-70的多少人，80-90的多少人…

2. 分类

   

**使用**:

![img](http://qiniu.s001.xin/abu6o.jpg)

### 9.scalar

获取所查询的字段值的列表

![img](http://qiniu.s001.xin/k7enm.jpg)

### 10.in_bulk

通过索引列表获取queryset

```python
# 不使用in_bulk
# 通常情况，前端发送id列表
ids = data.json["ids"]
result = [Role.objects.with_id(i) for i in ids]
或
result = Role.objects(pk__in=ids)

# 使用in_bulk
ids = data.json("ids")
ids = [ObjectId(i) for i in ids]
documents = Role.objects.in_bulk(ids)
results = [documents.get(obj_id) for obj_id in ids]
123456789101112
```

**注意： 列表生成式会导致list类型发生变化，无法继续filter**

### 11.唯一性约束

`MongoEngine`允许你通过提供`unique=True`给Field构造函数来指定一个字段在集合中是唯一的。如果您尝试将与唯一字段具有相同值的文档保存为数据库的文档， `NotUniqueError`则会引发。您也可以使用下列方法指定多字段唯一性约束：`unique_with`可以是单个字段名称，也可以是字段名称的`列表`或`元组

```text
class User(Document):
    username = StringField(unique=True)
    first_name = StringField()
    last_name = StringField(unique_with='first_name')
1234
```

### 12.跳过文档验证保存

您也可以通过设置`validate=False`调用save() 方法时跳过整个文档验证过程

```python
class Recipient(Document):
    name = StringField()
    email = EmailField()

recipient = Recipient(name='admin', email='root@localhost')
recipient.save()               # 会产生一个 ValidationError 错误
recipient.save(validate=False) # 不会
1234567
```

------

> 2019-05-06 更新

### 13.使用pymongo语法

使用名称Model Model作为您在实例中为连接定义的实际类的占位符：

```python
Model._get_collection().aggregate([
    { '$group' : 
        { '_id' : { 'carrier' : '$carrierA', 'category' : '$category' }, 
          'count' : { '$sum' : 1 }
        }
    }
])
1234567
```

所以你可以随时访问pymongo对象而不建立单独的连接. Mongoengine本身建立在pymongo上.
**示例**

1. 标签数量大于3的学生

```python
class Tag(documents):
  name = StringField()
  
class Student(documents):
  name = StringField()
  tag = ListField(ReferenceField(Tag))

# 使用原生查询
db.student.find({ "tag.3" : { "$exists" : 1 } })
# ORM查询
Student.objects(__raw__={ "tag.3":{ "$exists":1}})
1234567891011
```

1. 姓名相同的学生数量

```python
# 原生mongo
db.getCollection("student").aggregate([
	{"$match":{"status":0}},
	{"$sortByCount":"$name"},
	{"$match":{"count":{"$gt":1}}}
]).itcount()

# ORM
a = Student._get_collection().aggregate([
	{"$match":{"status":0}},
	{"$sortByCount":"$name"},
	{"$match":{"count":{"$gt":1}}}
])
l = list(a)
len(l)
```