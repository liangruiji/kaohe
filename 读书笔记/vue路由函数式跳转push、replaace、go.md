## this.$router.push、replace、go的区别

##### 1.this.$router.push()

描述：跳转到指定的url，但这个方法回向history添加一个记录，点击后退会返回到上一个页面。
 用法：

```kotlin
// 1字符串
this.$router.push('/user/order')
// 2对象
this.$router.push({ path: '/user/order' })
//3传参
this.$router.push({ path: '/user/order', query: {id: 123} })
//3-1取参数
this.$route.query.id
//4命名的路由
this.$router.push({ name: '/user/order', params: {id: 123} })
//4-1取参数
this.$route.params.id
```

##### 2.this.$router.replace()

描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
 用法：同this.$router.push()

##### 3.this.$router.go(n)

相对于当前页面向前或向后跳转n个页面。n可为正数可为负数。

作者：coder丶L
链接：https://www.jianshu.com/p/716f72873734
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。