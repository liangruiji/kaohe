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

