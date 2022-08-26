let i = 1
function aa() {
    return i++
}
function jsonp(src) {
    let script = document.createElement('script')
    script.src = src
    let head = document.getElementsByTagName("head")[0] || document.documentElement
    head.insertBefore(script, head.firstChild)
}

function paramsJsonp(data, href) {
    let base = href.split('?')[0]
    let params = href.split('?')[1]
    let dataParams = Object.keys(data).map(item=>{
        let ret = item + '=' + data[item] + '&'
        return ret
    }
    )
    dataParams = dataParams.join('')
    let src = `${base}?${dataParams}${params}`
    jsonp(src)
}

function getPageData(page) {
    let data = {
        "data-key": "s",
        "data-value": page * 44,
        "ajax": true,
        "_ksTS": +new Date() + '_' + aa(),
        "callback": "kk"
    }
    let href = window.location.href
    let s = page - 2 > 0 ? page - 2 : 1
    href = href.replace(/&s=\d+/, `&s=${s * 44}`)
    paramsJsonp(data, href)

}
function getFilterConfigData() {
    let data = {
        "data-key": "s,ps",
        "data-value": '0,1',
        "ajax": true,
        "_ksTS": +new Date() + '_' + aa(),
        "callback": "kk"
    }
    let href = window.location.href
    href = href.replace(/&s=\d+/, '&s=44')
    paramsJsonp(data, href)

}
