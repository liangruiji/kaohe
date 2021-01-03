# axios.create 使用

[![img](https://upload.jianshu.io/users/upload_avatars/16629650/ac28ad70-4ff4-4d19-901c-c74028ecbf9d?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp)](https://www.jianshu.com/u/2240d4c3b29d)

[小李不小](https://www.jianshu.com/u/2240d4c3b29d)关注

0.2732020.08.11 21:54:46字数 149阅读 9,321

你可以创建一个拥有通用配置的axios实例

#### axios.creat([config]) ，参数为配置对象

我们应该会遇到这样一个问题，就是使用多个axios，需要配置 url,header,type 等等，那么我们多给请求就会面临写多个配置，看下面我们是怎么来解决他。

### 作用：减少配置多个相同的配置

### 使用方法

#### 1创建一个新的axios

```csharp
var instance = axios.create({
  baseURL: 'https://s-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

#### 2使用instance发请求 一共有两种方式

1.传对象配置

2.使用get或post方法

```csharp
//方式一 
//因为全局 instance 中的baseURL 已经配置 https://some-domain.com/api/'，我们需要在使用的时候，写接口名字就可以了，不需要写前面域名了
instance({
url: '/posts'
})


//方式二
instance.get('/posts')
```

3，问题：有多个不同域名怎么办



```csharp
baseURL1：https://some-domain.com/api1
baseURL2：https://some-domain.com/api2
baseURL3：https://some-domain.com/api2

const baseURL1=https://some-domain.com/api1;
const  baseURL2=https://some-domain.com/api2;
const  baseURL3=https://some-domain.com/api2;

//创建多个不同的axios，是不是就可以轻松解决。

var instance1 = axios.create({
  baseURL: baseURL1,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

var baseURL2= axios.create({
  baseURL: baseURL1,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

var baseURL3= axios.create({
  baseURL: baseURL1,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 案列



```xml
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<div>
  <button @click="clickmock">axios请求</button>
</div>


    <script type="text/javascript">
        //vue是一个构造函数，需要实列化来使用  


        const instance = axios.create({
            baseURL: 'https://tmawx.shenzhenair.com/ShInterfaceCenterV4/travelsky/',
            timeout: 1000,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });


        const vue = new Vue({
 el: '#app', //挂载 
            data: { //数据
},
  methods: {
                clickmock() {

                    console.log('点击请求')

                    instance({
                        method: 'post',
                        url: 'consumer/trace/passengerTraceClient/getTripFlight',
                        data: {
                            openId: "oEy5O1231312321315sk",
                            userId: "2597123134300"
                        }
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }

  })

   
```

看下面图片，
axios.create设置的
baseurl,
headers，
多可以在请求头数据里面看到