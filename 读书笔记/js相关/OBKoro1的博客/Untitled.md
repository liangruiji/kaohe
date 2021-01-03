[TOC]

https://juejin.cn/post/6844904017013768200#heading-6

# 一篇文章搞定javascript中的字符串

一篇文章搞定javascript中的字符串

字符串作为javascript的基本类型之一，其创建方式有两种，第一种是`var str = "this is javascript String Article"`或者`var str = String(" this is javascript String Article")`都可以 ,这里可以使用“”或者‘’都可以，javascript中不区分单，双引号，这种创建出来的字符串是属于基本字符串。第二种是使用 new String()来创建的，`var str = new String("this is javascript String Article")` ，这种创建出来的字符串属于字符串对象，二者是有区别的。

> ##### 基本字符串和字符串对象的区别
>
> 字符串字面量（通过单引号和双引号创建）和直接调用String方法（没有使用new关键字）的字符串都属于基本字符串，使用new String创建出来的字符串属于字符串对象。javascript中会自动将基本字符串转换成字符串对象，因为基本字符串是没有字符串的一些操作方法，只有将基本字符串转换成字符串对象的时候才可以使用字符串对象的方法，这一内置默认转换我们平时不注意而已。下面看一段创建代码：

```
var str1 = "this is javascript string";
var str2 = new String("this is javascript string");
console.log(typeof str1);      //	"string"
console.log(typeof str2);      //  "object"
复制代码
```

当使用到字符串对象的eval方法的时候，二者有时也会产生不同的结果，eval(string)函数是计算字符串的，只接受原始的字符串作为参数进行计算，如果传入的参数是字符串对象的话，则会不做任何改变的返回。看看下面一段代码的返回结果：

```
var str1 = "2 + 2";
var str2 = new String("2 + 2");
console.log(eval(str1));    //4
console.log(eval(str2));    // string {"2 + 2"}
复制代码
```

基于上面的原因，当一段代码需要传入基本字符串的时候却传入了字符串对象的时候会导致报错；那是不是我们一开始创建成字符串对象之后就没法使用eval()了呢，当然是有方法的，我们可以利用valueOf()方法将javascript的字符串对象转换成基本字符串，然后再使用eval()就可以得到我们想要的结果了：

```
var str2 = new String("2 + 2");
console.log(eval(str2.valueOf()));      //4
复制代码
```

上面基于javascript 的字符串的创建讲了两种方法以及区别，和不同情况下产生的结果进行了分析，下面讲述一些字符串相关的方法：

#### 1.字符方法

访问字符串特定位置字符的方法有两个：charAt()和charCodeAt(),个人小理解就是at在什么位置，也就是在字符串中的位置的返回值，

charAt():是以单字符字符串的形式返回指定位置的结果:

```
var str = "i am learning javscript";
console.log(str.charAt(8));   // "r"
复制代码
```

charCodeAt():先得到指定位置的字符，然后在转换成这个字符在ASCLL码的值。

```
var str = "i am learning javscript";
console.log(str.charCodeAt(8));   // 114
复制代码
```

在ECMAScript 5中还出了一个方法：可以使用[]加数字索引来返回指定位置的字符，目前出国IE7以下不支持，会返回undefined之外，其余浏览器都支持。

```
var str = "i am learning javscript";
console.log(str[5]);     //"l"
复制代码
```

#### 2.字符串操作方法

字符串操作的方法有很多，一一介绍如下：

concat():连接，顾名思义就是把字符串拼接到一起，返回的是拼接后的字符串,不会改变原来的字符串，参数可以是一个也可以是多个。

```
var str1 = "hello ";
var str2 = "javacript string";
var str3 = str1.concat(str2);      
console.log(str3);          //"hello javacript string"
console.log(str1);			//"hello "
console.log(str2);			//"javascript string"
console.log(str3.concat(str1,str2));   //hello javacript stringhello javacript string
复制代码
```

虽然concat()是String内置的方法，但是我们平时在工作中为了写法方便大多数情况下使用+号拼接；javascript还提供了三个基于子字符串返回新字符串的方法：slice(),substr(),substring(),都接受一个或者两个参数，这三个方法均不会改变原先字符串，只是生成了一个新的字符串。但是：

