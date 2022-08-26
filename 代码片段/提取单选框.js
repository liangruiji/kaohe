var obj = {}
var arr = Array.from($('.ant-radio .ant-radio-input').map(function() {
//     console.dir($(this).parents('.ant-radio').next().text())
    obj[$(this).attr('value')] = $(this).parents('.ant-radio').next().text()
    return $(this).attr('value')
}))
console.dir(arr)
console.dir(obj)