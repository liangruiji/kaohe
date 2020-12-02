#### 使用

#### 方案一

在 vue 组件的 `mounted()` 中监听回车按键按下

```jsx
    let self = this
    document.onkeydown = function(e) {
      let ev = document.all ? window.event : e
      if (ev.keyCode === 13) {
        self.login()
      }
    }
```

#### 方案二

使用 `v-on:keyup.enter`  或 `@keyup.enter

```csharp
<input v-on:keyup.enter="submit">
```

在 ElementUI 中需要加一个 `native` 属性

```kotlin
<el-input v-model="form.name" placeholder="昵称" @keyup.enter.native="submit"></el-input>
```

### 注意

在 Vuetify 或 ElementUI  `input` 中一般没问题, 在其他地方有时候会出现事件绑定无效的情况

作者：情义w
链接：https://www.jianshu.com/p/bcd56c96ae25
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



#### 背景

在一些搜索框中，我们往往需要监听键盘的按下(`onkeydown`)或抬起(`onkeyup`)事件以进行一些操作。在原生js或者jQuery中，我们需要判断`e.keyCode`的值来获取用户所按的键。这样就存在一个问题：我们必须知道某个按键的`keyCode`值才能完成匹配，使用起来十分不便。

| keyCode  | 实际键值              |
| -------- | --------------------- |
| 48到57   | 0到9                  |
| 65到90   | a到z（A到Z）          |
| 112到135 | F1到F24               |
| 8        | BackSpace（退格）     |
| 9        | Tab                   |
| 13       | Enter（回车）         |
| 20       | Caps_Lock（大写锁定） |
| 32       | Space（空格键）       |
| 37       | Left（左箭头）        |
| 38       | Up（上箭头）          |
| 39       | Right（右箭头）       |
| 40       | Down（下箭头）        |

> 参考：[JavaScript 获取键盘事件(键盘某个按键被按下)](https://blog.csdn.net/helloxiaoliang/article/details/72686648)

#### 方案

在Vue中，已经为常用的按键设置了别名，这样我们就无需再去匹配`keyCode`，直接使用别名就能监听按键的事件。

```vue
<input @keyup.enter="function">1
```

| 别名    | 实际键值                                   |
| ------- | ------------------------------------------ |
| .delete | delete（删除）/BackSpace（退格）           |
| .tab    | Tab                                        |
| .enter  | Enter（回车）                              |
| .esc    | Esc（退出）                                |
| .space  | Space（空格键）                            |
| .left   | Left（左箭头）                             |
| .up     | Up（上箭头）                               |
| .right  | Right（右箭头）                            |
| .down   | Down（下箭头）                             |
| .ctrl   | Ctrl                                       |
| .alt    | Alt                                        |
| .shift  | Shift                                      |
| .meta   | (window系统下是window键，mac下是command键) |

另外，Vue中还支持组合写法：

| 组合写法                 | 按键组合     |
| ------------------------ | ------------ |
| @keyup.alt.67=”function” | Alt + C      |
| @click.ctrl=”function”   | Ctrl + Click |

> 参考：[vue 监听键盘回车事件 @keyup.enter || @keyup.enter.native](https://blog.csdn.net/fifteen718/article/details/80359844)

#### 注意

但是，如果是在自己封装的组件或者是使用一些第三方的UI库时，会发现并不起效果，这时就需要用到`.native`修饰符了，如：

```vue
<el-input
  v-model="inputName"
  placeholder="搜索你的文件"
  @keyup.enter.native="searchFile(params)"
  >
</el-input>123456
```

如果遇到`.native`修饰符也无效的情况，可能就需要用到`$listeners`了，具体用法请参考Vue官方文档：[将原生事件绑定到组件](https://cn.vuejs.org/v2/guide/components-custom-events.html#将原生事件绑定到组件)。