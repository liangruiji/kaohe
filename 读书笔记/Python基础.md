除法运算 (`/`) 永远返回浮点数类型，想得到一个整数结果（忽略小数部分）你可以使用 `//` 运算符

a[2]、a[-1]字符串索引

a[2:4] 字符串切片

可以用切片，拼接 + ，复制 *，可以跨行连续输入。一种方式是用三重引号：`"""..."""` 或 `'''...'''`

字符串索引过大会报错，而字符串切片则会自动处理，不报错

len(字符串)。返回字符串长度

列表用 [ ] 表示，也可以用切片，拼接 +

append(追加的新元素)方法 ， 给列表追加新元素

给切片赋值改变列表大小，内容，或者把列表整个清空

a[0:2]=[0,1]

len()方法 返回列表长度



多重赋值

~~~python
a,b=0,1
~~~

print()函数

```python
# print(打印的值1，！打印的值2)  可以打印多个值，值之间用空格隔开
print('The value of i is', '2')   #The value of i is 2

#关键字参数 end 可以用来取消输出后面的换行, 或是用另外一个字符串来结尾:
>>> a, b = 0, 1
>>> while a < 1000:
...     print(a, end=',')
...     a, b = b, a+b
...
0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,
```



控制流

#### if语句

~~~python
if x<0:
		x=100
elif x==0:
  	x=50
else x>0:
  	x=1
~~~

#### for语句

~~~python
>>> dog = ['big','small','mini']
#1.遍历列表 
>>> for a in dog:
...     print(a,len(a))
...
big 3
small 5
mini 4

#2.遍历数字序列 range()方法 生成算数级数 从0开始 一个参数时是长度，两个参数是开始值与结束值，三个参数是开始值、结束值、步进值
>>> for a in range(10):
...     print(a)
...
0
1
2
3
4
5
6
7
8
9
# 可以和len配合
>>> for a in range(len(dog)):
...     print(a,dog[a])
...
0 big
1 small
2 mini

~~~

#### `break` 和 `continue` 语句，以及循环中的 `else` 子句

1.break 语句 用于跳出最近的 for 或 while 循环.

~~~python

#break 语句，和 C 中的类似，用于跳出最近的 for 或 while 循环.
#循环语句可能带有 else 子句；它会在循环耗尽了可迭代对象 (使用 for) 或循环条件变为假值 (使用 while) 时被执行，但不会在循环被 break 语句终止时被执行。 

>>> for n in range(2,10):
...     for x in range(2,n):
...             if n%x==0:
...                    
...                     break
...     else:
...             print(n,'素数')
...
2 素数
3 素数
4 不是素数
5 素数
6 不是素数
7 素数
8 不是素数
9 不是素数

~~~

2.continue语句表示继续循环中的下一次迭代

#### 函数

