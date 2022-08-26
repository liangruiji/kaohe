let val ="//sycm.taobao.com/portal/common/alias/group.json?group=sycm"
// let val = '//sycm.taobao.com/datawar/common/alias/group.json?group=sycm'

if (JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))['value']['_d']) {
    JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))
    //['value']['_d']
} else {
    JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))['value']
}
let aa = JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))['value']['_d']
let bb = {}
aa.map((item)=>{
    bb[item['value']] = item['text']

}
)
console.log(aa)
console.log(bb)
