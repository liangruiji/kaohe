### 背景

随着访问量的提升，使用数据库Web站点在性能上出现了一些瓶颈，而瓶颈的源头一般是在磁盘的I/O上。而随着互联网技术的进一步发展，各种类型的应用层出不穷，这导致在当今云计算、大数据盛行的时代，对性能有了更多的需求，主要体现在以下四个方面：

1. 低延迟的读写速度：应用快速地反应能极大地提升用户的满意度
2. 支撑海量的数据和流量：对于搜索这样大型应用而言，需要利用PB级别的数据和能应对百万级的流量
3. 大规模集群的管理：系统管理员希望分布式应用能更简单的部署和管理
4. 庞大运营成本的考量：IT部门希望在硬件成本、软件成本和人力成本能够有大幅度地降低

为了克服这一问题，NoSQL应运而生，它同时具备了高性能、可扩展性强、高可用等优点，受到广泛开发人员和仓库管理人员的青睐。



Redis是由意大利人Salvatore Sanfilippo（网名：antirez）开发的一款**内存高速缓存**数据库

**因为Redis基于内存，交换数据快，所以在服务器中常用来存储一些需要频繁调取的数据，这样可以大大节省系统直接读取磁盘来获得数据的I/O开销，更重要的是可以极大提升速度。**

### redis特性

1. 速度快

   > - redis的所有数据都是存在于**内存**中的，这是redis速度快的主要原因
   > - redis是由C语言写成，距离操作系统更近，执行速度会更快
   > - redis使用单线程结构，预防了多线程可能产生的竞争问题
   > - 作者对redis源码的精细打磨

2. 基于键值对的数据结构服务器

   > redis的全称为**remote dictionary server**，redis数据最基础的组织结构是键值对，在这之上又主要提供了5种数据结构：字符串、字典、列表、集合、有序集合。同时在字符串的基础之上演变出了位图（Bitmaps） 和HyperLogLog两种神奇的“数据结构”， 并且随着LBS（Location Based Service， 基于位置服务） 的不断发展， Redis3.2版本中加入有关GEO（地理信息定位） 的功能。

3. 丰富的功能

   > 除了5种数据结构，redis还提供着其他丰富的功能
   >
   > - 提供健过期功能，可以用来实现缓存
   > - 提供发布和订阅功能，可以用来实现消息系统
   > - 支持Lua脚本功能，可以利用Lua创造出新的redis命令
   > - 提供了流水线（Pipeline） 功能， 这样客户端能将一批命令一次性传到Redis， 减少了网络的开销

4. 简单稳定

   > redis的简单体现在3个方面：源码少，使用单线程，不依赖操作系统类库

5. 客户端语言多

   > Redis提供了简单的TCP通信协议， 很多编程语言可以很方便地接入到Redis， 并且由于Redis受到社区和各大公司的广泛认可， 所以支持Redis的客户端语言也非常多， 几乎涵盖了主流的编程语言。

6. 持久化

   > 通常看， 将数据放在内存中是不安全的， 一旦发生断电或者机器故障，重要的数据可能就会丢失， 因此Redis提供了两种持久化方式： RDB和AOF， 即可以用两种策略将内存的数据保存到硬盘中。

7. 主从复制

   > Redis提供了复制功能， 实现了多个相同数据的Redis副本， 复制功能是分布式Redis的基础。

8. 高可用和可分布式

   > Redis从2.8版本正式提供了高可用实现Redis Sentinel， 它能够保证Redis节点的故障发现和故障自动转移。 Redis从3.0版本正式提供了分布式实现Redis Cluster， 它是Redis真正的分布式实现， 提供了高可用、 读写和容量的扩展性。

### Redis的应用场景 

1）数据缓存（商品数据，新闻，热点）
2）单点登录
3）秒杀，抢购
4）网站访问排名
5）应用模块开发

作用：

```
1.缓存系统： 可以为每个键设置TTL(Time To Live),生存时间到期后键会自动被删除
             可限定数据占用最大内存空间，数据大道空间限制后自动按照一定规则淘汰不需要键
2.任务队列： redis列表类型可以用来实现队列, 支持阻塞式读取，很容易用作高性能队列，还支持“发布/订阅“消息的模式
```

