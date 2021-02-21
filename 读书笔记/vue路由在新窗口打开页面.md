#### vue-router 如何在新窗口打开页面

##### 1.router-link标签

target="_blank"新页面

target="_self" 本页面 

~~~
<router-link tag="a" target="_blank" to="/about">新品</router-link>
~~~

##### 2.编程导航

~~~
let routeData = this.$router.resolve({
  path: "/about",
  query: {
    name:'lei',
    age: 18,
    phoneNum:12345678901 
  }
});
window.open(routeData.href, '_blank');

~~~

##### 3.el-link新开页面

~~~
<el-link type="primary" 
href={this.$router.resolve({
name: 'HostView',params: {id: scope.row.id,},
}).href}
target="_blank">打开新窗口</el-link>
~~~



#### vue 跳转到外部链接

使用 window.location.href = ‘url’

**ps : 一定要注意, 要加上 http:// , 不然跳转还是当前域名下**

 window.open(url,'_blank') // 新窗口打开外链接

