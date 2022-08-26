/* eslint-disable no-unused-vars */
const dateRange = {
  label: 'dateRange',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let dateRange = getDateRange()
      this.dateRange = dateRange`,
    },
  ],

  type: 'radio',
}

const dateType = {
  label: 'dateType',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let dateType = getDateType()
      this.dateType = dateType`,
    },
  ],
  type: 'radio',
}
const order = {
  label: 'order',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let order = $(
        '.alife-dt-card-common-table-sortable-icon-wrapper .alife-dt-card-common-table-sortable-down-icon.active',
      ).length
        ? 'desc'
        : 'asc'
   
`,
    },
  ],
  type: 'radio',
}
const orderBy = {
  label: 'orderBy',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let orderBy = $('.alife-dt-card-common-table-sortable-icon-wrapper .oui-canary-icon.active')
        .parents('div[data-onetrace-index-id]')
        .attr('data-onetrace-index-id')
  `,
    },
  ],
  type: 'radio',
}

const device = {
  label: 'device',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let device = 0
      let label = $('.ant-select-selection-selected-value')
        .eq(0)
        .text()
      if (label == 'PC端') {
        device = 1
      } else if (label == '无线端') {
        device = 2
      }
  `,
    },
  ],
  type: 'radio',
}

const sellerType = {
  label: 'sellerType',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let sellerType = -1
      let sellerLabel = $('.sellerType-select .ant-select-selection-selected-value').text()
      if (sellerLabel == '淘宝') {
        sellerType = 0
      } else if (sellerLabel == '天猫') {
        sellerType = 1
      }
  `,
    },
  ],
  type: 'radio',
}

