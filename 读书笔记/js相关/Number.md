## number

1. 八进制表示
2. 十六进制表示
3. 科学计数法
4. Number.MIN_VALUE
5. Number.MAX_VALUE
6. (-)Infinity
7. NaN  唯一一个判断nan的函数
8. 3个数值转换的函数各自的转换规则

```
	Number();
	parseInt(str，！进制);//通常用这个
	parseFloat();
```

~~~js
1 / 3 === (1 - 2 / 3); // false
Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
~~~

比较两个浮点数是否相等，只能看他们两个的差值的绝对值是否小于某个阈值。

