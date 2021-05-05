[TOC]



# vue基础知识

## 结构

~~~js
var app = new Vue({
	el:"#app",
  props: {//父传子值时，子组件声明标签属性名的地方
    
  }
  data:{//date属存放el中要用到的数据
  	a:5,
  	b:10
  },
  methods:{//methods属性中定义当前vue实例所有可用的方法，主要写业务逻辑
  	f1(){}
	},
  components: {//通过Vue实例的components属性创建Vue局部组件（实例内部私有组件）
        // 第一种方式
        "custom": {template:"<div><h1>我是components创建的局部组件</h1></div>"},
        // 第二种方式
        "customTwo"{template:"#tmp"}，
        // 第三种方式
        "customThree": customThree // 自定义组件名称和组件模版对象名称一致可以简写为一个，customThree对象定义在别的地方。
    }
  computed:{//computed属性中，定义一些拥有返回值的方法，叫计算属性，用来处理数据，一般只用来做属性来用，不会做方法来调用
  },
	filters:{//filters属性定义当前vue实例所有可用的过滤方法
  },
	watch:{//watch属性，可以监听data中数据的变化，然后触发相应的处理函数，键为监听的数据，值为处理函数
  	a(新的a值,!旧的a值){}//a发生变化时，会触发这个函数
  }
  router,//挂载路由对象
  directives:{}//directives中定义当前vue实例所有的自定义指令
	beforCreate(){}//生命周期函数：实例被创造之前会执行这个函数
	
	created(){}//生命周期函数：实例被创造之后
	beforeMounted(){}//生命周期函数：模板已经编译完成，但还没有把模板渲染到页面中
	mounted(){}//生命周期函数：模板已经编译完成，内存中模板渲染到页面中去，已经可以看到渲染好的页面
	beforeUpdate(){}//生命周期函数：当前界面还没有被更新，数据肯定被更新了
	update(){}//生命周期函数：当前页面和数据保持同步了，都是最新的
	
	beforeDestory(){}//生命周期函数：表示实例已经从运行阶段进入摧毁阶段
	destroyed(){}//生命周期函数：表示组件已经完全被摧毁了

	activated(){} // 被 keep-alive 缓存的组件激活时调用
	deactivated(){} // 被 keep-alive 缓存的组件停用时调用
})
~~~

## 组件

如果设置了template属性，模板值 **会直接覆盖掉** 组件名称包括里面的内容

~~~js
<costom>fff</costom>

Vue.component("custom", Vue.extend({
    // 通过template属性指定了组件要展示的HTML结构
    template:"<div>我是使用Vue.extend创建的组件</div>" // 
})) 

<div>我是使用Vue.extend创建的组件</div> 会直接覆盖掉 <costom>fff</costom>
~~~



##### 创建组件的几个方式

- 第一种使用Vue.extend来创建全局的Vue组件，

- 第二种使用Vue.component创建全局的Vue组件

- 第三种通过Vue实例的components属性创建Vue局部组件（实例内部私有组件）

  ~~~js
  //1.第一种使用Vue.extend来创建全局的Vue组件
  // 创建组件模版对象
  let mycomponent = Vue.extend({
      // 通过template属性指定了组件要展示的HTML结构
      template:"<div>我是使用Vue.extend创建的组件</div>" // 
  })
  
  // 使用Vue.component("组件名称", 创建出来的组件模版对象)给模版对象命名
  Vue.component("custom", mycomponent) 
  
  // 直接把组件的名称以HTML标签的形式引入到页面中就可以使用了
  <custom></custom> 
  
  
  //2.第二种使用Vue.component创建全局的Vue组件
  Vue.component("custom", Vue.extend({
      // 通过template属性指定了组件要展示的HTML结构
      template:"<div>我是使用Vue.extend创建的组件</div>" // 
  })) 
  
  
  //3.第三种通过Vue实例的components属性创建Vue局部组件（实例内部私有组件）
   let customThree = {
          template: "<div><h1>我是Vue实例外创建的组件模版对象</h1></div>"
      }
      new Vue({
      el: "#app",
      components: {
          // 第一种方式
          "custom": {template:"<div><h1>我是components创建的局部组件</h1></div>"},
          // 第二种方式,  被控制的Vue实例el绑定的元素外，使用template元素定义组件的HTML模版结构
          "customTwo"{template:"#tmp"}，// template属性指向一个id在,
        
  
          // 第三种方式,      
          "customThree": customThree // 自定义组件名称和组件模版对象名称一致可以简写为一个
      }
  })
  ~~~