const pageCount = {
  label: 'pageCount',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let page = $('#cateShop .ant-pagination.oui-pagination li').length
        ? parseInt(
            $('#cateShop .ant-pagination.oui-pagination li')
              .eq(-2)
              .text(),
          )
        : 1
      this.pageCount = page
  `,
    },
  ],
  type: 'radio',
}

const currentPage = {
  label: 'currentPage',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: ' 从url中获得',
      value: `
      let currentPage = Number($('#cateShop .ant-pagination-item.ant-pagination-item-active').attr('title'))
      if (currentPage) {
        this.currentPage = currentPage
      }
  `,
    },
  ],
  type: 'radio',
}
const float = {
  label: 'float',
  op: [
    {
      label: 'left',
      value: '<div class="xws-pull-left">',
    },
    {
      label: 'right',
      value: `<div class="xws-pull-right">`,
    },
    {
      label: 'inline-block',
      value: `<div style="display:inline-block;margin-right:5px">`,
    },
  ],
  type: 'radio',
}
const getUrlKey = {
  label: 'getUrlKey',
  op: [
    {
      label: 'dateRange',
      value: `
      let dateRange = getDateRange()
      this.dateRange = dateRange`,
    },
    {
      label: 'dateType',
      value: `
      let dateType = getDateType()
      this.dateType = dateType`,
    },
    {
      label: 'getUrlKey',
      value: `
      let value = getUrlKey(window.location.href, 'key')`,
    },
  ],

  type: 'checkbox',
}

const getDomKey = {
  label: 'getDomKey',
  op: [
    {
      label: 'order',
      value: `
      let order = $(
        '.alife-dt-card-common-table-sortable-icon-wrapper .alife-dt-card-common-table-sortable-down-icon.active',
      ).length
        ? 'desc'
        : 'asc'
   
`,
    },
    {
      label: 'orderBy',
      value: `
      let orderBy = $('.alife-dt-card-common-table-sortable-icon-wrapper .oui-canary-icon.active')
        .parents('div[data-onetrace-index-id]')
        .attr('data-onetrace-index-id')
  `,
    },
    {
      label: 'device',
      value: `
      let device = 0
      let label = $('.ant-select-selection-selected-value')
        .eq(0)
        .text()
      if (label == 'PC端') {
        device = 1
      } else if (label == '无线端') {
        device = 2
      }
  `,
    },
    {
      label: 'sellerType',
      value: `
      let sellerType = -1
      let sellerLabel = $('.sellerType-select .ant-select-selection-selected-value').text()
      if (sellerLabel == '淘宝') {
        sellerType = 0
      } else if (sellerLabel == '天猫') {
        sellerType = 1
      }
  `,
    },
    {
      label: 'pageCount',
      value: `
      let page = $('#cateShop .ant-pagination.oui-pagination li').length
        ? parseInt(
            $('#cateShop .ant-pagination.oui-pagination li')
              .eq(-2)
              .text(),
          )
        : 1
      this.pageCount = page
  `,
    },
    {
      label: 'currentPage',
      value: `
      let currentPage = Number($('#cateShop .ant-pagination-item.ant-pagination-item-active').attr('title'))
      if (currentPage) {
        this.currentPage = currentPage
      }
  `,
    },
    {
      label: '市场cateId',
      value: `
      let cateId = ''
      let picker = $('.common-picker-header').length ? $('.common-picker-header').attr('title') : ''
      if (picker != '全部标准类目') {
        let cateList = getXwsStorage('xws/mc/common/getShopCate.json')
        if (cateList) {
          for (let i = 0; i < cateList.length; i++) {
            if (picker.indexOf('>') >= 0) {
              if (cateList[i][7] == picker.split('>')[0].trim() && cateList[i][2] == picker.split('>')[picker.split('>').length - 1].trim()) {
                cateId = cateList[i][1]
                break
              }
            } else {
              if (cateList[i][7] == picker.trim() && cateList[i][2] == picker.trim()) {
                cateId = cateList[i][1]
                break
              }
            }
          }
        } else {
          eleMesBox('出错了，小旺神找不到数据了，如确有数据，请联系客服，谢谢', this)
          this.showLoading = false
          return false
        }
      }`,
    },
    {
      label: 'cateId',
      value: `
      let cateId = ''
      let picker = $('.common-picker-header').length ? $('.common-picker-header').attr('title') : ''
      if (picker != '全部标准类目') {
        let cateList = getXwsStorage('xws/session/cc/common/category/getStdCate.json')
        if (cateList) {
          for (let i = 0; i < cateList.length; i++) {
            if (picker.indexOf('>') >= 0) {
              if (cateList[i][2] == picker.split('>')[picker.split('>').length - 1].trim()) {
                cateId = cateList[i][1]
                break
              }
            } else {
              if (cateList[i][2] == picker.trim()) {
                cateId = cateList[i][1]
                break
              }
            }
          }
        } else {
          eleMesBox('出错了，小旺神找不到数据了，如确有数据，请联系客服，谢谢', this)
          this.showLoading = false
          return false
        }
      }
      `,
    },
    {
      label: 'commDate中的dateRange',
      value: `
      let commDateKey = '//sycm.taobao.com/oneauth/api/commDate/onetrace.json?targetUrl=http://sycm.taobao.com/cc/new_item_analysis'
      let commDate = localStorage.getItem(commDateKey)
      if (commDate) {
        commDate = JSON.parse(JSON.parse(commDate.replace(/\\d+\\|/g, '')))['value']['_d']
        console.log('>>>>>>', commDate)
      }
      let updateDay = commDate.updateDay
      let dateRange = ''.concat(updateDay, '|').concat(updateDay)
      this.dateRange = dateRange
      let dateType = 'day'
      this.dateType = dateType`,
    },
    {
      label: '读取xls数据',
      value: `
        if (!allData[url]) {
        let renderTable = this.renderTable
        let pageData = this.pageData
        let xhr = new XMLHttpRequest() //定义一个XMLHttpRequest对象
        xhr.responseType = 'blob'
        xhr.open('get', url, true)
        xhr.onload = function() {
          let file = new FileReader()

          file['onload'] = function() {
            let sheetsData = XLSX['read'](file['result'], { type: 'binary' })
            let xlsData = []
            for (let item in sheetsData['Sheets']) {
              if (sheetsData['Sheets']['hasOwnProperty'](item)) {
                let rangeList = sheetsData['Sheets'][item]['!ref']['split'](':') // 获取表的有效范围
                rangeList[0] = 'A6'
                console.log(' [Sheets]', sheetsData['Sheets'])
                console.log('item', item)
                console.log('rangeList', rangeList)
                xlsData = xlsData['concat'](XLSX['utils']['sheet_to_json'](sheetsData['Sheets'][item], { range: rangeList['join'](':') }))
              }
            }
            allData[url] = xlsData
            console.log('解析出来的数据', xlsData)
        
            pageData = pageData.push(...xlsData)
            renderTable()
          }

          console.log(this['response'])
          file['readAsBinaryString'](this['response'])
        }
        xhr.onerror = function() {
          eleMesBox('获得数据失败：0', this)
        }

        xhr.send()
      } else {
        console.log(allData)
        let xlsData = allData[url]
      
        this.pageData = xlsData
        this.renderTable()
      }`,
    },
    {
      label: '商品html(一行)',
      value: `
      let { detailUrl, itemId, pictUrl, title } = item.item
      let itemInfo = \`
      <div class="sycm-common-shop-td" title=\${title} style="width: 260px;">
        <a href=\${detailUrl} target="_blank" class="sycm-common-shop-td-img-wrapper" style="width: 36px; height: 36px;">
          <img src=\${pictUrl}>
        </a>
        <span class="sycm-common-shop-td-title-wrapper titleWrapper" style="height: 36px;"><span class="shopName">
          <a href=\${detailUrl} target="_blank" style="max-width: 194px;">\${title}</a>
        </span></span>
      </div>
      \``,
    },
    {
      label: '商品html(两行)',
      value: `
          let { detailUrl, itemId, pictUrl, title } = item.item
          infoHtml = \`<div class="sycm-goods-td" style="width:260px;margin:0 auto;">
                                    <a class="goodsImg pull-left" href="\${detailUrl}" target="_blank" title="\${title}" style="width: 38px; height: 38px;margin-top:4px;">
                                        <img class="mediaObject" src="\${pictUrl}_36x36.jpg" />
                                    </a>
                                    <div class="goodsInfo" style="width: 202px; max-height: 76px;">
                                        <p class="goodsName">
                                            <a href="\${detailUrl}" target="_blank" title="\${title}">\${title}</a>
                                        </p>
                                    </div>
                                </div>\``,
    },
    {
      label: 'dateType',
      value: `
      let dateTypeText = $('#sycm-cc-new-item-analysis-core-index-overview .oui-date-picker-particle-button .ant-btn-primary').text()
      const dateTypeObj = {
        '实 时': 'today',
        '7天': 'recent7',
        '30天': 'recent30',
        日: 'day',
        周: 'week',
        月: 'month',
        自定义: 'compareRange',
      }
      let dateType = dateTypeObj[dateTypeText]
      this.dateType = dateType`,
    },
    {
      label: 'dateRange',
      value: `
      let dateRangeText = $('.sycm-cc-item-rank .oui-date-picker .oui-date-picker-current-date').text()
      let reg = /(\\d{4}-\\d{2}-\\d{2})(?:\\s~\\s)?(\\d{4}-\\d{2}-\\d{2})?/g
      let dateRangeList = reg.exec(dateRangeText)
      let dateRange = ''
      if (['today', 'day'].includes(this.dateType)) {
        dateRange = dateRangeList[1] + '|' + dateRangeList[1]
      } else if (this.dateType != 'compareRange') {
        dateRange = dateRangeList[1] + '|' + dateRangeList[2]
      } else {
        let dateRangeListTwo = reg.exec(dateRangeText)
        dateRange = dateRangeList[1] + '|' + dateRangeList[2] + ',' + dateRangeListTwo[1] + '|' + dateRangeListTwo[2]
      }
      this.dateRange = dateRange
`,
    },
  ],

  type: 'checkbox',
}

