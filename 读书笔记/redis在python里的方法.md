### Python-redis命令

- redis-py提供两个类Redis和StrictRedis用于实现Redis的命令，StrictRedis用于实现大部分官方的命令，并使用官方的语法和命令（比如，SET命令对应与StrictRedis.set方法）。Redis是StrictRedis的子类，用于向后兼容旧版本的redis-py。 简单说，官方推荐使用StrictRedis方法。

 

### 所有提供批量写入功能的命令

- SADD set val1 val2 val3 … — 返回添加的元素个数
- HDEL hash field2 field3 field3 … — 返回删除的元素个数
- SREM set val1 val2 val3 … – 返回删除的元素个数
- ZREM zset val1 val2 val3 … – 返回删除的元素个数
- ZADD zset score1 val1 score2 val2 … – 返回添加的元素个数
- LPUSH/RLPUSH list val1 val2 val3 … – 返回操作后的LIST的长度
  r.mget('c1','c2') #批量获取
  提供批量命令的效果是显而易见的，网络往返的时间被大大节约了，在最理想的网络情况下，作者的测试结果是一次性写入200w个元素，仅仅花费了1.28秒，每秒超过100w元素的写入！
- redis-cli -h localhost -p 6380 monitor 监控localhost端口为6380，redis的连接及读写操作 redis-cli -h localhost -p 6380 info 提供localhos端口为6380，redis服务的统计信息
  本机和标准端口可以使用redis-cli monitor和redis-cli info来查看

 

redis的连接附加的参数里面，默认编码是utf-8，但是如果你非要用GBK那就需要指明你的chardet和decode_responses为True 。
redis.StrictRedis (host='localhost', port=6379, db=0, password=None, socket_timeout=None,connection_pool=None, charset='GBK ' , errors='strict', decode_responses=True)

 

### Python-redis提示

- 连接本机的redis服务使用unix coket接口来，可以有更好的性能和安全性 r = redis.Redis(unix_socket_path='/dev/shm/redis.sock')
- 插入与更新操作的无差别性:Redis的所有SET（包括MSET,HMSET）操作都是：存在则更新，不存在则插入。所以在编程的时候开发人员不需要关心所做的操作属于更新还是插入
- 目前Redis的Hash存储仅支持字符类型的值，不支持其他数据结构
- 程序对资源最好是只读或只写，明确分工。不要在一个程序里同时对资源进行读写，除非是原子操作，如GETSET。
- 尽量使用批量写入功能，性能可以达到百倍的提升，目前可以使用批量的命令SADD、HDEL、SREM、ZREM、ZADD、LPUSH/RLPUSH。其次可以使用pipeline管道实现批量读写功能

 

### redis适用场景

1. 取最新N个数据的操作
2. 排行榜应用，取TOP N操作
3. 需要精准设定过期时间的应用
4. 计数器应用
5. Uniq操作，获取某段时间所有数据排重值
6. 实时系统，反垃圾系统
7. Pub/Sub构建实时消息系统
8. 构建队列系统
9. 缓存

 

### Python-redis操作实例：

#### Redis数据库操作

```python
from redis import StrictRedis    #导入redis模块
r = StrictRedis(host='localhost', port=6379, db=1)  #连接数据库,使用本机的数据库直接使用r = redis.Redis()
# 使用连接池方式
pool = redis.ConnectionPool(host='localhost', port=6379, db=0)   #使用连接池方式1:建立连接池,使用本机的数据库直接使pool = redis.ConnectionPool(）
r = redis.Redis(connection_pool=pool) #使用连接池方式2.连接数据库
r.dbsize()  #查看数据库大小,库里有多少key，多少条数据,print '\ndbsize: %s' % 
r.dbsize()r.info()   #查看数据库信息
r.save()   #强行把数据库保存到硬盘。保存时阻塞
r.flushdb()   #删除当前数据库的所有数据
r.flushall()   #清空所有数据的值
r.lastsave() # 取最后一次save时间
r.shutdown() #关闭所有客户端，停掉所有服务，退出服务器 
```

 

#### Python-redis的string字符串操作

```shell
r.set('foo', 'bar')   #或者写成 r['foo'] = 'bar'  #设置key为foo,值为bar
r.get('foo')    #获取key为foo的值，也可以用r['foo'] 
r.delete('foo')   #删除foo的key ，可支持多个，如r.delete('c1','c2')
r.exists('chang')  #看是否存在这个键
r.keys()   # 列出所有键  
r.keys(‘c*’)  #获取c开头的key
r.type('foo') #key的类型，有四种类型： string(key,value)、list(序列)、set(集合)、zset(有序集合,多了一个顺序属性)
r.mget('c1','c2')   #批量获取
r.randomkey()       #获取随机一个key
r.rename('a','c3')  #重命名key
r.expire('c3',10)   #让数据10秒后过期
r.ttl('c3')         #看剩余过期时间 不存在返回-1 
r.getset('foo','jj')   #读出foo的值，并且将原有的值更换为jj
r.incr('foo')   #将key的值增加1，注意值的类型应该是数字 r.incr('foo', 2)   #增加2
r.decr('foo')   #将foo的值减1 r.decr('foo', 2)   #减少2
```

 

