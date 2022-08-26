let pageKeyOne = `//sycm.taobao.com/ebda/overview/listBrand.json?contentType=simple&dateRange=2022-06-19|2022-06-19&dateType=day&device=0`
console.log(pageKeyOne)

let pageData = []
let getData = (arr,cb)=>{
    let localStorageLen = localStorage.length
    console.log('>>>>1')
    for (let i = 0; i < localStorageLen; i++) {
        let localStorageKey = localStorage.key(i)
        let isChecked = true
        for (let j = 0; j < arr.length; j++) {
            if (!localStorageKey.includes(arr[j])) {
                isChecked = false
                break
            }
        }
        if (isChecked) {
            console.log('>>>>2')
            let data = localStorage.getItem(localStorageKey)
            if (data) {
                console.log('>>>>3')
                data = JSON.parse(JSON.parse(data.replace(/\d+\|/g, '')))['value']['_d']['data']
                cb(data, localStorageKey)
            }
        }
    }
}
getData([pageKeyOne], data=>{
    console.log(data)
    pageData.push(...data)
}
)
console.log(pageData)