slice()和substring()的第一个参数是指定子字符串的开始的位置，第二个参数是子字符串结束的位置，如果不不指定默认到字符串结尾。

```
var str = "javascript string is important!";
console.log(str.slice(3,13));   	//"ascript st"
console.log(str.substring(4,8));  	//"scri"
console.log(str.slice(3));        	//"ascript string is important!"
console.log(str.substring(6));		//"ript string is important!"
复制代码
```

substr()的第一个参数也是子字符串的开始的位置，第二个参数是返回的字符的个数，即子字符串的长度。如果第二个参数不传则将字符串的长度作为结束位置,如果掺入的第二个参数大于字符串的长度的话，则按照字符串的长度来算。

```
var str = "javascript string is important!";
console.log(str.substr(8,8));		//"pt strin"
console.log(str.substr(8));			//"pt string is important!"
console.log(str.substr(8,30));		//"pt string is important!"
复制代码
```

上面介绍了所有的参数是正数的时候，但是当参数是负数的时候，结果就完全不一样了：

slice()会将负参数与字符串的长度相加，然后按照正数的方式相加：

```
var str = "javascript string is important!";
console.log(str.slice(-4));			//"ant!"
console.log(str.slice(6,-8));		//"ript string is im"
console.log(str.slice(-6,-8));      //没值
复制代码
```

首先：字符串的长度是31,31+（-4） =27，所以第一个console其实就是str.slice(27),以此类推第二个是str.slice(6,23),第三个str.slice(25,23),所以在字符串中找不到。

substr()会将第一个参数与长度相加，第二个参数置位0

```
var str = "javascript string is important!";
console.log(str.substr(-4));			//"ant!"
console.log(str.substr(6,-8));		//没值
console.log(str.substr(-6,-8));      //没值
复制代码
```

首先：第一个console就是sub.substr(27),第二个就是str.substr(6,0);第三个就是str.substr(25,0)

substring()会将所有的参数都置为0,如果第一个参数比第二个参数大的话则会调换位置

```
var str = "javascript string is important!";
console.log(str.substring(-4));			//"javascript string is important!"
console.log(str.substring(6,-8));		//"javasc"
console.log(str.substring(-6,-8));      //没值
复制代码
```

首先：第一个str.substring(0),第二个str.substring(6,0),调换位置等于str.substring(0,6)第三个str.substring(0,0)。

#### 3.字符串位置的方法

javascript提供了两个查找字符串位置的方法，indexOf()和lastIndexOf(),这两个方法都是搜索指定字符在字符串中的位置，如果没有找到，则返回-1。如果指定字符在字符串中只出现一次的话，那么indexOf和lastIndexOf返回的值是相等的。

indexOf()从前向后查找，indexOf(char,index),第一个参数代表要搜索的字符，第二个参数可选，代表从哪个位置开始向后查找，如果没有的话，默认从零开始，不管是否有第二个参数，查找到的值也是相对于0进行计算的。

```
var str = "Spring is here, everything is recovering";
console.log(str.indexOf('v')); 				//17
console.log(str.indexOf('e',10));			//11
复制代码
```

lastIndexOf()是从后向前查找，也接受两个参数，第一个参数代表要搜索的字符，第二个参数代表从哪个位置开始向前查找，返回的值也是相对于0进行计算的。

```
var str = "Spring is here, everything is recovering";
console.log(str.lastIndexOf('v'));			//34
console.log(str.lastIndexOf('e',10));		//-1
复制代码
```

一般的面试题可能问到给定一串字符串，让找到所有的指定的字符，我们就可以利用循环indexOf()或lastIndexOf()来进行处理。看看下面的例子

```
function getAllChar(str,char){
    let charArr = [];
    let position = str.indexOf(char);
    //第一种while循环
    //while(position > -1){
    //    charArr.push(position);
     //  position = str.indexOf(char,position+1); //从当前位置的下一个位置继续查找
    //};
    
    //第二种for循环
    for(let i = 0; i<str.length;i++){
        if(position  == -1) continue; 
        charArr.push(position);
        position = str.indexOf(char,position+1);
    }
    return charArr;
};
getAllChar("Spring is here, everything is recovering",'e');
//[11, 13, 16, 18, 31, 35]
复制代码
```

