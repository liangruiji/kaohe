// let dateType = getDateType()
//       this.dateRange = getDateRange()
let device = 0
let label = $('.ant-select-selection-selected-value').eq(0).text()
if (label == 'PC端') {
    device = 1
} else if (label == '无线端') {
    device = 2
}
let sellerType = -1
let sellerLabel = $('.sellerType-select .ant-select-selection-selected-value').text()
if (sellerLabel == '淘宝') {
    sellerType = 0
} else if (sellerLabel == '天猫') {
    sellerType = 1
}