#####  组件中定义date数据和属性与实例date的不同

* 实例中的data可以为一个对象，但组件中的data必须是一个方法。
* 这个方法内部还必须return一个对象出来才行。
* 这样组件复用时他们的数据才是各自的，不会互相影响，不这样的就是共享一个date。

~~~	js
// 但是组件中的data和实例中的data不一样，实例中的data可以为一个对象，但组件中的data必须是一个方法。
// 这个方法内部还必须return一个对象出来才行。
// 组件中data的数据和实例中data数据的使用方式完全一样
// 例如：
new Vue({
    el: "#app",
    data: {
        msg: "我是实例中data的数据"
    }
})
Vue.components("custom",{
    template:"<div> <h1>{{ msg }}</h1></div>",
    data () {
        return {
            msg: "我是组件中data的数据"
        }
    }
})

~~~

### 使用组件的两种方式

##### 1.直接在使用组件名

##### 2.使用component标签和它的 :is 属性可以用来指定要展示的组件名称

##### 3.路由配置里设置，路由视图里加载组件

~~~	html
// components是一个占位符， :is 属性可以用来指定要展示的组件名称
// 注意 :is 属性的值为要展示的组件名称，但是也可以写成一个变量，方便某些时候动态切换要展示的组件。
<div id="app">
    <component :is="msg"></component>     //展示custom组件
    <button @click="change">切换组件</button>
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "custom"
    },
    components: {
        "custom": {template:"<div><h1>我是components创建的局部组件custom</h1></div>"}，
        "customTwo": {template:"<div><h1>我是components创建的局部组件customTwo</h1></div>"}
    },
    methods: {
        change () {
            // 通过chage方法动态改变msg的值来切换要展示的组件
        }
    }
})
</script>

~~~

### 组件通信 => 父子组件，兄弟组件之间通信

- 组件通信中，子组件是无法访问到父组件中的数据和方法的。
- 父组件可以在引用子组件的时候，通过属性绑定(v-bind)的形式，把数据传递给子组件使用。
- 父组件通过自定义属性传过来的数据，需要子组件在props属性上接收才能使用。

#### 父传子值

```js
<div id="app">
  	//父组件传替数据给子组件属性
    <custom :parentmsg="msg"></custom>
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "我是父组件中的数据"
    },
    components: {
        "custom": {
            props: ["parentmsg"],// 声明属性，声明后才能在子组件的模板中使用，子组件通过props属性接收父组件传来的数据
            template:"<div><h1>我要引用父组件中的数据----{{ parentmsg }}</h1></div>"//使用拥有父组件数据的子组件属性
        }
    }
})
</script>
复制代码
```

### 父传子方法, 子传父数据

父组件向子组件传递方法步骤：

1. 父组件中，子组件标签使用的是事件绑定机制 **v-on:自定义事件名=function(事件抛出值){}**，来监听我们自定义事件，事件处理函数的第一个参数是事件抛出值，或则$event也可以访问到自定义事件抛出值
2. 那么子组件模板就可以通过 **v-on:click=$emit('自定义事件名'，事件抛出值)**来设置点击（或其他事件）触发这个自定义事件，触发后，父组件监听到这个事件被触发，父组件运行触发后后需要运行的函数。

