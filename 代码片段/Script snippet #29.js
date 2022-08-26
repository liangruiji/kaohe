let Typr_js = document.createElement('script')
Typr_js.src = 'https://photopea.github.io/Typr.js/src/Typr.js'
document.head.appendChild(Typr_js)
let Typr_U_js = document.createElement('script')
Typr_U_js.src = 'https://photopea.github.io/Typr.js/src/Typr.U.js'
document.head.appendChild(Typr_U_js)
function fontLoaded(res) {
    if (!Typr)
        return ''
    const obj = Typr['parse'](res)[0]
    console.log(Typr['parse'](res))
    let arr = new Array(obj['maxp']['numGlyphs'])
    for (let i = 0; i < 130000; i++) {
        let key = Typr['U']['codeToGlyph'](obj, i);

        if (0 != key) {
            console.log('key', key)
            null == arr[key] ? arr[key] = [i] : arr[key]['push'](i)
        }
    }
    console.log('arr',arr)
    let min = Math['min'](100, obj['maxp']['numGlyphs'])
    let char = '';
    for (let i = 0; i < min; i++) {
        const new_arr = arr[i];
        if (null != new_arr) {
            char += String.fromCharCode(new_arr[0])
        }
    }
    return char.match(/\d/g)
}
function getIndexArr() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        let url = document.querySelector('meta[name="fcfu"]') ? document.querySelector('meta[name="fcfu"]').getAttribute('rg') : 'https://g.alicdn.com/dt/op-fcf/b56e0e5e7fdf5645a6f1220c08b75588/75b1a8a253365d8c95fbcef5bd8ab406.ttf'
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function(res) {
            try {
                let char = fontLoaded(res['target']['response'])
                resolve(char)
            } catch (err) {
                reject(err)
            }
        }
        xhr.send()
    }
    )
}