#### 4.trim()方法

trim()相对比较好记，删除当前字符串中的前后空格，返回一个字符串副本，即一个新的字符串，不会改变原始字符串。

```
var str = "    this is javascript   ";
console.log(str.trim()); 			//"this is javascript"
console.log(str);					//"    this is javascript   "
复制代码
```

此外，firefox 3.5+,safari 5+,chrome 8+ 还支持trimLeft()和trimRight()，表示只删除左边的空格或右边的空格。

```
var str = "    this is javascript   ";
console.log(str.trimLeft()); 			//"this is javascript   "
console.log(str.trimRight());			//"    this is javascript"
复制代码
```

#### 5.字符串大小写转换的方法

javascript中提供了4个供字符串进行大小写转换的方法，分别是：toUpperCase()和toLocaleUpperCase(),全部转换成大写，toLowerCase()和toLocaleLowerCase(),全部转换成小写，其中，toUpperCase和toLowerCase是经典方法，借鉴java.lang.String,而toLocaleUpperCase和toLocaleLowerCase()则是针对特定的地区的转换方法，有的地方会字符串的Unicode大小写转化有着不同的规则，可能得到的结果不同，一般情况下，在不清楚自己的代码哪个环境下出现的时候则使用针对地区的方法。

```
var str = "heLLO, My Name Is Majianwen";
console.log(str.toUpperCase());   				//"HELLO, MY NAME IS MAJIANWEN"
console.log(str.toLocaleUpperCase());			//"HELLO, MY NAME IS MAJIANWEN"
console.log(str.toLowerCase());					//"hello, my name is majianwen"
console.log(str.toLocaleLowerCase());			//"hello, my name is majianwen"
复制代码
```

#### 6.字符串的模式匹配的方法

String提供了几个模式匹配的方法，match(),search(),replace(),split(),一起来看一下：

match()方法只接受一个参数，要么是一个正则表达式，要么是RegExp对象，其返回结果是一个数组

```
var str = 'cat,bat ,mat,sat, dasdfat';
var pattern = /.at/;
var pattern2 = /.at/g;
var pattern3 = /..at/g;
console.log(str.match(pattern));  
//["cat", index: 0, input: "cat,bat ,mat,sat, fat", groups: undefined]
console.log(str.match(pattern2));
//["cat", "bat", "mat", "sat", "fat"]
console.log(str.match(pattern3));
//[",bat", ",mat", ",sat", "dfat"]
复制代码
```

如果不是全局匹配的话，则只会返回第一个匹配到的字符串的相关信息的数组，如果是全局匹配的话，那么会返回所有的匹配到的结果数组，上述例子中一个点代表向前匹配一位，两个点代表向前匹配两位，以此类推。

search()是返回字符串中第一个匹配项的索引，接收的参数与match相同，如果能找到则返回索引值，否则返回-1，查找顺序是从头向后。

```
var str = 'cat,bat ,mat,sat, dasdfat';
var pattern = /at/;
console.log(str.search(pattern));   //1
复制代码
```

为了简化操作，现在使用replace()进行查找，此方法接收两个参数，第一个参数是字符串或者正则表达式对象，第二个参数可以是字符串也可以是函数，如果第一参数是字符串的话只会替换匹配到的第一个字符串，如果想要全局匹配替换的话则用正则表达式并且加g。此方法不改变原数组。

