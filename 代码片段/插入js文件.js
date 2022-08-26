// "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.min.js"
fetch("https://cdn.bootcdn.net/ajax/libs/localforage/1.9.0/localforage.js").then(function(o) {
    console.log(o)
    return o.text()
}).then((r)=>{
console.log(r)
window.eval(r)
})

// function fontLoaded(res) {
//     if (!Typr)
//         return ''
//     const obj = Typr['parse'](res)[0]
//     let arr = new Array(obj['maxp']['numGlyphs'])
//     for (let i = 0; i < 130000; i++) {
//         let key = Typr['U']['codeToGlyph'](obj, i);
//         if (0 != key) {
//             null == arr[key] ? arr[key] = [i] : arr[key]['push'](i)
//         }
//     }
//     let min = Math['min'](100, obj['maxp']['numGlyphs'])
//     let char = '';
//     for (let i = 0; i < min; i++) {
//         const new_arr = arr[i];
//         if (null != new_arr) {
//             char += String.fromCharCode(new_arr[0])
//         }
//     }
//     return char.match(/\d/g)
// }

// var url = document.querySelector('meta[name="fcfu"]') ? document.querySelector('meta[name="fcfu"]').getAttribute('rg') : 'https://g.alicdn.com/dt/op-fcf/b56e0e5e7fdf5645a6f1220c08b75588/75b1a8a253365d8c95fbcef5bd8ab406.ttf'
// fetch(url).then(function(o) {
//     console.log(o)
//     return o.arrayBuffer()
// }).then((r)=>{
//     // console.log(r)
//     let yy = fontLoaded(r)
//     // window.eval(r)
//     console.log(yy)

// }
// )
