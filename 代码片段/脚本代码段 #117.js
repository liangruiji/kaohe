$('.ant-modal-wrap').map((i,item)=>{
    let _item = $(item)
    let aa = _item.attr('style')
    console.log(aa)

    if (!aa) {
        let id = _item.find('.ant-modal-content .ant-modal-body .op-mc-rival-trend-analysis').attr('id')
        console.log(id)
    }

}
)
