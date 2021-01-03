实例解析防抖动（Debouncing）和节流阀（Throttling）

https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/

# [JavaScript：函数防抖与函数节流](https://segmentfault.com/a/1190000018266110)

[javascript](https://segmentfault.com/t/javascript)

发布于 2019-02-24

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000018266110&referer=https%3A%2F%2Fsegmentfault.com%2Fblog%2Fmynotes&cb=8df7a396ac)

## 防抖（debounce）

**名词解释：**在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。

**使用场景：**以百度输入框例，比如你要查询XXx，想实现输完了XXx之后，再进行搜索请求，这样可以有效减少请求次数，节约请求资源。

**函数防抖简单实现**

```
<script type="text/javascript">
    window.onload = function () {            
        function ajax(content) {//模拟ajax请求
            console.log('ajax request ' + content)
        }
        function debounce(fun, delay) {
            return function (arguments) {
                //获取函数的作用域和变量
                let that = this;
                let args = arguments;                    
                clearTimeout(fun.id)// 清除定时器
                fun.id = setTimeout(function () {
                    fun.call(that, args )
                }, delay)
            }
        }            
        let debounceAjax = debounce(ajax, 1000)
        XXX.addEventListener('keyup', function (e) {
            debounceAjax(e.target.value)
        })
    }
</script>
```

## 节流（throttle）

**名词解释：**连续执行函数，每隔一定时间执行函数。规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

**使用场景：**鼠标连续多次click事件，mousemove 事件，监听滚动事件，比如是否滑到底部自动加载更多等等...

**函数节流简单实现**

```
function throttle(fn, delay) {
    let lastTime; 
    let timer; 
    delay || (delay = 300); // 默认间隔为300ms
    return function(arguments) {
        let context = this;
        let args = arguments;
        let nowTime = +new Date(); // 获取系统当前的时间
        if (lastTime && nowTime < lastTime+ delay) { // 当前距离上次执行的时间小于设置的时间间隔
            clearTimeout(timer); // 清除定时器
            timer = setTimeout(function() { // delay时间后，执行函数
                lastTime= nowTime ;
                fn.apply(context, args);
            }, delay);
        } else { // 当前距离上次执行的时间大于等于设置的时间，直接执行函数
            lastTime= nowTime ;
            fn.apply(context, args);
        }
    };
}
```

## 区别:

可以用日常进入电梯来举例，形象地描述节流和防抖的区别

**函数防抖：**如果A在10：00:00开门走入电梯内（触发事件），如果后续没有人进入电梯，电梯将在5秒钟之后10：00:05关门（执行事件监听器）。这时如果B在10：00:04走入电梯内，电梯会在10：00:09才关门。

**函数节流 ：**如果A在10：00:00开门走入电梯内（触发事件），如果后续没有人进入电梯，电梯将在5秒钟之后10：00:05关门（执行事件监听器）。这时如果B在10：00:04走入电梯内，电梯同样是在10：00:05关门。这个时间从第一个人进入电梯开始计时，不管在5秒之内进来多少人，电梯都会在10：00:05关门。如果一直没有人进来，则电梯不运行。

## 总结:

根据实际业务场景，合理的利用debounce（防抖）和throttle（节流）可以优化性能和提高用户体验。

**效果：**
函数防抖是某一段时间内只执行一次；
函数节流是间隔时间执行，不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。

**原理：**
防抖是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，都会清除当前的 timer 重新计时。这样一来，只有最后一次操作事件才被真正触发。
节流是通过判断是否到达一定时间来触发函数，若没到规定时间则使用计时器延后，而下一次事件则会重新设定计时器。