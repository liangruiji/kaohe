$('.ant-dropdown .oui-canary-input .ant-input')[0].value = '5655';
$('.ant-dropdown .oui-canary-input .ant-input').attr({
    value: '5655'
})

var event = document.createEvent("HTMLEvents");
event.initEvent("input", true, false);

$('.ant-dropdown .oui-canary-input .ant-input')[0].dispatchEvent(event);
