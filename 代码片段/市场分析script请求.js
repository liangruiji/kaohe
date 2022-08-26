console.log(new Date().toJSON())
let i = 1
function aa() {
    return i++
}

function getdata(page) {
    // let href = "https://s.taobao.com/search"
    let href = window.location.href
    let base = href.split('?')[0]
    let params = href.split('?')[1]
    let s = page - 2 > 0 ? page - 2 : 0
    params = params.replace(/&s=\d+/, `&s=${s * 44}`)
    // params = params.replace(/&q=[^&]+/, `&q=手机`)
    let data = {
        "data-key": "s",
        "data-value": (page - 1) * 44,
        "ajax": true,
        "_ksTS": +new Date() + '_' + aa(),
        "callback": "kkk"
    }
    let dataParams = Object.keys(data).map(item=>{
        let ret = item + '=' + data[item] + '&'
        return ret
    }
    )
    dataParams = dataParams.join('')

    let url = `${base}?${dataParams}${params}`
    injectjs(getfun, url)
    // let script = document.createElement('script')
    // let act = {
    //     act: '市场分析',
    //     tid: '1'
    // }
    // script.setAttribute('params', JSON.stringify(act))

    // script.src = url

    // let head = document.getElementsByTagName("head")[0] || document.documentElement
    // head.insertBefore(script, head.firstChild)
}
async function test(a, b) {

    for (let i = a; i < b; i++) {
        if (document.querySelector('.baxia-dialog') && document.querySelector('.baxia-dialog').style.display != 'none') {
            let c = i
            let timer = setInterval(function() {
                if (document.querySelector('.baxia-dialog') && document.querySelector('.baxia-dialog').style.display == 'none') {

                    clearInterval(timer)
                    test(c, b)
                }
            }, 100)
            break
        }
        getdata(i)

        await sleep(500)
    }

}

function sleep(time) {
    return new Promise(resolve=>setTimeout(resolve, time))
}
test(1, 100)
function kk(res) {// console.log(res)
// console.log(new Date().toJSON())
}
function getfun(url) {
    let script = document.createElement('script')
    let act = {
        act: '市场分析',
        tid: '1'
    }
    script.setAttribute('params', JSON.stringify(act))
    script.src = url
    let head = document.getElementsByTagName("head")[0] || document.documentElement
    head.insertBefore(script, head.firstChild)
}
// 利用按钮插入代码
function injectjs1(aa, bb='') {
    let button1 = document.createElement('button')
    button1.setAttribute('onclick', '(' + aa.toString() + ')("' + bb + '")')
    button1.click()
}
// 利用script标签插入代码
function injectjs(aa, bb='') {
    let script = document.createElement('script')
    script.textContent = '(' + aa.toString() + ')("' + bb + '")';
    (document.head || document.documentElement).appendChild(script)
    script.onload = function() {// this.parentNode.removeChild(this)
    }
}
