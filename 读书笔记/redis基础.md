Oct 19, 2013

# Redis基础笔记

## 资源链接

推荐书籍:《Redis入门指南》

> 资源列表:

redis命令速查[command](http://redis.io/commands) | [CMD索引-中文](http://redis.cn/commands.html) | [CMD树-中文](http://redis.readthedocs.org/en/latest/)

redis源码[github](https://github.com/antirez/redis)

下载地址[redis.io](http://redis.io/download)

The Little Redis book [入口](https://github.com/JasonLai256/the-little-redis-book/blob/master/cn/redis.md)

redis资料概要 @江南白衣 [gist](https://github.com/springside/springside4/wiki/redis)

redis资料汇总专题 [nosqlfan](http://blog.nosqlfan.com/html/3537.html) (这个站有很多文章)

redis的设计与实现 [文档](http://www.redisbook.com/en/latest/)

redis2.6带注释源码 [github](https://github.com/huangz1990/annotated_redis_source)

redis 各种语言clients[clients](http://redis.io/clients)

python redis cli [redis-py](https://github.com/andymccurdy/redis-py)

网络文章汇总 [入口](http://www.redis.cn/article.html)

> 文章列表：

十五分钟介绍Redis数据结构 [入口](http://blog.nosqlfan.com/html/3202.html?ref=rediszt)

redis的订阅与发布 [入口](http://www.redisbook.com/en/latest/feature/pubsub.html)

redis之七种武器 [入口](http://blog.nosqlfan.com/html/2942.html?ref=rediszt)

使用Redis的五个注意事项 [入口](http://blog.nosqlfan.com/html/3705.html)

redis源码分析系列文章 [入口](http://blog.nosqlfan.com/html/2949.html?ref=rediszt)

Largest Redis Clusters Ever [入口](http://www.xdata.me/?p=301) (使用场景)

成人网站YouPorn使用Redis之经验谈 [入口](http://blog.jobbole.com/44629/)

> 相关项目

Redis监控web工具 [redmon](https://github.com/steelThread/redmon)

## 简介

### 简介

Redis(REmote DIctionary Server),远程字典服务器，以字典结构存储数据，允许通过TCP协议读取字典中内容. 高性能键值对数据库

作用：

```
1.缓存系统： 可以为每个键设置TTL(Time To Live),生存时间到期后键会自动被删除
             可限定数据占用最大内存空间，数据大道空间限制后自动按照一定规则淘汰不需要键
2.任务队列： redis列表类型可以用来实现队列, 支持阻塞式读取，很容易用作高性能队列，还支持“发布/订阅“消息的模式
```

其他:

```
1.Redis中, 所有数据都存储在内存中, 但提供了持久化支持, 内存中数据可以异步写入硬盘, 不影响现有服务
2.与memcached对比, redis单线程模型, memcached支持多线程. 但redis支持高级数据类型和持久化
```

### 安装

安装

```
1.wget http://download.redis.io/releases/redis-2.6.16.tar.gz
2.tar -xzvf redis-2.6.16.tar.gz
3.cd redis-2.6.16
4.make
5.make install
```

osx

```
brew install redis
```

安装后，在/usr/local/bin下面有

```
redis-server     服务器, 重点
redis-cli        命令行客户端, 重点

redis-benchmark  性能测试工具
redis-check-aof  AOF文件修复工具
redis-check-dump RDB文件检查工具
```

启动

直接启动

```
redis-server #默认6379
redis-server --port 6380
# 启动命令中配置将覆盖配置文件中同名参数
redis-server /path/to/redis.conf --loglevel warning
```

通过初始化脚本运行(生产环境)

```
在安装包目录redis-2.6.16/utils/redis_init_script

1.将脚本复制到/etc/init.d目录下，文件名为 redis_端口号, 修改文件第六行 REDISPORT为相同端口号
2.建立目录
    /etc/redis           存放配置文件
    /var/redis/端口号    存放持久化文件
3.修改配置文件
    将配置文件redis-2.6.16/redis.conf 复制到/etc/redis目录下，以端口号命名 e.g.  6379.conf
    修改配置文件中部分参数
        daemonize   yes                         使redis以守护进程模式运行
        pidfile     /var/run/redis_端口号.pid   设置redis的PID文件按位置
        port        端口号                      设置监听的端口号
        dir         /var/redis/端口号           设置持久化文件存放位置
```

停止

```
redis-cli SHUTDOWN
//server断开所有客户端连接, 根据配置执行持久化, 最后退出
```

Redis命令行客户端

```
发送命令：
    redis-cli -h 127.0.0.1 -p 6379
    redis-cli PING
    redis-cli
命令返回值
    状态回复，e.g.  >PING
    错误恢复, e.g.  >ECMD
    整数回复, e.g.  >INCR foo
    字符串回复，e.g. >GET foo   >GET notexists`
    多行字符串回复，e.g. >KEYS *
```

## 五种数据类型及相应命令

基础命令(redis-cli)

- 返回符合规则的键名列表

pattern支持通配符, ? * [] 等, 会遍历所有键, 当键的数量较多时影响性能

```
>KEYS pattern
```

e.g.

```
>SET bar 1
>KEYS *
```

- 判断一个键是否存在

返回，0不存在，1存在

```
>EXISTS key
```

e.g.

```
127.0.0.1:6379> EXISTS bar
(integer) 1
127.0.0.1:6379> EXISTS foo
(integer) 0
```

- 删除键

可以删除多个键, 返回删除的个数

```
>DEL key [key ...]
```

e.g.

```
127.0.0.1:6379> DEL bar
(integer) 1
127.0.0.1:6379> DEL bar
(integer) 0
```

- 获取键值的数据类型

返回string,hash(散列),list(列表),set(集合),zset(有序集合)

```
>TYPE key
```

e.g.

```
127.0.0.1:6379> SET bar 1
OK
127.0.0.1:6379> TYPE bar
string
```

### 1. 字符串类型

最基本类型, 能存储任何形式/编码字符串, 包括二进制. 允许存储最大容量是512M

- 赋值和取值命令

  ```
  >SET key value
  >GET key
  ```

e.g.

```
127.0.0.1:6379> SET hi "hello world"
OK
127.0.0.1:6379> GET hi
"hello world"
127.0.0.1:6379> GET abc
(nil)
```

- 递增数字(当存储的字符串是整数形式时)

  ```
  当操作键不存在时，默认值0，第一次递增后结果1，当键值不是整数时，报错
  >INCR key
  原子操作，可用于类似访问量统计, 自增id
  
  >INCRBY key increment
  >INCRBY bar 2
  ```

e.g.

```
127.0.0.1:6379> INCR abc
(integer) 1
127.0.0.1:6379> GET abc
"1"
127.0.0.1:6379> INCRBY abc 2
(integer) 3
127.0.0.1:6379> GET abc
"3"
```

- 减少数字

  ```
  >DECR key
  >DECRBY key decrement
  ```

e.g.

```
127.0.0.1:6379> DECR abc
(integer) 2
127.0.0.1:6379> DECRBY abc 2
(integer) 0
```

- 浮点数

  ```
  >INCRBYFLOAT key increment
  >INCRBYFLOAT bar 2.7
  ```

e.g.

```
127.0.0.1:6379> GET bar
"1"
127.0.0.1:6379> INCRBYFLOAT bar 1.5
"2.5"
```

- 向尾部追加

  ```
  返回追加字符串长度
  
  >APPEND key value
  ```

e.g.

```
>SET key hello
>APPEND key "world"
```

- 获取字符串长度

  ```
  >STRLEN key
  ```

e.g.

```
127.0.0.1:6379> GET hi
"hello world"
127.0.0.1:6379> STRLEN hi
(integer) 11
```

- 同时设置，获取多个键值

  ```
  >MGET key [key ...]
  >MSET key value [key value ...]
  ```

e.g.

```
127.0.0.1:6379> MSET k1 v1 k2 v2
OK
127.0.0.1:6379> GET k1
"v1"
127.0.0.1:6379> MGET k1 k2
1) "v1"
2) "v2"
```

- 位操作

  ```
  >GETBIT key offset
  >SETBIT key offset value
  
  >BITCOUNT key [start] [end] #获取值为1的二进制位个数
  
  >BITOP operation destkey key [key ...] #对多个字符串类型键进行位运算, 并将结果存储到destkey
  e.g. BITOP OR res fol fo2
      GET res
  ```

e.g.

```
a  97 01100001

127.0.0.1:6379> SET k 'a'
OK
127.0.0.1:6379> GET k
"a"

127.0.0.1:6379> GETBIT k 0
(integer) 0
127.0.0.1:6379> GETBIT k 1
(integer) 1

127.0.0.1:6379> BITCOUNT k
(integer) 3
```

BP: redis对键的命名， 对象类型:对象id:对象属性

### 2. 散列类型

一种字典结构，其存储了字段(field)和字段值映射，但字段值只能是字符串，不支持其他数据类型(即散列类型不支持数据类型嵌套)

散列类型适合存储对象

```
对象类型:id - 对象属性 - 对象属性值
```

- 基本命令

  ```
  >HSET key field value
  >HGET key field
  #HSET不区分插入更新
  
  >HMSET key field value [field value ...]
  >HMGET key field [field ...]
  
  >HGETALL key
  ```

e.g.

```
127.0.0.1:6379> HSET car name bmw
(integer) 1
127.0.0.1:6379> HGET car name
"bmw"

127.0.0.1:6379> HMSET car price 100 score 50
OK
127.0.0.1:6379> HMGET car name price score
1) "bmw"
2) "100"
3) "50"

127.0.0.1:6379> HGETALL car
1) "name"
2) "bmw"
3) "price"
4) "100"
5) "score"
6) "50"
```

- 判断字段是否存在

  ```
  #存在返回1，否则返回0
  >HEXISTS key field
  ```

e.g.

```
127.0.0.1:6379> HEXISTS car name
(integer) 1
127.0.0.1:6379> HEXISTS car model
(integer) 0
```

- 当字段不存在时赋值

  ```
  #已存在不进行任何操作, 不存在赋值
  >HSETNX key field value
  ```

e.g.

```
127.0.0.1:6379> HSETNX car name  abc
(integer) 0
127.0.0.1:6379> HGET car name
"bmw"

127.0.0.1:6379> HEXISTS car model
(integer) 0
127.0.0.1:6379> HSETNX car model 1
(integer) 1
127.0.0.1:6379> HGET car model
"1"
```

- 增加数字

  ```
  >HINCRBY key field increment
  ```

e.g.

```
>HINCRBY person score 60
```

- 删除字段

  ```
  >HDEL key field [field ...]
  ```

e.g.

```
HDEL car price
```

- 只获取字段名或字段值

  ```
  >HKEYS key
  >HVALS key
  ```

e.g.

```
127.0.0.1:6379> HKEYS car
1) "name"
2) "price"
3) "score"
4) "model"
127.0.0.1:6379> HVALS car
1) "bmw"
2) "100"
3) "50"
4) "1"
```

- 获取字段数量

  ```
  >HLEN key
  ```

e.g.

```
127.0.0.1:6379> HLEN car
(integer) 4
```

### 3. 列表类型

List, 可以存储一个有序的字符串列表, 列表内元素非唯一性，可以向两端加入元素，或者获得列表的某一个片段

内部使用双向链表实现,两端添加元素复杂度O(1), 通过索引访问的速度较慢

可以用在分页, 新鲜事, 记录日志等

- 向列表两端增加元素(可同时增加多个)

  ```
  >LPUSH key value [value ...]
  >RPUSH key value [value ...]
  ```

e.g.

```
127.0.0.1:6379> LPUSH num 1 2 3
(integer) 3
127.0.0.1:6379> RPUSH num 0
(integer) 4
# 3 2 1 0
```

- 从列表两端弹出元素

先移除一个元素，然后返回之

```
>LPOP key
>RPOP key
```

e.g.

```
127.0.0.1:6379> LPOP num
"3"
127.0.0.1:6379> RPOP num
"0"
```

- 获取元素个数

  ```
  >LLEN key
  ```

e.g.

```
127.0.0.1:6379> LLEN num
(integer) 2
```

- 获取片段(同python切片，-1表最后一个, stop超出返回最右边元素, start大于stop返回空)

  ```
  >LRANGE key start stop
  ```

e.g.

```
127.0.0.1:6379> LPUSH test a b c d e f g
(integer) 7
127.0.0.1:6379> LRANGE test 0 2
1) "g"
2) "f"
3) "e"
```

- 删除列表中指定值的元素

  ```
  >LREM key count value
  
  删除列表中前count个值为value的元素，返回值为实际删除元素的个数
              count = 0 所有
                    > 0 从左边开始删count个
                    < 0 从右边开始删|count|个
  ```

e.g.

```
127.0.0.1:6379> LRANGE test 0 2
1) "g"
2) "f"
3) "e"
127.0.0.1:6379> LREM test 0 f
(integer) 1
127.0.0.1:6379> LRANGE test 0 2
1) "g"
2) "e"
3) "d"
```

- 设置指定索引元素值

  ```
  >LINDEX key index
  >LSET key index value
  ```

e.g.

```
127.0.0.1:6379> LPUSH lt 3 2 1
(integer) 3
127.0.0.1:6379> LINDEX lt 0
"1"

