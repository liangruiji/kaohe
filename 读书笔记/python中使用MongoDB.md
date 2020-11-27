在python中操作MongoDB，我们使用PyMongo

## 与MongoClient建立连接

使用**PyMongo的第一步**是为[`MongoClient`](https://pymongo.readthedocs.io/en/stable/api/pymongo/mongo_client.html#pymongo.mongo_client.MongoClient)正在运行的**mongod** 实例创建一个 。这样做很容易：

```python
>>> from pymongo import MongoClient
>>> to
```

上面的代码将连接到默认主机和端口。我们还可以显式指定主机和端口，如下所示：

```python
>>> client = MongoClient('localhost', 27017)
```

或使用MongoDB URI格式：

```python
>>> client = MongoClient('mongodb://localhost:27017/')
```

## 获取数据库

MongoDB的单个实例可以支持多个独立的 [数据库](http://www.mongodb.org/display/DOCS/Databases)。使用PyMongo时，您可以在[`MongoClient`](https://pymongo.readthedocs.io/en/stable/api/pymongo/mongo_client.html#pymongo.mongo_client.MongoClient)实例上使用属性样式访问来访问数据库：

```python
>>> db = client.test_database
```

如果您的数据库名称无法使用属性样式访问（例如`test-database`），则可以使用字典样式访问：

```python
>>> db = client['test-database']
```

## 获取集合

一个[集合](http://www.mongodb.org/display/DOCS/Collections)是一组存储在MongoDB中的文档，并且可以作为大致在关系数据库中的表的等价被认为。在PyMongo中获取集合与获取数据库的工作原理相同：

```python
>>> collection = db.test_collection
```

或（使用字典样式访问）：

```python
>>> collection = db['test-collection']
```

关于MongoDB中的集合（和数据库）的重要说明是它们是延迟创建的-以上命令实际上都没有在MongoDB服务器上执行任何操作。集合和数据库是在第一个文档插入其中时创建的。

`db.list_collection_names()`显示集合 

`insert_one()`方法

`insert_many([])`方法

`insert()`方法

调用其`inserted_id`属性获取`_id`

`find_one()`

`find()`方法

其中`find_one()`查询得到的是单个结果，`find()`则返回一个生成器对象`Cursor`类型,需要用for in需要遍历取到所有的结果

根据`ObjectId`来查询，此时需要使用bson库里面的`objectid`：

```python
from bson.objectid import ObjectId
result = collection.find_one({'_id': ObjectId('593278c115c2602667ec6bae')})
print(result)
```

计数

count()

count_documents({query})

~~~python
count = collection.find().count()
print(count)
~~~

count()方法在pymongo中已建议废弃，新的统计方法为Collections.count_documents({query})

排序不同

sort()方法直接传两个参数，一个是属性名，一个是升降序标志，1为正序，-1为倒序

~~~python
results = collection.find().sort('name', 1)
print([result['name'] for result in results])
~~~

skip()

limit()

值得注意的是，在数据库数量非常庞大的时候，如千万、亿级别，最好不要使用大的偏移量来查询数据，因为这样很可能导致内存溢出。此时可以使用类似如下操作来查询：

```python
from bson.objectid import ObjectId
collection.find({'_id': {'$gt': ObjectId('593278c815c2602678bb2b8d')}})复制代码
```

这时需要记录好上次查询的`_id`。

`update()`方法，指定更新的条件和更新后的数据即可

~~~python
condition = {'name': 'Kevin'}
student = collection.find_one(condition)
student['age'] = 25
result = collection.update(condition, student)
print(result)
或
result = collection.update(condition, {'$set': student})
~~~

`update_one()`方法

`update_many()`方法

`update_one()`方法，第二个参数不能再直接传入修改后的字典，而是需要使用`{'$set': student}`这样的形式，其返回结果是`UpdateResult`类型。然后分别调用`matched_count`和`modified_count`属性，可以获得匹配的数据条数和影响的数据条数。

`remove()`方法指定删除的条件即可

`delete_one()`

`delete_many()`

`delete_one()`即删除第一条符合条件的数据，`delete_many()`即删除所有符合条件的数据。它们的返回结果都是`DeleteResult`类型，可以调用`deleted_count`属性获取删除的数据条数。

~~~python
result = collection.delete_one({'name': 'Kevin'})
print(result)
print(result.deleted_count)
result = collection.delete_many({'age': {'$lt': 25}})
print(result.deleted_count)

<pymongo.results.DeleteResult object at 0x10e6ba4c8>
1
4
~~~

PyMongo还提供了一些组合方法，如`find_one_and_delete()`、`find_one_and_replace()`和`find_one_and_update()`，它们是查找后删除、替换和更新操作，其用法与上述方法基本一致。

另外，还可以对索引进行操作，相关方法有`create_index()`、`create_indexes()`和`drop_index()`等。

