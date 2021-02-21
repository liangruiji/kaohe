[TOC]

#### Watch概述

    一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

##### 简单的监听

```javascript
<body>
<div id="app">
    <input type="text" v-model="num">
</div>
<script src="vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            num: ''
        },
        watch: {
            num(newVal, oldVal) {
            // 监听 num 属性的数据变化
    		// 作用 : 只要 num 的值发生变化,这个方法就会被调用
    		// 第一个参数 : 新值
    		// 第二个参数 : 旧值,之前的值
                console.log('oldVal:',oldVal)
                console.log('newVal:',newVal)
            }
        }
    })
</script>
</body>
123456789101112131415161718192021222324
```

##### immediate（立即处理 进入页面就触发）

```javascript
<body>
<div id="app">
    <input type="text" v-model="num">
</div>
<script src="vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            num: 1
        },
        watch: {
            num: {
            	// 数据发生变化就会调用这个函数  
                handler(newVal, oldVal) {
                    console.log('oldVal:', oldVal)
                    console.log('newVal:', newVal)
                },
                // 立即处理 进入页面就触发
                immediate: true
            }
        }
    })
</script>
</body>
12345678910111213141516171819202122232425
```

##### deep（深度监听）

    对象和数组都是引用类型，引用类型变量存的是地址，地址没有变，所以不会触发watch。这时我们需要进行深度监听，就需要加上一个属性 deep，值为 true

```javascript
<body>
<div id="app">
    <input type="button" value="更改名字" @click="change">
</div>
<script src="vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            food: {
                id: 1,
                name: '冰激凌'
            }
        },
        methods: {
            change() {
                this.food.name = '棒棒糖'
            }
        },
        watch: {
        	// 第一种方式：监听整个对象，每个属性值的变化都会执行handler
        	// 注意：属性值发生变化后，handler执行后获取的 newVal 值和 oldVal 值是一样的
            food: {
                // 每个属性值发生变化就会调用这个函数
                handler(newVal, oldVal) {
                    console.log('oldVal:', oldVal)
                    console.log('newVal:', newVal)
                },
                // 立即处理 进入页面就触发
                immediate: true,
                // 深度监听 属性的变化
                deep: true
            },
            // 第二种方式：监听对象的某个属性，被监听的属性值发生变化就会执行函数
            // 函数执行后，获取的 newVal 值和 oldVal 值不一样
            'food.name'(newVal, oldVal) {
                console.log('oldVal:', oldVal)   // 冰激凌
                console.log('newVal:', newVal)   // 棒棒糖
            }
        }
    })
</script>
</body>
12345678910111213141516171819202122232425262728293031323334353637383940414243
```

#### Watch和computed的区别

**Watch**

    watch用于观察和监听页面上的vue实例，当你需要在数据变化响应时，执行异步操作，或高性能消耗的操作，那么watch为最佳选择

**computed**

    可以关联多个实时计算的对象，当这些对象中的其中一个改变时都会触发这个属性
    具有缓存能力，所以只有当数据再次改变时才会重新渲染，否则就会直接拿取缓存中的数据。