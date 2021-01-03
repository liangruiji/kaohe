### 总结

1.路由跳转的两种方式，声明式和编程式跳转

2.传参的两种方式params和query

3.query传参的参数直接在地址上了，params的没有在地址上，刷新会丢失

4.路由传参要保证刷新数据不消失，必须把数据放在url地址上

5.params传参必须和命名路由配合使用，用name指定命名路由，在命名路由中设置path，不能直接使用path指定路径

### vue 路由跳转的两种方式

#### 1.声明式

 <router-link :to="..."> 

#### 2.编程式跳转 router.push(...)

声明式的路由跳转的规则适用于`router-link`组件的`to`属性

同样也适用于router.push()方法.

这个规则都会向 history 栈添加一个新的记录

所以，当用户点击浏览器后退按钮时，则回到之前的 URL。这个规则是一样的,只是写法上的不一样,当你点击`<router-link :to="...">`等同于调用`router.push(...)`,只不过这个方法会在内部调用而已.

下面我们以router.push() 这个方法讲解一下这个规则:

### 使用方法

#### 1.传字符串

router.push('home')

#### 2.传对象

router.push({ path: 'home' })

#### 3.命名的路由 (这里的name 要跟路由的name一致) 

router.push({ name: 'user', params: { userId: '123' }})

#### 4.带查询参数，变成 /register?plan=private

router.push({ path: '/register', query: { plan: 'private' }})

**注意：如果提供了`path`，`params`会被忽略，也就是说 path 是跟query 组合一起使用的,name 是跟params 组合使用的, 如果出现 path，params 一起使用,或者 name 和 query 使用会出错,**

**讲一讲规则,和区别:**

1,使用params方法传参的时候，要在路由后面加参数名，并且传参的时候，参数名要跟路由后面设置的参数名对应。使用query方法，就没有这种限制，直接在跳转里面用就可以。意思是说使用parmas传参的时候,比如:path:'/user/:userId',router.push(name:'user',params:{userId: '123' }}),params是路由的一部分,必须要有,如果写成 path:'/user/:userId',router.push(name:'user',params:{userId2: '123' }}),userId 和而 userId2 不一致,对应不上测会出错,而query 则可以省略,可以省略成 router.push(path:'/user'),或者router.push('/user'), query是拼接在url后面的参数，没有也没关系。

**2、展示上的**

quary更加类似于我们ajax中的get传参，params则类似于post，前者在浏览器地址中显示参数，后者不显示

##### **`query`**：能用name也能用path，query中的参数会加到地址后面

```
<router-link :to="{ name: 'W', query: { id:'1234'，age:'12' }}"/>
<router-link :to="{ path: '/W', query: { id:'1234',age:'12' }}"/>
url:http://localhost:8080/#/W?id=1234&age=12
```

在接收参数的时候都是使用`this.$route.query.id`

##### **`parmas`**：只能用name，不能用path，刷新被清空，使用路径变量把参数放在url上后刷新也不会清空了

```
<router-link :to="{ name: 'W', params: { id:'1234',age:'12' }}"/>

```

```js
{     path:'/W/:id/:age', 
      name:'W',
      component:W
}
```

`url`就取决于这个`path`的写法 `http://localhost:8080/#/W/1234/12`
注意，**/:id`和`/:age`不能省略，且不能改名字**

~~~

query:	localhost:8081/#/detail?name=%E7%B2&code=10014
params: localhost:8081/#/detail
~~~

3.用params传参，F5强制刷新参数会被清空，用query，由于参数适用路径传参的所以F5强制刷新也不会被清空。（传参强烈建议适用string）

最后讲一下,接收参数, 其实接收参数差不多,一个是,**this**.$route.query.plan, **this**.$route.params.userId 但是值得注意的是这里的$route 没有r,不要搞混了.