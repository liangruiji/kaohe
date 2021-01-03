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



jsx语法