127.0.0.1:6379> LSET lt 0 -1
OK
127.0.0.1:6379> LINDEX lt 0
"-1"
```

- 只保留列表指定片段

  ```
  删除指定索引范围之外的所有元素
  >LTRIM key start end
  ```

e.g.

```
127.0.0.1:6379> LRANGE la 0 99
1) "6"
2) "5"
3) "4"
4) "3"
5) "2"
6) "1"
127.0.0.1:6379> LTRIM la 0 2
OK
127.0.0.1:6379> LRANGE la 0 99
1) "6"
2) "5"
3) "4"
```

- 向列表中插入元素

  ```
  >LINSERT key BEFORE|AFTER pivot value
  从左到右查找值为pivot的元素，然后根据BEFORE/AFTER决定将value插入该元素前面还是后面
  ```

e.g.

```
127.0.0.1:6379> LRANGE la 0 99
1) "6"
2) "5"
3) "4"
127.0.0.1:6379> LINSERT la AFTER 5 3
(integer) 4
127.0.0.1:6379> LRANGE la 0 99
1) "6"
2) "5"
3) "3"
4) "4"
```

将元素从一个列表转到另一个列表

```
RPOPLPUSH source destination
#RPOP，然后LPUSH，返回每个元素值，e.g.循环测试网址的可用性
```

### 4. 集合类型

无序，无重复(唯一)，可以存储最多2^32 - 1 个字符串

- 增加删除元素

返回操作成功的个数

```
    >SADD key member [member ...]
    >SREM key member [member ...]