const dataKey = {
  label: 'dataKey',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: 'localStorage完整key',
      value: `
let keyOne = ''
let data = localStorage.getItem(keyOne)
if (data) {
  data = JSON.parse(JSON.parse(data.replace(/\\d+\\|/g, '')))['value']['_d']['data']
  console.log('>>>>>>', data)
}`,
    },
    {
      label: 'localStorage不完整key',
      value: `
let keyOne = ''
let keyTwo = ''
let localStorageLen = localStorage.length
for (let i = 0; i < localStorageLen; i++) {
  let localStorageKey = localStorage.key(i)
  if (localStorageKey.includes(keyOne) && localStorageKey.includes(keyTwo)) {
    console.log('localStorageKey', localStorageKey)

    let data = localStorage.getItem(localStorageKey)

    if (data) {
      data = JSON.parse(JSON.parse(data.replace(/\\d+\\|/g, '')))['value']['_d']['data']
      console.log('>>>>>>', data)
       this.pageData.push(data)
    }
  }
}`,
    },
    {
      label: 'sessionStorage完整key',
      value: `
      let pageKey=''
      let pageData = getXwsStorage(pageKey)`,
    },
    {
      label: 'sessionStorage不完整key',
      value: `
      let keyOne = ''
      let keyTwo = ''
      let sessionStorageLen = sessionStorage.length
      for (let i = 0; i < sessionStorageLen; i++) {
        let sessionStorageKey = sessionStorage.key(i)
        if (sessionStorageKey.includes(keyOne) && sessionStorageKey.includes(keyTwo)) {
          console.log('sessionStorageKey', sessionStorageKey)
          let data = getXwsStorage(sessionStorageKey)
          if (data) {
            console.log('>>>>>>', data)
            this.pageData.push(data)
          }
        }
      }
`,
    },
    {
      label: 'chrome完整',
      value: `
let keyOne = ''
chrome.storage.local.get(keyOne, data => {
  data = data[keyOne]
  console.log('pageData', data)
  if (data) {
    
  }
})`,
    },
    {
      label: 'chrome不完整',
      value: '',
    },
  ],
  type: 'radio',
}
const encapsulationConData = {
  label: 'encapsulationConData',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: '非市场大盘 数组',
      value: `
     // 转化指数数据
    conversionIndexData(conKey) {
      let con_data = getXwsStorage(conKey)
      let con_info = {}
      let indexs = []
      for (const data of this.pageData) {
        for (const i in data) {
          if (i.includes('Index') || i.includes('Hits')) {
            if (!con_info[i]) {
              con_info[i] = []
            }
            if (data[i] && data[i].value) {
              con_info[i].push(data[i].value)
            } else {
              con_info[i].push(0)
            }
          }
        }
      }
      for (const i in con_info) {
        indexs.push(...con_info[i])
      }
      console.log('indexs', indexs)
      let con_data_key, hasIndexs
      if (con_data) {
        con_data_key = Object.keys(con_data)
        hasIndexs = indexs.every(item => {
          let str = String(item)
          return con_data_key.includes(str)
        })
      }

      if (hasIndexs) {
        console.log('>>>>>>>>')
        this.encapsulationConData(con_data)
      } else {
        const indexInfo = getSycmIndexParame(arrUnique(indexs))
        this.bgReq('POST', indexInfo['url'], { info: indexInfo['info'] }, ret => {
          if (ret.code === 200) {
            if (ret.msg && ret.msg == '用户扫码关注可激活') {
              console.log('url', ret.url)
              this.iframeUrl = ret.url
              this.serviceUrl = ret.serviceUrl
              this.nickName = indexInfo['nickName']
              this.qrCodeDialogVisible = true
            } else {
              // 转化成功
              console.log('lll', ret.data)
              if (conKey) setXwsStorage(conKey, ret.data)
              this.encapsulationConData(ret.data)
            }
          } else {
            eleMesBox(ret.msg, this)
            this.showLoading = false
          }
        })
      }
    },
    // 封装转化后的数据
    encapsulationConData(con_data) {
      this.dataTable = {}
      for (const i in con_data) {
        if (con_data[i] === '超出范围' || con_data[i] === '-') {
          this.dataTable[i] = con_data[i]
        } else {
          this.dataTable[i] = con_data[i]['n']
        }
      }
      console.log('this.dataTable ', this.dataTable)
      this.renderTable()
    },
  `,
    },
    {
      label: '非市场大盘 图表数据',
      value: `
     //转化指数数据
    conversionIndexData(conKey) {
      let con_data = getXwsStorage(conKey)
      let con_info = {}
      let indexs = []
      for (const i in this.pageData) {
        if (i == 'payByrCntIndex' || i == 'payRateIndex' || i == 'tradeIndex' || i == 'uvIndex') {
          // for (const data of this.pageData[i]) {
          //   if (!con_info[i]) {
          //     con_info[i] = []
          //   }
          //   if (data) {
          //     con_info[i].push(data)
          //   } else {
          //     con_info[i].push(0)
          //   }
          // }
          con_info[i]=this.pageData[i]
        }
      }
      for (const i in con_info) {
        indexs.push(...con_info[i])
      }
      console.log('indexs', indexs)
      let con_data_key, hasIndexs
      if (con_data) {
        con_data_key = Object.keys(con_data)
        hasIndexs = indexs.every(item => {
          let str = String(item)
          return con_data_key.includes(str)
        })
      }

      //判断session是否有转化后的数据存在
      if (hasIndexs) {
        this.encapsulationConData(con_data, con_info)
      } else {
        const indexInfo = getSycmIndexParame(arrUnique(indexs))
        this.bgReq('POST', indexInfo['url'], { info: indexInfo['info'] }, ret => {
          if (ret.code === 200) {
            if (ret.msg && ret.msg == '用户扫码关注可激活') {
              console.log('url', ret.url)
              this.iframeUrl = ret.url
              this.serviceUrl = ret.serviceUrl
              this.nickName = indexInfo['nickName']
              this.qrCodeDialogVisible = true
            } else {
              // 转化成功
              if (conKey) setXwsStorage(conKey, ret.data)
              this.encapsulationConData(ret.data, con_info)
            }
          } else {
            eleMesBox(ret.msg, this)
            this.showLoading = false
          }
        })
      }
    },
    //封装转化后的数据
    encapsulationConData(con_data, con_info) {
      this.dataTable = {}
      for (const i in con_info) {
        if (!this.dataTable[i]) {
          this.dataTable[i] = []
        }
        for (const j of con_info[i]) {
          if (con_data[j] === '超出范围') {
            this.dataTable[i].push(con_data[j])
          } else {
            if (i == 'payRateIndex') {
              //支付转化率取p字段
              this.dataTable[i].push(con_data[j]['p'])
            } else {
              this.dataTable[i].push(con_data[j]['n'])
            }
          }
        }
      }

      this.renderTable()
    },
  `,
    },
    {
      label: '市场大盘 数组',
      value: `
    //转化指数数据
    conversionIndexData(conKey, firstCateId) {
      let con_data = getXwsStorage(conKey)
      let con_info = {}
      for (const data of this.pageData) {
        for (const i in data) {
          if (i == 'payByrCntIndex' || i == 'seIpvUvHits' || i == 'tradeIndex') {
            if (!con_info[i]) {
              con_info[i] = []
            }
            if (data[i].value) {
              con_info[i].push(data[i].value)
            } else {
              con_info[i].push(0)
            }
          }
        }
      }
      if (con_data) {
        this.encapsulationConData(con_data)
      } else {
        const indexInfo = getSycmOverViewParame(firstCateId, con_info)
        this.bgReq('POST', indexInfo['url'], { info: indexInfo['info'] }, ret => {
          if (ret.code === 200) {
            if (ret.msg && ret.msg == '用户扫码关注可激活') {
              console.log('url', ret.url)
              this.iframeUrl = ret.url
              this.serviceUrl = ret.serviceUrl
              this.nickName = indexInfo['nickName']
              this.qrCodeDialogVisible = true
            } else {
              // 转化成功
              if (conKey) setXwsStorage(conKey, ret.data)
              this.encapsulationConData(ret.data)
            }
          } else {
            eleMesBox(ret.msg, this)
            this.showLoading = false
          }
        })
      }
    },
    //封装转化后的数据
    encapsulationConData(con_data) {
      this.dataTable = {}
      this.dataTable = con_data
      this.renderTable()
    },`,
    },

    {
      label: '市场大盘 图表数据',
      value: `
      //转化指数数据
    conversionIndexData(conKey, firstCateId) {
      let con_data = getXwsStorage(conKey)
      // console.log(con_data)
      let con_info = {}
      for (const index in this.pageData) {
        if (!con_info[index]) {
          con_info[index] = this.pageData[index]
        }
      }
      // for (const i in pageData) {
      //   if (i == 'tradeIndex' || i == 'tradeGrowthRangeIndex' || i == 'payAmtParentCateRateIndex') {
      //     if (!con_info[i]) {
      //       con_info[i] = []
      //     }
      //     if (pageData[i].length) {
      //       con_info[i].push(...pageData[i])
      //     }
      //   }
      // }
      console.log('con_info', con_info)
      if (con_data) {
        this.encapsulationConData(con_data)
      } else {
        const indexInfo = getSycmOverViewParame(firstCateId, con_info)
        console.log('indexInfo', indexInfo)
        this.bgReq('POST', indexInfo['url'], { info: indexInfo['info'] }, ret => {
          if (ret.code === 200) {
            if (ret.msg && ret.msg == '用户扫码关注可激活') {
              console.log('url', ret.url)
              this.iframeUrl = ret.url
              this.serviceUrl = ret.serviceUrl
              this.nickName = indexInfo['nickName']
              this.qrCodeDialogVisible = true
            } else {
              // 转化成功
              if (conKey) setXwsStorage(conKey, ret.data)
              this.encapsulationConData(ret.data)
            }
          } else {
            eleMesBox(ret.msg, this)
            this.showLoading = false
          }
        })
      }
    },
    //封装转化后的数据
    encapsulationConData(con_data) {
      this.dataTable = {}
      console.log('con_data', con_data)
      this.dataTable = con_data
      this.renderTable()
    },`,
    },
  ],
  type: 'radio',
}

