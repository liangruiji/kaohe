### 获得元素

1. getElementById
2. getElementByTagName
3. getElementByClassName
4. querySelector 返回指定选择器的第一个元素对象  切记 里面的选择器需要加符号 .box  #nav
5.  querySelectorAll()返回指定选择器的所有元素对象集合



### 获得和设置属性

1. getAttribute

2. setAttribute

3. removeAttribute

4. 非dom解决方法，用 style属性，语法：obj.style.属性名 = 赋值

5. 预定义一个class 类样式规则，给元素添加类属性

6. getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值， 返回的是一个CSS样式声明对象 ， 只读。

   语法：var style=window.getComputedStyle(“元素”，“伪类”);第一个参数是必须的，第二个为可选的。

7. currentStyle 是一款可以兼容IE浏览器的属性返回的是当前所有最终使用的CSS属性值， 利用element.CurrentStyle.attribute可获取
    其与getComputedStyle区别：1、 currentStyle不支持伪类样式获取；2、currentStyle不支持现代浏览器，支持IE

```javascript
/*
		只能获取，不能设置
		获取到的是计算后的样式
		最好不要获取复合样式
		所获取的样式要设初使值
		获取到的样式类型是字符串
		别空格  [' width']
		*获取到的样式带px的 
		transform 获取不到
		transition 不准确
	*/
/**
		* 获取元素属性的函数
		* @param {Object} obj 当前元素对象
		* @param {Object} attr 当前元素对象的属性 */
		function getStyle(obj, attr) {
			if (obj.currentStyle) {
				// 兼容ie
				return obj.currentStyle[attr];
			} else {
				// 兼容主流浏览器
				return getComputedStyle(obj, null)[attr];
				}
			}
```



### dom属性

1. childNodes   所有孩子节点

2. children 获取所有的子元素节点 也是我们实际开发常用的

3. nodeType   节点类型

4. nodeValue  节点值

5. firstChild   第一个孩子节点

6. lastChild   最后一孩子节点

7. nodeName 返回值是大写

8. parentNode   父节点

9. nextSibling   下一个节点

10. previousSibling 上一个节点

11. nextElementSibling 下一个元素节点

12. previousElementSibling 上一个元素节点

13. ##### 获得下一个元素节点

```
// 获得下一个元素节点
function getNextElement(node) {
    if(node.nodeType == 1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}
```



### 平稳退化



### 共享onload事件

网页加载完毕后立刻执行执行，不能在未加载完前执行，否则dom不完整，获得元素的方法可能出问题。

```javascript
// 1.需要绑定的函数不多时
window.onload = function () {
    firstFunction();
    secondFunction();
}

// 2.需要绑定的函数较多时，由 Simon Willison 编写的 addLoadEvent 函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func
    }else{
        window.onload = function (){
            oldonload();
            func();
        }
    }
}
```





### 动态创建标记

#### 传统方法

1. ##### document.write

   需要在body内使用script标签才能调用函数，违背了行为与表现分离的原则

2. ##### innerHTML

   分不清插入与替换，一旦使用，他的全部内容都将被替换

#### dom方法

1. ##### document.createElement()

2. ##### parentElement.appendChild()

3. ##### document.createTextNode()

4. parentElement.**insertBefore**( newElement , targetElement )   在已有元素前插入一个新元素

5. 在已有元素前插入一个新元素 DOM中没有提供，需自己编写。

   ```js
   function inserAfter(newElement,targetElement) {
       var parent = targetElement.parentNode;
       if (parent.lastChild == targetElement){
           parent.appendChild(newElement);
       }else 
           
           parent.inserBefore(newElement,targetElement.nextSibling);
       }
       // 为什么用不了三元运算符运行
       // parent.lastChild == targetElement ? parent.appendChild(newElement) : parent.inserBefore(newElement,targetElement)
       
   }
   ```

6. node.removeChild() 方法从 node节点中删除一个子节点，返回删除的节点。

7. node.replaceChild(插入的节点，替换的节点)

8. node.cloneNode(true|flase)   返回调用他的节点，参数表示是否深复制，深复制是复制节点极其整个子dom树，浅复制则是只复制节点

### Ajax(异步加载页面内容的技术)

1.  创建 Ajax 对象

   ```
    	var xhr = new XMLHttpRequest();
   ```