```js
<div id="app">
    // 通过自定义事件名称func以事件绑定机制@func="show"将父组件的show方法传递给子组件
    <custom @func="show"></custom> 
</div>
<script>
    new Vue({
    el: "#app",
    data: {
        msg: "我是父组件中的数据"
    },
    components: {
        "custom": {
            props: ["parentmsg"]，// 子组件通过props属性接收父组件传来的数据
            data () {
                return {
                    childmsg: "我是子组件的数据"
                }
            },
            template:`
                <div>
                    <h1>我要调用父组件传递过来的方法</h1>
                    <button @click="emit">点我调用父组件传递的方法</button>
                </div>`，
            methods: {
                emit () {
                    // 触发父组件传过来的func方法，配合参数可以将子组件的数据传递给父组件
                    // vm.$emit(evebtNane, [...args]) 触发当前实例上的事件，附加参数会传给监听器回调。
                    this.$emit("func"，this.childmsg) 
                }
            }
        }，
    }，
    methods: {
        // 子组件触发了我，并且给我传递了子组件的数据data
        show (data) {
            console.log("我是父组件中的show方法")
            console.log("接收到了子组件传递的数据---" + data)
        }
    }
})
</script>
复制代码
```

- 注意组件中所有props属性中的数据，都是通过父组件传递给子组件的。
- props中的数据都是只读不可写的，data上的数据都是可读可写的，
- 子组件中data中的数据，并不是通过父组件传递过来的，而是子组件自己私有的。

### 兄弟组件之间数据传递

- 第一种借助中央事件总线

```js
<div id="app">
    
</div>
<script>
    // 重新实例一个Vue
    let Bus = new Vue()
    
    new Vue({
        el: "#app",
        components: {
            "custom": {
                template:`<div @click = sendMsg>
                    <button>点我给customTwo组件传递我的数据</button>
                </div>`,
                data () {
                    return {
                        msg: "我是custom组件的数据"
                    }
                },
                methods: {
                    sendMsg () {
                        Bus.$emit("myFunc", this.msg) // $emit这个方法会触发一个事件
                    }
                }
            }，
            "customTwo": {
                template:`<div>
                    <h1>下面是我接收custom组件传来的数据</h1>
                    <p>{{ customTwoMsg }}</p>
                </div>`,
                data () {
                    return {
                        customTwoMsg: ""
                    }
                }，
                created () {
                    this.brotherFunc()
                },
                methods: {
                    brotherFunc () {
                        Bus.$on("myFunc", (data) => { // 这里要用箭头函数，否则this指向有问题。
                            this.customTwoMsg = data
                        })
                    }
                }
            }
        }
    })
</script>
复制代码
```

这样借助总线机制，实现兄弟组件之间的数据共享。

- 第二种借助第三方vuex库（这是我推荐使用的）

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

