console.time()
let keyList = localStorage.getItem("__q__").replace(/^"|"$/g,'').split(/[|]/)
keyList = keyList.map((item)=>{return unescape(item)})
let key =[]
for (let i = keyList.length - 1; i > 0; i--) {
 if (keyList[i].includes("/flow/v3/shop/source/trend.json") && keyList[i].includes(`indexCode=uv&`) && keyList[i].includes(`pageId=23.5044`)) {
           key.push(keyList[i])
            
          }
        }
console.timeEnd()
console.log(key)