let aa = window.__PROJECTNAME__

let renderTable = this.renderTable
let pageData = this.pageData
let xhr = new XMLHttpRequest()
//定义一个XMLHttpRequest对象
let url = 'https://sycm.taobao.com/bda/download/excel/tradinganaly/constitute/CategoryExcel.do?dateType=recent30&dateRange=2021-10-12|2021-11-10'
xhr.responseType = 'blob'
xhr.open('get', url, true)
xhr.onload = function() {
    let file = new FileReader()

    file['onload'] = function() {
        let sheetsData = XLSX['read'](file['result'], {
            type: 'binary'
        })
        let xlsData = []
        for (let item in sheetsData['Sheets']) {
            if (sheetsData['Sheets']['hasOwnProperty'](item)) {
                let rangeList = sheetsData['Sheets'][item]['!ref']['split'](':')
                // 获取表的有效范围
                rangeList[0] = 'A4'
                console.log(' [Sheets]', sheetsData['Sheets'])
                console.log('item', item)
                console.log('rangeList', rangeList)
                xlsData = xlsData['concat'](XLSX['utils']['sheet_to_json'](sheetsData['Sheets'][item], {
                    range: rangeList['join'](':')
                }))
            }
        }

        console.log('解析出来的数据', xlsData)

    }

    console.log(this['response'])
    file['readAsBinaryString'](this['response'])
}

xhr.send()