const getDate = {
  label: 'getDate',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: '某个范围',
      value: ` let date = this.dateRange
      if (['day', 'today', 'recent1'].includes(this.dateType)) {
        date = this.dateRange.split('|')[1]
      } else {
        date = this.dateRange.replace('|', '~')
      }
  `,
    },
    {
      label: '时间列表',
      value: `let dateEnd = this.dateRange.split('|')[1]
      let dateList = [],
        dataLen
      if (this.dateType == 'today') {
        for (let i = 0; i <= 24; i++) {
          dateList.push(i < 10 ? '0' + i + ':00' : i + ':00')
        }
        dataLen = 24
      } else if (this.dateType == 'week') {
        dateList = getYearWeekStrList(dateEnd, 24)
        dataLen = 24
      } else if (this.dateType == 'month') {
        dataLen = 12
        dateList = lastYearMonth(dateEnd, 12)
      } else {
        dateList = getBeforeDateList(dateEnd, 29, 1)
        dataLen = 30
      }
      this.dateInfo = dateList`,
    },
  ],
  type: 'radio',
}

const renderTable = {
  label: 'renderTable',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: '数组',
      value: `
   this.pageData.map(item => {
        this.getItem(item, keyList)
      })
  `,
    },
    {
      label: '图表数据',
      value: `
        for (let i = 0; i < dataLen; i++) {
        let detailData = { date: dateList[i] }
        for (let key in this.pageData) {
          if (keyList.includes(key)) {
            let data = this.pageData[key][i]
            if (key.includes('Amt') || ['avgStayTime'].includes(key)) {
              detailData[key] = data.toFixed(2)
            } else if (key.includes('Rate')) {
              detailData[key] = percentFormat((100 * data).toFixed(2))
            } else {
              detailData[key] = data
            }
            // detailData[key + 'Ratio'] = percentFormat((100 * data['ratio']).toFixed(2))
            // if (data.hasOwnProperty('cycleCrc') && data['cycleCrc'] != null) {
            //   detailData[key + 'Crc'] = percentFormat((100 * data['cycleCrc']).toFixed(2))
            // }
          }
        }
        this.tableData.push(detailData)
      }
      this.renderChart(keyList)`,
    },
  ],
  type: 'radio',
}

