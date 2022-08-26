##### Number.isFinite() 

检查变量是否为数字，还检查其是否为**有限值**。 因此，对于`NaN`，`Infinity`或`-Infinity`的数字，它返回`false`。

特殊的非有限数以及非数字类型的任何变量都会被忽略。所以，如果你想检查一个变量是否是一个数字，最好的方法是使用`Number.isFinite()`函数。

~~~js
Number.isFinite(14)
// true
Number.isFinite(NaN)
// false
~~~



##### typeof 操作符

~~~js
typeof 55
// 'number'
typeof NaN
// 'number'
~~~



##### 正则表达



##### Number.isNaN()  注意和全局isNaN()函数是不同的

仅在我们知道变量为数字并且需要验证它是否为`NaN`时才适用。

~~~js
Number.isNaN(NaN)
// true
~~~

