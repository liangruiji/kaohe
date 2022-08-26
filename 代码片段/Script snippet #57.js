let dateTypeText = $('.sycm-cc-macro-index-monitor .oui-date-picker-particle-button .ant-btn-primary').text()
const dateTypeObj = {
    '实 时': 'today',
    '7天': 'recent7',
    '30天': 'recent30',
    '日': 'day',
    '周': 'week',
    '月': 'month',
    '自定义': 'compareRange'
}
switch (dateTypeText) {
case '实 时':
    {
        this.dateType = 'today'
        type = $('.sycm-cc-macro-index-monitor .chart-radio-type .ant-radio-checked input').attr('value')
        this.type = type == 'bar' ? '1' : '2'
        break
    }
case '7天':
    this.dateType = 'recent7'
    break
case '30天':
    this.dateType = 'recent30'
    break
case '日':
    this.dateType = 'day'
    break
case '周':
    this.dateType = 'week'
    break
case '月':
    this.dateType = 'month'
    break
case '自定义':
    this.dateType = 'compareRange'
}

// dateRange
let dateRangeText = $('.sycm-cc-macro-index-monitor .oui-date-picker .oui-date-picker-current-date').text()
let reg = /(\d{4}-\d{2}-\d{2})(?:\s~\s)?(\d{4}-\d{2}-\d{2})?/g
let dateRangeList = reg.exec(dateRangeText)
if (['today', 'day'].includes(this.dateType)) {
    this.dateRange = dateRangeList[1] + '|' + dateRangeList[1]
    this.dateEnd = dateRangeList[1]
} else if (this.dateType != 'compareRange') {
    this.dateRange = dateRangeList[1] + '|' + dateRangeList[2]
    this.dateEnd = dateRangeList[2]
} else {
    let dateRangeListTwo = reg.exec(dateRangeText)
    this.dateRange = dateRangeList[1] + '|' + dateRangeList[2] + ',' + dateRangeListTwo[1] + '|' + dateRangeListTwo[2]
    this.dateEnd = dateRangeList[2]
}
