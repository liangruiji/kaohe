[TOC]



##### props

是什么：是子组件中的选项

作用：用于声明  父组件需要传替的数据  变量名，然后在子组件中使用

~~~vue
father.vue
<template>
  <div class="section">
    <child test="值"></child>
  </div>
</template>

child.vue
<template>
 <span>test</span>
</template>

<script>
export default {
  props: ['test']
}
</script>
~~~

特点：

值只能从父组件到子组件，单向流动，只读，不可修改，修改会失效且警告

需要改变的可以通过 `data` 属性接收或使用 `computed` 属性进行转换

如果传替的是引用类型，子组件改变，父组件数据也会变

##### events

是什么：子组件触发事件，父组件监听事件

作用：子组件实现了间接调用父组件的方法，并传值给了父组件

this.$emit("事件名",传替的值)  

v-on:事件名=dosomething  //也可以通过$event访问这个值

~~~vue
father.vue
<template>
  <div class="section">
    <child v-on:test="dosome"></child>
  </div>
</template>
<script>
export default {
 methods:{
 	dosome(val){
 		log(val)
 	}
 }
}
</script>

child.vue
<template>
 <span v-on:click="$emit('test',55)"></span>
</template>


~~~

##### eventBus

是什么：事件中心

为什么：因为events是这个组件模板触发事件，所以只能这个组件标签监听事件，但我们有时需要在平行的组件件通信，events显然做不到，所以需要一个事件中心

初始化事件中心的几种方式：

~~~js
// 局部事件中心，需要的地方导入
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// 全局事件总线
// 另外一种方式，可以直接在项目中的 main.js 初始化 EventBus :
// main.js
Vue.prototype.$EventBus = new Vue()
// 或
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
var EventBus = new Vue();
this.$bus.$emit('nameOfEvent', { ... pass some event data ...});
this.$bus.$on('nameOfEvent',($event) => {
  // ...
})
// 简单场景直接用 this.$root.$emit 和 this.$root.$on 也是一样的，可以少初始化一个 Vue 对象
~~~

移除移除事件监听者：

EventBus.$off('事件名', 回调函数)

使用：

和events的通信差不多，主要是调用的方法的对象不同

缺点：

- 由于是都使用一个Vue实例，所以容易出现重复触发的情景，两个页面都定义了同一个事件名，并且没有用$off销毁（常出现在路由切换时）。
- 大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。
- 如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理EventBus在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus事件监听。



##### $attrs 和 $listeners

$attrs 与 $listeners 是两个「对象」

$attrs 里存放的是父组件中绑定的非 Props 属性

$listeners里存放的是父组件中绑定的非原生事件



`inheritAttrs: false`的含义

是不希望本组件的根元素继承父组件的attribute，

同时父组件传过来的属性（没有被子组件的props接收的属性），

也不会显示在子组件的dom元素上，

但是在组件里可以通过其$attrs可以获取到没有使用的注册属性, ``inheritAttrs: false`是不会影响 style 和 class 的绑定



为什么：

vue中一个比较令人烦恼的事情是属性只能从父组件传递给子组件。这也就意味着当你想向嵌套层级比较深组件数据传递，只能由父组件传递给子组件，子组件再传递给孙子组件...像下面这样：popup传替

假如我们需要传递的属性只有1,2个还行，但是如果我们要传递的有几个或者10来个的情况，这会是什么样的场景，我们会在每个组件不停的props，每个必须写很多遍。有没有其它方便的写法？有，通过vuex的父子组件通信，的确这个是一个方法，但是还有其它的方法，这个就是我们要说的。通过inheritAttrs选项，以及实例属性$attrs



##### v-model 指令

##### .sync 修饰符



##### ref

##### $parent 和 $children

##### dispatch 和 broadcast

##### 通过 $root 访问根实例



##### provide 和 inject



##### Vuex



##### 自己实现简单的 Store 模式



##### localStorage和sessionStorage

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。 通过`window.localStorage.getItem(key)`获取数据 通过`window.localStorage.setItem(key,value)`存储数据

~~~
注意用`JSON.parse()` / `JSON.stringify()` 做数据格式转换 `localStorage` / `sessionStorage`可以结合`vuex`, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.
~~~

