console.time()
let keyList = localStorage.length
let key = []
for(let i = 0;i<keyList;i++){
 if(localStorage.key(i).includes("/flow/v3/shop/source/trend.json") && localStorage.key(i).includes(`indexCode=uv&`) && localStorage.key(i).includes(`pageId=23.5044`)){
        key.push(localStorage.key(i))
}
}
console.timeEnd()
console.log(key)