```

e.g.

```
127.0.0.1:6379> SADD letters a
(integer) 1
127.0.0.1:6379> SADD letters a b c
(integer) 2
```

- 获得集合中的所有元素

  ```
  >SMEMBERS key
  ```

e.g.

```
127.0.0.1:6379> SMEMBERS letters
1) "c"
2) "a"
3) "b"
```

- 判断元素是否在集合中(复杂度O(1))

  ```
  >SISMEMBER key member
  ```

e.g.

```
127.0.0.1:6379> SISMEMBER letters a
(integer) 1
127.0.0.1:6379> SISMEMBER letters d
(integer) 0
```

- 集合间运算

  ```
  # 差集
  >SDIFF key [key ...]
  # 交集
  >SINTER key [key ...]
  # 并集
  >SUNION key [key ...]
  ```

- 进行集合运算并将结果存储

  ```
  >SDIFFSTORE destination_key key [key ...]
  >SINTERSTORE destination_key key [key ...]
  >SUNIONSTORE destination_key key [key ...]
  ```

- 获得集合中元素个数

  ```
  >SCARD key
  ```

e.g.

```
127.0.0.1:6379> SCARD letters
(integer) 3
```

- 随机获取集合中元素

  ```
  >SRANDMEMBER key [count]
  count，正数，获取count个不重复的元素
  count, 负数，获取|count|个，可能重复
  ```

e.g.

```
127.0.0.1:6379> SRANDMEMBER letters
"b"
127.0.0.1:6379> SRANDMEMBER letters 2
1) "a"
2) "c"