const getItem = {
  label: 'getItem',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: 'key:value',
      value: `
   getItem(item, keyList, date) {
      let detailData = {}
      for (let key of keyList) {
        detailData[key] = '-'
      }
      for (let key in item) {
        if (keyList.includes(key)) {
          let data = item[key]
          if (key.includes('Amt') || ['avgStayTime', 'avgPv', 'payPct'].includes(key)) {
            detailData[key] = data.toFixed(2)
          } else if (key.includes('Rate')) {
            detailData[key] = percentFormat((100 * data).toFixed(2))
          } else {
            detailData[key] = data
          }
        }
      }
      this.tableData.push(detailData)
    },`,
    },
    {
      label: 'key:{value:6}',
      value: `
      getItem(item, keyList, date) {
      let detailData = {}
      for (let key of keyList) {
        detailData[key] = '-'
        detailData[key + 'Ratio'] = '-'
      }
      for (let key in item) {
        if (keyList.includes(key)) {
          let data = item[key]
          if (key.includes('Amt') || ['avgStayTime', 'avgPv', 'payPct'].includes(key)) {
            detailData[key] = data['value'].toFixed(2)
          } else if (key.includes('Rate')) {
            detailData[key] = percentFormat((100 * data['value']).toFixed(2))
          } else {
            detailData[key] = data['value']
          }
          if (data.hasOwnProperty('ratio') && data['ratio'] != null) {
            detailData[key + 'Ratio'] = percentFormat((100 * data['ratio']).toFixed(2))
          }
        }
      }
      this.tableData.push(detailData)
    },`,
    },
  ],
  type: 'radio',
}

