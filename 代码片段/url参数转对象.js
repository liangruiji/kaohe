// 用正则的快很多
function getUrlParam1(url) {
    var T = {};
    decodeURIComponent(url)['replace'](/([^?&=]+)=([^&#]+)/g, function(U, V, W) {
        return T[V] = W;
    })
    return T;
}
// 用URLSearchParams的慢很多
function getUrlParam(url) {
    let val = new URLSearchParams(new URL(url).search)
    val = Object.fromEntries(val)
    return val
}
console.time()
for(let i = 0;i<100000;i++){
    getUrlParam('https://sycm.taobao.com/portal/home.htm?activeKey=operator&dateRange=2022-08-24%7C2022-08-24&dateType=day&ll=true')
}
console.timeEnd()