具体用法请查看[vuex官方文档](https://vuex.vuejs.org/zh/guide/)超级详细。



## Vue中提供的标签（五个内置组件）

Vue中提供了一些固定的标签来方便我们在开发过程中使用，并且在开发过程中，我们很有可能因为要使用某些第三方库而不得已要操作DOM元素，因此如何获取并操作DOM元素的使用呢。

- component

这个标签是用来展示组件的

```
<div id="app">
    <component :is="要展示的组件名称"></component> 
    <custom></custom> // 直接通过自定义组件名称当作标签使用
</div>
new Vue({
    el: "#app",
    components: {
        "要展示的组件名称": {
            template: `<div> // 注意自定义组件的模版对象需要有且只有一个根标签。
                <h1>我是自定的组件一</h1>
            </div>`
        }，
        "custom": {
            template: `<div>
                <h1>我是自定义组件二</h1>
            </div>`
        }
    }
})

复制代码
```

- template

这个标签用来定义组件的HTML结构

```
<div id="app">
    <custom></custom>
</div>
<template id="tmp">
    <div>
        <h1>我是用template标签定义组件的HTML模版</h1>
    </div>
</template>
new Vue({
    el: "#app",
    components: {
        "custom": {
            template: "#tmp"
        }
    }
})
复制代码
```

- transition

这个标签是用来把需要被动画控制的元素包裹起来，展示自定义的动画效果

```
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
<div id="app">
    <transition>
        <h1>我是有动画效果的</h1>
    </transition>
</div>
复制代码
```

- transition-group

通过v-for渲染出来的标签不能使用transition包裹， 需要使用transition-group包裹添加动画。

```
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
<div id="app">
    <transition-group tag="ul">
        <li v-for="item of list" :key="item.id">
            <h1>我是有动画效果的</h1>
        </li>
    </transition-group>
</div>
new Vue({
    el: "#app",
    data: {
        list:[
            {name:"fanqie", id: 1},
            {name: "chaofan", id: 2}
        ]
    }
})
复制代码
```

- keep-alive

当前标签包裹组件时，会缓存不活动的组件实例，而不是销毁它们，keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件中。

当组件在内被切换，它的 activated 和 deactivated 这个两个生命周期钩子函数将会被对应执行。

```
// 主要用于保留组件状态或避免重新渲染。
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
复制代码
```

注意，keep-alive 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，keep-alive 要求同时只有一个子元素被渲染。

- solt

slot 元素作为组件模板之中的内容分发插槽。slot 元素自身将被替换。

```
// 和HTML元素一样，我们经常需要向组件传递内容，例如：
// custom 是自定义的组件
<custom> 
    <div>我是在组件内添加的标签</div>
</custom> 
复制代码
```

但是我们渲染出来的却是这样：

![img](https://user-gold-cdn.xitu.io/2019/4/1/169d6d92a7b2eebb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

幸好，Vue 自定义的  元素让这变得非常简单：

```
Vue.component('custom', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
复制代码
```

### Vue中获取DOM元素

在我们的vue项目中，难免会因为引用第三方库而需要操作DOM标签，vue为我们提供了ref属性。 ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

```
<p ref="p"></p>
// 现在在你已经定义了这个 ref 的组件里，你可以使用：
this.$refs.p 来操作这个DOM元素来。
复制代码
```

vue不提倡我们操作DOM元素，因此在引用第三方插件或者项目中，尽量少的不要出现操作DOM元素。



## 自定义指令

两种定义指令的方式：全局和局部

5个钩子函数

4个钩子函数参数



Vue.directive(“指令名称”，{     bind: **function**(el，binding对象){},     inserted: **function**(){},     updata: **function**(){}  })

**注意 :** 参数 1 是指令的名称， 指令的名称前面不需要加 "v-"前缀

**注意 :** 参数 2 是一个对象，有三个函数，每个函数都有两个参数，第一个参数是绑定了指令的那个元素，第二个参数是一个对象，包含两个常用属性：name/指令名，value/指令的绑定值（例如v-mydirective="'red'"）值就为red，剩下的属性去看官网用的少。

~~~js
//1.全局自定义属性
Vue.directive(“指令名称”，{ 
    bind: function(){}, //每当指令绑定到元素上的之后，会立即执行这个bind函数，只执行一次
    inserted: function(){}, //当元素插入到DOM中的时候会执行inserted函数（触发一次）
    updata: function(){} //当组件更新的时候, 会执行updata函数, 可能会多次触发
		componentUpdated: function () {},
  	unbind: function () {}
})

//2.局部自定义属性,写在实例里的directives属性里
var app = new Vue({
  	el:"",
  	data:{},
    directives: {
        "color":{
           bind: function(){}, 
           inserted: function(){}, 
           updata: function(){} 
          
        }
        // 下面这个是简写方式: 简写的function等同于把代码写到了bind和updata函数中
        color: function(el, binding) {
            el.style.color = binding.value
        }
    }
})

~~~

**注意 ：不论是那种方式创建出来的组件，组件的template属性指向的模版内容，必须有且只能有一个唯一的根元素。**

## 指令

### v-cloak指令

使用v-cloak指令能够解决差值表达式闪烁的问题

```js
// 需要在样式中设置以下样式
<style>
    [v-cloak] {
        display: none;
    }
</style>

// 使用方式: 在我们使用差值表达式的标签添加该指令
<p v-cloak>{{ msg }}</p>
复制代码
```

### v-text指令

v-text 是没有闪烁的问题 但是 v-text 会覆盖元素中原本的内容，但是插值表达式只会替换自己的这个占位符，不会把整个元素的内容清空

```js
使用方式:
<p v-text>{{ msg }}</p>
复制代码
```

### v-html指令

v-html 会解析标签，以上两种不会，它也会更改元素中原本的内容

```js
使用方式：
new app({
    el: "#app",
    data: {
        msg: "<h1>我是一个标签元素</h1>"
    }
})
<p v-html="msg"></p>
复制代码
```

### v-bind指令

- v-bind： 是Vue中，提供的用来绑定属性的指令,只能实现数据的单向绑定,从M自动绑定到V,无法实现数据的双向绑定。
- 注意：v-bind： 指令可以被简写为 ：要绑定的属性
- v-bind 中可以写合法的js表达式

```js
// 使用方式:
<p v-bind:title="msg"></p>

简写方式:
<p :title="msg"></p>

// 属性中写js表达式
<p v-bind:title="msg+'合法表达式'"></p>

复制代码
```

#### 绑定class属性的用法

- 数组的写法

```js
// 直接传递一个数组, 数组里面的类名要写字符串, 注意:这里的class需要使用v-bind做数据绑定
使用方式：
<p :class="['thin', 'italic']"></p>
复制代码
```

- 数组中嵌套对象

```js
// 数组中推荐使用这种方式
使用方式：
<p :class="['thin', 'italic',{'active':flag}]"></p> // 这里的flag在data中定义, 是一个布尔值
复制代码
```

- 数组中使用三元表达式

```js
// data中定义一个布尔值类型的flag,在数组中用三元表示来显示这个flag
使用方式：
<p :class="['thin', 'italic', flag ? 'active':'noactive']"></p>
复制代码
```

- 直接使用对象

```js
// 在为class使用v-bind绑定对象的时候,对象的属性是类型,
// 由于对象的属性可带可不带引号,写法自己决定, 属性的值是一个标识符
使用方式: 
<p :class="{thin: true, italic: true, active: false}"></p>
复制代码
```

#### 绑定style属性的用法

- 直接在标签上通过 :style 的形式书写

```js
// 对象就是无序键值对的集合
使用方式：
<p :style="{color:'red', 'font-weight':200}"></p>
复制代码
```

- 将样式定义在data中, 在:style绑定的标签中引用

```js
// 先将样式定义在data中的一个变量身上
new app({
    el: "#app",
    data: {
        styleObject: {color:'red', 'font-weight':200}
    }
})
// 在标签上,通过属性绑定的形式,将样式对象应用到元素中
<p :style="styleObject"></p>
复制代码
```

- 在 :style 中通过数组, 引用多个 data 上的样式对象

```js
// 先将样式定义在data中的一个变量身上
new app({
    el: "#app",
    data: {
        styleObject1: {color:'red', 'font-weight':200},
        styleObject2: {color:'red', 'font-weight':200}
    }
})
// 在标签上,通过属性绑定的形式,将样式对象应用到元素中
使用方式：
<p :style="[styleObject1, styleObject2]"></p>
复制代码
```

### v-model指令

Vue中唯一一个实现双向数据绑定的指令, **注意 : 只能运用到表单元素中**

```js
使用方式:
<input v-model="msg"></input> // 修改imput输入框的值, 下面p标签绑定的内容会随之改变
<p>{{ msg }}</p>
复制代码
```

### v-for指令

- 在使用 v-for 指令的时候**要注意加上 key 属性**
- Vue2.2以后的版本规定,当前组件使用v-for循环的时候, 或者在一些特殊情况中, 如果v-for有问题, 必须在使用v-for的同时, 指定唯一的字符串/数组类型 :key值。
- v-for="(val, key) in list" // **in 后面可以放普通数组, 对象数组, 对象, 还可以放数字**

#### 迭代数组

```js
// 先在data上定义一个数组
new app({
    el: "#app",
    data: {
        list: [1, 2, 3, 4]
    }
})
使用方式：item是循环的每一项,list是循环的数组,index是索引值
<li v-for="(item, index)in list" :key="index">{{index}}~~~{{item}}</li>
复制代码
```

#### 迭代对象数组

```js
new app({
    el: "#app",
    data: {
        list:[{id:1,name:'tank1'}, {id:2,name:'tank2'}, {id:3,name:'tank3'}]
    }
})
使用方式：
<li v-for="(item, index)in list" :key="index">
  id:{{item.id}} --- 名字:{{item.name}} --- 索引{{index}}
</li>
复制代码
```

#### 迭代对象

```js
new app({
    el: "#app",
    data: {
        list: {
            name1: "abc1",
            name2: "abc2",
            name3: "abc3"
        }
    }
})
使用方式：在遍历对象身上的键值对的时候.除了有val、key, 在第三个位置还有一个索引index, 索引基本用不到
<li v-for="(val, key, index) in list" :key="index">
    值是:{{ val }} --- 键是: {{key}} --- 索引{{index}}
</li>
复制代码
```

#### 迭代数字

如果使用v-for迭代数字,前面的 count 从 1 开始

```js
使用方式：
<li v-for="(count, index) in 10" :key="index">这是第 {{count}} 次循环</li>
复制代码
```

### v-if 和 v-else 和 v-else-if 还有 v-show指令

如果元素涉及到频繁的切换,最好不要使用 v-if 而推荐使用 v-show

如果元素可能不太频繁被显示出来被用户看,推荐用 v-if 和 v-else

- v-if 和 v-else

```js
// v-if 的特点: 每次都会重新删除或创建元素
// v-if 有较高的切换性能消耗
// v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
使用方式：
new app({
    el: "#app",
    data: {
        flag: true // 定义一个变量为布尔值类型
    }
})
<p v-if="flag">我在flag为true的时候显示</p>  
<p v-else>我在flag不为true的时候显示</p>
复制代码
```

- v-show

```js
// v-show的特点: 每次不会重新进行DOM的删除和创建,只是切换了元素的display:none样式
// v-show有较高的初始渲染消耗
使用方式：
<p v-show="flag">我在flag为true的时候显示</p>
```





绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

用在普通元素上时，只能监听原生DOM事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

### 绑定事件机制

Vue中提供了v-on：绑定事件机制（冒号后面跟着事件名称）

```js
使用方式：
new app({
    el: "#ap",
    methods: {
        add () {
            alert("我是P标签的点击触发的")
        }
    }
})
<p v-on:click="add"></p>** // 注意: 绑定事件的触发方法需要在配置对象的methods属性中定义
简写方式:
<p @click="add"></p>
复制代码
```

#### 事件修饰符

Vue.js 为 `v-on` 提供了**事件修饰符**

```js
.stop - 调用 event.stopPropagation()。 // 阻止冒泡
.prevent - 调用 event.preventDefault()。// 阻止默认事件

//capture添加事件侦听器时使用事件捕获模式 //事件触发顺序从外往里
.capture - 添加事件侦听器时使用 capture 模式。 

// 只会组织自己身上冒泡行为的触发, 并不会真正阻止冒泡的行为
// self实现只有点击当前元素时候,才会触发事件处理函数
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。 

.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
使用方式: 
<p @click.stop="add"></p> // @事件.事件修饰符
复制代码
```

#### 按键事件keyup修饰符

- 自定义全局按键修饰符

```js
// 全局按键修饰符(所有的Vue实例都能调用)定义语法
创建方式：
// F2是定义键盘上的按键名称，等于号后面是对应的键盘码码值
Vue.config.keycodes.F2 = 113
复制代码
```

- Vue官方提供的按键修饰符

  格式：

  ~~~js
  v-on:keyup.按键名   或者   @keyup.按键名
  ~~~

  常用的按键名

```js
// 为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
.enter // 回车键抬起
.tab // tab切换键抬起
.delete (捕获“删除”和“退格”键)
.esc //退出键抬起
.space // 空格键抬起
.up // 上
.down // 下
.left // 左
.right // 右
.对应键盘码 // 使用键盘码是要注意如果不是以上对应的键盘修饰符，需要创建按键修饰符
使用方式:
<p @keyup.enter="add"></p> // @click.按键修饰符

<p @keyup.13="add"></p> // @click.对应键盘码
//按键码查询地址： https://www.bejson.com/othertools/keycodes/ 
复制代码
```

### Vue中的过滤器

自定义过滤器,可被用作于常见的文本格式化,用在两个地方,mustachc插值和v-bind表达式,过滤器添加在JS表达式尾部,由"管道"符指示

过滤器调用的时候,采用就近原则,如果私有过滤器和全局过滤器名称一致,优先调用私有过滤器

过滤器调用时的格式  {{ msg | myFilter }}

- 自定义全局过滤器

```js
// 注意: 函数内部第一个参数一定是你要过滤的这个msg
// 注意: 过滤器myFilter也可以进行传参
// 注意: 过滤器可以多次调用
创建方式:  // myFilter是过滤器的名字
Vue.filter("myFilter", function( msg ){
    return msg.toUpperCase()
})
复制代码
```

- 自定义局部过滤器

```js
new app({
    el: "#app",
    filters: {
        myFilter: function (val) {
            return val.toUpperCase()
        }
    }
})
复制代码
```

### Vue中的监听属性

#### watch属性

使用这个属性,可以监听data中数据的变化,然后触发这个watch中对应的属性处理函数

- 监听属性

```js
// watch可以用来监视一些非DOM元素的改变, 这就是他的优势
// watch是一个对象, 键是需要观察的表达式, 值是对应的回调函数
// 主要用来监听某些特定数据的变化,从而进行某也具体的业务逻辑操作,可以看做是computed和methods的结合体
使用方式:
new app({
    el: "#app",
    data: {
        count: 1
    },
    watch: {
        // 函数中有两个参数,一个是newVal, 一个是oldVal具体怎么用去看下官网 很简单
        count: function () {
            console.log("当data中的count属性的值发生变化时被我监听到了")
        }
    }
})
// 使用双向数据绑定count
<input >{{ count }}</input>
复制代码
```

- 监听路由 watch监视路由变化

```js
// 路由身上有一个this.$router.path属性, 指向当前路由的地址
使用方式: 
new app({
    el: "#app",
    data: {
        count: 1
    },
    watch: {
        // 函数中有两个参数,一个是newVal, 一个是oldVal具体怎么用去看下官网 很简单
        "$route.path": function(newVal, oldVal){
            // 在这里我们就可根据路由的变化去做一些认证, 跳转页面等等的操作
            console.log(`路由新地址${newVale}---路由旧地址${oldVal}`)
        }
    }
})
复制代码
```

#### computed属性

在 computed 中,可以定一些属性, 这些属性叫做计算属性

计算属性的本质就是一个方法, 只不过我们在使用这些计算属性的时候是吧它们的名称直接当做属性来使用的, 并不会把计算属性当做方法去调用

computed属性的结果会被缓存, 除非依赖的响应式属性变化才会重新计算, 主要当做属性来使用

```js
使用方式:
new app({
    el: "#app",
    data: {
        count: 1
    },
    computed: {
        countComputed () {
            return count + 1
        }
    },
    methods: {
        add () {
            count++
        }
    }
})
<button @click=add>自增</button> // 点击按钮的的时候count自增加1 
<input>{{ countComputed }}</input> // countComputed属性的值永远依赖于count, 并且比它大1

// 注意 : 计算属性在引用的时候一定不要加()去调用,直接把它当做普通属性去引用就好
// 注意 : 计算属性这个function内部所用到的任何data中的数据发生了变化,就会立即重新计算这个计算属性的值
// 注意 : 计算属性的求值结果会被缓存起来, 方便下次直接使用
// 注意 : 如果计算属性方法中, 所依赖的任何数据,都没有发生任何变化,则不会重新对计算属性求值
```

## 动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。 包括以下工具：

- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

#### Vue中的全程动画

第一步： 需要把动画控制的元素用一个transition元素包裹起来，这个元素是Vue官方提供的。

```
例如：
// <transition> <h3>我被transition元素包裹有了动画效果</h3> </transition>
复制代码
```

第二步： 需要在style中定义你要控制元素的动画效果, Vue官方提供了6个class切换。

```
<style>
    // 一般情况下， 元素的其实状态和终止状态的动画是一样的。
    // v-enter（这是一个时间点）是元素进入之前的其实状态，此时还没有开始进入。
    // v-lealve-to（这是一个时间点）是动画离开之后的终止状态，此时动画已经结束。
    v-enter, v-leave-to{
        opctity: 0 translateX(150px)
    }
    // v-enter-active是入场动画的时间段
    // v-leave-active是离场动画的时间段
    v-enter-active，v-leave-active{
        transition： all 0.4s ease
    }
</style>
复制代码
```

第三步： 可以给动画添加时间属性 :duration

```
// 设置 :duration="毫秒值" 属性来统一设置入场和离场动画的时长
例如：设置入场和离场的动画时长为200毫秒
<transition :duration="200"> <h3>我被transition元素包裹有了动画效果</h3> </transition>
// 可以给:duration的值为一个对象，分别设置入场和离场的动画时长
例如：
<transition :duration="{enter:200, leave:400}"> <h3>我设置了入场和离场的动画时长</h3> </transition>
复制代码
```

第四步： 我们可以自定义动画的前缀 v- 将其替换为自定义的

```
例如：
<style>
    my-enter, my-leave-to{
        opctity: 0 translateX(150px)
    }
    my-enter-active，my-leave-active{
        transition： all 0.4s ease
    }
</style>
<transition name="my"> <h3>自定义动画的v-前缀</h3> </transition>
复制代码
```

- 注意：在实现列表过滤的时候，如果需要过度的元素是通过v-for循环出来的，不能使用 transition 元素包裹，需要使用 transition-group 元素包裹。
- 注意：再给 transition 和 transition-group 元素添加 appear 属性，可以实现页面创建出来的入场时候的动画。
- 注意：通过为 transition 和 transition-group 元素设置 tag 属性来指定渲染的标签元素，如果不指定默认渲染为 span 标签元素。
- 注意：通过为 transition 和 transition-group 元素设置 mode 属性来提供过度模式

```
// 当前元素先进行过度，完成之后新元素过度进入
<transition mode="out-in"> <h3>设置动画过度模式</h3> </transition>
// 新元素先进行过度，完成之后当前元素过度离开
<transition mode="in-out"> <h3>设置动画过度模式</h3> </transition>
复制代码
```

#### Vue中的半程动画

```
// 第一步同样将被动画控制的元素用transition元素包裹起来
// 第二步调用钩子函数， 这里只介绍部分钩子，其余的动画钩子请移步到官网查看
<transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
>
<h1>半程动画</h1></transition>
// 第三步在配置对象中的methods属性中定义方法
new Vue({
    el: "#app",
    methods: {
        // 注意：动画钩子函数的第一个参数 el 表示要执行动画的那个DOM元素，是个原生的js DOM元素
        // beforeEnter函数表示动画入场之前，此时动画还未开始，此时编辑动画之前的样式
        beforeEnter (el) {
            el.style.transform = "translate(0,0)"
        },
        // enter函数表示动画开始之后，这里可以设置完成动画之后的结束状态
        enter (el) {
            // 注意：这里要加一句el.offsetWidth/Height/Left/Right,这句话没有实际的作用。
            // 但是如果不写，不会出来动画效果，这里可以认为它会强制动画刷新。
            el.offsetWidth
            el.style.transform = "translate(150px, 450px)"
            el.style.transiton = all 1s ease
            done()
        },
        // 动画完成之后会调用这个函数
        afterEnter (el) {
            // 这里写动画完成以后的样式
        }
    }
})
复制代码
```

- 注意：在只用JavaScript过度的时候，在enter和leave中必须使用done进行回调，否则他们将被同步调用，过度会立即完成，看不到动画效果。

#### Vue中使用第三方类实现动画（全程）

我们可以通过以下特性来自定义过渡类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。

例如： 引入第三方 Animate.css 动画库

```
// 在动画库中选取我们想要的动画效果名称，例如入场选 bounceln, 离场 bounceOut
<transition 
    enter-active-class="animated bounceln"
    leave-active-class="animated bounceOut"
> <h3>引用第三方动画库</h3> </transition>
复制代码
```

- 注意：在引用第三方动画库选定动画类的的时候还要在其前面加上一个基本的类animated

个人推荐在使用Vue的时候如果动画效果简单自己写就行，复杂的话在引用第三方动画库。而且在给元素添加动画的时候，要考虑清楚是加全程动画还是半程动画就够类。