关键字 [`def`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#def) 定义一个函数

~~~python
>>> def fib(n):
...			"""说明函数的的字符串，可有可无、被称为文档字符串"""
...     a,b=0,1
...     while a<n:
...             print(a,end=' ')
...             a,b=b,a+b
...
>>> fib(2000)
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597
~~~

函数体的第一个语句可以是字符串，用于说明函数

 [`in`](https://docs.python.org/zh-cn/3/reference/expressions.html#in) 关键字。它可以测试一个序列是否包含某个值

~~~python
>>> a = [1,2,3]
>>> 1 in a
True
>>> 5 in a
False
>>> 1 in (1,2)
True
~~~

函数的参数是在函数定义时计算的

~~~python
>>> i =5
>>> def a(c=i):
...     print(c)
...
>>> i=67
>>> a()
5
~~~

默认值只会执行一次

~~~python
#因为默认参数L给的默认值是一个地址，而且默认值赋值只执行一次，所以多次调用这个函数时，他们是共享这个地址上的参数L的
>>> def f(a,L=[]):
...     L.append(a)
...     return L
...
>>> a=f(1)
>>> b=f(2)
>>> c=f(3)
>>> print(a,b,c)
[1, 2, 3] [1, 2, 3] [1, 2, 3]
>>> f(4)
[1, 2, 3, 4]
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3, 4]
>>> c
[1, 2, 3, 4]
~~~

不想共享可以这样，先给一个不是地址的默认参数L，然后在里面把地址赋值给参数L就可以了

~~~python
>>> def f(a,L=None):
...     if L is None:
...             L=[]
...     L.append(a)
...     return L
...
>>> f(1)
[1]
>>> f(1)
[1]
>>> f(2)
[2]
~~~

关键字参数  必须跟随在位置参数的后面

~~~py
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
parrot('a thousand', state='pushing up the daisies')
~~~

*name是一个包含除了与已有形参列表以外的位置参数的 [元组](https://docs.python.org/zh-cn/3/tutorial/datastructures.html#tut-tuples) 的形参

**name 是一个包含除了与已有形参相对应的关键字参数以外的所有关键字参数字典

~~~python
# 多个实参变成形参元组或者形参字典
>>> def a(b,*c,**d):
...     for i in c:
...             print(i)
...     for n in d:
...             print(n,':',d[n])

>>> a(1,2,3,4,5,8,9,key='dd',jj='bb')
2
3
4
5
8
9
key
jj
>>>
~~~

默认情况下，函数的参数传递形式可以是位置参数或是显式的关键字参数。 为了确保可读性和运行效率，限制允许的参数传递形式是有意义的，这样开发者只需查看函数定义即可确定参数项是仅按位置、按位置也按关键字，还是仅按关键字传递。

~~~python
#   /之前为仅限位置参数， /之后为位置参数或者关键字参数，*之后为仅限关键字参数
def a(位置参数部分,/,位置参数或关键字参数部分,*,关键参数部分,)
~~~

#### 解包参数列表

当函数需要单独的参数，而实参又是一个元组或字典时，可以用解包参数，解包元组用 *元组 表示，解包字典用

**字典 表示

~~~python
#  从列表或元组中解包参数
>>> list(range(3, 6)) 
[3, 4, 5]
>>> args = [3, 6]
>>> list(range(*args))  
[3, 4, 5]
#  从字典中解包参数
>>> def parrot(voltage, state='a stiff', action='voom'):
...     print("-- This parrot wouldn't", action, end=' ')
...     print("if you put", voltage, "volts through it.", end=' ')
...     print("E's", state, "!")
...
>>> d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
>>> parrot(**d)
-- This parrot wouldn't VOOM if you put four million volts through it. E's bleedin' demised !
~~~



列表的方法

列表数据类型还有很多的方法。这里是列表对象方法的清单：

- `list.``append`(*x*)

  在列表的末尾添加一个元素。相当于 `a[len(a):] = [x]` 。

- `list.``extend`(*iterable*)

  使用可迭代对象中的所有元素来扩展列表。相当于 `a[len(a):] = iterable` 。

- `list.``insert`(*i*, *x*)

  在给定的位置插入一个元素。第一个参数是要插入的元素的索引，所以 `a.insert(0, x)` 插入列表头部， `a.insert(len(a), x)` 等同于 `a.append(x)` 。

- `list.``remove`(*x*)

  移除列表中第一个值为 *x* 的元素。如果没有这样的元素，则抛出 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError) 异常。

- `list.``pop`([*i*])

  删除列表中给定位置的元素并返回它。如果没有给定位置，`a.pop()` 将会删除并返回列表中的最后一个元素。（ 方法签名中 *i* 两边的方括号表示这个参数是可选的，而不是要你输入方括号。你会在 Python 参考库中经常看到这种表示方法)。

- `list.``clear`()

  删除列表中所有的元素。相当于 `del a[:]` 。

- `list.``index`(*x*[, *start*[, *end*]])

  返回列表中第一个值为 *x* 的元素的从零开始的索引。如果没有这样的元素将会抛出 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError) 异常。可选参数 *start* 和 *end* 是切片符号，用于将搜索限制为列表的特定子序列。返回的索引是相对于整个序列的开始计算的，而不是 *start* 参数。

- `list.``count`(*x*)

  返回元素 *x* 在列表中出现的次数。

