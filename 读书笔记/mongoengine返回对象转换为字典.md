调用`.to_mongo()`将对象转换为[SON实例](http://api.mongodb.org/python/current/api/bson/son.html)。一旦你有了它，你可以调用它的[`.to_dict()`方法将其转换为字典](http://api.mongodb.org/python/current/api/bson/son.html#bson.son.SON.to_dict)。

例如...（`qset`是一个从mongoengine返回的查询集）。

```python
sons = [ob.to_mongo() for ob in qset]
for son in sons:
    print str(son.to_dict())
    
    
todolist = [i.to_mongo().to_dict() for i in todolist] #字典列表
```