127.0.0.1:6379> SRANDMEMBER letters -2
1) "b"
2) "b"
```

- 弹出一个元素

  ```
  >SPOP key
  ```

e.g.

```
127.0.0.1:6379> SPOP letters
"c"
127.0.0.1:6379> SCARD letters
(integer) 2
```

### 5. 有序集合

sorted set,集合中每个元素都关联一个分数(不同元素分数可以相同)，可以根据分数进行排序(最高/最低N个)，进行有序相关的操作(分数可以相同)

有序集合使用散列表和跳跃表实现, 读取复杂度更低, 更耗费内存

按点击量排序，按时间排序等等，时间轴操作

- 增加元素

  ```
  >ZADD key score member [score member]
  ```

e.g.

```
127.0.0.1:6379> ZADD scoreboard 89 tom 67 peter 100 david
(integer) 3
127.0.0.1:6379> ZADD scoreboard 70 peter
(integer) 0
```

- 获取元素分数

  ```
  >ZSCORE key member
  ```

e.g.

```
127.0.0.1:6379> ZSCORE scoreboard peter
"70"
```

- 获取排名在某个范围内的元素列表

分数相同，按字典序排,中文的话，取决于编码方式

```
#分数从小到大排，返回索引从 start-stop之间的所有元素，包含两端元素, WITHSCORES同时获得元素分数
>ZRANGE key start stop [WITHSCORES]
>ZREVRANGE key start stop [WITHSCORES]
```

e.g.

```
127.0.0.1:6379> ZRANGE scoreboard 0 2
1) "peter"
2) "tom"
3) "david"
127.0.0.1:6379> ZRANGE scoreboard 0 2 WITHSCORES
1) "peter"
2) "70"
3) "tom"
4) "89"
5) "david"
6) "100"

