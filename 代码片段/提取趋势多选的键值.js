(function() {
    let obj = {}
    $('.index-picker-container .oui-index-picker-list .ant-radio-input').map(function() {
        obj[$(this).attr('value')] = $(this).parents('.oui-index-picker-item').find('.oui-index-picker-text ').text()
    })
    console.dir(obj)
}
)()
