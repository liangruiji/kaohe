作用：用于同一管理组件的公共状态，改变公共状态。

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

![vuex](https://vuex.vuejs.org/vuex.png)

#### 仓库store结构

~~~js
// 0.导入
import Vue from 'vue'
import Vuex from 'vuex'
// 1. 声明使用vuex
Vue.use(Vuex)
// 2. 初始 state 对象
const store = new Vuex.Store({
  state: {//state属性保存着我们的状态,组件通过计算属性return this.$store.state.count获得后，在组件中使用
		count:1，
    product: 'car'
  },
  
  getters: {//  这个主要是对状态的处理，相当于把状态处理的方法抽成公共部分来管理了
    
  }
  
  mutations: {//需要修改store里面的状态时，我们不是在组件里面直接去修改它们，而是通过mutation里面的方法来进行修改，这样有利于追踪状态的改变，里面函数的第一个参数为store实例的状态对象state。
		add(state,！提交的额外参数) {//接受子组件methods参数里提交额外的参数
    	state.count++;
  	},
    changeProduct(state, payload) {
  		state.product = payload.change;
		}
  
	},
    
  actions: {//tion 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。
						//Action 可以包含任意异步操作。
						//前面说过mutation只能包含同步事务，所以在处理异步事务就需要Action，通过Action控制了异步这一						 //过程，之后再去调用mutation里面的方法来改变状态。
    changeProduct(context, payload) { // 这个context是一个与 store 实例具有相同方法和属性的对象
    // 调用mutation里的changeProduct方法
    // context.commit('changeProduct', {change: 'ship'});
    // 改成异步方式
    // setTimeout(() => {
    //   context.commit('changeProduct', {change: 'ship'});
    // }, 1500)
    // 使用载荷
    	let temp = 'ship+' + payload.extraInfo; 
   		setTimeout(() => {
      	context.commit('changeProduct', {change: temp});
    	}, 1500)
  	}
  }

	modules: {//声明模块的地方，每个模块有仓库的结构
  	moduleA: {state:{},getters:{},mutation:{},action:{}},
    moduleB: {state:{},getters:{},mutation:{},action:{}}
  },

})

~~~

1.mutations里的函数，函数的第一个参数都是仓库的state对象（状态对象），第二个可选参数是vue实例通过`this.$store.commit('mutations里的函数名，！向mutations里的函数传的额外参数')` 方法方法触发mutations里的函数时，传的额外参数，用于接收额外参数。

2.通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更，通过提交 mutation 的方式，而非直接改变 `store.state.count`

#### 组件获得在仓库的state属性保存的状态的方法

其他组件获取到state里面的状态的方式：通过计算属性来获得后，我们就可以在模板里面使用模板语法来调用计算属性count了

1.在vue实例中注册声明store，且子组件能通过 this.$store 访问到

2.子组件通过计算属性来获得store仓库里state属性里的状态属性： 

3.通过定义methods方法并绑定事件来触发仓库mutations里的事件，这里需要使用this.$store.commit(mutations中的事件名'，！额外提交参数')或者触发actions里的事件，使用this.$store.dispatch('actions'，！额外提交的参数)



~~~js
new Vue({
  el: '#app',
  // 1.这可以把 store 的实例注入所有的子组件中，且子组件能通过 this.$store 访问到
  store:store,
  components: { //components属性里创建Vue局部组件
  	btn:{
      //2.1子组件模板里面使用模板语法来调用count了
    	template: `<div>{{ count }}</div>`,			 
      computed: {
      //2.子组件通过计算属性来获得store仓库里state属性里的状态属性： 
    		 count () {
         	return this.$store.state.count
         }
      },
      //3子组件通过定义methods并绑定事件来触发仓库mutations里的事件，这里需要使用commit：
      methods: {
        //触发mutations里的事件
  			add() {																		//两种提交方式
    			this.$store.commit('add'，! 传递额外参数);//方式1.提交两个参数，传递额外参数
          store.commit({type: 'increment',！额外参数1: 10}) //方式2.提交一个对象，
 				},
        //触发action里的事件
         selectProduct() {
    		// this.$store.dispatch('changeProduct')
    		// 载荷方式分发
    		// this.$store.dispatch('changeProduct', {
   		  //   extraInfo: 'sportcar'
        // })
        // 或者这种
         this.$store.dispatch({
         	type: 'changeProduct',
         	extraInfo: '->sportcar'
        })
			}
      
  },
})

~~~

#### mapState 辅助函数

有时候需要获取多个状态，但是使用计算属性会调用多次，显得麻烦，这里借助mapState方法来获取state。 使用mapState需要引入该方法

#### 用法

mapState()可以传对象参数，也可以传字符串数组参数，**返回一个对象**。

1.**传对象**是原本计算属性的对象，但里面定义的方法第一个参数默认为this.$store.state

2.**传字符串数组**，表示计算属性名与仓库里状态属性名相同

```js
// 1.引入方法
import { mapState } from 'vuex'

export default {
  // ...
  //2.mapState()可以传对象参数
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
  
  //mapState()可以传传字符串数组
  computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
}
```

##### 展开运算符的使用

~~~js
computed: {
  localComputed () { /* ... */ },
  // 这里返回一个状态count，
  // 返回多个你可以这样写...mapState(['count', 'firstName', 'lastName'])
  ...mapState(['count'])
},

~~~

#### Getter

getter就是对状态进行处理的提取出来的公共部分，当状态要进行筛选这些操作时，我们可以通过getter处理过后再返回给组件使用，比如我们在state部分定义了一个list数组：

```
export default new Vuex.Store({
  state: {
    list: [1, 2, 3, 4, 5, 6, 7, 8]
  },
});
复制代码
```

我们想要筛选出数组里面的偶数然后再在组件里面使用，那么筛选的这个工作可以放在getter里面来完成。

```
export default new Vuex.Store({
  state: {
    list: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  getters: { //  这个主要是对状态的处理，相当于把状态处理的方法抽成公共部分来管理了
    modifyArr(state) { // 一般化getter
      return state.list.filter((item, index, arr) => {
        return item % 2 == 0;
      })
    },
    getLength(state, getter) { // 方法里面传getter，调用modifyArr来计算长度
      return getter.modifyArr.length;
    }
});
复制代码
```

之后再在其他组件的computed里面去调用getter来获取想要的状态

```
computed: {
    list() {
      return this.$store.getters.modifyArr;
    },
}
复制代码
```

#### **mapGetters**

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，当我们想在组件里面引入多个getter时，可以使用mapGetter：

```
import {mapGetters} from 'vuex';
复制代码
```

比如像刚才在在上面定义的modifyArr，getLength。我们想引入这个两个并获取其值：

```
computed: {
  ...mapGetter(['modifyArr', 'getLength'])
}
复制代码
```

你当然可以为其指定别名，不一定非得用store里面getters定义的名字：

```
computed: {
  mapGetter({
    arr: 'modifyArr',   // 把 `this.arr` 映射为 `this.$store.getters.modifyArr`,下面同理
    length: 'getLength'
  })
}
复制代码
```

如果你的computed属性包含其他计算方法，那你就只能使用展开运算符的写法，这里跟mapState有点区别，其他计算属性如果写在mapGetter里面会报错，说不存在的getter，所以用以下的写法：

```
computed: {
  msg() {
    return this.num * 10;
  },
  ...mapGetters([
    'modifyArr',
    'getLength'
  ])
}
复制代码
```

或者指定别名

```
computed: { 
  msg() {
    return this.num * 10;
  },
  ...mapGetters({
    getList: 'modifyArr',
    length: 'getLength'
  })
}
复制代码
```

然后再模板里面调用：

```
<template>
  <div>
    <h2>mapGetters的使用演示</h2>
    <p>你的数字：{{ msg }}</p>
    <p>你的数组长度为：{{ length }}</p>
    <ul>
      <li v-for="(item, index) in getList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
```

## Mutation

当我们需要修改store里面的状态时，我们不是在组件里面直接去修改它们，而是通过mutation里面的方法来进行修改，这样有利于追踪状态的改变。 比如state里面有一个count变量，我们点击加减按钮来控制它的值：

```
mutations: {
  add(state) {
    state.count++;
  },
  reduce(state) {
    state.count--;
  }
},
复制代码
```

在其他组件里面，我们通过定义methods并绑定时间来触发改变，这里需要使用commit：

```
methods: {
  add() {
    this.$store.commit('add');
  },
  reduce() {
    this.$store.commit('reduce');
  }
}
复制代码
```

### **提交载荷**

这个就是在commit时提交额外的参数，比如我传了额外的值加到count上面：

```
mutations: {
  loadAdd(state, payload) {  // 提交载荷，额外参数
    state.count += payload;
  }
},
复制代码
```

然后再组件里面使用：

```
methods: {
  loadAdd() {
    this.$store.commit('loadAdd', 100); // 传递额外参数
  }
}
复制代码
```

再这里官方文档建议载荷（也就是那个额外参数）最好使用对象来传，这样可以包含多个字段并且记录的 mutation 会更易读，像这样：

```
this.$store.commit('loadAdd', {
  extraCount: 100
}); // 传递额外参数
复制代码
```

调用commit时我们也可以把所有参数写在一个对象里面：

```
this.$store.commit( {
  type: 'addLoad'
  extraCount: 100
}); // 传递额外参数
复制代码
```

### Mutation 需遵守 Vue 的响应规则

这个主要是说你再开发过程中需要向state里面添加额外数据时，需要遵循响应准则。 这里我直接照搬官方文档的说明： Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

- 最好提前在你的 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象。例如，利用 stage-3 的对象展开运算符

我们可以这样写：

```
state.obj = { ...state.obj, newProp: 123 }
复制代码
```

还是举个栗子： 我在mutation里面声明了一个方法

```
addNewState(state, payload) { // 我打算再这儿添加新的属性到state
  // Vue.set(state, 'newProp', '添加一个新值！'); // 这是一种写法
  // 这种写法用新对象替换老对象
  // state= {...state, newProp: '添加一个新值！'} // 这个玩意儿不管用了，用下面的replaceState()方法
  this.replaceState({...state, newProp: '添加一个新值！'})
}
复制代码
```

然后再组件里面去调用，定义一个method：

```
addNewProp() {
  this.$store.commit('addNewState', {});
}
复制代码
```

这样再执行了这个方法后，会及时更新到state，再组件的computed属性里面定义：

```
newMsg() {
  return this.$store.state.newProp || '还没添加新值';
}
复制代码
```

在模板里面即时展示，并且不会影响其他状态：

```
<p>添加的新值：{{ newMsg }}</p>
<div><button @click="addNewProp">添加新值</button></div>
复制代码
```

### Mutation 必须是同步函数

下面这种写法必须避免（直接官方例子加持）：

```
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
复制代码
```

### mapMutations

这个跟前面的那几个函数一个道理，都是为了简化调用，使用方法如下：

```
import {mapMutations} from 'vuex';
复制代码
```

然后在组件的methods里面使用，这里使用官方代码：

```
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
复制代码
```

## 六、Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。 前面说过mutation只能包含同步事务，所以在处理异步事务就需要Action，通过Action控制了异步这一过程，之后再去调用mutation里面的方法来改变状态。 这里我直接贴代码来一目了然，首先我定义了一个状态product：

```
state: {
  product: 'car'
}
复制代码
```

然后再mutation中定义一个方法：

```
changeProduct(state, payload) {
  state.product = payload.change;
}
复制代码
```

在action中定义：

```
actions: {
  changeProduct(context, payload) { // 这个context是一个与 store 实例具有相同方法和属性的对象
    // 调用mutation里的changeProduct方法
    // context.commit('changeProduct', {change: 'ship'});
    // 改成异步方式
    // setTimeout(() => {
    //   context.commit('changeProduct', {change: 'ship'});
    // }, 1500)
    // 使用载荷
    let temp = 'ship+' + payload.extraInfo; 
    setTimeout(() => {
      context.commit('changeProduct', {change: temp});
    }, 1500)
  }
}
复制代码
```

在组件methods中定义事件触发分发：

```
methods: {
  selectProduct() {
    // this.$store.dispatch('changeProduct')
    // 载荷方式分发
    // this.$store.dispatch('changeProduct', {
    //   extraInfo: 'sportcar'
    // })
    // 或者这种
    this.$store.dispatch({
      type: 'changeProduct',
      extraInfo: '->sportcar'
    })
  }
},
复制代码
```

这样一个简易的action就完成了！

### mapActions

这里就不再赘述了，看名字就知道跟前面几个叫map开头的辅助函数类似，用来映射action里面的方法，这里也直接贴官方代码了：

```
import {mapActions} from 'vuex';
复制代码
export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
复制代码
```

有时候我们想知道action里面异步执行后的状态然后再去修改其他信息，这个可以借助Promise来实现。这里在state里面声明一个状态：

```
state: {
  userInfo: { // 这个变量用来测试组合变量
    name: 'lee',
    age: 23
  }
}
复制代码
```

接着声明mutation:

```
mutations: {
    // 以下用来测试组合action
    changeInfo(state, payload) {
      state.userInfo.name = 'lee haha';
    }
}
复制代码
```

声明action：

```
actions: {
  changeInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('changeInfo');
        resolve();
      }, 2000)
    })
  }
}
复制代码
```

这时我们在组件里面定义方法去派发这个action：

```
data() {
  return {
    status: '信息还没修改！'
  }
}
methods: {
  modifyInfo() {
    this.$store.dispatch('changeInfo').then(() => {
      this.status = '信息修改成功';
    });
  }
}
复制代码
```

模板展示：

```
<template>
  <div>
    <h2>组合action</h2>
    <p>{{ status }}</p>
    <p>{{ info.name }}</p>
    <div><button @click="modifyInfo">修改信息</button></div>
  </div>
</template>

复制代码
```

当我们点击修改信息后，就会派发action，当修改成功的时候会同步修改上面说的展示信息。 当然其他定义的action方法也可以互相使用，这里直接贴官方代码了：

```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  },
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
复制代码
```

## 七、Module

模块这部分正如其名，当所有状态集中在一个对象中时，会变的相当臃肿，这个时候就需要模块的管理办法。这里我还是用代码来说明，比如我在store里面定义了两个模块：

```
// 定义的模块A
const moduleA = {
  state: {
    name: 'lee',
    age: 23,
  },
  mutations: {

  },
  getters: {

  },
  actions: {

  }
};

// 定义模块B
const moduleB = {
  state: {
    name: 'wang',
    age: 22
  },
  mutations: {

  },
  getters: {

  },
  actions: {

  }
}
复制代码
```

然后再Vuex里面声明模块：

```
export default new Vuex.Store({
  modules: {
    ma: moduleA,
    mb: moduleB
  },
  state: {
    ........... // 其他状态
  }
});
复制代码
```

这样一来，如果我们想要在组件里面访问其他模块的状态，可以这样，比如这里我想调用B模块里的状态：

```
computed: {
  msg() {
    return this.$store.mb; // 这里返回的是：{name: 'wang', age: 22}
  }
}
复制代码
```

关于模块内部的局部状态，这里跟普通的store用法没有多大的区别，主要区别以下外部传进来的状态，比如对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState，这里截取官方代码：

```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

复制代码
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}

复制代码
```

那么对于getters、mutations、actions里面的方法我们像基本的store那样调用就可以了，不存在作用域限制，还是贴代码栗子吧，下面是我在store.js里面定义的模块B：

```
const moduleB = {
  state: {
    name: 'wang',
    age: 22,
    desc: 'nope'
  },
  mutations: {
    modifyDesc(state, payload) {
      state.desc = payload.newMsg;
    }
  },
  getters: {

  },
  actions: {

  }
}
复制代码
```

在组件里面，我定义了以下内容：

```
<template>
  <div>
    <h2>7、module使用示例</h2>
    <div>
      <p>名字：{{ name }}</p>
      <p>描述：{{ desc }}</p>
      <button @click="handleClick">修改描述</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.mb.name,
      // desc: this.$store.state.mb.desc 注意这个如果涉及到要在store里面会被改变的状态，一定要写在
      // computed属性里面，不然不能及时反馈到视图上
    }
  },
  computed: {
    desc() {
      return this.$store.state.mb.desc;
    }
  },
  methods: {
    handleClick() {
      this.$store.commit('modifyDesc', {newMsg: 'lao wang is beautiful!'});
    }
  },
}
</script>
复制代码
```

这样，就可以调用mutation里面的方法了，getters和actions同理

> 2019/09/09 补充余下内容

### 命名空间模块

默认情况下，mutations、actions、getters这些都是注册在全局上面的，你可以直接调用，如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。 首先我新建一个js文件用来声明模块C：

```
/* 
* 这个文件用来声明模块C
*/

export const moduleC = {
  namespaced: true,
  state: {
    name: 'moduleC',
    desc: '这是模块C，用来测试命名空间的！',
    list: [1, 2, 3, 4]
  },
  getters: {
    filterList(state) {
      return state.list.filter((item, index, arrSelf) => {
        return item % 2 !== 0;
      });
    }
  },
  mutations: {
    modifyName(state, payload) {
      state.name = payload.newName;
    }
  },
  actions: {
    
  }
}
复制代码
```

然后在store.js里面引入：

```
import { moduleC } from './module_c.js';

export default new Vuex.Store({
  modules: {
    mc: moduleC
  },
});
复制代码
```

要想这个模块成为带有命名空间的模块，在上面声明属性`namespaced: true`就可以了，那么里面的mutations、getters和actions里面的方法的调用就要多走一层路径，比如我在组件里面去调用mutations里面的方法（getters和actions同理）：

```
methods: {
  modify() {
    // this.$store.commit('mc/modifyName', {
    //   newName: '命名空间模块C'
    // })
    this.$store.commit({
      type: 'mc/modifyName',
      newName: '命名空间模块C'
    })
  }
}
复制代码
```

当然模块里面再嵌套模块也可以，路径要不要多走一层主要看你的`namespaced: true`有没有声明，这里贴一下官方的代码：

```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
复制代码
```

### 在带命名空间的模块内访问全局内容

如果想要在模块内部的getters、mutations和actions里面访问到全局的内容，这儿Vuex已经封装好了，你只需要多传几个参数即可。官方演示来一波，简单明了：

```
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
复制代码
```

### 在模块里面使用辅助函数mapState、mapGetters、mapMutations和mapActions

由于存在命名空间，在组件里面采用上面的写法会出现问题，这里要想使用辅助函数来映射模块里面的东西需要指定空间名称来告诉辅助函数应该去哪儿找这些。 这儿我以上面我的C模块为例，首先对于mapSatate函数可以这样玩，我在全局的modules里面声明了mc，那我的空间名称就是mc：

```
computed: {
  ...mapState('mc', ['name', 'desc']) // 这里模块里面要使用辅助函数的话要多传一个参数才行
}
复制代码
```

然后在模版里面写name，desc即可，或者可以这样：

```
computed: {
  ...mapState('mc', {
    name(state) {
      return state.name;
    },
    desc(state) {
      return state.desc;
    }
  })
},
复制代码
```

对于actions、mutations和getters方式类似，主要是要指定空间名称，比如对于声明的mutations：

```
methods: {
  ...mapMutations('mc', ['modifyName'])
}
复制代码
```

如果你确实不想在每个辅助函数里写空间名称，Vuex也提供了其它办法，使用`createNamespacedHelpers`创建基于某个命名空间辅助函数，它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapMutations } = createNamespacedHelpers('mc');
复制代码
```

这样你在写辅助函数的时候就不需要单独指定空间名称了。 其它类似，恕我就不再赘述了！





作者：CookiePool
链接：https://juejin.im/post/6844903937745616910
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。