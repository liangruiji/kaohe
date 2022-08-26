crx.py

~~~
@crx.route('/usage/count/', methods=['POST', 'GET'])
@Help.allow_cross_domain
@login_required
def usage_count():
    params = request.args if request.method == "GET" else request.form
    info = params.get('info')
    if not info:
        return {'code': 1500, 'msg': '缺少必要参数！'}
    ret = Decrypt(decrypt_key).decrypt(info)
    try:
        ret = json.loads(ret)
    except:
        return {'code': 1410, 'msg': '数据错误，请刷新页面重试！'}
    fn_name = ret.get('fn_name')
    if not fn_name:
        return {'code': 1500, 'msg': '缺少必要参数！'}
    if fn_name and fn_name != 'undefined':
       Help.usage_count(fn_name)
    return {'code': 200}
~~~

helps.py

use_up_wd_conut

~~~
    @staticmethod
    def usage_count(fn_name):
        """
        # 将使用功能次数记录进行存储
        :param fn_name: 使用的功能的名字
        :return:
        """
        print(fn_name)
        if not fn_name:
            return True
        if fn_name and fn_name != 'undefined':
            zero_time = Help.zero_time()
            mongo_usage_count = mongo.XDATA.usage_count
            mongo_item = mongo_usage_count.find_one({'fn': fn_name, 't': zero_time})
            print(mongo_item)
            if mongo_item:
                if mongo_item.get('m'):
                    update_data = {}
                    update_data['$inc'] = {'m': 1}
                    mongo_usage_count.update_one({'fn': fn_name, 't': zero_time}, update_data)
            else:
                mongo_usage_count.insert_one({'fn': fn_name, 't': zero_time, 'm': 1})

        return True
~~~

func_checker.py

func_module_check

~~~

                result = func(count, limit, try_num)
                if result.get('code', '') == 200:
										fn_name = Help.xws_funs().get(func_name)[0]['fn']
                    Help.usage_count(fn_name)
                return result
~~~

footmark_check

~~~
                if request.method == "GET":
                    params = request.args
                elif request.method == "POST":
                    params = request.form
                else:
                    return {'code': 1405, 'msg': '请求方式不对'}
                    
    result = func(**args)
                if result.get('code', '') == 200:
                		fn_name = Help.xws_funs().get(func_name)[0]['fn']
                    Help.usage_count(fn_name)
                return result
~~~



batch_item_check

~~~~
   result = func(**args)
                if result.get('code', '') == 200:
                    fn_name = Help.xws_funs().get(func_name)[0]['fn']
                    Help.usage_count(fn_name)
                return result
~~~~

func_api_check

~~~
          result = func(**args)
                if result.get('code', '') == 200:
                    Help.usage_count(params.get('fn_name', ''))
                return result
~~~

~~~
 'sycm_ebda': [
            # 生意参谋 多店部分
            '://sycm.taobao.com/portal/',  # 多店-首页
            '://sycm.taobao.com/ebda/',  # 多店-经营分析 
        ]
~~~

~~~
:authority: codecdn.zhishuchacha.com
:method: GET
:path: /production_new/sycm/online/publish/sycm-chromeRutime.js?_v=20220706185503
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en;q=0.8
cache-control: no-cache
origin: https://sycm.taobao.com
pragma: no-cache
referer: https://sycm.taobao.com/
sec-ch-ua: ".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36
~~~

~~~
access-control-allow-origin: *
age: 53077
cache-control: max-age=2591992
content-encoding: gzip
content-length: 6349
content-type: application/javascript
date: Thu, 07 Jul 2022 01:43:04 GMT
etag: W/"62c56ace-4156"
last-modified: Wed, 06 Jul 2022 10:58:22 GMT
server: Byte-nginx
vary: Accept-Encoding
via: cache08.gdcu
x-bdcdn-cache-status: TCP_HIT
x-m-log: QNM:zz607;SRCPROXY:zz610;SRC:19;SRCPROXY:19;QNM3:20
x-m-reqid: XxgAAHPbtNBQOP8W
x-qnm-cache: Miss
x-request-ip: 163.204.104.224
x-response-cache: edge_hit
x-response-cinfo: 163.204.104.224
x-tt-trace-tag: id=5
~~~