127.0.0.1:6379> ZREVRANGE scoreboard 0 2 WITHSCORES
1) "david"
2) "100"
3) "tom"
4) "89"
5) "peter"
6) "70"
```

- 获取指定分数范围的元素

  ```
  >ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
  ```

e.g.

```
127.0.0.1:6379> ZRANGEBYSCORE scoreboard 80 100 WITHSCORES
1) "tom"
2) "89"
3) "david"
4) "100"
```

希望不包含端点值

```
>ZRANGEBYSCORE scoreboard 80 (100
正负无穷大 +inf -inf
```

e.g.

```
127.0.0.1:6379> ZRANGEBYSCORE scoreboard 80 (100 WITHSCORES
1) "tom"
2) "89"

127.0.0.1:6379> ZRANGEBYSCORE scoreboard 80 +inf WITHSCORES
1) "tom"
2) "89"
3) "david"
4) "100"

127.0.0.1:6379> ZRANGEBYSCORE scoreboard 80 +inf WITHSCORES LIMIT 0 1
1) "tom"
2) "89"
```

- 增加某个元素分数

  ```
  >ZINCRBY key increment member
  ```

e.g.

```
127.0.0.1:6379> ZSCORE scoreboard tom
"89"
127.0.0.1:6379> ZINCRBY scoreboard 2 tom
"91"
127.0.0.1:6379> ZSCORE scoreboard tom
"91"
```

- 获得集合中元素数量

  ```
  >ZCARD key
  ```

e.g.

```
127.0.0.1:6379> ZCARD scoreboard
(integer) 3
```

- 获得指定分数范围内的元素个数

  ```
  >ZCOUNT key min max
  ```

e.g.

```
127.0.0.1:6379> ZCOUNT scoreboard 80 100
(integer) 2
```

- 删除一个或多个元素

  ```
  >ZREM key member [member ...]
  ```

- 按照排名范围删除元素

  ```
  >ZREMRANGEBYRANK key start stop
  ```

- 按照分数范围删除

  ```
  >ZREMRANGEBYSCORE key min max
  ```

- 获得元素排名

  ```
  >ZRANK key member #从小到大
  >ZREVRANK key member #相反
  ```

e.g.

```
127.0.0.1:6379> ZRANK scoreboard tom
(integer) 1
```

- 计算有序集合的交集

  ```
  >ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
  
  #返回值为destination中元素个数
  #AGGREGATE sum默认值，destination键中元素分数是每个参与计算的集合中该元素分数的和
          min取最小值
          max取最大值
  #WEIGHTS 设置每个集合的权重，每个集合在参与计算时分数会被乘以权重
  ```

## 其他

### 事务

Redis中事务是一组命令的集合, 一个事务中的命令要么都执行, 要么都不执行

```
> MULTI
> SADD k1 v1
> SADD k2 v2
> EXEC
```

注意, 不支持回滚功能

### SORT

可以对列表/集合/有序集合进行排序

最强大最复杂, 用不好可能成为性能瓶颈 O(n + mlogm) n为排序个数, m为返回个数

```
>SORT key #从小到大
>SORT key DESC #从大到小
```

SORTBY

```
127.0.0.1:6379> LPUSH sortbylist  2 1 3
(integer) 3
127.0.0.1:6379> SET itemscore:1 50
OK
127.0.0.1:6379> SET itemscore:2 100
OK
127.0.0.1:6379> SET itemscore:3 -10
OK
127.0.0.1:6379> SORT sortbylist BY itemscore:* DESC
1) "2"
2) "1"
3) "3"
```

SORTBY GET

```
127.0.0.1:6379> SORT sortbylist BY itemscore:* DESC GET POST:*->title GET POST:*->time
```

SOTRBY GET STORE

```
127.0.0.1:6379> SORT sortbylist BY itemscore:* DESC GET POST:*->title GET POST:*->time STORE new_key
```

### 生存时间

TTL, time to live

时效数据，过一定时间删除这些数据

```
#设置
>EXPIRE key seconds
1表示设置成功, 0表键不存在或设置失败