const renderChart = {
  label: 'renderChart',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: '曲线图(全显)',
      value: `
    //渲染图表
    renderChart(keyList) {
      let chartData = {}
      this.legendList = []
      this.sub_yAxis = []
      this.sub_series = []
      for (let key in this.pageData) {
        if (keyList.includes(key)) {
          this.hasDataKey.push(key)
          this.legendList.push(keyValue[key])
          let data = this.pageData[key]
          let arr = []
          if (key.includes('Amt') || ['avgStayTime'].includes(key)) {
            data.map(i => {
              arr.push(i.toFixed(2))
            })
          } else if (key.includes('Rate')) {
            data.map(i => {
              arr.push((100 * i).toFixed(2))
            })
          } else if (key.includes('Index')) {
            data.map((i, index) => {
              arr.push(this.dataTable[key][index])
            })
          } else {
            arr = data
          }
          chartData[key] = arr
        }
      }

      //封装图表所需要的数据
      for (let i = 0; i < this.legendList.length; i++) {
        if (i == 0) {
          this.sub_yAxis.push({
            type: 'value',
            splitLine: { lineStyle: { type: 'dotted' } },
            splitNumber: 3,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          })
        } else {
          this.sub_yAxis.push({
            type: 'value',
            splitLine: { show: false },
            splitNumber: 3,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          })
        }
      }
      console.log(chartData)

      for (let i = 0; i < this.legendList.length; i++) {
        this.sub_series.push({
          type: 'line',
          yAxisIndex: i,
          smooth: true,
          name: this.legendList[i],
          data: chartData[keyValue[this.legendList[i]]],
        })
      }
    },
  `,
    },
    {
      label: '曲线图(显示选择的)',
      value: `
 //渲染图表
    renderChart() {
      let chartData = {}
      this.legendList = []
      this.sub_yAxis = []
      this.sub_series = []

      this.radio.map(key => {
        this.legendList.push(this.titleMaps[key])
        let data = this.pageData[key]
        if (data) {
          let arr = []
          if (key.includes('Amt') || ['avgStayTime', 'tbcrossPayPct', 'payOrdDsc', 'payPct'].includes(key)) {
            data.map(i => {
              arr.push(i.toFixed(2))
            })
          } else if (key.includes('Rate')) {
            data.map(i => {
              arr.push((100 * i).toFixed(2))
            })
          } else if (key.includes('Index')) {
            data.map((i, index) => {
              arr.push(this.dataTable[key][index])
            })
          } else {
            arr = data
          }
          chartData[key] = arr
        }
      })

      //封装图表所需要的数据
      for (let i = 0; i < this.legendList.length; i++) {
        if (i == 0) {
          this.sub_yAxis.push({
            type: 'value',
            splitLine: { lineStyle: { type: 'dotted' } },
            splitNumber: 3,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          })
        } else {
          this.sub_yAxis.push({
            type: 'value',
            splitLine: { show: false },
            splitNumber: 3,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          })
        }
      }
      console.log(chartData)

      for (let i = 0; i < this.legendList.length; i++) {
        this.sub_series.push({
          type: 'line',
          yAxisIndex: i,
          smooth: true,
          name: this.legendList[i],
          data: chartData[this.titleMaps[this.legendList[i]]],
        })
      }
    },
  `,
    },
    {
      label: '曲线图(单选的)',
      value: `
   //渲染图表
    renderChart() {
      let chartData = {}
      this.legendList = []
      this.sub_yAxis = []
      this.sub_series = []
      if (this.dateType == 'today') {
        this.grid = this.gridOne
        this.left = this.leftOne
        this.legendList = ['昨日', '今日']
        let key = this.radio
        for (let type in this.pageData) {
          let data = this.pageData[type][key]
          let arr = []
          if (key.includes('Amt') || ['avgStayTime'].includes(key)) {
            data.map(i => {
              arr.push(i.toFixed(2))
            })
          } else if (key.includes('Rate')) {
            data.map(i => {
              arr.push((100 * i).toFixed(2))
            })
          } else if (key.includes('Index')) {
            data.map((i, index) => {
              arr.push(this.dataTable[key][index])
            })
          } else {
            arr = data
          }
          chartData[type] = arr
        }

        //封装图表所需要的数据

        this.sub_yAxis.push({
          type: 'value',
          splitLine: { lineStyle: { type: 'dotted' } },
          splitNumber: 3,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          nameLocation: 'middle',
          name: keyValue[this.radio],
          nameGap: 50,
        })

        console.log(chartData)

        for (let i = 0; i < this.legendList.length; i++) {
          this.sub_series.push({
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            name: this.legendList[i],
            data: chartData[keyValue[this.legendList[i]]],
          })
        }

        console.log(this.getOption)
      } else {
        this.grid = this.gridTwo
        this.left = this.leftTwo
        this.check.map(key => {
          this.legendList.push(keyValue[key])
          let data = this.pageData[key]
          if (data) {
            let arr = []
            if (key.includes('Amt') || ['avgStayTime'].includes(key)) {
              data.map(i => {
                arr.push(i.toFixed(2))
              })
            } else if (key.includes('Rate')) {
              data.map(i => {
                arr.push((100 * i).toFixed(2))
              })
            } else if (key.includes('Index')) {
              data.map((i, index) => {
                arr.push(this.dataTable[key][index])
              })
            } else {
              arr = data
            }
            chartData[key] = arr
          }
        })

        //封装图表所需要的数据
        for (let i = 0; i < this.legendList.length; i++) {
          if (i == 0) {
            this.sub_yAxis.push({
              type: 'value',
              splitLine: { lineStyle: { type: 'dotted' } },
              splitNumber: 3,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            })
          } else {
            this.sub_yAxis.push({
              type: 'value',
              splitLine: { show: false },
              splitNumber: 3,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            })
          }
        }
        console.log(chartData)

        for (let i = 0; i < this.legendList.length; i++) {
          this.sub_series.push({
            type: 'line',
            yAxisIndex: i,
            smooth: true,
            name: this.legendList[i],
            data: chartData[keyValue[this.legendList[i]]],
          })
        }
      }
    },
  `,
    },
  ],
  type: 'radio',
}