~~~
<template>
  <div class="xws-pull-right">
    <xws-button id="xws-customer-analysis1" style="margin-left: 15px; margin-top: -2px" :show-loading="showLoading" @click.native="fetchData" />
    <el-dialog :visible.sync="dialogVisible" :width="dialogWidth" :append-to-body="true" top="5vh" class="xws-dialog-custom-class" @closed="closeHandel">
      <span slot="title" class="dialog-title">
        <xws-dialog-title :filename="filename" />
      </span>
      <template v-if="showTable">
        <xws-prompt-box />
        <xws-table :table-data="tableData" :table-label="tableLabel" :default-sort="defaultSort" :loading="loading" :filename="filename" :size="size" />
      </template>
      <template v-else>
        <xws-not-actice-tip :picurl="picurl" />
      </template>
    </el-dialog>

    <xws-qr-code
      ref="XwsQrCode"
      :dialog-visible="qrCodeDialogVisible"
      :iframe-url="iframeUrl"
      :service-url="serviceUrl"
      :nick-name="nickName"
      @isDialogVisible="isQrCodeDialogVisible"
    ></xws-qr-code>
  </div>
</template>

<script>
const seller = {
  0: '淘宝',
  1: '天猫',
  '-1': '全部',
}
import bg_mixin from '@/taobao/sycm/mixins/bg_mixin.js'
import { db } from '@/utils/indexDB'
import XwsTable from '@/components/XwsTable'
import XwsButton from '@/components/XwsButton'
import XwsDialogTitle from '@/components/XwsDialogTitle'
import XwsNotActiceTip from '@/components/XwsNotActiceTip'

