let actions = {
    0:'打印后五个',
    1:'打印包含某个关键字且有页数的key',
    2:"打印包含某个关键字的所有key"
}
let action = actions[0]

// 获得__q__数组

let keyList = localStorage.getItem("__q__").replace(/^"|"$/g,'').split(/[|]/)
keyList = keyList.map((item)=>{return unescape(item)})
console.log('生意参谋__q__:',keyList)


if(action=='打印后五个'){
    for (let i = keyList.length - 1; i > keyList.length-15; i--) {
        let data = localStorage.getItem(keyList[i]).replace(/\d+\|/g, '')
        data = JSON.parse(JSON.parse(data))
        console.log(keyList[i])
        console.dir(data)
    }
}
if(action=='打印包含某个关键字且有页数的key'){
    let key = {}
    let keyWord = 'list.json'
    for (let j = 1; j <= 3; j++) {
        for (let i = keyList.length - 1; i > 0; i--) {
            if (keyList[i].includes(keyWord) && keyList[i].includes(`page=${j}`)) {
                key[j] = keyList[i]
                break
            }
        }
    }
console.log(key)
}

if(action=='打印包含某个关键字的所有key'){
    let key = {}
    let keyWord = 'trend.json'
    let count = 1
        for (let i = keyList.length - 1; i > 0; i--) {
            if (keyList[i].includes(keyWord) && keyList[i].includes(`23.5044`)) {
                key[count] = keyList[i]
                count++               
            }
        }
    
console.log(key)
}
// let b =  localStorage.getItem(a[a.length-1]).replace(/\d+\|/g, '')
// .replace(/^\"|\"$/g,'').replace(/^\"|\"$/g,'').replace(/\d+\|/g, ''))
// console.log(a[a.length-1],b)
// let val = JSON.parse(JSON.parse(b)).value._d
// console.log(val)
// JSON.parse(Dstr(val))


//  data = JSON.parse(JSON.parse(data)).value._d
// data = JSON.parse(Dstr(data)).data