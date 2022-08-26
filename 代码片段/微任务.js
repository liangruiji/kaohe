// console.log('1')
// fetch("https://cdn.bootcdn.net/ajax/libs/localforage/1.9.0/localforage.js").then(function(o) {
//     console.log("fe")
//     return o.text()
// }).then((r)=>{
//     console.log("fe2")
//     window.eval(r)
// }
// )
// console.log('2')

// setTimeout(function() {
//     Promise.resolve(1).then(function() {
//         console.log("4")
//     })
//     console.log(">>>")
// }, 20)

// Promise.resolve(1).then(function() {
//     console.log("3")
// })

var aa = new Promise((resolve, reject)=>{  
    Promise.resolve().then(()=>{  
        resolve(1);  
        Promise.resolve().then(()=>{console.log(2)})  
    })  
}).then((value)=>{console.log(value)});  
console.log(3);