import XwsQrCode from '@/taobao/sycm/components/XwsQrCode.vue'
import { getSycmIndexParame } from '@/taobao/sycm/init_api.js'
import { arrUnique, eleMesBox } from '@/utils/public.js'
export default {
  // 市场 => 客群透视->客群透视分析
  name: 'XwsCustomerAnalysis',
  components: {
    XwsTable,
    XwsButton,
    XwsDialogTitle,
    XwsNotActiceTip,
    // XwsLogin,
    XwsQrCode,
  },
  mixins: [bg_mixin],
  data() {
    return {
      showLoading: false,
      dialogVisible: false,
      showTable: false,
      dialogWidth: '30%',
      qrCodeDialogVisible: false,
      iframeUrl: '',
      serviceUrl: '',
      nickName: '',
      filename: '',
      picurl: '',
      site_url: '[小旺神：<a href="https://xiaowangshen.com/" target="_blank">xiaowangshen.com</a>]',
      defaultSort: '',
      size: 50,
      loading: true,

      tableData: [],
      tableLabel: [
        {
          prop: 'date',
          label: '时间',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'cType',
          label: '属性',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'attr',
          label: '属性名称',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'age',
          label: '年龄段',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'payByrCntIndex',
          label: '支付人数',
          sortable: true,
          align: 'center',
          render: params => {
            return `${params.payByrCntIndex.toLocaleString()}`
          },
        },
        {
          prop: 'tradeIndex',
          label: '交易金额',
          sortable: true,
          align: 'center',
          render: params => {
            return `${params.tradeIndex.toLocaleString()}`
          },
        },
        {
          prop: 'payConvRate',
          label: '支付转化率',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'uv',
          label: '访客人数',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'unPrice',
          label: '客单价',
          sortable: true,
          align: 'center',
        },
        {
          prop: 'uvValue',
          label: 'UV价值',
          sortable: true,
          align: 'center',
        },
      ],
    }
  },
  methods: {
    isQrCodeDialogVisible(val) {
      this.qrCodeDialogVisible = val
    },
    async fetchData() {
      this.showLoading = true
      let cateId = getCurCateId()
      let dateRange = getDateRange()
      let dateType = getDateType()
      let sellerType = -1
      let sellerLabel = $('.sellerType-select .ant-select-selection-selected-value').text()
      if (sellerLabel == '淘宝') {
        sellerType = 0
      } else if (sellerLabel == '天猫') {
        sellerType = 1
      }

      let picker = $('.common-picker-header').attr('title')
      this.filename = `类目:${picker} 来源:${seller[sellerType]} 时间: ${dateRange} 客群透视 ${this.site_url}`
      cateId = parseInt(cateId)
      let obj = { device: 0, dateType, cateId, sellerType, dateRange }
      console.log(obj)
      // let key = await db.customerGroupPerspective.where(obj).primaryKeys()
      let data = {}

      data = await db.customerGroupPerspective.where(obj).toArray()
      this.data = data

      let conKey = `customerGroupPerspective_${dateType}_${dateRange}_${cateId}_${sellerType}`
      this.conversionIndexData(data, conKey)

      console.log(data)
    },
    //转化指数数据
    conversionIndexData(pageData, conKey) {
      // let con_data = getXwsStorage(conKey)
      let con_data = null
      let indexs = []
      pageData.map(data => {
        for (const i in data.data) {
          if (i.includes('Index')) {
            for (const j of data.data[i]) {
              if (j.data) {
                for (const item of j.data) {
                  if (item.value) {
                    indexs.push(item.value)
                  }
                }
              }
            }
          }
        }
      })

      if (con_data) {
        this.encapsulationConData(con_data, pageData)
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
              this.encapsulationConData(ret.data, pageData)
            }
          } else {
            eleMesBox(ret.msg, this)
            this.showLoading = false
          }
        })
      }
    },
    //封装转化后的数据
    encapsulationConData(con_data, pageData) {
      //把转化后的值替换掉转化前的指数
      pageData.map(data => {
        for (const i in data.data) {
          if (i.includes('Index')) {
            for (const j of data.data[i]) {
              if (j.data) {
                for (const item of j.data) {
                  if (item.value) {
                    if (con_data[item.value] === '超出范围') {
                      item.value = con_data[item.value]
                    } else {
                      item.value = con_data[item.value]['n']
                    }
                  }
                }
              }
            }
          }
        }
      })

      this.pageData = pageData
      this.renderTable()
    },

    //渲染表格
    renderTable() {
      this.dialogWidth = '85%'
      this.dialogVisible = true
      this.showTable = true
      this.tableData = []
      let textMap = {
        M: '男',
        F: '女',
        unkown: '未知',
      }

      this.pageData.map(data => {
        let len = data.data.tradeIndex.length
        let len2 = data.data.tradeIndex[0].data.length
        let cType = ''
        if (data.attributeType.includes('city')) {
          cType = '城市级别'
        } else if (data.attributeType.includes('age')) {
          cType = '性别'
        }
        let date = data.dateRange
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len2; j++) {
            let tableItem = { date, cType }

            let tradeIndex = data.data['tradeIndex'][i].data[j].value
            let payConvRate = data.data['payConvRate'][i].data[j].value
            let payByrCntIndex = data.data['payByrCntIndex'][i].data[j].value
            let age = data.data['tradeIndex'][i].name
            let item = data.data['tradeIndex'][i].data[j]
            let attr = cType == '性别' ? textMap[item.name] : item.name
            tableItem.attr = attr
            tableItem.age = age
            tableItem['tradeIndex'] = tradeIndex ? tradeIndex : ''
            tableItem['payConvRate'] = payConvRate == '超出范围' ? '超出范围' : payConvRate ? percentFormat((payConvRate * 100).toFixed(2)) : ''
            tableItem['payByrCntIndex'] = payByrCntIndex ? payByrCntIndex : ''

            if ((tableItem.attr == 'unkown' && !item.value) || !item.value) {
              continue
            }
            let uv = ''
            let unPrice = ''
            let uvValue = ''
            if (typeof payConvRate == 'number' && typeof payByrCntIndex == 'number' && payConvRate != 0) {
              uv = (payByrCntIndex / payConvRate).toFixed()
            }
            if (typeof tradeIndex == 'number' && typeof payByrCntIndex == 'number' && payByrCntIndex != 0) {
              unPrice = (tradeIndex / payByrCntIndex).toFixed(2)
            }
            if (typeof tradeIndex == 'number' && typeof parseInt(uv) == 'number' && uv != 0) {
              uvValue = (tradeIndex / uv).toFixed(2)
            }
            tableItem['uv'] = uv
            tableItem['unPrice'] = unPrice
            tableItem['uvValue'] = uvValue
            this.tableData.push(tableItem)
          }
        }
      })
      console.log(this.tableData)
      if (this.tableData.length <= 10) {
        this.size = 10
      } else {
        this.size = 20
      }
      this.loading = false
      this.showLoading = false
    },

    //关闭弹框时重置data数据
    closeHandel() {
      Object.assign(this.$data, this.$options.data())
    },
  },
}
</script>

<style lang="scss" scoped></style>

~~~

![image-20220716114954206](/Users/telking/Library/Application Support/typora-user-images/image-20220716114954206.png)

callee.caller
