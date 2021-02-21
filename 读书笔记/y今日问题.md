team: team?.id,是什么意思

api的请求参数的不同

  return request({

​    headers: {

​      'Content-Type': 'application/x-www-form-urlencoded', // 必须设置传输方式

​    },

​    url,

​    method: 'get',

​    params: data,

  })

axios的使用笔记

component组件和is组合使用，把component变成别的组件或者标签



https://chrome.google.com/webstore/detail/bookmarks-checker/eeckiajfclogcacnhgigljkcgabfcmco 检查浏览器书签中的死链



死链或者已经删除的页面，几乎都可以通过 https://web.archive.org/ 这个来查看

例如：https://www.cnblogs.com/belid/archive/2013/04/27/python.html
我这篇之前收藏的文章已经被删除了

通过：https://web.archive.org/web/20150417162928/http://www.cnblogs.com/belid/archive/2013/04/27/python.html
还可以查看到





 Object.assign(state.user, user)用法

Object.keys()

this.$emit('update:selectedProject', val) // 以该模式使父组件可以使用.sync修饰符以实现数据双向绑定

vue style 深度选中器  

 const delpro = this.userProject.splice(

​        this.userProject.findIndex(item => item.id === val),

​        1,

​      )

​      this.userProject.splice(0, 0, delpro[0])

​    },

![image-20201225173503685](/Users/telking/Library/Application Support/typora-user-images/image-20201225173503685.png)





# button添加属性disabled，造成el-tooltip失效的解决方法

button用div包着即可

jsx语法

{

​    path: 'pj-info/:pid',

​    name: 'PjInfo',

​    hidden: true,

​    component: () =>

​      import('@/views/project-manage/project-info/ThePjInfo'),

​    meta: {

​      roles: ['project_info'],

​      title: '项目主页',

​      icon: 'project_home',

​    },

  },

message_ids.splice(message_ids.indexOf(item.message_id), 1)

[{ "t": -1 },{ "t": -2}]

axios取消请求

两个对象数组，判断一个对象数组中是否有另外一个对象数组的元素

js && 和|| 与 饿了吗 disable 的结合有点晕

第一步看 disable 要看唯一项 true 还是 false 

第二步唯一项是true 就是 && 唯一项是false 就是 || 





scss@mixin与@include的用法

js片段技巧

https://umaar.com/dev-tips/#archive

 @click.middle.native 鼠标中间点击

jsx语法新开页面

~~~html
  							<el-link
                  type="primary"
                  href={
                    this.$router.resolve({
                      name: 'HostView',
                      params: {
                        id: scope.row.id,
                      },
                    }).href
                  }
                  target="_blank"
                >
                  {scope.row.name || '-'}
                </el-link>
~~~

router.resolve 用法

两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

render(){}和render:()=>{} 的区别，this指向不同，一个不能使用vue中的data，一个可以

watch监听路由失效的问题

组件复用时不会重新运行created和mounted，但我们是在created和mounted中请求的，造成数据不刷新的问题

单页面应用的一个特点是，如果某个路由已经在本地加载过了，即已经将生命周期走到了mounted的时候，如果我们再进入这个页面，不会再执行created和mounted里面的方法。

简单来说，有两个页面A和B，我们使用单页面的形式，使用vue-router来实现页面的“跳转”，当我们一开始打开A页面时，执行了页面的created和mounted，跳转到B页面，执行了B页面的created和mounted，但是，当我们从B页面“跳转”回A页面时，我们发现不会执行created和mounted了，因为这个Vue组件已经加载了，它不会重复执行方法，如果我们要在路由发生变化的时候执行方法，那我们就需要监听$route的变化，在它变化的时候执行方法。



浏览器刷新，不会触发watch监听路由的问题

Object.create

防抖和节流都是为了防止函数多次调用，区别是：

- 防抖在单位时间内只执行一次
- 节流是每一个单位时间执行一次

http://www.godrry.com/FEDocs/#/javascript/ES5#%E9%98%B2%E6%8A%96%E3%80%81%E8%8A%82%E6%B5%81

## new 和 {} 以及 Object.create 的区别

- new 和 {} 可以用来创建一个Object的实例对象, 继承了Object的方法和属性

- Object.create 可以自主的选择要继承的父类是什么，可以是构造函数(Object)，也可以是一个实例对象，也可以是其他 比如null，基于null创建出来的对象Object.create(null)，是一个**非常纯净**的对象，它不会有Object的任何属性和方法，十分纯净

  - Object.create(proto,[propertiesObject])

    ```javascript
    function _inherits(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype, {
          constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
          }
      });
      subClass.__proto__ = superClass;
    }
    ```

**实现一个Object.create**

```javascript
Object.create = function (obj, properties) { 
    // 新建一个空函数
    function F() {}
    // 空函数原型连接到父类，完成继承
    F.prototype = obj;

    if(properties) {
        Object.defineProperties(F, properties);
    }
    // 返回这个空函数
    return new F();
};
```



axios取消请求

在请求拦截中缓存取消请求函数，然后导出

请求成功、取消请求时删除缓存的函数

https://juejin.cn/post/6844904143149072398#heading-0





~~~js
  let projectsId = this.localProject.map(item => item.id)
      // 缓存的projects和this.user.projects的差集
      let difference = this.user.projects.filter(item => {
        return !projectsId.includes(item.id)
      })
~~~

