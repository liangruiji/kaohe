## 将某个值转换为String类型

### 1. value.toString()

toString()方法返回一个表示该对象的字符串

```js
var a = 123
a.toString() // '123'
```

### 2. "" + value

一元加法运算符的作用是数值求和，或者字符串拼接。有字符串，则是字符串拼接。其他是数字相加求和。

```js
var  a = 123
'' + a // '123'
```

### 3. String(value)

String函数将其他值转换为字符串

```js
var a  = 123
String(a) // 123
```

在value为 `null` 或者 `undefined`的时候，方法1不能工作。

方法2和方法3，功能基本相同。

## 将某个值转换为Number类型

### 1. +、-运算符  *1  -0  /  %等运算符

一元加法运算符将操作转换为Number类型。一元减法运算符将操作转换为Number类型并取反.

加法运算符的作用是数值求和，或者字符串拼接。有字符串，则是字符串拼接。其他是数字相加求和。

减法运算符使两个操作数相减，结果是它们的差值。

一元正号运算符位于其操作数前面，计算其操作数的数值，如果操作数不是一个数值，会尝试将其转换成一个数值。**一元正号是转换其他对象到数值的最快方法，比较推荐**，它不会对数值执行任何多余操作。

```js
// 一元加运算符

123 + 0 // 123

'123' + 0 // '123'

123 + true // 124

123 + fale // 123

// 一元正号

+3  // 3

+'3' // 3

+true // 1

+false // 0

+null // 0

+{} // NaN

+function(val){ return val; } // NaN
```

### 2. Number(value)

Number对象，可以用来执行类型转换。如果参数无法被转换为数字，则返回`NaN`

```js
Number( '123') // 123

Nuber('123abc') // NaN
```

### 3. parseInt(string, ! radix)

parseInt()函数解析一个字符串参数，并返回一个指定基数(进制数)的整数。`parseInt(string, radix)`，通常默认为十进制。如果被解析参数的第一个字符无法被转化成数类型，则返回`NaN`

```js
parseInt('123') // 123

parseInt('12.3') // 12

parseInt('123', 10) // 123

parseInt('123', 16)  // 291 

parseInt('123abc') // 123

parseInt('abc123') // NaN
```

### 4. parseFloat(value)

```js
parseFloat(value)`，解析一个字符串参数，返回浮点数。如果被解析参数的第一个字符无法被转化成数字，则返回`NaN
parseFloat('123') // 123

parseFloat('12.3') // 12.3

parseFloat('12.3abc') // 12.3

parseFloat('abc123') // NaN
```