// fetch('https://cdn.bootcdn.net/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js').then(function(o) {
//     console.log(o)
//     return o.text()
// }).then(r=>{
//     window.eval(r)
var element = $('.my-chart')
// 这个dom元素是要生成img的div容器
var w = element.outerWidth()
// 设置该容器的宽
var h = element.outerHeight()
// 设置该容器的高
var canvas = document.createElement('canvas')
canvas.width = 2 * w + 100
// 设置画布宽&&高
canvas.height = 2 * h + 100

canvas.style.width = w + "px";
canvas.style.height = h + "px";
var offsetTop = element.offset().top
var pageYOffset = window.pageYOffset
var height = document.body.clientHeight
var top1 = element[0].offsetTop
// 获得该容器的上偏移量
var offsetLeft = element.offset().left
// 获得该容器的左偏移量
var context = canvas.getContext('2d')
// context.scale(2, 2);
// context.translate(-offsetLeft, pageYOffset-offsetTop)
console.dir(top, offsetTop)
// context.translate(0, -2*height - 2*top1)
// context.scale(2, 2);
var opts = {
    canvas: canvas,
    width:w + 100,
    height:h + 100,
    windowWidth: w,
    windowHeight: h,
    //     useCORS: true
}
html2canvas(element[0], opts).then(function(canvas) {
    setTimeout(function() {
        let a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        a.href = canvas.toDataURL('image/png', 1.0)
        a.download = '下载'
        a.click()
    }, 100)
})

//     var canvas2 = document.createElement("canvas");
//     let _canvas = document.querySelector('.my-chart');
//     var w = parseInt(window.getComputedStyle(_canvas).width);
//     var h = parseInt(window.getComputedStyle(_canvas).height);
//     //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
//     canvas2.width = w * 2;
//     canvas2.height = h * 2;
//     canvas2.style.width = w + "px";
//     canvas2.style.height = h + "px";
//     //可以按照自己的需求，对context的参数修改,translate指的是偏移量
//     //  var context = canvas.getContext("2d");
//     //  context.translate(0,0);
//     var context = canvas2.getContext("2d");
//     context.scale(2, 2);
//     html2canvas(document.querySelector('.my-chart'), {
//         canvas: canvas2
//     }).then(function(canvas) {
//document.body.appendChild(canvas);
//canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
//         document.querySelector(".down").setAttribute('href', canvas.toDataURL());

//          setTimeout(function() {
//                 let a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
//                 a.href = canvas.toDataURL('image/png', 1.0)
//                 a.download = '下载'
//                 a.click()
//             }, 100)
//     });

// }
// )
