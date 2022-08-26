let dataOne = []
let dataTwo = []
if(!window.obj){ // 咨询人数指数
    window.obj={}
}

if(!window.obj1){ // 客服销售人数指数
    window.obj1={}
}
if(!window.obj2){ // 客服销售额指数
    window.obj2={}
}
if(!window.obj3){ // 询单转化率指数
    window.obj3={}
}
if(!window.obj4){ // 客服客单价指数
    window.obj4={}
}
$('#sycm-3rd-iframe').contents().find(`.Card_wrapper__ETKVJ`).eq(0).find('.DashBoard_value__1lNvf').map(function() {
    console.log($(this).text().replace(/,/g, ''))
    dataOne.push($(this).text().replace(/,/g, ''))
})
$('#sycm-3rd-iframe').contents().find(`.Card_wrapper__ETKVJ`).eq(2).find('.Card_content__1aHVl > .Monitor_table__ydSai.FilteredTable_wrappper__3USWp .ant-table-cell').map(function() {
    dataTwo.push($(this).text().replace(/,/g, ''))
})
 window.obj[dataOne[4]]=dataTwo[1]
 window.obj1[dataOne[2]]=dataTwo[2]
 window.obj2[dataOne[0]]=dataTwo[3]
 window.obj3[dataOne[3]]=dataTwo[4]
 window.obj4[dataOne[7]]=dataTwo[5]

window.objall={
obj,obj1,obj2,obj3,obj4
}