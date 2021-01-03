# js-cookie.js的使用

[js-cookie 官方文档](https://www.npmjs.com/package/js-cookie)

### 一、安装

```undefined
npm install js-cookie --save
```

### 二、引用

```javascript
import Cookies from 'js-cookie'
```

### 三、一般使用

1. 存到Cookie去

```javascript
// Create a cookie, valid across the entire site:
Cookies.set('name', 'value');

// Create a cookie that expires 7 days from now, valid across the entire site:
Cookies.set('name', 'value', { expires: 7 }); // expires设置有效期

// Create an expiring cookie, valid to the path of the current page:
Cookies.set('name', 'value', { expires: 7, path: '' }); // path 设置路径
```

2.在Cookie中取出

```javascript
// Read cookie:
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined

// Read all visible cookies:
Cookies.get(); // => { name: 'value' }
```

3.删除

```javascript
// Delete cookie:
Cookies.remove('name');

// Delete a cookie valid to the path of the current page:
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // fail!
Cookies.remove('name', { path: '' }); // removed!
```

### 四、特殊使用（在Cookie中存对象）

1.储存

~~~js
Cookies.set('name', { foo: 'bar' });
~~~

2.获得

直接用Cookies.get()返回的是字符串，但我们一般要的是json格式

有两种方式

2.1 使用自带的`Cookies.getJSON()`方法

~~~js
Cookies.getJSON('name'); // => { foo: 'bar' }
Cookies.getJSON(); // => { name: { foo: 'bar' } }
~~~

2.2 用Cookies.get()获得字符串，然后通过JSON.parse()解析为json

跟一般使用不同的是，从Cookie中取出的时候，要从字符串转换成json格式：

```javascript
const user = {
  name: 'lia',
  age: 18
}
Cookies.set('user', user)
const liaUser = JSON.parse(Cookies.get('user'))
```

作者：Lia代码猪崽
链接：https://www.jianshu.com/p/6e1bacd35f59
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



### 不想引入？那就自己写一个

封装三个方法：`setCookie`，`getCookie`，`delCookie`

```js
  //Get time
  getsec (str) {
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 == "s") {
      return str1 * 1000;
    } else if (str2 == "h") {
      return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000;
    }
  },
  // Set the cookie
  setCookie (name, value, time, path, domain) {
    let strsec = this.getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path + ";domain=" + domain;
  },
  // Read cookies
  getCookie (name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
  },
  // Remove cookies
  delCookie () {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
```


作者：鹏歌歌
链接：https://juejin.cn/post/6844903645616537613
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。