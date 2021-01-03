### 挂载方式

#### 指定 el

全局 Vue 实例化后,挂载到 id=app 的元素，并替换它:

```js
new Vue {
  el: '#app'
  ...
}
```

#### $mount 指定 HtmlElement

```js
new Vue {
  ...
}.$mount('#app')
```

#### 手动 mount

```js
const MessageInstance = new Vue({
  data: _props,
  render(h) {
    return h(Message, {
      props: _props
    });
  }
});

//此时构建的component.$el还未加入文档
const component = MessageInstance.$mount();

//dom操作加入某个位置
document.body.appendChild(component.$el);
```

#### Vue.extend创建构造器，创建实例调用$mount('#app')方法挂载或创建实例时添加el属性，new MessageConstructor({ el: '#app' });

```js
//// Vue.extend创建构造器 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。Main是vue组件
let MessageConstructor = Vue.extend(Main);

// 方式1 用$mount挂载到 #app (会替换 #app)
//创建 MessageConstructor 实例时 可添加自己的属性
instance = new MessageConstructor({
  data: options
});
instance.$mount('#app')

// 方式2 挂载到 #app (会替换 #app)
new MessageConstructor({ el: '#app' });//创建 MessageConstructor 实例时 可添加自己的el属性来挂载

// 方式3 在文档之外渲染并且随后挂载
instance = instance.$mount();
document.getElementById('app').appendChild(instance.vm.$el);
```