#查询
>TTL key
键不存在返回-1 or 没有设置生存时间

#去除时效
>PERSIST key

#SET/GETSET为键赋值会同时清除键的生存时间
```

### 任务队列

一般队列

```
生产者 LPUSH
消费者 RPOP

BRPOP 和RPOP类似，但是当列表中没有元素时，BRPOP会一直阻塞住链接，直到有新元素加入
```

优先队列

```
BLPOP key [key ...] timeout,同时检测多个键，如果所有键都没有元素则阻塞，如果其中有一个键有元素，则从该键中弹出元素
如果都有，则从左到右的顺序取第一个键中的一个元素

BLPOP queue:1 queue:2 queue:3 0
```

### 发布/订阅模式

进程间消息传递

订阅者：订阅者可以订阅一个或多个频道

```
>SUBSCRIBE channel1
```

发布者：可以向指定的频道发送消息，所有订阅此频道的订阅者都会受到此消息

```
>PUBLISH channel1 helloworld
```

### Python中使用Redis

官方推荐[redis-py](https://github.com/andymccurdy/redis-py)

安装

```
sudo pip install redis
sudo easy_install redis
```

使用

```
redis-py提供两个类Redis和StrictRedis用于实现Redis的命令，
StrictRedis用于实现大部分官方的命令，并使用官方的语法和命令（比如，SET命令对应与StrictRedis.set方法）
Redis是StrictRedis的子类，用于向后兼容旧版本的redis-py

>>> import redis
>>> r = redis.StrictRedis(host='localhost', port=6379, db=0)
>>> r.set('foo', 'bar')
True
>>> r.get('foo')
'bar'
```

connection pool

```
管理对一个redis server的所有连接，避免每次建立、释放连接的开销。
默认，每个Redis实例都会维护一个自己的连接池。可以直接建立一个连接池，然后作为参数Redis，这样就可以实现多个Redis实例共享一个连接池。

pool = redis.ConnectionPool(host='127.0.0.1', port=6379)
r = redis.Redis(connection_pool=pool)
```

pipeline机制

```
可以在一次请求中执行多个命令，这样避免了多次的往返时延
当一组命令中每条命令都不依赖于之前的执行结果, 可以使用

pipe = r.pipeline()
pipe.set('one', 'first')
pipe.set('two', 'second')
pipe.execute()

pipeline中的操作是原子的，要改变这种方式，可以传入transaction=False