#### Python-redis的List列表操作 ,链表结构，主要功能是push/pop，实现队列、栈等数据结构

List 适用场景： 论坛中的主题列表、回复列表 微博中的用户关注列表、用户feed列表、用户关注feed列表 好友推荐，排行榜 消息队列

```shell
r.rpush("members", "Adam")   #从 List 尾部添加一个元素（如序列不存在，则先创建，如已存在同名Key而非序列，则返回错误）r.lpush("members", "Bob")   #从 List 头部添加一个元素
r.llen("members")    #返回列表长度
r.lrange("members", 0, -1)   #从自定的范围内返回序列的元素
r.lindex("members", 1)    #返回某个位置的序列值
r.rpop("members")          #弹出 List 的最后一个元素,取出后删除这个元素
r.lpop("members")          #弹出 List 的第一个元素,取出后删除这个元素
r.ltrim("members", 0, 2)   #保留指定范围的元素，其它删除
r.lset("members", 2, 'Carol')   #将指定位置的元素更新值
r.lrem("members",  'Carol', 1)   #List头部(count正数)或尾部(count负数)删除count匹配value的元素，返回删除的元素数量,为0删除全部。                                                 
# 标准文档中的三个参数 key, count, value , 按照这个调用python 接口一直不起作用，最后发现参数的顺序不是按照标准写的，  是按照key, value, count 这个顺序的。
r.brpop(list1, list2, 2)   #从多个List中按顺序获取数据，超时为2
```

 

#### Python-redis的Set集合操作 ,对集合的操作有添加删除元素，有对多个集合求交并差等操作

```shell
r.sadd('s', 'a')    #添加数据到集合
r.scard('s')    # 判断一个set长度为多少 不存在为0
r.sismember('s','a')    #判断set中一个对象是否存在
r.sinter('s1','s2')    #获取s1和s2两个集合都有的元素
r.sinterstore('s3','s1','s2')  #获取s1和s2两个集合都有的元素并且复制到s3
r.smembers('s3')    #查看一个set对象
r.sunion('s1','s2')   #获取s1和s2两个集合合并以后的元素
r.sunionstore('s3','s1','s2')  #将s1和s2合并以后赋值给s3
r.srandmember('s1')   #获取随机数
r.sdiff('s1','s2','s3')  #获取在s1中有，但在s2和s3中都没有的元素
r.sdiffstore('s4','s1','s2')   #获取在s1中有，但在s2没有的元素赋值到s4
```

 

#### Python-redis的sorted set有序集合操作 set的一个升级版本，他在set的基础上增加了一个顺序属性，可以用作实时排名，例如微博用户的排名

```shell
r.zadd('s', 'a', 3)  #添加一个元素，指定积分
r.zcard('s')   #获取集合里面的元素数量
r.zincrby('s', 'a', 2)   #将元素的积分增加2,也可以使用zdecrby来减少
r.zrange('s', 0, -1)  #根据位置获取元素
r.zrangebyscore('s', 1.0, 8.0)   #按照积分(范围)取数据
r.zrem('s', 'a')    #删除一个元素r.zscore('s', 'a')  #获取元素的积分
```

 

#### Python-redis的Hash set分布集合操作 最经济的存储方式，为了节约内存，建议使用 hashset 而不是 set/get 的方式来使用Redis

存储状态：[key] : {‘field’ -> ‘value’, ‘field’ -> ‘value’, ‘field’ -> ‘value’} 类似python的字典

```shell
r.hset('h', 'name', 'king')       #设置hash field为指定值，如果key不存在，则先创建,hset key field value
r.hget('h','name')             #获取指定的hash field,hget key field
r.hmget('h', ['name', 'passwd'])   #获取多个值
r.hmset('h',dict(add='five', city='xingning'))   #同时设置hash的多个field
h.hincrby('h', 'number' 2)    #将指定的值加数,hincrby key field integer
r.hexists('h', 'name')          #测试指定field是否存在
r.hdel('h', 'passwd')             #删除指定的hash field
r.hlen('h')                 #返回指定hash的field数量
r.hkeys('h')                  #返回hash的所有field
r.hvals('h')                  #返回hash的所有value
r.hgetall('h')                   #返回hash的所有filed和value
```

 

#### Python-redis的事务操作

```
使用MULTI命令开启一个事务，然后之后的命令都会放到队列中，直到使用EXEC执行命令（提交事务）或者使用DISCARD丢弃（回滚事务）所有的命令。
```