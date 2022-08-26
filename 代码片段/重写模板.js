// let aa = Node.prototype.removeChild
// Node.prototype.removeChild = function() {
//     console.dir(this)
//     if (this.id.includes('xws')) {
//         return
//     }
//     return aa.apply(this, arguments)
// }
// var cc = document.querySelector('#xws-cc-newitem-analysis-latest-items')
// var dd = document.querySelector('#xws-cc-newitem-analysis-latest-items .xws-cur-button')
// cc.removeChild(dd)

// let aa =  MutationObserver.prototype.observe
//    MutationObserver.prototype.observe=function(){

//      let str = aa.apply(this, arguments)
//      console.dir(arguments)
// return str
// }

let aa = Storage.prototype.setItem
Storage.prototype.setItem = function() {

    let str = aa.apply(this, arguments)
   
    if (arguments[0].includes("/qos/operationalEffect/trend.json?")) {
        console.dir(arguments)
    }

    return str
}
