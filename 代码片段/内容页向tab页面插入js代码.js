function aa() {
    console.log('>>>>>')
}
function bb() {
    console.log('>>>>>111')
}

// 利用script标签插入代码
function injectjs(aa) {
    let script = document.createElement('script')
    script.textContent = '(' + aa.toString() + ')()';
    (document.head || document.documentElement).appendChild(script)
    script.onload = function() {
        this.parentNode.removeChild(this)
    }
}
// 利用按钮插入代码
function injectjs1(aa) {
    let button1 = document.createElement('button')
    button1.setAttribute('onclick', '(' + aa.toString() + ')()')
    button1.click()
}
injectjs1(bb)
injectjs(aa)
