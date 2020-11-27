### Ajax(异步加载页面内容的技术)

[TOC]



#### 1.创建 Ajax 对象

```
 	var xhr = new XMLHttpRequest();
```

#### 2. 配置Ajax 对象，告诉 Ajax 请求地址以及请求方式

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

#### 3. 发送请求

```
	xhr.send(); 
```

#### 4. 获取服务器端给与客户端的响应数据的两种方式

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

**JSON**.**stringify**()	 // 将json对象转换为json字符串

**ajax.responseText 	获取服务器端的响应数据**

**Object.keys(obj)** 	方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

**JSON.parse(req.responseText)**;	//JSON.parse() 将 json 字符串转换为json对象

