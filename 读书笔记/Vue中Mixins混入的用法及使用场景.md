https://segmentfault.com/a/1190000015698391

##### 什么时候使用`Mixins`

页面的风格不用，但是执行的方法和需要的数据类似，我们是选择每个都写呢还是提取出公共部分呢？

##### 使用步骤

##### 基础实例

> 我们有一对不同的组件，它们的作用是切换一个状态布尔值，一个模态框和一个提示框。这些提示框和模态框除了在功能上，没有其他共同点：它们看起来不一样，用法不一样，但是逻辑一样。

```
// 模态框
const Modal = {
  template: '#modal',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}
// 提示框
const Tooltip = {
  template: '#tooltip',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}
```

> 解决办法如下：

```
const toggle = {
    data () {
        isshowing: false
    },
    methods: {
        toggleShow() {
            this.isshowing = !this.isshowing
        }
    }
}

// 下面即可使用了
// mixins: [变量名]

const Modal = {
  template: '#modal',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};

const Tooltip = {
  template: '#tooltip',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};
```

> 如果你是以vue-cli创建的项目来写，可以这样

```
// mixin.js

export const toggle = {
    data () {
        isshowing: false
    },
    methods: {
        toggleShow() {
            this.isshowing = !this.isshowing
        }
    }
}
// modal.vue
// 将mixin引入该组件，就可以直接使用 toggleShow() 了
import {mixin} from '../mixin.js'

export default {
    mixins: [mixin],
    mounted () {
        
    }
}
// tooltip组件同上
```

------

**合并**

当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。

> 一、数据对象内

mixin的数据对象和组件的数据发生冲突时以组件数据优先。

```
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

> 二、钩子函数

同名钩子函数将会混合为一个数组，都将被调用到，但是混入对象的钩子将在组件自身钩子之前调用。

```
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

> 三、值为对象的选项

值为对象的选项，例如 `methods`, `components` 和 `directives`，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

------

**全局混入**

全局混合被注册到了每个单一组件上。因此，它们的使用场景极其有限并且要非常的小心。一个我能想到的用途就是它像一个插件，你需要赋予它访问所有东西的权限。但即使在这种情况下，我也对你正在做的保持警惕，尤其是你在应用中扩展的函数，可能对你来说是不可知的。

```
Vue.mixin({
    mounted() {
        console.log("我是mixin");
    }
})

new Vue({
    ...
})
```

再次提醒，小心使用它！那个 console.log将会出现在每个组件上。这种情况还不算坏（除了控制台上有多余的输出），但如果它被错误的使用，你将能看到它会多么的有害。

> 一个使用合理的例子

```
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

------

**总结**

混合对于封装一小段想要复用的代码来讲是有用的。对你来说它们当然不是唯一可行的。混合很好，它不需要传递状态，但是这种模式当然也可能会被滥用。所以我们还是需要仔细斟酌使用喽！！

**例子**

```
import {mapGetters} from 'vuex'

// 目的是想要处理 scroll 的bottom值，在含有playlist列表的情况下
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 如果组件中没有这个方法，那么就报错
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
```