pipe = r.pipeline(transaction=False)
```

### 实际实例

什么应用，都用什么方式处理的

1.一般的缓存

用字符串类型足矣, e.g.注册时得用户名冲突,在线用户

```
>SET key value
>GET
```

一些缓存场景

```
存储会话缓存(Session Cache), 利用持久化, 保存一些信息, 例如购物车
全页缓存(FPC)
```

2.计数,访问量统计，自增id等

```
>INCR key
```

3.存储对象实例

```
用散列
>HSET key field value
>HGET key field
```

4.存列表，队列相关

作为队列使用

文章分类列表，评论列表等

```
用列表
>LPUSH key value
>RPUSH key value

>LPOP key
>RPOP key
```

5.集合相关的

标签云等

```
>SADD key member
>SREM key member
```

6.排序相关

排行榜

访问量排序,点击量等

```
用有序结合
>ZADD key score member
```

7.访问频率控制

设置key的失效时间 用 INCR 访问时检查次数, 若超过阈值, 走限制逻辑

or 记录次数, 超过阈值, 检查与最早一个相差是不是1分钟, 是, 走限制逻辑, 不是, 现有时间加入列表, 同时删除最早元素

8.发布/订阅

会用到的

### 管理

重启后数据不丢失, 两种方式, 可单独使用或者结合使用

持久化：

RDB

```
快照,符合一定条件时，将内存中的所有数据进行快照并存储到硬盘上
快照的条件可以在配置文件中配置, 两个参数: 时间和改动的键的个数
Redis默认采用的持久化方式

过程
1. Redis使用fork函数复制一份当前进程(父进程)的副本(子进程) (存的是fork时刻的数据)
   写时复制copy-on-write 开始时父子共享同一内存数据, 当父进程修改某片数据, 操作系统复制一份以保证子进程数据不受影响
2. 父进程继续接收命令, 子进程开始将内存中数据写入硬盘中临时文件
3. 写入结束后, 替换旧的RDB文件

任意时刻rdb文件都是完整地, 可以用于备份

可以手动发SAVE / BGSAVE 让redis执行快照(前者由主进程进行快照操作,阻塞其他请求, 后者fork子进程)
```

AOF

```
每次执行一条会修改Redis中数据的命令，Redis会将该命令写到硬盘中的AOF文件
开启, 设置 appendonly yes
默认文件名 appendonly.aof 可以通过appendfilename设置

纯文本文件, 每当达到一定条件时可以进行重写
auto-aof-rewrite-percentage 100 #超过上一次百分比
auto-aof-rewrite-min-size 64mb #允许重写的最小aof文件大小

默认30s, 执行的命令同步到aof
可以配置
appendfsync everysec # 每秒一次
```

Redis可以配置主从数据库

redis-server –port 6380 –slaveof 127.0.0.1 6379

复制原理: 从数据库启动, 向主库发SYNC, 主库后台开始保存快照(RDB), 并将保存期间的命令缓存起来. 快照完成后, 将快照文件和缓存的命令发送给从库, 从库收到后载入快照文件并执行命令. 不支持断点续传

读写分离: 主库禁用持久化, 从库启用. 从库崩溃, 重启自动更新. 主库崩溃, 从库提升为主库再修复

常用查看命令

telnet连接

```
>telnet 127.0.0.1 6379
```

设定最大可用内存

如果服务器内存有限, 大量使用缓存且生存时间设置过长会导致Redis占满内存. or 为了防止占用内存过大而将生存时间设太短导致命中率过低

可以限制redis使用的最大内存, 按照一定规则淘汰不需要的键

```
配置文件 
maxmemory 限制最大可用内存大小(单位字节)
maxmemory-policy 超过限制时的删除策略，一直删除直到小于指定内存

volatile-lru  使用LRU算法删除一个键，只对设置了生存时间的
allkeys-lru   使用LRU算法删除一个键
volatile-random 随机，只对设置了生存时间的
allkeys-random
volatile-ttl    删除生存时间最近的
noeviction      不删除键，返回错误
```

耗时命令日志

```
> SLOWLOG GET
```

### 其他

批量删除

```
#删除 /test/*开始的
./redis-cli -a password -n 0 keys "/test/*" | xargs ./redis-cli -a password -n 0 del
```

精简键名和键值, 最直观的减少内存占用的方式