2. 配置Ajax 对象，告诉 Ajax 请求地址以及请求方式

   * GET 请求方式

     ```js
     	//请求参数在open的url中
     	//'http://www.example.com?'+请求参数'name=zhangsan&age=20'
     	//请求参数要自己拼接，放url地址后面用？和&分别拼接url和其他参数
     	xhr.open('get', 'http://www.example.com?name=zhangsan&age=20');
     
     ```

   * POST 请求方式

     ```js
     	//必须明确请求参数格式的类型  setRequestHeader('类型键'，'类型值')
     	//类型值1. application/x-www-form-urlencoded  2. application/json
     	//请求参数放在send中
     	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
     	xhr.send('name=zhangsan&age=20');
     ```

     

   ```js
   	xhr.open('get', 'http://www.example.com',true);
   	// open方法初始化请求 - 此示例从 API 请求数据，因此是个 "GET" 请求。第二个参数 open是你要从中请求数据的 API 的 URL。第三个参数是一个布尔值， true使其成为异步请求。
   ```

3. 发送请求

   ```
   	xhr.send();
   ```

4. 获取服务器端给与客户端的响应数据

   * **onload事件**                                             **事件在服务器返回数据后触发**

   * **onreadystatechange事件**  **要放在send前面**，当 **Ajax 状态码发生变化时**将自动触发该事件。在事件处理函数中需要获取 Ajax 状态码并对其**进行判断**，**当状态码为 4 时就才能通过 xhr.responseText 获取服务器端的响应数据了**。

   ```JS
   	//onload事件在服务器返回数据后触发
   	//xhr.responseText 服务器返回的数据
   	xhr.onload = function () {
        console.log(xhr.responseText);
       //JSON 是由 API 以bytes形式传输的，你的程序以string接受它。它们能转换成为 JavaScript 对象，但默认情况下它们不是 JavaScript 对象。 JSON.parse方法解析字符串并构造它描述的 JavaScript 对象。
   	 json=JSON.parse(req.responseText);//JSON.parse() 将 json 字符串转换为json对象
    }
   
   ```

   ```js
   	// 当Ajax状态码发生变化时
   	xhr.onreadystatechange = function () {
       // 判断当Ajax状态码为4时
       if (xhr.readyState == 4) {
       	// 获取服务器端的响应数据
           console.log(xhr.responseText);
        }
    }
   	xhr.send();
   	/*
   	xhr.readyState // 获取Ajax状态码
   	在创建ajax对象，配置ajax对象，发送请求，以及接收完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是ajax状态码。
   	0：请求未初始化(还没有调用open())
   	1：请求已经建立，但是还没有发送(还没有调用send())
   	2：请求已经发送
   	3：请求正在处理中，通常响应中已经有部分数据可以用了
   	4：响应已经完成，可以获取并使用服务器的响应了/*
   
   ```

   

其他

**JSON**.**stringify**()** // 将json对象转换为json字符串



### array[key] = text

### for （key in array）

把array中的下标依次赋值给key。



### style 属性获得样式的局限性：只能返回内嵌式样式。属性值为字符串，单双引号。

### style 属性设置样式的局限性：再次修改时需要在javascript函数的寻找修改与设置样式有关的语句。

### 通过更新 className 属性修改样式（elem.setAttribute("class","")或elem.className = value）

不足：本来有样式时，样式是替换而不是追加，追加一个类名就可以解决。

elem.className += "value";

```javascript
// 增加类名,改变类名增加样式
function addClass(element,value) {
    if (!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }

}
```

### 事件三要素

- 事件源（谁）：触发事件的元素
- 事件类型（什么事件）： 例如 click 点击事件
- 事件处理程序（做啥）：事件触发后要执行的代码(函数形式)，事件处理函数

#### 常见的鼠标事件

1. onclick 点击触发
2. onmouseover 经过触发
3. onmouseout 离开触发
4. onfocus 获得焦点触发
5. onblur 失去焦点触发
6. onmousemove 移动触发
7. onmouseup 弹起触发
8. onmousedown 按下触发
9. onmouseenter经过触发、不冒泡
10. onmouseleave  离开触发、不冒泡
11. oncontextmenu 事件：在元素中用户右击鼠标时触发并打开上下文菜单。并用return false（普通写法）来**阻止默认行为

# 阻止a标签默认事件的几种简单方法

**w3c的方法是e.preventDefault()，IE则是使用 window.event.returnValue = false;;**

```
第一种： <a href = " javascript: void ( 0 ); ">百度</a> 或者<a href = " javascript:; ">百度</a>
第二种：<a href = " # ">百度</a> (最常见的，但是点击后页面会返回到顶部，不可用)；所以又有了<a href = " ## ">百度</a>或者<a href = " #! ">百度</a>
第三种： e.preventDefault();阻止默认事件(不支持IE)，IE中用window.event.returnValue = false; 阻止默认事件
```

```js
	//在事件中添加 
 function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false; //兼容IE
    }
```

# 当需要停止冒泡行为时，可以使用

**w3c的方法是e.preventDefault()，IE则是使用e.returnValue = false;**

```js
//阻止浏览器的默认行为 
function stopDefault( e ) { 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}
```