```
var str = 'cat,bat ,mat,sat, dasdfat';
var pattern = /at/;
var pattern2 = /at/g;
console.log(str.replace('at')); 		//"cundefined,bat ,mat,sat, dasdfat"
console.log(str.replace(pattern));		//"cundefined,bat ,mat,sat, dasdfat"
console.log(str.replace(pattern2));		//"cundefined,bundefined ,mundefined,sundefined, dasdfundefined"
//如果没有第二个参数话，则默认会用unddefined替换
console.log(str.replace('at','ood')); 		//"cood,bat ,mat,sat, dasdfat"
console.log(str.replace(pattern,'ood'));	//"ccood,bat ,mat,sat, dasdfat"
console.log(str.replace(pattern2,'ood'));	//"cood,bood ,mood,sood, dasdfood"
console.log(str);							//"cat,bat ,mat,sat, dasdfat"
复制代码
```

#### 7.localecompare()方法

localecompare返回一个数字来指示一个字符串是否在给定的字符串前面或者后面或者相等，该方法有三个参数，

第一个：compareString，用来比较的字符串，第二个：locales(可选)用来表示一种或多种语言或区域的一个符合 [BCP 47](https://tools.ietf.org/html/rfc5646) 标准的字符串或一个字符串数组。第三个：options:支持下列一些对象，localMatcher,usage,sensitivity,ignorePunctuation,numeric,caseFirst等，这些对象的意思读者可以自己去查阅，一般情况下两个可选参数都不会用到。

返回值是一个数字，如果引用字符串在作比较字符串前面的话，返回-1，如果引用字符串在比较字符串后面的话返回1，如果相等则返回0.

注意：不能依赖-1,1这样的返回值，因为在有的浏览器中可能返回值不是-1或者1，有可能是-2,2这样的。所以我们在开发的过程中不要使用返回值是否为-1,1做判断编写后续的逻辑，我们可以判断返回值是否大于0或者小于0来判断，这样不容易出错。

```
'a'.localeCompare('c');   // -2 or -1
'check'.localeCompare('against');  // 2 or 1
'a'.localeCompare('a');   //0
复制代码
```

**检查浏览器对扩展参数的支持**

locales和options目前还没有被所有的浏览器所支持，检查是否支持使用“i”参数，判断是否有异常抛出。

```
function localecompareSupport(){
    try{
        'string'.localeCompare('bar','i');
    }catch(e){
        return e.name== 'RangeError'
    }
    return false;
}
复制代码
```

#### 8.fromCharCode()方法

这是一个静态方法，返回由指定UTF-16代码单元序列创建的字符串。参数是num1,...numN.一系列UTF-16代码单元的数字，范围是0-65535之间，大于65535的数字将被阶段，不进行任何有效性检查。

该方法返回的是一个字符串，而不是一个String对象。

```
String.fromCharCode(65,66,67);     //"ABC"
String.fromCharCode(0x2014)       // returns "—"
String.fromCharCode(0x12014)      // returns "-",1将会被截取并且不错处理
复制代码
```

#### 9.endsWith()和startsWith()方法

endWith()方法用来判断当前的字符串是否是以给定的字符串结尾的，是的话返回true，不是的话返回false.

参数searchstring要搜索的字符串，options，可选，作为str的长度，默认值是str.length.

```
var str = "this is javascript string";
str.endsWith('string.');     //true
str.endsWith('is ja');       //false
str.endsWith('is ja',10);    //true
复制代码
```

startsWith()判断当前的字符串是否是以给定的字符串开头的，一个是开头，一个是结尾。

#### 10.padEnd()和padStart()

padEnd()会用一个字符串去填充当前字符串，从末尾开始填充，返回的是指定长度的填充后的字符串。

参数：第一个，targetLength,指定填充后的长度，注意是填充后整个字符串的长度而不是填充的长度。

第二个：padString,要填充的字符串，如果没有该参数，而填充的长度不够的话，则用空字符串代替，如果填充的字符串超过了填充后的长度，则截取到填充的长度为止。

```
var str = "xiao ma ge";
console.log(str.padEnd(15));      	//"xiao ma ge     "
console.log(str.padEnd(15,'abc'));	//"xiao ma geabcab"
console.log(str.padEnd(15,'abcdefgh'));   //xiao ma geadcde"
console.log(str.padEnd(1));			//"xiao ma ge"
复制代码
```

padStart()则是在原字符串的开头开始填充，参数跟padEnd相同，截取方式也一样，只不过一个是从前开始，一个是从后开始。