- `list.``sort`(*key=None*, *reverse=False*)

  对列表中的元素进行排序（参数可用于自定义排序，解释请参见 [`sorted()`](https://docs.python.org/zh-cn/3/library/functions.html#sorted)）。

- `list.``reverse`()

  反转列表中的元素。

- `list.``copy`()

  返回列表的一个浅拷贝。相当于 `a[:]` 。

  

#### 列表推导式的结构   [表达式 for语句和if语句]

~~~python
>>> [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

#而它等价于
>>>
>>> combs = []
>>> for x in [1,2,3]:
...     for y in [3,1,4]:
...         if x != y:
...             combs.append((x, y))
...
>>> combs
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

#注意在上面两个代码片段中， for 和 if 的顺序是相同的。
~~~

## `del` 语句

#### 序列

#### 元组：结构  ('好困'，"好困")   单个元素赋值是不允许的

```python
#元组的empty = ()
>>> empty = ()
>>> singleton = 'hello',    # <-- note trailing comma
>>> len(empty)
0
>>> len(singleton)
1
>>> singleton
('hello',)
```

#### 集合

集合是由不重复元素组成的无序的集。它的基本用法包括成员检测和消除重复元素。集合对象也支持像 联合，交集，差集，对称差分等数学运算。

花括号或 [`set()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#set) 函数可以用来创建集合。注意：要创建一个空集合你只能用 `set()` 而不能用 `{}`，因为后者是创建一个空字典，

~~~python
>>> a={'1',1,1,2,2,5,5,4,4}
>>> a
{'1', 2, 1, 4, 5}

>>> a= set('11112222999555')
>>> a
{'1', '5', '9', '2'}
~~~

#### 字典

理解字典的最好方式，就是将它看做是一个 *键: 值* 对的集合

字典主要的操作是使用关键字存储和解析值。也可以用 `del` 来删除一个键值对

对一个字典执行 `list(d)` 将返回包含该字典中所有键的列表，按插入次序排列 (如需其他排序，则要使用 `sorted(d)`)。要检查字典中是否存在一个特定键，可使用 [`in`](https://docs.python.org/zh-cn/3/reference/expressions.html#in) 关键字。

[`dict()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict) 构造函数可以直接从键值对序列里创建字典。

~~~
>>> dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{'sape': 4139, 'guido': 4127, 'jack': 4098}
~~~

当关键字是简单字符串时，有时直接通过关键字参数来指定键值对更方便

```
>>> dict(sape=4139, guido=4127, jack=4098)
{'sape': 4139, 'guido': 4127, 'jack': 4098}
```

##  循环的技巧

当在字典中循环时，用 `items()` 方法可将关键字和对应的值同时取出

\>>>

```
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.items():
...     print(k, v)
...
gallahad the pure
robin the brave
```

当在序列中循环时，用 [`enumerate()`](https://docs.python.org/zh-cn/3/library/functions.html#enumerate) 函数可以将索引位置和其对应的值同时取出

\>>>

```
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print(i, v)
...
0 tic
1 tac
2 toe
```

当同时在两个或更多序列中循环时，可以用 [`zip()`](https://docs.python.org/zh-cn/3/library/functions.html#zip) 函数将其内元素一一匹配。

\>>>

```
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.
```

当逆向循环一个序列时，先正向定位序列，然后调用 [`reversed()`](https://docs.python.org/zh-cn/3/library/functions.html#reversed) 函数

\>>>

```
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
9
7
5
3
1
```

如果要按某个指定顺序循环一个序列，可以用 [`sorted()`](https://docs.python.org/zh-cn/3/library/functions.html#sorted) 函数，它可以在不改动原序列的基础上返回一个新的排好序的序列

\>>>

```
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for i in sorted(basket):
...     print(i)
...
apple
apple
banana
orange
orange
pear
```

对一个序列使用 [`set()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#set) 将去除重复的元素。 对一个序列使用 [`sorted()`](https://docs.python.org/zh-cn/3/library/functions.html#sorted) 加 [`set()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#set) 则是按排序后顺序循环遍历序列中唯一元素的一种惯用方式。

\>>>

```
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print(f)
...
apple
banana
orange
pear
```

有时可能会想在循环时修改列表内容，一般来说改为创建一个新列表是比较简单且安全的

\>>>

```
>>> import math
>>> raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
>>> filtered_data = []
>>> for value in raw_data:
...     if not math.isnan(value):
...         filtered_data.append(value)
...
>>> filtered_data
[56.2, 51.7, 55.3, 52.5, 47.8]
```



In

not in

is

not is

and

or

比较操作符

#### 导入模块的方式

~~~python
import a
a.dosomething()
b=a.dosomething
b()

from a import dosomething,work
dosomething()
work()

from a import dosomething as do
do()

~~~

`type`函数返回一个对象的类型

`id()`函数返回任意不同种类对象的唯一ID，举个例子：

#### dir()函数

##### dir()函数用于查找模块定义的名称。 它返回一个排序过的字符串列表，列出了一个对象所拥有的属性和方法

~~~python
dir(a)
['__name__', 'dosomething', 'work']
~~~

如果没有参数，[`dir()`](https://docs.python.org/zh-cn/3/library/functions.html#dir) 会列出你当前定义的名称:

~~~python
>>> a = [1, 2, 3, 4, 5]
>>> from a import dosomething,work
>>> dir()
['__builtins__', '__name__', 'a', 'dosomething', 'work']
~~~

[`dir()`](https://docs.python.org/zh-cn/3/library/functions.html#dir) 不会列出内置函数和变量的名称。如果你想要这些，它们的定义是在标准模块 [`builtins`](https://docs.python.org/zh-cn/3/library/builtins.html#module-builtins) 中:

~~~python
>>> import builtins
>>> dir(builtins) 
~~~

#### 格式化字符串字面量

要使用 [格式化字符串字面值](https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#tut-f-strings) ，请在字符串的开始引号或三引号之前加上一个 `f` 或 `F` 。在此字符串中，你可以在 `{` a`}` 字符之间写可以引用的变量或字面值的 Python 表达式

~~~python
>>> a
{'b': 1, 'c': 2}
>>> f'a is {a}'
"a is {'b': 1, 'c': 2}"
~~~

#### 字符串的 [`str.format()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.format) 方法     '{}'.format(a) 大括号会被变量a的内容代替,

~~~python
>>> a=42572654
>>> b=43132495
>>> c=a/(a=b)
>>> c=a/(a+b)

>>> '{}:{}'.format(a,c)
'42572654:0.496733912684756'

>>> '{}:{:.2}'.format(a,c)
'42572654:0.5'

>>> '{}:{:.2%}'.format(a,c)
'42572654:49.67%'

#可用序号，format没用关键字参数时，只能用序号表示
'0.4967339126847560.496733912684756'
>>> '{0}:{1:.2%}'.format(a,c)
'42572654:49.67%'
>>> '{1:.2%}:{0}'.format(a,c)
'49.67%:42572654'

#format用关键字参数，则{}里可用关键字参数名代表，format没用关键字参数时，只能用序号表示
>>> '{c:.2%}:{a}'.format(a=a,c=c)
'49.67%:42572654'
>>> '{a}:{c:.2%}'.format(a=a,c=c)
'42572654:49.67%'

#可传字典并使用方括号 '[]' 访问键来完成
>>> table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
>>> print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; '
...       'Dcab: {0[Dcab]:d}'.format(table))
Jack: 4098; Sjoerd: 4127; Dcab: 8637678
      
#可以通过使用 '**' 符号将 table 作为关键字参数传递。
>>> table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
>>> print('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}'.format(**table))
Jack: 4098; Sjoerd: 4127; Dcab: 8637678
~~~

#### 旧的字符串格式化方法

% 运算符（求余）也可用于字符串格式化。 给定 `'string' % values`，则 `string` 中的 `%` 实例会以零个或多个 `values` 元素替换。 此操作通常被称为字符串插值。

##### repr()和str()

当你不需要花哨的输出而只是想快速显示某些变量以进行调试时，可以使用 [`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr) or [`str()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#str) 函数将任何值转化为字符串。

~~~python
# 格式化字符串
>>> for x in range(1, 11):
...     print('{0:2d} {1:3d} {2:4d}'.format(x, x*x, x*x*x))
...
 1   1    1
 2   4    8
 3   9   27
 4  16   64
 5  25  125
 6  36  216
 7  49  343
 8  64  512
 9  81  729
10 100 1000
# 手动格式化字符串
# 字符串对象的 str.rjust(给定的宽度，！填充的字符串) 方法通过在左侧填充字符串来对给定宽度的字段中的字符串进行右对齐。
>>> for x in range(1, 11):
...     print(repr(x).rjust(2,'*'), repr(x*x).rjust(3,'*'), end=' ')
...     print(repr(x*x*x).rjust(4,'*'))
...
*1 **1 ***1
*2 **4 ***8
*3 **9 **27
*4 *16 **64
*5 *25 *125
*6 *36 *216
*7 *49 *343
*8 *64 *512
*9 *81 *729
10 100 1000

~~~

#### 读写文件

open()方法返回一个文件对象，常用的两个参数：open(文件名字符串，！文件使用方式)

~~~
>>> f = open('workfile', 'w')
~~~



第一个参数是包含文件名的字符串。第二个参数是另一个字符串，其中包含一些描述文件使用方式的字符。*mode* 可以是 `'r'` ，表示文件只能读取，`'w'` 表示只能写入（已存在的同名文件会被删除），还有 `'a'` 表示打开文件以追加内容；任何写入的数据会自动添加到文件的末尾。`'r+'` 表示打开文件进行读写。*mode* 参数是可选的；省略时默认为 `'r'`。

在处理文件对象时，最好使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 关键字。

~~~
>>> with open('workfile') as f:
...     read_data = f.read()

>>> # We can check that the file has been automatically closed.
>>> f.closed
True
~~~

如果你没有使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 关键字，那么你应该调用 `f.close()` 来关闭文件并立即释放它使用的所有系统资源。

#### 文件对象的方法

 `f.read(size)`   读取文件内容

 要读取文件内容，请调用 `f.read(size)`，它会读取一些数据并将其作为字符串（在文本模式下）或字节串对象（在二进制模式下）返回。 *size* 是一个可选的数值参数。 当 *size* 被省略或者为负数时，将读取并返回整个文件的内容；当取其他值时，将读取并返回至多 *size* 个字符（在文本模式下）或 *size* 个字节（在二进制模式下）。 如果已到达文件末尾，`f.read()` 将返回一个空字符串 (`''`)。

~~~
>>> f.read()
'This is the entire file.\n'
>>> f.read()
''
~~~



`f.readline()`  读取一行

`f.readline()` 从文件中读取一行；换行符（`\n`）留在字符串的末尾，如果文件不以换行符结尾，则在文件的最后一行省略。这使得返回值明确无误；如果 `f.readline()` 返回一个空的字符串，则表示已经到达了文件末尾，而空行使用 `'\n'` 表示，该字符串只包含一个换行符。:

```
>>> f.readline()
'This is the first line of the file.\n'
>>> f.readline()
'Second line of the file\n'
>>> f.readline()
''
```

要从文件中读取行，你可以循环遍历文件对象。这是内存高效，快速的，并简化代码:

```
>>> for line in f:
...     print(line, end='')
...
This is the first line of the file.
Second line of the file
```

如果你想以列表的形式读取文件中的所有行，你也可以使用 `list(f)` 或 `f.readlines()`。

`f.write(string)` 会把 *string* 的内容写入到文件中，并返回写入的字符数。:

```
>>> f.write('This is a test\n')
15
```

在写入其他类型的对象之前，需要先把它们转化为字符串（在文本模式下）或者字节对象（在二进制模式下）:

```
>>> value = ('the answer', 42)
>>> s = str(value)  # convert the tuple to string
>>> f.write(s)
18
```

`f.tell()` 返回一个整数，给出文件对象在文件中的当前位置，表示为二进制模式下时从文件开始的字节数，以及文本模式下的意义不明的数字。

要改变文件对象的位置，请使用 `f.seek(offset, whence)`。 通过向一个参考点添加 *offset* 来计算位置；参考点由 *whence* 参数指定。 *whence* 的 0 值表示从文件开头起算，1 表示使用当前文件位置，2 表示使用文件末尾作为参考点。 *whence* 如果省略则默认值为 0，即使用文件开头作为参考点。

```
>>> f = open('workfile', 'rb+')
>>> f.write(b'0123456789abcdef')
16
>>> f.seek(5)      # Go to the 6th byte in the file
5
>>> f.read(1)
b'5'
>>> f.seek(-3, 2)  # Go to the 3rd byte before the end
13
>>> f.read(1)
b'd'
```

### 使用 [`json`](https://docs.python.org/zh-cn/3/library/json.html#module-json) 保存结构化数据

如果你有一个对象 `x` ，你可以用一行简单的代码来查看它的 JSON 字符串表示:

```
>>> import json
>>> json.dumps([1, 'simple', 'list'])
'[1, "simple", "list"]'
```

[`dumps()`](https://docs.python.org/zh-cn/3/library/json.html#json.dumps) 函数的另一个变体叫做 [`dump()`](https://docs.python.org/zh-cn/3/library/json.html#json.dump) ，它只是将对象序列化为 [text file](https://docs.python.org/zh-cn/3/glossary.html#term-text-file) 。因此，如果 `f` 是一个 [text file](https://docs.python.org/zh-cn/3/glossary.html#term-text-file) 对象，我们可以这样做:

```
json.dump(x, f)
```

要再次解码对象，如果 `f` 是一个打开的以供阅读的 [text file](https://docs.python.org/zh-cn/3/glossary.html#term-text-file) 对象:

```
x = json.load(f)
```



## 错误和异常

 目前（至少）有两种可区分的错误：*语法错误* 和 *异常*。

#### 语法错误

~~~
>>> for a in b
File "<stdin>", line 1
    for a in b
             ^
SyntaxError: invalid syntax
>>>
~~~

解析器会输出出现语法错误的那一行，并显示一个“箭头”，指向这行里面检测到的第一个错误。

文件名和行号也会被输出，以便输入来自脚本文件时你能知道去哪检查。File "<stdin>", line 1

P

~~~
>>> 10 * (1/0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
>>> 4 + spam*3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'spam' is not defined
>>> '2' + 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Can't convert 'int' object to str implicitly
~~~

错误信息的最后一行告诉我们程序遇到了什么类型的错误。

作用域与命名空间例子

~~~python
这个例子演示了如何引用不同作用域和名称空间，以及 global 和 nonlocal 会如何影响变量绑定:

def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)
示例代码的输出是：

After local assignment: test spam
After nonlocal assignment: nonlocal spam
After global assignment: nonlocal spam
In global scope: global spam
请注意 局部 赋值（这是默认状态）不会改变 scope_test 对 spam 的绑定。 nonlocal 赋值会改变 scope_test 对 spam 的绑定，而 global 赋值会改变模块层级的绑定。
~~~

类

#### 定义类

~~~python
class a:
		"""说明"""
		def __init__(self,b,c):#实例化时会被调用__init__，平时调用a时不会
				self.i=b
				self.p=c
		
		i=25
		def f(self):
				return True

f=a(100,5) #实例对象，这时会调用__init__方法
f.i=100
f.p=5
~~~

类对象支持两种操作：属性引用和实例化

 实例对象理解的唯一操作是属性引用。 有两种有效的属性名称：数据属性和方法。

实例变量用于每个实例的唯一数据，而类变量用于类的所有实例共享的属性和方法

方法的第一个参数常常被命名为 `self`,表示自身

#### 继承

```
class DerivedClassName(BaseClassName):
#多重继承
class DerivedClassName(Base1, Base2, Base3):
```



#### 三元运算符

~~~python
#如果条件为真，返回真 否则返回假
condition_is_true if condition else condition_is_false
#例子
is_fat = True
state = "fat" if is_fat else "not fat"

#另一个晦涩一点的用法比较少见，它使用了元组，请继续看：
伪代码:
#(返回假，返回真)[真或假]
(if_test_is_false, if_test_is_true)[test]
例子
fat = True
fitness = ("skinny", "fat")[fat]
print("Ali is", fitness)
#输出: Ali is fat

#这之所以能正常工作，是因为在Python中，True等于1，而False等于0，这就相当于在元组中使用0和1来选取数据。
~~~

#### lambdab表达式

`lambda`表达式是一行函数。

它们在其他语言中也被称为匿名函数

**原型**

```
    lambda 参数:操作(参数)
```

**例子**

```
    add = lambda x, y: x + y

    print(add(3, 5))
    # Output: 8
```

**列表排序**

```
    a = [(1, 2), (4, 1), (9, 10), (13, -3)]
    a.sort(key=lambda x: x[1])


    print(a)
    # Output: [(13, -3), (4, 1), (1, 2), (9, 10)]
```

**列表并行排序**

```
    data = zip(list1, list2)
    data = sorted(data)
    list1, list2 = map(lambda t: list(t), zip(*data))
```

#### for else语句的使用

#### 推导式

列表推导式

字典推导式

集合推导式

有些人甚至更喜欢使用它而不是`filter`函数。 列表推导式在有些情况下超赞，特别是当你需要使用`for`循环来生成一个新列表。举个例子，你通常会这样做：

```
squared = []
for x in range(10):
    squared.append(x**2)
```

你可以使用列表推导式来简化它，就像这样：

```
squared = [x**2 for x in range(10)]
```

#### 正则模块

##### 正则表达式元字符说明：

```python
.    匹配除换行符以外的任意字符
^    匹配字符串的开始
$    匹配字符串的结束
[]   用来匹配一个指定的字符类别
？   对于前一个字符字符重复0次到1次
*    对于前一个字符重复0次到无穷次
{}   对于前一个字符重复m次
{m，n} 对前一个字符重复为m到n次
\d   匹配数字，相当于[0-9]
\D   匹配任何非数字字符，相当于[^0-9]
\s   匹配任意的空白符，相当于[ fv]
\S   匹配任何非空白字符，相当于[^ fv]
\w   匹配任何字母数字字符，相当于[a-zA-Z0-9_]
\W   匹配任何非字母数字字符，相当于[^a-zA-Z0-9_]
\b   匹配单词的开始或结束
```

##### 导入正则表达式模块

###### 导入正则表达式模块

```python
>>> import  re
```

###### 查看正则表达式模块方法

```python
>>> dir(re)
```

##### 正则表达式处理函数

###### 1.re.search

   re.search 函数会在字符串内查找模式匹配，只到找到第一个匹配然后返回，如果字符串没有匹配，则返回None。

 提示：当我们不会用模块方法的时候用help

```python
>>> help(re.search)
search(pattern, string, flags=0)
```

  第一个参数：规则
  第二个参数：表示要匹配的字符串
  第三个参数：标致位，用于控制正则表达式的匹配方式
  实例：下面的例子kuangl 

###### 2.re.match

  re.match 尝试从字符串的开始匹配一个模式，也等于说是匹配第一个单词

###### 3.re.findall

  re.findall 在目标字符串查找符合规则的字符串

###### 4.re.sub

  re.sub 用于替换字符串的匹配项

###### 5.re.split

  re.split 用于来分割字符串

###### 6.re.compile

  re.compile 可以把正则表达式编译成一个正则对象

##### 用urllib2、re、os 模块下载文件的脚本

```python
#!/usr/bin/env python
import urllib2
import re
import os
URL='http://p_w_picpath.baidu.com/channel/wallpaper'
read=urllib2.urlopen(URL).read()
pat =  re.compile(r'src="http://.+?.js">')
urls=re.findall(pat,read)
for i in urls:
url= i.replace('src="','').replace('">','')
try:
iread=urllib2.urlopen(url).read()
name=os.path.basename(url)
with open(name,'wb') as jsname:
jsname.write(iread)
except:
print url,"url error"
```

#### 装饰器

假设我们要增强`now()`函数的功能，比如，在函数调用前后自动打印日志，但又不希望修改`now()`函数的定义，这种在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）。

本质上，decorator就是一个返回函数的高阶函数。所以，我们要定义一个能打印日志的decorator，可以定义如下：

```
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

观察上面的`log`，因为它是一个decorator，所以接受一个函数作为参数，并返回一个函数。我们要借助Python的@语法，把decorator置于函数的定义处：

```
@log
def now():
    print('2015-3-25')
```

调用`now()`函数，不仅会运行`now()`函数本身，还会在运行`now()`函数前打印一行日志：

```
>>> now()
call now():
2015-3-25
```

把`@log`放到`now()`函数的定义处，相当于执行了语句：

```
now = log(now)
```

由于`log()`是一个decorator，返回一个函数，所以，原来的`now()`函数仍然存在，只是现在同名的`now`变量指向了新的函数，于是调用`now()`将执行新函数，即在`log()`函数中返回的`wrapper()`函数。

`wrapper()`函数的参数定义是`(*args, **kw)`，因此，`wrapper()`函数可以接受任意参数的调用。在`wrapper()`函数内，首先打印日志，再紧接着调用原始函数。

###### decorator本身需要传入参数时：

