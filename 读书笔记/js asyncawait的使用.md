##### 作用：同步异步请求或操作，即是等待异步请求结束后再进行下一步操作



假设有这样一个场景: 需要先通过 **请求1** 拿到 **数据1**, 然后通过通过 **请求2** 并携带发送 **数据1** 获取到 **数据2**, 拿到 **数据2** 之后再展示到页面.

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

##### 1.async/await场景

这是一个用同步的思维来解决异步问题的方案，当前端接口调用需要等到接口返回值以后渲染页面时。

##### 2.名词解释

**async**

async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行，async 函数返回的是一个promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

**await**

await的含义为等待。意思就是代码需要等待await后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。

##### 3.基本讲解

简单案例：

```js
async function timeout() {
   return 'hello world'
}
console.log(timeout());
console.log('虽然在后面，但是我先执行');
```

![img](https://images2017.cnblogs.com/blog/1013082/201802/1013082-20180205150941373-8971393.png)

原来async 函数返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法， 继续修改代码

```js
async function timeout() {
    return 'hello world'
}
timeout().then(result => {
    console.log(result);
})
console.log('虽然在后面，但是我先执行');
```

![img](https://images2017.cnblogs.com/blog/1013082/201802/1013082-20180205151306873-401823311.png)

我们获取到了"hello world', 同时timeout 的执行也没有阻塞后面代码的执行，和 我们刚才说的一致。

你可能注意到控制台中的Promise 有一个resolved，这是async 函数内部的实现原理。如果async 函数中有返回一个值 ,当调用该函数时，内部会调用Promise.resolve() 方法把它转化成一个promise 对象作为返回，但如果timeout 函数内部抛出错误呢？ 那么就会调用Promise.reject() 返回一个promise 对象， 这时修改一下timeout 函数

```js
async function timeout(flag) {
    if (flag) {
      return 'hello world'
    } else {
        throw 'my god, failure'
    }
}
console.log(timeout(true))  // 调用Promise.resolve() 返回promise 对象。
console.log(timeout(false)); // 调用Promise.reject() 返回promise 对象。
```

![img](https://images2017.cnblogs.com/blog/1013082/201802/1013082-20180205154012701-1737597385.png)

如果函数内部抛出错误， promise 对象有一个catch 方法进行捕获。

```js
timeout(false).catch(err => {
    console.log(err)
})
```

await是等待的意思，那么它等待什么呢，它后面跟着什么呢？其实它后面可以放任何表达式，不过我们更多的是放一个返回promise 对象的表达式。**注意await 关键字只能放到async 函数里面**

现在写一个函数，让它返回promise 对象，该函数的作用是2s 之后让数值乘以2

```js
// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000);
    } )
}
```

现在再写一个async 函数，从而可以使用await 关键字， await 后面放置的就是返回promise对象的一个表达式，所以它后面可以写上 doubleAfter2seconds 函数的调用

```js
async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}
```

现在调用testResult 函数

```js
testResult();
```

打开控制台，2s 之后，输出了60. 

现在我们看看代码的执行过程，调用testResult 函数，它里面遇到了await, await 表示等一下，代码就暂停到这里，不再向下执行了，它等什么呢？等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。具体到 我们的代码, 遇到await 之后，代码就暂停执行了， 等待doubleAfter2seconds(30) 执行完毕，doubleAfter2seconds(30) 返回的promise 开始执行，2秒 之后，promise resolve 了， 并返回了值为60， 这时await 才拿到返回值60， 然后赋值给result， 暂停结束，代码才开始继续执行，执行 console.log语句。

就这一个函数，我们可能看不出async/await 的作用，如果我们要计算3个数的值，然后把得到的值进行输出呢？

```js
async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(first + second + third);
}
```

6秒后，控制台输出220, 我们可以看到，写异步代码就像写同步代码一样了，再也没有回调地域了。

### Vue项目案例

普通案例：

```js
methods: {
     getLocation(phoneNum) {
         return axios.post('/mm接口', {
             phoneNum
         })
     },    
     getFaceList(province, city) {
         return axios.post('/nn接口', {
             province,
             city
         })
     },  
     getFaceResult () {
          this.getLocation(this.phoneNum).then(res => {
              if (res.status === 200 && res.data.success) {
              let province = res.data.obj.province;
              let city = res.data.obj.city;
                  this.getFaceList(province, city).then(res => {
                  if(res.status === 200 && res.data.success) {
                             this.faceList = res.data.obj
                        }
                  })
              }
         }).catch(err => {
             console.log(err)
         })     
     }
}
```

这时你看到了then 的链式写法，有一点回调地域的感觉。现在我们在有async/ await 来改造一下。

async/ await案例：

首先把 getFaceResult 转化成一个async 函数，就是在其前面加async， 因为它的调用方法和普通函数的调用方法是一致，所以没有什么问题。然后就把 getLocation 和getFaceList 放到await 后面，等待执行， getFaceResult 函数修改如下：

```js
async getFaceResult () {
                let location = await this.getLocation(this.phoneNum);
                if (location.data.success) {
                    let province = location.data.obj.province;
                    let city = location.data.obj.city;
                    let result = await this.getFaceList(province, city);
                    if (result.data.success) {
                        this.faceList = result.data.obj;
                    }
                }
            }
```

现在代码的书写方式，就像写同步代码一样，没有回调的感觉，非常舒服。

现在就还差一点需要说明，那就是怎么处理异常，如果请求发生异常，怎么处理？ 它用的是try/catch 来捕获异常，把await 放到 try 中进行执行，如有异常，就使用catch 进行处理。

```js
async getFaceResult () {
                try {
                    let location = await this.getLocation(this.phoneNum);
                    if (location.data.success) {
                        let province = location.data.obj.province;
                        let city = location.data.obj.city;
                        let result = await this.getFaceList(province, city);
                        if (result.data.success) {
                            this.faceList = result.data.obj;
                        }
                    }
                } catch(err) {
                    console.log(err);
                }
            }
```

### **Vue项目案例（封装）**

http.js

```js
'use strict'
import axios from 'axios'
import qs from 'qs'
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}
function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    alert(res.data.error_msg)
  }
  return res
}
export default {
  post (data,url) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: 'https://cnodejs.org/api/v1',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
```

api.js

```js
export default {
  getCode: 'http://127.0.0.1:8888/.....'
}
```

auth.vue

```js
import http from '../../utils/http'
import api from '../../utils/api'
   methods: {
      fetchData: async function () {
        var that = this
        var code = Store.fetchYqm();
        let params = {
          inviteCode: code
        }
        const response = await http.post(params,api.getCode)
         var resJson = response.data;
      }
}
```

 

某公司的项目案例

![img](https://img-blog.csdn.net/20181015164707413?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYXNvaHVhaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![img](https://img-blog.csdn.net/20181015164726232?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYXNvaHVhaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)