code . 打开vscode

ctrl c 退出runs 或者yarn dev

com+t 新开iterm窗口

Navicat Premium 管理数据库

 cd ~ && cat .gitignore  有git默认不上传的

# require.context（）



 有些命令参数我也记不清楚详细的用途或者用法，

这时你可以通过--help来查看此命令参数的详细信息 git add --help

RegExp.$1是什么

JavaScript RegExp.$1
RegExp 是javascript中的一个内置对象。为正则表达式。
RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
例子:
var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)   
r.exec('1985-10-15');
s1=RegExp.$1;
s2=RegExp.$2;
s3=RegExp.$3;alert(s1+" "+s2+" "+s3)//结果为1985 10 15

正则的test()函数

- objReg.test(objStr)
  objReg 必选项 RegExp对象名称
  objStr 要进行匹配检测的字符串

该方法的返回值是布尔值，通过该值可以匹配字符串中是否存在于正则表达式相匹配的结果，如果有匹配内容，返回ture，如果没有匹配内容返回false，该方法常用于判断用户输入数据的合法性，比如检验Email的合法性substr() 方法可在字符串中抽取从 *start* 下标开始的指定数目的字符。

substr字符串方法

### 语法

```
stringObject.substr(start,length)
```

| 参数     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *start*  | 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。 |
| *length* | 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 *stringObject* 的开始位置到结尾的字串。 |

### 返回值

一个新的字符串