1.启动redis-cli 客户端

~~~shell

redis-server	# 启动 Redis
redis-cli     # 启动redis-cli 客户端
~~~

2.字符串命令

| 命令  | 行为                                               | 返回值                   |
| :---- | :------------------------------------------------- | ------------------------ |
| `GET` | 获取存储在给定键中的值                             | 键的值                   |
| `SET` | 设置存储在给定键中的值                             | OK                       |
| `DEL` | 删除存储在给定键中的值（这个命令可以用于所有类型） | 返回被成功删除的值的数量 |

~~~shell
redis-cli                      # 启动redis-cli 客户端
127.0.0.1:6379> set name liang # 将键 name 的值设置为 liang 。
OK	 													 # SET 命令在执行成功时返回 OK ，Python 客户端会将这个 OK 转换成 True
127.0.0.1:6379> get name			 # 获取储存在键 name 中的值。
"liang"
127.0.0.1:6379> set name luo
OK
127.0.0.1:6379> get name
"luo"
127.0.0.1:6379> del name
(integer) 1		            # 在对值进行删除的时候，DEL 命令将返回被成功删除的值的数量
127.0.0.1:6379> get name	# 因为键的值已经不存在，所以尝试获取键的值将得到一个 nil ，
(nil)                     # Python 客户端会将这个 nil 转换成 None。

~~~

3.列表

列表(`list`)类型是用来存储多个字符串,如下图`A,B,C,D`四个元素从左到右组成一个有序的集合.列表中的每个字符串被称为元素(`element`),一个列表最多可以存储`(2的32次方)-1`个元素.在`redis`中,可以对列表两端插入(`push`)和弹出(`pop`),还可以获取指定范围的元素列表、获取指定所有下标的元素等.

![列表](https://segmentfault.com/img/bVLV3q?w=1276&h=532)

列表类型有两个特点:

1. 列表中的元素是有序的,这就意味着可以通过索引下标获取某个元素或者某个范围内的元素列表.
2. 列表中的元素可以是重复的.

| 命令           | 行为                                         | 返回值             |
| :------------- | :------------------------------------------- | ------------------ |
| `LPUSH  RPUSH` | 将给定值推入到列表的左、右端                 | 返回列表的当前长度 |
| `LRANGE`       | 获取列表在给定范围上的所有值                 |                    |
| `LINDEX`       | 获取列表在给定位置上的单个元素               |                    |
| `LPOP RPOP`    | 从列表的左、右端弹出一个值，并返回被弹出的值 | 返回被弹出的值     |

~~~shell
127.0.0.1:6379> rpush list item    # 在向列表推入新元素之后，该命令会返回列表的当前长度。
(integer) 1
127.0.0.1:6379> rpush list item3
(integer) 2
127.0.0.1:6379> rpush list item
(integer) 3
127.0.0.1:6379> lrange list 0 -1	 # 获取给定范围上的所有值 使用0为范围的起始索引，-1为范围的结束索引，
1) "item"
2) "item3"
3) "item"
127.0.0.1:6379> lrange list 0 1    # 顾头顾尾
1) "item"
2) "item3"

127.0.0.1:6379> lindex list 1      #获取给定索引上的单个元素
"item3"
127.0.0.1:6379> rpop list          #从列表右边弹出一个元素，被弹出的元素不再存在于列表。
"item"

127.0.0.1:6379> lrange list 0 -1
1) "item"
2) "item3"
~~~

4.集合

集合(`set`)类型也是用来保存多个的字符串元素,但和列表不同的是:它的元素是无序且不可重复的,不能通过索引获取元素.一个集合最多可以存储(2的32次方-1)个元素

| 命令        | 行为                                         | 返回值                                                       |
| :---------- | :------------------------------------------- | ------------------------------------------------------------ |
| `SADD`      | 将给定元素添加到集合                         | 返回1表示这个元素被成功地添加到了集合里面，                  |
| `SMEMBERS`  | 返回集合包含的所有元素                       | 一个由元素组成的序列,ython客户端会将这个序列转换成Python集合 |
| `SISMEMBER` | 检查给定元素是否存在于集合中                 | 返回1表示这个元素在集合里，返回0表示不在                     |
| `SREM`      | 如果给定的元素存在于集合中，那么移除这个元素 | 返回被移除的元素数量                                         |

