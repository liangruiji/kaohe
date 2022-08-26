function fCookie(cookie_str) {
    if (!cookie_str)
        return ''
    var list = cookie_str.split(';')
    var ret = {}
    for (var i = 0; i < list.length; i++) {
        if (list[i].indexOf('uc4=') == 0) {
            ret['uc4'] = decodeURIComponent(list[i].split('uc4=')[1])
        } else {
            var arr = list[i].split('=')
            try {
                ret[arr[0]] = decodeURIComponent(arr[1])
            } catch (e) {
                console.log(arr[1])
            }
        }
    }
    return ret
}
console.log("document.cookie == localStorage['XWS_BIND_COOKIE']", document.cookie == localStorage['XWS_BIND_COOKIE'])
let a = fCookie(document.cookie)
let b = fCookie(localStorage['XWS_BIND_COOKIE'])
console.log('document.cookie', a)
console.log('XWS_BIND_COOKIE', b)
