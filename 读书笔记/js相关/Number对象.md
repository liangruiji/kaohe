~~~js
{
EPSILON: 2.220446049250313e-16
MAX_SAFE_INTEGER: 9007199254740991
MAX_VALUE: 1.7976931348623157e+308
MIN_SAFE_INTEGER: -9007199254740991
MIN_VALUE: 5e-324
NEGATIVE_INFINITY: -Infinity
NaN: NaN
POSITIVE_INFINITY: Infinity
arguments: (...)
caller: (...)
isFinite: ƒ isFinite() // 判断是否是数字
isInteger: ƒ isInteger() // 判断是否是整数，是返回true
isNaN: ƒ isNaN() // 判断是否是NaN
isSafeInteger: ƒ isSafeInteger()//判断传入的参数值是否是一个“安全整数”
length: 1
name: "Number"
parseFloat: ƒ parseFloat()//把一个字符串解析成浮点数。该方法与全局的 parseFloat() 函数相同
parseInt: ƒ parseInt()
prototype: {
	constructor: ƒ Number()
	toExponential: ƒ toExponential() //返回该数值的指数表示法字符串形式
	toFixed: ƒ toFixed() // 保留几位小数，返回字符串
	toLocaleString: ƒ toLocaleString() // 返回这个数字在特定语言环境下表示的字符串，用于格式化数字
	toPrecision: ƒ toPrecision() // 保留几位有效数，返回字符串
	toString: ƒ toString() // 字符串表示形式,可加参数转化成其他进制数
	valueOf: ƒ valueOf()
	}
}
~~~

~~~js
var number = 3500;
console.log(number.toLocaleString()); 
// 3,500 
// 可以增加配置项格式化成各种语言环境下的表示字符串。
// 当格式化大量数字时，最好建立一个 NumberFormat 对象并且使用它提供的 NumberFormat.format 方法。
var a = [123456789, 987654321, 456789123];
var numberFormat = new Intl.NumberFormat()
var formatted = a.map(numberFormat.format);
// ['123,456,789','987,654,321','456,789,123']
~~~