const changeRadio = {
  label: 'changeRadio',
  op: [
    {
      label: '无',
      value: '',
    },
    {
      label: '模拟点击',
      value: `
  // 模拟点击
    change(val) {
      let checked = $('#cateTrend .oui-card-content .ant-checkbox-checked')
      if (checked.length == 5) {
        $('#cateTrend .oui-card-content.alife-one-design-sycm-indexes-trend-card-content .index-picker-container .oui-index-picker-action > a')[0].click()
      }
      this.radio = val
      let handler = e => {
        if (e.data.act.includes('xws/sync/click/datawar/industry/analy/getEffectTrend.json?')) {
          if (getUrlKey(e.data.act, 'index').includes(val)) {
            window.removeEventListener('message', handler)
            setTimeout(this.fetchData, 0)
          }
        }
      }

      if (!this.hasDataKey.includes(val)) {
        window.addEventListener('message', handler)
        this.loading = true
        $('#cateTrend .oui-card-content .index-picker-container')
          .find(\`.oui-index-picker-item[data-onetrace-index-id='\${val}'] .ant-checkbox\`)
          .click()
      }
    },
  `,
    },
    {
      label: '多条折线选择',
      value: `
   // 模拟点击
    change(val, action) {
      if (action == 'remove') {
        let index = this.radio.indexOf(val)
        this.radio.splice(index, 1)
      } else {
        this.radio.push(val)
      }

      this.renderChart()
    },
  `,
    },
    {
      label: '模拟翻页',
      value: `
   currentChange(currentPage, title) {
      let key = \`li[title='\${title}']\`
      console.log(currentPage, title, key)
      let handler = e => {
        if (e.data.act.includes('xws/sync/click/datawar/industry/analy/listShopRank.json?')) {
          console.log(getUrlKey(e.data.act, 'page'))
          if (getUrlKey(e.data.act, 'page') == currentPage) {
            window.removeEventListener('message', handler)
            setTimeout(this.fetchData, 0)
          }
        }
      }
      if (!this.hasData.includes(currentPage)) {
        window.addEventListener('message', handler)
        this.loading = true
      }
      $('#cateShop .ant-pagination.oui-pagination')
        .children(key)
        .click()
    },`,
    },
  ],
  type: 'radio',
}

const importText = {
  label: 'importText',
  op: [
    {
      label: 'XwsNewTable',
      value: `import XwsNewTable from '@/components/XwsNewTable'
  `,
    },
    {
      label: 'XwsShowBoard',
      value: `import XwsShowBoard from '@/taobao/sycm/components/XwsShowBoard.vue'
  `,
    },
    {
      label: 'lineChart',
      value: `import lineChart from '@/components/charts/line'
  `,
    },
    {
      label: 'SimulateClick',
      value: `import SimulateClick from '@/components/SimulateClick/index'`,
    },
  ],
  type: 'checkbox',
}

export const op = {
  // dateRange,
  // dateType,
  // order,
  // orderBy,
  // device,
  // sellerType,
  // pageCount,
  // currentPage,
  float,
  getUrlKey,
  getDomKey,
  dataKey,
  encapsulationConData,
  getItem,
  importText,
  renderTable,
  getDate,
  changeRadio,
  renderChart,
}
