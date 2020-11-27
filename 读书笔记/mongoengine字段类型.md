文档都是继承Document类。
预留：
字段类型：

1. StringField，字符串。
2. ListField，列表。列表里还可以传入字段规定列表内的字段类型，例如`ListField(StringField(max_length=30))`
3. ReferenceField, 这是一个保存相关文档的filed
4. StringFiled(regex=None,max_length=None,min_lenght=None) #字符串类型
5. IntField(min_value=None,max_value=None) #整数类型
6. FloatField(min_value=None,max_value=None) #字符串类型
7. BooleanField() #布尔类型
8. DateTimeField() #时间类型
9. listField() #可以插入列表的
10. DictField() #字典类型
11. ReferenceField() #参照类型
12. SequenceField() #自动产生一个数列、 递增的

字段限制：

1. required，必须的。
2. max_length，最大长度。
3. default #默认值 也可以是一个函数 可调用类型
4. primary_key #插入数据是否重复
5. null #赋值是否可以为空
6. choices #列表的范围
7. unique #当前field只能是唯一的