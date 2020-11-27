# ObjectID和字符串之间的转换

`MongoDB`自动生成的`_id`是`ObjectId`类型的。
我需要将`MongoDB`的`_id`存到`ElasticSearch`中，而`ElasticSearch`又只能存`String`类型的`_id`，所以就涉及到两种类型的转换。

### `ObjectId`类型 —→ `String`类型

这个非常简单，直接强制类型转换就可以了

```python
_id = str(ObjectId('类型'))
12
```

### `String`类型 —→ `ObjectId`类型

这个难就难在不知道ObjectId类型从哪里找

```python
from bson.objectid import ObjectId
_id = ObjectId("字符串")
```

