## Promise

![promise](https://www.liaoxuefeng.com/files/attachments/1027242914217888/l)

~~~js
//创建实例
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);//resolve函数改变成成功状态,value为传入成功时调用的函数的参数
  } else {
    reject(error);//error函数改变成失败状态，error为传入失败时调用的函数的参数
  }
});
//then里第一个是成功时调用的函数，
promise.then(function(v){},！function(e){})

~~~



#### promise().then().then....catch() 多任务串行执行.

#### Promise.all([p1,p2,...]) .then多任务并行执行

都要成功才进入then,返回结果数组.

#### Promise.race([p1,p2,...]).then 多任务赛跑.

then()和catch(),谁先调用算谁的,其它任务中断.



使用

~~~js
function a(){
 return new Promise(resolve=>{
	//异步代码	
	getData().then(res=>{
		resolve(res)
	})
})
}
a().then(res=>{
  log(res)
})


~~~

~~~js
常见的promsie用法是
return  new Promise((resolve,reject)=>{
          setTimeout(()=>{resolve('a')},3000)    //异步代码

}).then(res=>{console.log(res)})  //输出  a
~~~

https://blog.csdn.net/yunchong_zhao/article/details/104009851

我创建了三个 里面含有异步执行的函数体

~~~js
var runA=function(){
       return new Promise((resolve,reject)=>{
         setTimeout(function(){
           console.log('3秒后 runA方法执行完毕')
           resolve(new Date())
         },3000)
       })
     }
     var runB=function(){
       return new Promise((resolve,reject)=>{
         setTimeout(function(){
           console.log('6秒后 runB方法执行完毕')
           resolve(new Date())
         },6000)
       })
     }
     var runC=function(){
       return new Promise((resolve,reject)=>{
         setTimeout(function(){
           console.log('9秒后 runC方法执行完毕')
           resolve(new Date())
         },9000)
       })
     }
     Promise.all([runB(),runA(),runC()]).then((res)=>{console.log(res)}) 
~~~



我们先测试 promise.all方法  因为这个方法我在工作中也曾经用过

Promise 的 all() 方法提供了并行执行异步操作的能力，即在所有异步操作执行完后才执行回调， all()里面接收一个数组，数组中每个元素都返回一个 promise 对象。

console.log(new Date());  //代码开始时间
     // // Promise.all 放进去所有异步执行代码 最后统一返回结果
Promise.all([runB(),runA(),runC()]).then((res)=>{console.log(res)}) //这里我特意将 runA和runB方法 在数组中的位置更换了一下

![img](https://img-blog.csdnimg.cn/20200116193318813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1bmNob25nX3poYW8=,size_16,color_FFFFFF,t_70)

可以看到虽然 我在数组中更换了 俩个方法的 位置但是执行上 还是 方法runA先执行的 而且看执行时间也是 几个异步函数并行执行 所以所有的执行完成总共花了 9秒钟 这样可以看出promise.all的执行时间取决于 执行时间最长的哪一个函数

不过 回来的数据顺序还是 按照 数组中的 位置排列的 虽然 runA方法先执行的 但结果还是 在执行返回的 结果数组中的第二个位置

所以 promise.all 可以用来执行 不关心 执行顺序 只关心 回来结果的顺序的 那种需求

2.那我们再来看看 async和await

 function getDate(){
       var runb=await runB();
       var runa=await runA();
       var runc=await runC();
       console.log('3000',runa);
       console.log('6000',runb);
       console.log('9000',runc);
     }
     getDate();

![img](https://img-blog.csdnimg.cn/20200116194120907.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1bmNob25nX3poYW8=,size_16,color_FFFFFF,t_70)

对比 promise.all 是不是 一目了然了 

async 和awiat 搭配使用 让方法 同步执行 方法就是按照程序的书写顺序依次执行的

虽然 runb在后面打印出来 但它的执行时间确实早于runa 用的总时长 是 所有执行时间的总和 也就是 9+6+3 18秒

这个可以从 执行开始的时间 39.55 到 40.13可以看出来 刚好差距 18秒

所以 如果你关心 函数的执行顺序的话 最好使用 async和await  但是这样的话 执行时间好像就有点长了 看实际需求吧

https://blog.csdn.net/qq_42345906/article/details/108079942
