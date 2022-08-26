var obj = {}
var arr = Array.from($('.ant-checkbox .ant-checkbox-input').map(function() {
    obj[$(this).attr('value')] = $(this).parents('.oui-index-picker-item').find('.oui-index-picker-text').text()
    return $(this).attr('value')
}))
console.log(arr)
console.log(obj)