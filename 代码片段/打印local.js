let val = "//sycm.taobao.com/portal/common/alias/group.json?group=sycm"

if (JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))['value']['_d']) {
    JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))
    //['value']['_d']
} else {
    JSON.parse(JSON.parse(localStorage.getItem(val).replace(/\d+\|/g, '')))['value']
}
