var elem =  $('.ant-dropdown .oui-canary-input .ant-input')[0]
// 监听change事件
elem.addEventListener('input', console.log, false);
// js修改input的value
elem.value = '5655';
 $('.ant-dropdown .oui-canary-input .ant-input').attr({value:'5655'})
// elem.simulated = true;
// 构造change事件对象
var event = new Event('input',);
// 触发input的change事件
document.dispatchEvent(event,'topInput');

// let t=$('.ant-dropdown .oui-canary-input .ant-input')[0]
// let evt = document.createEvent('HTMLEvents');
// evt.initEvent('input', true, true);
// $(t).val(66)
// t.dispatchEvent(evt)