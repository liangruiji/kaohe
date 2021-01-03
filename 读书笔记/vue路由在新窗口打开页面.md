# vue-router 如何在新窗口打开页面

### 1.router-link标签

~~~
<router-link tag="a" target="_blank" to="/about">新品</router-link>
~~~

### 2.编程导航

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

