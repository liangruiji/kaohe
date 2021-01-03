https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf

# python redis常见用法总结

259 浏览0 回复2019-02-27

[![img](https://uploadfiles.nowcoder.com/images/20190823/90291715_1566542962418_FE809D7E8AC3B4F0E8A4A7AEE4A58B66)](https://blog.nowcoder.net/profile/90291715)

[咦什么](https://blog.nowcoder.net/profile/90291715)

[+关注](javascript:void(0);)

### python-redis用法总结

- - [Redis简介](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#Redis_1)

  - [python连接Redis](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#pythonRedis_5)

  - [redis基本命令 String](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#redis_String_33)

  - - [set(name, value, ex=None, px=None, nx=False, xx=False)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#setname_value_exNone_pxNone_nxFalse_xxFalse_34)
    - [setnx(name, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#setnxname_value_74)
    - [setex(name, value, time)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#setexname_value_time_79)
    - [mset(*args, **kwargs)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#msetargs_kwargs_91)
    - [mget(keys, *args)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#mgetkeys_args_99)
    - [getset(name, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#getsetname_value_106)
    - [getrange(key, start, end)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#getrangekey_start_end_111)
    - [setrange(name, offset, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#setrangename_offset_value_125)
    - [append(key, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#appendkey_value_139)

  - [redis基本命令 hash](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#redis_hash_148)

  - - [hset(name, key, value) & hget(hash, key)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hsetname_key_value__hgethash_key_149)
    - [hmset(name, mapping) & hmget(name, key, *args)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hmsetname_mapping__hmgetname_key_args_170)
    - [hgetall(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hgetallname_183)
    - [hkeys(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hkeysname_188)
    - [hexists(name, key)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hexistsname_key_193)
    - [hdel(name, *keys)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#hdelname_keys_199)

  - [redis基本命令 list](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#redis_list_204)

  - - [lpush(name, values) & rpush(name, values)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#lpushname_values__rpushname_values_205)
    - [lpushx(name, value) & rpushx(name, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#lpushxname_value__rpushxname_value_211)
    - [linsert(name, where, refvalue, value))](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#linsertname_where_refvalue_value_216)
    - [r.lset(name, index, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#rlsetname_index_value_226)
    - [r.lrem(name, value, num)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#rlremname_value_num_236)

  - [redis基本命令 set](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#redis_set_252)

  - - [sadd(name,values)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#saddnamevalues_253)
    - [scard(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#scardname_258)
    - [smembers(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#smembersname_263)
    - [sscan(name, cursor=0, match=None, count=None)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sscanname_cursor0_matchNone_countNone_268)
    - [sscan_iter(name, match=None, count=None)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sscan_itername_matchNone_countNone_270)
    - [sdiff(keys, *args)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sdiffkeys_args_277)
    - [sinter(keys, *args)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sinterkeys_args_286)
    - [sunion(keys, *args)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sunionkeys_args_291)
    - [sismember(name, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sismembername_value_296)
    - [srem(name, values)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#sremname_values_302)

  - [redis基本命令 有序set](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#redis_set_308)

  - - [zdd(name, *args, **kwargs)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zddname_args_kwargs_312)
    - [zcard(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zcardname_320)
    - [r.zrange( name, start, end, desc=False, withscores=False, score_cast_func=float)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#rzrange_name_start_end_descFalse_withscoresFalse_score_cast_funcfloat_325)
    - [zrangebyscore(name, min, max, start=None, num=None, withscores=False, score_cast_func=float)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zrangebyscorename_min_max_startNone_numNone_withscoresFalse_score_cast_funcfloat_334)
    - [zcount(name, min, max)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zcountname_min_max_343)
    - [zrem(name, values)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zremname_values_349)
    - [zremrangebyrank(name, min, max)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zremrangebyrankname_min_max_355)
    - [zremrangebyscore(name, min, max)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zremrangebyscorename_min_max_361)
    - [zscore(name, value)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#zscorename_value_367)

  - [其他常用操作](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#_372)

  - - [delete(*names)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#deletenames_373)
    - [exists(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#existsname_378)
    - [keys(pattern='')](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#keyspattern_383)
    - [expire(name ,time)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#expirename_time_393)
    - [rename(src, dst)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#renamesrc_dst_402)
    - [randomkey()](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#randomkey_408)
    - [type(name)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#typename_413)
    - [scan(cursor=0, match=None, count=None)](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#scancursor0_matchNone_countNone_419)
    - [other 方法](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#other__443)
    - [管道（pipeline）](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#pipeline_451)

  - [参考链接](https://blog.nowcoder.net/n/3d834008c81d44faba96bbb4bcf621cf#_483)

## Redis简介

> redis是一个key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。

> Redis 是一个高性能的key-value数据库。 redis的出现，很大程度补偿了memcached这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Python，Ruby，Erlang，PHP客户端，使用很方便,Redis支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得Redis可执行单层树复制。从盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。

## python连接Redis

> redis提供两个类Redis和StrictRedis用于实现Redis的命令，StrictRedis用于实现大部分官方的命令，并使用官方的语法和命令，Redis是StrictRedis的子类，用于向后兼容旧版本的redis-py。
> redis连接实例是线程安全的，可以直接将redis连接实例设置为一个全局变量，直接使用。如果需要另一个Redis实例(or Redis数据库)时，就需要重新创建redis连接实例来获取一个新的连接。同理，python的redis没有实现select命令。

python连接并使用redis需要先按照redis库。

```
pip install redis
```

1.连接

```
import` `redis  # 导入redis模块，通过python操作redis 也可以直接在redis主机的服务端操作缓存数据库``r = redis.Redis(host=``'localhost'``, port=``6379``, decode_responses=True) ``# host是redis主机，需要redis服务端和客户端都启动 redis默认端口是``6379``r.set(``'name'``, ``'junxi'``) # key是``"foo"` `value是``"bar"` `将键值对存入redis缓存``print(r[``'name'``])``print(r.get(``'name'``)) # 取出键name对应的值``print(type(r.get(``'name'``)))
```

2.连接池

> redis-py使用connection pool来管理对一个redis server的所有连接，避免每次建立、释放连接的开销。默认，每个Redis实例都会维护一个自己的连接池。
> 可以直接建立一个连接池，然后作为参数Redis，这样就可以实现多个Redis实例共享一个连接池

```
import` `redis  # 导入redis模块，通过python操作redis 也可以直接在redis主机的服务端操作缓存数据库``pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)  # host是redis主机，需要redis服务端和客户端都起着 redis默认端口是``6379``r = redis.Redis(connection_pool=pool)``r.set(``'gender'``, ``'male'``)   # key是``"gender"` `value是``"male"` `将键值对存入redis缓存``print(r.get(``'gender'``))   # gender 取出键male对应的值
```

## redis基本命令 String

### set(name, value, ex=None, px=None, nx=False, xx=False)

在Redis中设置值，默认，不存在则创建，存在则修改
参数：
ex，过期时间（秒）
px，过期时间（毫秒）
nx，如果设置为True，则只有name不存在时，当前set操作才执行
xx，如果设置为True，则只有name存在时，当前set操作才执行
ex，过期时间（秒） 这里过期时间是3秒，3秒后p，键food的值就变成None

> ex，过期时间（秒） 这里过期时间是3秒，3秒后p，键food的值就变成None

```
import` `redis` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)``r.set(``'food'``, ``'mutton'``, ex=``3``)  # key是``"food"` `value是``"mutton"` `将键值对存入redis缓存``print(r.get(``'food'``)) # mutton 取出键food对应的值
```

> px，过期时间（豪秒） 这里过期时间是3豪秒，3毫秒后，键foo的值就变成None

```
import` `redis` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)``r.set(``'food'``, ``'beef'``, px=``3``)``print(r.get(``'food'``))
```

> nx，如果设置为True，则只有name不存在时，当前set操作才执行 （新建）

```
import` `redis` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)``print(r.set(``'fruit'``, ``'watermelon'``, nx=True))  # True--不存在``# 如果键fruit不存在，那么输出是True；如果键fruit已经存在，输出是None
```

> xx，如果设置为True，则只有name存在时，当前set操作才执行 （修改）

```
print((r.set(``'fruit'``, ``'watermelon'``, xx=True)))  # True--已经存在``# 如果键fruit已经存在，那么输出是True；如果键fruit不存在，输出是None
```

### setnx(name, value)

设置值，只有name不存在时，执行设置操作（添加）

```
print(r.setnx(``'fruit1'``, ``'banana'``)) # fruit1不存在，输出为True
```

### setex(name, value, time)

设置值，只有name存在时，执行设置操作（添加）

```
import` `redis``import` `time` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)``r.setex(``"fruit2"``, ``"orange"``, ``5``)``time.sleep(``5``)``print(r.get(``'fruit2'``)) # ``5``秒后，取值就从orange变成None
```

### mset(*args, **kwargs)

批量设置值

```
r.mget({``'k1'``: ``'v1'``, ``'k2'``: ``'v2'``})``r.mset(k1=``"v1"``, k2=``"v2"``) # 这里k1 和k2 不能带引号 一次设置对个键值对``print(r.mget(``"k1"``, ``"k2"``))  # 一次取出多个键对应的值``print(r.mget(``"k1"``))
```

### mget(keys, *args)

批量获取

```
print(r.mget(``'k1'``, ``'k2'``))``print(r.mget([``'k1'``, ``'k2'``]))``print(r.mget(``"fruit"``, ``"fruit1"``, ``"fruit2"``, ``"k1"``, ``"k2"``)) # 将目前redis缓存中的键对应的值批量取出来
```

### getset(name, value)

设置新值并获取原来的值

```
print(r.getset(``"food"``, ``"barbecue"``)) # 设置的新值是barbecue 设置前的值是beef
```

### getrange(key, start, end)

获取子序列（根据字节获取，非字符）
参数：
name，Redis 的 name
start，起始位置（字节）
end，结束位置（字节）

```
r.set(``"cn_name"``, ``"君惜大大"``) # 汉字``print(r.getrange(``"cn_name"``, ``0``, ``2``))  # 取索引号是``0``-``2` `前``3``位的字节 君 切片操作 （一个汉字``3``个字节 ``1``个字母一个字节 每个字节8bit）``print(r.getrange(``"cn_name"``, ``0``, -``1``)) # 取所有的字节 君惜大大 切片操作``r.set(``"en_name"``,``"junxi"``) # 字母``print(r.getrange(``"en_name"``, ``0``, ``2``)) # 取索引号是``0``-``2` `前``3``位的字节 jun 切片操作 （一个汉字``3``个字节 ``1``个字母一个字节 每个字节8bit）``print(r.getrange(``"en_name"``, ``0``, -``1``)) # 取所有的字节 junxi 切片操作
```

### setrange(name, offset, value)

修改字符串内容，从指定字符串索引开始向后替换（新值太长时，则向后添加）
参数：
offset，字符串的索引，字节（一个汉字三个字节）
value，要设置的值

```
r.setrange(``"en_name"``, ``1``, ``"ccc"``)``print(r.get(``"en_name"``))  # jccci 原始值是junxi 从索引号是``1``开始替换成ccc 变成 jccci
```

> strlen(name)
> 返回name对应值的字节长度（一个汉字3个字节）

```
print(r.strlen(``"foo"``)) # ``4` `'goo1'``的长度是``4
```

### append(key, value)

在redis name对应的值后面追加内容
参数：
key, redis的name
value, 要追加的字符串

```
r.append(``"name"``, ``"haha"``)  # 在name对应的值junxi后面追加字符串haha``print(r.mget(``"name"``))
```

## redis基本命令 hash

### hset(name, key, value) & hget(hash, key)

name对应的hash中设置一个键值对（不存在，则创建；否则，修改）
参数：
name，redis的name
key，name对应的hash中的key
value，name对应的hash中的value

```
import` `redis``import` `time` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)` `r.hset(``"hash1"``, ``"k1"``, ``"v1"``)``r.hset(``"hash1"``, ``"k2"``, ``"v2"``)``print(r.hkeys(``"hash1"``)) # 取hash中所有的key``print(r.hget(``"hash1"``, ``"k1"``))  # 单个取hash的key对应的值``print(r.hmget(``"hash1"``, ``"k1"``, ``"k2"``)) # 多个取hash的key对应的值``r.hsetnx(``"hash1"``, ``"k2"``, ``"v3"``) # 只能新建``print(r.hget(``"hash1"``, ``"k2"``))
```

### hmset(name, mapping) & hmget(name, key, *args)

在name对应的hash中批量设置键值对
参数：
name，redis的name
mapping，字典，如：{‘k1’:‘v1’, ‘k2’: ‘v2’}
keys，要获取key集合，如：[‘k1’, ‘k2’, ‘k3’]
*args，要获取的key，如：k1,k2,k3

```
r.hmset(``"hash2"``, {``"k2"``: ``"v2"``, ``"k3"``: ``"v3"``})``print(r.hget(``"hash2"``, ``"k2"``)) # 单个取出``"hash2"``的key-k2对应的value``print(r.hmget(``"hash2"``, ``"k2"``, ``"k3"``)) # 批量取出``"hash2"``的key-k2 k3对应的value --方式``1``print(r.hmget(``"hash2"``, [``"k2"``, ``"k3"``])) # 批量取出``"hash2"``的key-k2 k3对应的value --方式``2
```

### hgetall(name)

获取name对应hash的所有键值

```
print(r.hgetall(``"hash1"``))
```

### hkeys(name)

获取name对应的hash中所有的key

```
print(r.hkeys(``"hash1"``))
```

### hexists(name, key)

检查name对应的hash是否存在当前传入的key

```
print(r.hexists(``"hash1"``, ``"k4"``)) # False 不存在``print(r.hexists(``"hash1"``, ``"k1"``)) # True 存在
```

### hdel(name, *keys)

删除键值对

```
r.hdel(``"hash1"``, ``"k1"``)  # 删除一个键值对
```

## redis基本命令 list

### lpush(name, values) & rpush(name, values)

在name对应的list中添加元素，lpush每个新的元素都添加到列表的最左边，rpush相反

```
r.lpush(``"list1"``, ``11``, ``22``, ``33``) # 保存顺序为: ``33``,``22``,``11``r.rpush(``"list2"``, ``11``, ``22``, ``33``) # 表示从右向左操作 ``11``,``22``,``33
```

### lpushx(name, value) & rpushx(name, value)

往已经有的name的列表添加元素，没有的话无法创建

```
r.lpushx(``"list10"``, ``10``)
```

### linsert(name, where, refvalue, value))

在name对应的列表的某一个值前或后插入一个新值
参数：
name，redis的name
where，BEFORE或AFTER
refvalue，标杆值，即：在它前后插入数据
value，要插入的数据

```
r.linsert(``"list2"``, ``"before"``, ``"11"``, ``"00"``)
```

### r.lset(name, index, value)

对name对应的list中的某一个索引位置重新赋值
参数：
name，redis的name
index，list的索引位置
value，要设置的值

```
r.lset(``"list2"``, ``0``, -``11``)  # 把索引号是``0``的元素修改成-``11``print(r.lrange(``"list2"``, ``0``, -``1``))
```

### r.lrem(name, value, num)

在name对应的list中删除指定的值
参数：
name，redis的name
value，要删除的值
num， num=0，删除列表中所有的指定值；
num=2,从前到后，删除2个； num=1,从前到后，删除左边第1个
num=-2,从后向前，删除2个

```
r.lrem(``"list2"``, ``"11"``, ``1``)  # 将列表中左边第一次出现的``"11"``删除``print(r.lrange(``"list2"``, ``0``, -``1``))``r.lrem(``"list2"``, ``"99"``, -``1``)  # 将列表中右边第一次出现的``"99"``删除``print(r.lrange(``"list2"``, ``0``, -``1``))``r.lrem(``"list2"``, ``"22"``, ``0``)  # 将列表中所有的``"22"``删除``print(r.lrange(``"list2"``, ``0``, -``1``))
```

## redis基本命令 set

### sadd(name,values)

name对应的集合中添加元素

```
r.sadd(``"set1"``, ``33``, ``44``, ``55``, ``66``) # 往集合中添加元素
```

### scard(name)

获取name对应的集合中元素个数

```
print(r.scard(``"set1"``)) # 集合的长度是``4
```

### smembers(name)

获取name对应的集合的所有成员

```
print(r.smembers(``"set1"``))  # 获取集合中所有的成员
```

### sscan(name, cursor=0, match=None, count=None)

获取集合中所有的成员–元组形式

### sscan_iter(name, match=None, count=None)

同字符串的操作，用于增量迭代分批获取元素，避免内存消耗太大

```
print(r.sscan(``"set1"``))``for` `i in r.sscan_iter(``"set1"``):``  ``print(i)
```

### sdiff(keys, *args)

差集，在第一个name对应的集合中且不在其他name对应的集合的元素集合

```
r.sadd(``"set2"``, ``11``, ``22``, ``33``)``print(r.smembers(``"set1"``))  # 获取集合中所有的成员``print(r.smembers(``"set2"``))``print(r.sdiff(``"set1"``, ``"set2"``))  # 在集合set1但是不在集合set2中``print(r.sdiff(``"set2"``, ``"set1"``))  # 在集合set2但是不在集合set1中
```

### sinter(keys, *args)

获取多一个name对应集合的交集

```
print(r.sinter(``"set1"``, ``"set2"``)) # 取``2``个集合的交集
```

### sunion(keys, *args)

获取多个name对应的集合的并集

```
print(r.sunion(``"set1"``, ``"set2"``)) # 取``2``个集合的并集
```

### sismember(name, value)

检查value是否是name对应的集合的成员，结果为True和False

```
print(r.sismember(``"set1"``, ``33``)) # ``33``是集合的成员``print(r.sismember(``"set1"``, ``23``)) # ``23``不是集合的成员
```

### srem(name, values)

在name对应的集合中删除某些值

```
print(r.srem(``"set2"``, ``11``))  # 从集合中删除指定值 ``11``print(r.smembers(``"set2"``))
```

## redis基本命令 有序set

> Set操作，Set集合就是不允许重复的列表，本身是无序的
> 有序集合，在集合的基础上，为每元素排序；元素的排序需要根据另外一个值来进行比较，
> 所以，对于有序集合，每一个元素有两个值，即：值和分数，分数专门用来做排序。

### zdd(name, *args, **kwargs)

在name对应的有序集合中添加元素

```
r.zadd(``"zset1"``, n1=``11``, n2=``22``)``r.zadd(``"zset2"``, ``'m1'``, ``22``, ``'m2'``, ``44``)``print(r.zrange(``"zset1"``, ``0``, -``1``))  # 获取有序集合中所有元素``print(r.zrange(``"zset2"``, ``0``, -``1``, withscores=True))  # 获取有序集合中所有元素和分数
```

### zcard(name)

获取name对应的有序集合元素的数量

```
print(r.zcard(``"zset1"``)) # 集合长度
```

### r.zrange( name, start, end, desc=False, withscores=False, score_cast_func=float)

按照索引范围获取name对应的有序集合的元素
参数：
name，redis的name
start，有序集合索引起始位置（非分数）
end，有序集合索引结束位置（非分数）
desc，排序规则，默认按照分数从小到大排序
withscores，是否获取元素的分数，默认只获取元素的值
score_cast_func，对分数进行数据转换的函数

### zrangebyscore(name, min, max, start=None, num=None, withscores=False, score_cast_func=float)

按照分数范围获取name对应的有序集合的元素

```
for` `i in range(``1``, ``30``):``  ``element = ``'n'` `+ str(i)``  ``r.zadd(``"zset3"``, element, i)``print(r.zrangebyscore(``"zset3"``, ``15``, ``25``)) # # 在分数是``15``-``25``之间，取出符合条件的元素``print(r.zrangebyscore(``"zset3"``, ``12``, ``22``, withscores=True))  # 在分数是``12``-``22``之间，取出符合条件的元素（带分数）
```

### zcount(name, min, max)

获取name对应的有序集合中分数 在 [min,max] 之间的个数

```
print(r.zrange(``"zset3"``, ``0``, -``1``, withscores=True))``print(r.zcount(``"zset3"``, ``11``, ``22``))
```

### zrem(name, values)

删除name对应的有序集合中值是values的成员

```
r.zrem(``"zset3"``, ``"n3"``)  # 删除有序集合中的元素n3 删除单个``print(r.zrange(``"zset3"``, ``0``, -``1``))
```

### zremrangebyrank(name, min, max)

根据排行范围删除

```
r.zremrangebyrank(``"zset3"``, ``0``, ``1``) # 删除有序集合中的索引号是``0``, ``1``的元素``print(r.zrange(``"zset3"``, ``0``, -``1``))
```

### zremrangebyscore(name, min, max)

根据分数范围删除

```
r.zremrangebyscore(``"zset3"``, ``11``, ``22``)  # 删除有序集合中的分数是``11``-``22``的元素``print(r.zrange(``"zset3"``, ``0``, -``1``))
```

### zscore(name, value)

获取name对应有序集合中 value 对应的分数

```
print(r.zscore(``"zset3"``, ``"n27"``))  # 获取元素n27对应的分数``27
```

## 其他常用操作

### delete(*names)

根据删除redis中的任意数据类型（string、hash、list、set、有序set）

```
r.delete(``"gender"``) # 删除key为gender的键值对
```

### exists(name)

检测redis的name是否存在，存在就是True，False 不存在

```
print(r.exists(``"zset1"``))
```

### keys(pattern=’’)

根据模型获取redis的name
更多：
KEYS * 匹配数据库中所有 key 。
KEYS h?llo 匹配 hello ， hallo 和 hxllo 等。
KEYS hllo 匹配 hllo 和 heeeeello 等。
KEYS h[ae]llo 匹配 hello 和 hallo ，但不匹配 hillo

```
print(r.keys(``"foo*"``))
```

### expire(name ,time)

为某个redis的某个name设置超时时间

```
r.lpush(``"list5"``, ``11``, ``22``)``r.expire(``"list5"``, time=``3``)``print(r.lrange(``"list5"``, ``0``, -``1``))``time.sleep(``3``)``print(r.lrange(``"list5"``, ``0``, -``1``))
```

### rename(src, dst)

对redis的name重命名

```
r.lpush(``"list5"``, ``11``, ``22``)``r.rename(``"list5"``, ``"list5-1"``)
```

### randomkey()

随机获取一个redis的name（不删除）

```
print(r.randomkey())
```

### type(name)

获取name对应值的类型

```
print(r.type(``"set1"``))``print(r.type(``"hash2"``))
```

### scan(cursor=0, match=None, count=None)

查看所有元素

```
print(r.hscan(``"hash2"``))``print(r.sscan(``"set3"``))``print(r.zscan(``"zset2"``))``print(r.getrange(``"foo1"``, ``0``, -``1``))``print(r.lrange(``"list2"``, ``0``, -``1``))``print(r.smembers(``"set3"``))``print(r.zrange(``"zset3"``, ``0``, -``1``))``print(r.hgetall(``"hash1"``))
```

scan_iter(match=None, count=None)
查看所有元素–迭代器

```
for` `i in r.hscan_iter(``"hash1"``):``  ``print(i)` `for` `i in r.sscan_iter(``"set3"``):``  ``print(i)` `for` `i in r.zscan_iter(``"zset3"``):``  ``print(i)
```

### other 方法

print(r.get(‘name’)) # 查询key为name的值
r.delete(“gender”) # 删除key为gender的键值对
print(r.keys()) # 查询所有的Key
print(r.dbsize()) # 当前redis包含多少条数据
r.save() # 执行"检查点"操作，将数据写回磁盘。保存时阻塞
r.flushdb() # 清空r中的所有数据

### 管道（pipeline）

> redis默认在执行每次请求都会创建（连接池申请连接）和断开（归还连接池）一次连接操作，
> 如果想要在一次请求中指定多个命令，则可以使用pipline实现一次请求指定多个命令，并且默认情况下一次pipline 是原子性操作。
> 管道（pipeline）是redis在提供单个请求中缓冲多条服务器命令的基类的子类。它通过减少服务器-客户端之间反复的TCP数据库包，从而大大提高了执行批量命令的功能。

```
import` `redis``import` `time` `pool = redis.ConnectionPool(host=``'localhost'``, port=``6379``, decode_responses=True)``r = redis.Redis(connection_pool=pool)``# pipe = r.pipeline(transaction=False) # 默认的情况下，管道里执行的命令可以保证执行的原子性，执行pipe = r.pipeline(transaction=False)可以禁用这一特性。``# pipe = r.pipeline(transaction=True)``pipe = r.pipeline() # 创建一个管道` `pipe.set(``'name'``, ``'jack'``)``pipe.set(``'role'``, ``'sb'``)``pipe.sadd(``'faz'``, ``'baz'``)``pipe.incr(``'num'``)  # 如果num不存在则vaule为``1``，如果存在，则value自增``1``pipe.execute()` `print(r.get(``"name"``))``print(r.get(``"role"``))``print(r.get(``"num"``))` `管道的命令可以写在一起，如：``pipe.set(``'hello'``, ``'redis'``).sadd(``'faz'``, ``'baz'``).incr(``'num'``).execute()``print(r.get(``"name"``))``print(r.get(``"role"``))``print(r.get(``"num"``))
```