~~~shell
127.0.0.1:6379> sadd se item	#将给定元素添加到集合，
(integer) 1										#命令返回1表示这个元素被成功地添加到了集合里面，
127.0.0.1:6379> sadd se item	
(integer) 0			
127.0.0.1:6379> sadd se item1
(integer) 1
127.0.0.1:6379> sadd se item2
(integer) 1
127.0.0.1:6379> smembers se			 # 获取集合包含的所有元素将得到一个由元素组成的序列，
1) "item1"											 # Python客户端会将这个序列转换成Python集合。
2) "item"
3) "item2"
127.0.0.1:6379> sismember se item # 检查一个元素是否存在于集合中，返回1则表示这个元素在这集合中，返回0则表示不在
(integer) 1 											# Python客户端会返回一个布尔值来表示检查结果。
127.0.0.1:6379> sismember se item4
(integer) 0

127.0.0.1:6379> srem se item4     #移除item4这个元素，返回被移除的元素数量
(integer) 0
127.0.0.1:6379> srem se item
(integer) 1
127.0.0.1:6379> smembers se
1) "item1"
2) "item2"
~~~

5.散列命令

| 命令      | 行为                                     | 返回值                                                       |
| :-------- | :--------------------------------------- | ------------------------------------------------------------ |
| `HSET`    | 在散列里面关联起给定的键值对             | 返回一个值（0或1）来表示给定的键是否已经存在于散列里面       |
| `HGET`    | 获取指定散列键的值                       |                                                              |
| `HGETALL` | 获取散列包含的所有键值对                 | 获取散列包含的所有键值对，Python客户端会将这些键值对转换为Python字典。 |
| `HDEL`    | 如果给定键存在于散列里面，那么移除这个键 | 返回一个值（0或1）来表示给定的键在移除之前是否存在于散列里面 |

~~~shell
127.0.0.1:6379> hset dict a first  # 添加键值对到散列，
(integer) 1												 # 命令会返回一个值来表示给定的键是否已经存在于散列里面
127.0.0.1:6379> hset dict b second
(integer) 1
127.0.0.1:6379> hset dict b second # 已存在的键值对再次添加时，会返回0，表示散列中键已存在，后面的会覆盖前面的
(integer) 0
127.0.0.1:6379> hgetall dict			 # 获取散列包含的所有键值对，
1) "a"
2) "first"
3) "b"
4) "second"
127.0.0.1:6379> hdel dict a					#删除指定键值对
(integer) 1													#返回一个值（0或1）来表示给定的键在移除之前是否存在于散列里面
127.0.0.1:6379> hdel dict a
(integer) 0
127.0.0.1:6379> hget dict b					#获取指定散列键的值
"second"
127.0.0.1:6379> hgetall dict
1) "b"
2) "second"
~~~

6.有序集合

有序集合和散列一样，都用于存储键值对：其中有序集合的每个键称为*成员*（member），都是独一无二的，而有序集合的每个值称为*分值*（score），都必须是浮点数。有序集合是Redis里面唯一既可以根据成员访问元素（这一点和散列一样），又可以根据分值以及分值的排列顺序来访问元素的结构

| 命令            | 行为                                                       |
| :-------------- | :--------------------------------------------------------- |
| `ZADD`          | 将一个带有给定分值的成员添加到有序集合里面                 |
| `ZRANGE`        | 根据分值的排序顺序，获取有序集合在给定位置范围内的所有元素 |
| `ZRANGEBYSCORE` | 获取有序集合在给定分值范围内的所有元素                     |
| `ZREM`          | 如果给定成员存在于有序集合，那么移除这个成员               |

