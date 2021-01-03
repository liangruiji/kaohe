~~~js
// 0.导入
import Vue from 'vue'
import Vuex from 'vuex'
// 1. 声明使用vuex
Vue.use(Vuex)
// 2. 初始 state 对象
const store = new Vuex.Store({
  state:{//state属性保存着我们的状态,组件通过计算属性返回return this.$store.state.todos获得后，在组件中使用
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {//可以认为是 store 的计算属性,里面函数的第一个参数是  state，组件通过计算属性返回return this.$store.getters.doneTodos获得后，在组件中使用 
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
   mutations: {//保存一些 修改state属性里的状态的方法,组件通过提交 mutation来触发这里的方法来改变state中的状态
    addtodo(state,！接收组件额外提交的参数) {
      // 变更状态
      state.todos.push({id:3,done:true})
    }
  },
   actions: {
    ddaddtodo (context,！接收组件额外提交的参数) {//Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
      context.commit('addtodo')
    }
  }
  
})
~~~

1.state属性是一个 **保存着我们的状态属性** 的**对象**，

使用方法：

​	1.在组件通过computed计算属性返回return this.$store.state.todos获得后，在组件中使用

~~~js
  computed: {
    todos () {
      return this.$store.state.todos
    }
  }
~~~

​	2.在组件通过computed计算属性使用 **mapState( )** 辅助函数，在组件中使用

参数的两种形式：

1.可传传对象参数

2.传字符串数组参数   条件：计算属性名与state对象里的属性一致时才能传入字符串数组

~~~js
	import { mapState } from 'vuex'
  computed: {//计算属性是一个方法
   //**mapState( )** 辅助函数的使用
   // 1.传对象参数 
  ...mapState({//mapState返回的是一个对象，所以需要使用展开运算符
    todos: state => state.todos//1.1 计算属性名:箭头函数（this.$store.state）=>{}
    todos: 'todos',            //1.2 计算属性名:'state对象里的属性名字符串'
    todos(state){}             //1.3 为了能够使用 `this` 获取局部状态，必须使用常规函数
  	})
    
   //2.传字符串数组参数，计算属性名与state对象里的属性一致时才能传入字符串数组
  ...mapState(['todos',！'第二个state对象里的属性'])
  }
~~~



2.getters属性是一个 **保存着store的计算属性** 的**对象**，计算属性函数第一个参数是 state属性 ，

作用：从 store 中的 state属性 中派生出一些状态

使用方法：

​	1在组件通过计算属性返回return this.$store.getters.doneTodos获得后，在组件中使用

​	2.在组件通过computed计算属性使用 **mapGetters( )** 辅助函数，在组件中使用



3.Mutation属性是一个 **保存一些 修改state属性里的状态的方法** 的对象 ，方法第一个参数是 state属性 

作用：改变state中的状态， 组件通过提交 `this.$store.commit('mutations中的方法名')`触发mutation中的方法来更改 state中的状态，  唯一方法

~~~js
 mutations: {//保存一些 修改state属性里的状态的方法,组件通过提交 mutation来触发这里的方法来改变state中的状态
    addtodo(state,！接收组件额外提交的参数) {
      // 变更状态
      state.todos.push({id:3,done:true})
    }
  },
~~~

#### 注意：

**1.3.Mutation 函数第一个参数是与 store 实例的 state 对象，因此你可以通过state.属性名来访问并改变状态属性**

**2.3.Mutation 函数第二个参数是 接收组件额外提交的参数，为可选参数**

使用方法：

​	1.在组件中methods的方法中使用 `this.$store.commit('mutations中的方法名',！额外提交的参数)` 提交 mutation

​	2.使用mapMutations，使用方法 参数为字符串数组  和  参数为对象

~~~js

 //使用方法1
 methods: {
 		add() {
      // commit()提交的两种方式
      // 1.参数为 mutations中的方法名和额外提交的参数 两个参数
    	this.$store.commit('addtodo', 100); // 传递额外参数
      // 2.参数为 一个包含 type 属性的对象 
      this.$store.commit({type:'addtodo', count:100});
  	}
  }
 //使用方法2
 methods: {
   	// mapMutations的参数右两种形式
   
    ...mapMutations([// 1. mapMutations的参数为 字符串数组 时，
      'addtodo', // 将 `this.addtodo()` 映射为 `this.$store.commit('addtodo')`

      // `mapMutations` 也支持载荷：
      'addtodoBy' // 将 `this.addtodoBy(amount)` 映射为 `this.$store.commit('addtodoBy', amount)`
    ]),
    ...mapMutations({// 2.mapMutations的参数为 对象 时，
      add: 'addtodo' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
~~~



4.Action属性是一个 **保存一些 提交mutation的方法** 的对象

~~~js
actions: {
    ddaddtodo (context,！接收组件额外提交的参数) {//Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
      context.commit('addtodo')
    }
~~~

#### 注意：

**1.Action 函数第一个参数是与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation**

**2.Action 函数第二个参数是 接收组件额外提交的参数，为可选参数**

使用方法

​	1.在组件中使用 `this.$store.dispatch('action中的方法名')` 触发 action中的方法

​	2.使用 `mapActions` 辅助函数，使用方法 参数为字符串数组  和  参数为对象，使用方法与mapMutations相同

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

5.模块