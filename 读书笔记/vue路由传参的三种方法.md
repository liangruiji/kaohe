[TOC]

A路由传参到B路由的过程

1.A路由通过路由跳转(声明式或编程式)时，带上query或params属性，是一个包含所传参数的对象

2.路由配置上写有跳转到的路由，B路由，通过params传参时需要在路由配置这里把所传的参数拼接在path地址上，页面刷新才不会丢失参数

3.在B路由上使用A路由传的参数，this.$route.query.参数名或this.$route.params.参数名



# vue-router传参

没事就需要翻翻vue官网，好长时间不看了。也不知道是她变心了，还是自己把她忘记了。

## 常用的传递方式

#### 直接传（拼接）

```js
//组件调用
this.$router.push({path: `/describe/${id}`})
//路由配置
{
    path: '/describe/:id',
    name: 'Describe',
    component: Describe
}
//Describe组件获取
this.$route.query.id
复制代码
```

#### query传参

传递的参数会拼接在url上

```js
 //组件调用
this.$router.push({
 path: '/describe',
 query: {
            id: id
        }
})
//路由配置
{
    path: '/describe',
    name: 'Describe',
    component: Describe
}
//Describe组件获取
this.$route.query.id
复制代码
```

（注：以上两种方式都会把参数放置在 this.$route.query 中）

#### params传参

（注：这里的路由匹配方式：通过路由属性中的name来确定匹配的路由。如果提供了 path，params 会被忽略）

params传参不会拼接在url上，但存在一个问题-------如果强制刷新页面会丢失参数

```js
//组件调用
this.$router.push({
    name: 'Describe',
    params: {
                id: id
            }
})
//路由配置
{
     path: '/describe',
     name: 'Describe',
     component: Describe
}
//Describe组件获用
this.$route.params.id
复制代码
```

## 新发现

现在的路由传参的方式没有改变，上述内容依然有效。组件内获取的方式增加了props方式接收，可以把参数传到props里了，功能更强大了。

如果在组件内要用props接收路由上的参数可以分为三种方式

#### 布尔模式

如果 props 被设置为 true，route.params将会被设置为组件属性。（设置为组件属性。不设置props时，没有理解不知道怎么访问）

```js
//组件调用
//路由传递方式只能使用params传递参数
this.$router.push(
    name: 'Describe',
    params: {
                id: id
            }
})
//路由配置
{
     path: '/describe',
     name: 'Describe',
     component: Describe,
     props: ture
}
//组件获取
const Describe= {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
复制代码
```

#### 对象模式

如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

```js
// 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
//组件配置
{
  path: '/describe/:id',
  components: { default: Describe, sidebar: Sidebar },
  props: { default: true, sidebar: false }
}
//单文件组件在props中获取
const Describe= {
    props: ['id'],
    template: '<div>describe{{ id }}</div>'
}
 //方式二 (这里需要注意如果在props中声明了id，这里方式获取会报undefined。)
this.$attrs['id']
复制代码
```

#### 函数模式

你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等URL /describe?q=vue 会将 {query: 'vue'} 作为属性传递给 describe组件。

```js
//组件调用（这里只能把参数放置在query中）
 this.$router.push({
     path: '/describe',
     query: {
                id: id
            }
})
  //路由设置
 { 
    path: '/describe', 
    component: describe, 
    props: (route) => ({ name: route.query.name}) 
 }
 //组价获取
 //方式一
 props:{
     name:''
 }
 this.name
 //方式二 (这里需要注意如果在props中声明了name，这里方式获取会报undefined。)
this.$attrs['name']
复制代码
```

## 总结

布尔模式需要用命名路由访问并把参数放置在params中，否则接收不到。

对象路由需要使用path拼接或者放置在query中，否则接收不到。

对象路由静态参数无所谓。

对象模式和函数模式返回的都是一个对象，如果在props中接收则直接thi.key访问。若没有在props中接收则通过this.$attre.key访问

## 附：(vue 官网）

```js
vm.$attrs
2.4.0 新增
类型：{ [key: string]: string }
只读
详细：
包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。
当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class和 style 除外)，
并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
复制代码
```