~~~sh
127.0.0.1:6379> zadd bb 20 a  	# 向有序集合添加元素
(integer) 1											# 命令会返回新添加元素的数量
127.0.0.1:6379> zadd bb 200 b
(integer) 1
127.0.0.1:6379> zadd bb 2000 b
(integer) 0
127.0.0.1:6379> zrange bb 0 -1
1) "a"
2) "b"
127.0.0.1:6379> zrange bb 0 -1 withscores		# 获取有序集合包含的所有元素
1) "a"																			# 这些元素会按照分值进行排序，
2) "20"
3) "b"
4) "2000"
127.0.0.1:6379> zrangebyscore bb 1500 2000 withscores		# 根据分值来获取有序集合的其中一部分元素。
1) "b"
2) "2000"
127.0.0.1:6379> zrangebyscore bb 0 150 withscores
1) "a"
2) "20"
127.0.0.1:6379> zrem bb a		# 在移除有序集合元素的时候
(integer) 1									# 命令会返回被移除元素的数量
127.0.0.1:6379> zrem bb a
(integer) 0
127.0.0.1:6379> zrange bb 0 -1 withscores
1) "b"
2) "2000"
~~~

### Redis命令列表

- [英文官方Redis命令列表](http://redis.io/commands)

### 常规操作命令

```js
exists key              //测试指定key是否存在，返回1表示存在，0不存在
del key1 key2 ....keyN //删除给定key,返回删除key的数目，0表示给定key都不存在
type key               //返回给定key的value类型。返回 none 表示不存在key,string字符类型，list 链表类型 set 无序集合类型...
keys pattern           //返回匹配指定模式的所有key,下面给个例子
randomkey              //返回从当前数据库中随机选择的一个key,如果当前数据库是空的，返回空串
rename oldkey newkey   //原子的重命名一个key,如果newkey存在，将会被覆盖，返回1表示成功，0失败。可能是oldkey不存在或者和newkey相同
renamenx oldkey newkey //同上，但是如果newkey存在返回失败
dbsize                 //返回当前数据库的key数量
expire key seconds     //为key指定过期时间，单位是秒。返回1成功，0表示key已经设置过过期时间或者不存在
ttl key                //返回设置过过期时间的key的剩余过期秒数 -1表示key不存在或者没有设置过过期时间
select db-index        //通过索引选择数据库，默认连接的数据库所有是0,默认数据库数是16个。返回1表示成功，0失败
move key db-index      //将key从当前数据库移动到指定数据库。返回1成功。0 如果key不存在，或者已经在指定数据库中
flushdb                //删除当前数据库中所有key,此方法不会失败。慎用
flushall               //删除所有数据库中的所有key，此方法不会失败。更加慎用
```

 

### string 类型数据操作命令

```js
set key value         //设置key对应的值为string类型的value,返回1表示成功，0失败
setnx key value       //同上，如果key已经存在，返回0 。nx 是not exist的意思
get key               //获取key对应的string值,如果key不存在返回nil
getset key value      //原子的设置key的值，并返回key的旧值。如果key不存在返回nil
mget key1 key2 ... keyN            //一次获取多个key的值，如果对应key不存在，则对应返回nil。下面是个实验,首先清空当前数据库，然后设置k1,k2.获取时k3对应返回nil
mset key1 value1 ... keyN valueN   //一次设置多个key的值，成功返回1表示所有的值都设置了，失败返回0表示没有任何值被设置
msetnx key1 value1 ... keyN valueN //同上，但是不会覆盖已经存在的key
incr key              //对key的值做加加操作,并返回新的值。注意incr一个不是int的value会返回错误，incr一个不存在的key，则设置key为1
decr key              //同上，但是做的是减减操作，decr一个不存在key，则设置key为-1
incrby key integer    //同incr，加指定值 ，key不存在时候会设置key，并认为原来的value是 0
decrby key integer    //同decr，减指定值。decrby完全是为了可读性，我们完全可以通过incrby一个负值来实现同样效果，反之一样。
append key value      //给指定key的字符串值追加value,返回新字符串值的长度。下面给个例子
substr key start end  //返回截取过的key的字符串值,注意并不修改key的值。下标是从0开始的，接着上面例子
```

 

### list 类型数据操作命令

```js
lpush key string          //在key对应list的头部添加字符串元素，返回1表示成功，0表示key存在且不是list类型
rpush key string          //同上，在尾部添加
llen key                  //返回key对应list的长度，key不存在返回0,如果key对应类型不是list返回错误
lrange key start end      //返回指定区间内的元素，下标从0开始，负值表示从后面计算，-1表示倒数第一个元素 ，key不存在返回空列表
ltrim key start end       //截取list，保留指定区间内元素，成功返回1，key不存在返回错误
lset key index value      //设置list中指定下标的元素值，成功返回1，key或者下标不存在返回错误
lrem key count value      //从key对应list中删除count个和value相同的元素。count为0时候删除全部
lpop key                  //从list的头部删除元素，并返回删除元素。如果key对应list不存在或者是空返回nil，如果key对应值不是list返回错误
rpop                      //同上，但是从尾部删除
blpop key1...keyN timeout //从左到右扫描返回对第一个非空list进行lpop操作并返回，比如blpop list1 list2 list3 0 ,如果list不存在list2,list3都是非空则对list2做lpop并返回从list2中删除的元素。如果所有的list都是空或不存在，则会阻塞timeout秒，timeout为0表示一直阻塞。当阻塞时，如果有client对key1...keyN中的任意key进行push操作，则第一在这个key上被阻塞的client会立即返回。如果超时发生，则返回nil。有点像unix的select或者poll
brpop                     //同blpop，一个是从头部删除一个是从尾部删除
rpoplpush srckey destkey  //从srckey对应list的尾部移除元素并添加到destkey对应list的头部,最后返回被移除的元素值，整个操作是原子的.如果srckey是空或者不存在返回nil
```

 

### set 类型数据操作命令

```js
sadd key member                //添加一个string元素到,key对应的set集合中，成功返回1,如果元素以及在集合中返回0,key对应的set不存在返回错误
srem key member                //从key对应set中移除给定元素，成功返回1，如果member在集合中不存在或者key不存在返回0，如果key对应的不是set类型的值返回错误
spop key                       //删除并返回key对应set中随机的一个元素,如果set是空或者key不存在返回nil
srandmember key                //同spop，随机取set中的一个元素，但是不删除元素
smove srckey dstkey member     //从srckey对应set中移除member并添加到dstkey对应set中，整个操作是原子的。成功返回1,如果member在srckey中不存在返回0，如果key不是set类型返回错误
scard key                      //返回set的元素个数，如果set是空或者key不存在返回0
sismember key member           //判断member是否在set中，存在返回1，0表示不存在或者key不存在
sinter key1 key2...keyN        //返回所有给定key的交集
sinterstore dstkey key1...keyN //同sinter，但是会同时将交集存到dstkey下
sunion key1 key2...keyN        //返回所有给定key的并集sunionstore dstkey key1...keyN //同sunion，并同时保存并集到dstkey下
sdiff key1 key2...keyN         //返回所有给定key的差集sdiffstore dstkey key1...keyN  //同sdiff，并同时保存差集到dstkey下
smembers key                   //返回key对应set的所有元素，结果是无序的
```

 

### sorted set 类型数据操作命令

```js
zadd key score member        //添加元素到集合，元素在集合中存在则更新对应score
zrem key member              //删除指定元素，1表示成功，如果元素不存在返回0
zincrby key incr member      //增加对应member的score值，然后移动元素并保持skip list保持有序。返回更新后的score值
zrank key member             //返回指定元素在集合中的排名（下标）,集合中元素是按score从小到大排序的
zrevrank key member          //同上,但是集合中元素是按score从大到小排序
zrange key start end         //类似lrange操作从集合中去指定区间的元素。返回的是有序结果
zrevrange key start end      //同上，返回结果是按score逆序的
zrangebyscore key min max    //返回集合中score在给定区间的元素
zcount key min max           //返回集合中score在给定区间的数量
zcard key                    //返回集合中元素个数
zscore key element           //返回给定元素对应的score
zremrangebyrank key min max  //删除集合中排名在给定区间的元素
zremrangebyscore key min max //删除集合中score在给定区间的元素
```

 

### hash 类型数据操作命令

```js
hset key field value       //设置hash field为指定值，如果key不存在，则先创建
hget key field             //获取指定的hash field
hmget key filed1....fieldN //获取全部指定的hash filed
hmset key filed1 value1 ... filedN valueN //同时设置hash的多个field
hincrby key field integer  //将指定的hash filed 加上给定值
hexists key field          //测试指定field是否存在
hdel key field             //删除指定的hash field
hlen key                   //返回指定hash的field数量
hkeys key                  //返回hash的所有field
hvals key                  //返回hash的所有value
hgetall                    //返回hash的所有filed和value
```

