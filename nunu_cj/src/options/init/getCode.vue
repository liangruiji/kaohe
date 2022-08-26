<!--
 * @Author: your name
 * @Date: 2021-10-16 17:36:55
 * @LastEditTime: 2021-11-30 14:50:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init/getCode.vue
-->

<template>
  <div>
    <div class="item" @click="drawer = !drawer">
      模板
    </div>
    <el-drawer append-to-body size="85%" :with-header="false" title="生意参谋生成表头配置" :visible.sync="drawer" :direction="direction">
      <div class="get-code">
        <div style="flex:1">
          <div style="display:flex;align-items: center;">
            <span
              style="width:90px;text-align: right;vertical-align: middle;font-size: 14px;color: #606266;line-height: 34px;padding: 0 12px 0 0;box-sizing: border-box;"
            >
              id:
            </span>
            <el-input v-model="id" style="width:150px" size="mini" placeholder="请输入内容" clearable></el-input>
          </div>
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item v-for="(item, key) in option" :key="key" :label="item.label">
              <el-radio-group v-if="item.type == 'radio'" v-model="form[key]" size="mini">
                <el-radio-button v-for="(i, index) in item.op" :key="index" :label="index">
                  {{ i.label }}
                </el-radio-button>
              </el-radio-group>
              <el-checkbox-group v-if="item.type == 'checkbox'" v-model="form[key]" size="mini">
                <el-checkbox-button v-for="(i, index) in item.op" :key="index" :label="index" :name="key">
                  {{ i.label }}
                </el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>

            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">
                立即创建
              </el-button>
              <el-button>取消</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <div style="flex:1">
          <el-input id="hhh" v-model="textarea2" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <el-input v-model="textarea3" clearable type="textarea" :rows="5" :cols="5" placeholder="请输入内容" @input="inputChange"></el-input>

      <el-button type="primary" size="mini" @click="copy">
        复制
      </el-button>
      <check-group v-model="kk" @change="input">
        <check label="aa"></check>
        <check label="bb"></check>
      </check-group>
      <div>{{ kk }}</div>
    </el-drawer>
  </div>
</template>

<script>
import checkGroup from '@/options/init/checkGroup'
import check from '@/options/init/check'
import { op } from '@/utils/getCode.js'

function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
export default {
  name: 'NuGetTableLable',

  components: { checkGroup, check },
  data() {
    return {
      drawer: false,
      direction: 'ltr',
      form: {
        importText: [],

        // dateRange: '0',
        // dateType: '0',
        // order: '0',
        // orderBy: '0',
        // device: '0',
        // sellerType: '0',
        // pageCount: '0',
        // currentPage: '0',
        float: '1',
        dataKey: '1',
        encapsulationConData: '0',
        getDate: '1',
        renderTable: '1',
        getItem: '1',
        renderChart: '0',
        changeRadio: '0',
        getUrlKey: [],
        getDomKey: [],
      },
      // textarea2: '',
      textarea3: '',
      keyList: '[]',
      option: op,
      id: '',
      kk: ['aa'],
    }
  },
  computed: {
    textarea2() {
      let script = 'script'
      let id = this.id
      let obj = {}
      for (let i in this.form) {
        if (!op[i]) continue
        let value = this.form[i]
        if (op[i].type == 'radio') {
          obj[i] = op[i]['op'][value]['value']
        } else if (op[i].type == 'checkbox') {
          let data = ''
          value.map(item => {
            data += op[i]['op'][item]['value']
          })
          obj[i] = data
        }
      }
      console.log(obj)
      let {
        // dateRange,
        // dateType,
        // order,
        // orderBy,
        // device,
        // sellerType,
        // pageCount,
        // currentPage,
        float,
        dataKey,
        getItem,
        importText,
        renderTable,
        getDate,
        encapsulationConData,
        changeRadio,
        renderChart,
        getUrlKey,
        getDomKey,
      } = obj

      let fetch = getUrlKey + getDomKey + dataKey

      let html = `   
<template>
${float}
    <xws-button id="${id}" text="小旺神汇总报表" :show-loading="showLoading" @click.native="judgeActivate" />
    <el-dialog :visible.sync="dialogVisible" :width="dialogWidth" :append-to-body="true" top="5vh" class="xws-dialog-custom-class" @closed="closeHandel">
      <span slot="title" class="dialog-title">
        <xws-dialog-title :filename="filename" />
      </span>
      <template v-if="showTable">
      ${
        this.form.changeRadio == '1'
          ? `<xws-show-board :has-data-board="hasDataKey" :board-list="indexCodeButtonList" :current-board="radio" @change="change">
          <template v-slot="scope">
            <div class="label">
              {{ radioText[scope.item] }}
            </div>
            <!-- <div class="value-box">
              {{ secondData[scope.item][0].toLocaleString() }}
            </div> -->
          </template>
        </xws-show-board>`
          : ''
      }
       ${
         this.form.changeRadio == '2'
           ? `<xws-show-board :has-data-board="hasDataKey" type='check' :board-list="indexCodeButtonList" :current-board="radio" @change="change">
          <template v-slot="scope">
            <div class="label">
              {{ radioText[scope.item] }}
            </div>
            <!-- <div class="value-box">
              {{ secondData[scope.item][0].toLocaleString() }}
            </div> -->
          </template>
        </xws-show-board>`
           : ''
       }
      ${this.form.renderChart == '1' ? '<line-chart v-if="dialogVisible" :loading="loading" :option="getOption" />' : ''}
       ${
         this.form.changeRadio == '3'
           ? `<xws-table :table-data="tableData" :table-label="tableLabel" :default-sort="defaultSort" :loading="loading" :filename="filename" :size="size">
          <template v-slot:tag-tip>
            <div v-if="pageCount > 1" style="display: flex;justify-content: flex-end; align-items: center;">
              <simulate-click
                v-show="pageCount > 0"
                :current-page="currentPage"
                :page-count="pageCount"
                :pager-count="6"
                layout="prev, pager, next"
                :fold="1"
                :has-data="hasData"
                :background="true"
                @current-change="currentChange"
              />
              <el-tooltip
                style="margin-right: 20px;"
                effect="dark"
                content="同步分页：模拟用户点击分页，无需关闭窗口，便可加载多页数据"
                placement="bottom-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </template>
        </xws-table>`
           : '  <xws-table :table-data="tableData" :table-label="tableLabel" :default-sort="defaultSort" :loading="loading" :filename="filename" :size="size" />'
       }
      
      </template>
      <template v-else>
        <xws-not-actice-tip :picurl="picurl" />
      </template>
    </el-dialog>
    <!-- <xws-login :dialog-login-visible="dialogLoginVisible" @isDialogLoginVisible="isDialogLoginVisible" /> -->
    <xws-qr-code
      ref="XwsQrCode"
      :dialog-visible="qrCodeDialogVisible"
      :iframe-url="iframeUrl"
      :service-url="serviceUrl"
      :nick-name="nickName"
      @isDialogVisible="isQrCodeDialogVisible"
    >
    </xws-qr-code>
  </div>
</template>`
      let scrtptText = `     
<script>
import bg_mixin from '@/taobao/sycm/mixins/bg_mixin.js'
import XwsQrCode from '@/taobao/sycm/components/XwsQrCode.vue'
import { getSycmUserStateParame ${
        this.form.encapsulationConData == 0 ? '' : ['1', '2'].includes(this.form.encapsulationConData) ? ',getSycmIndexParame' : ',getSycmOverViewParame'
      }} from '@/taobao/sycm/init_api.js'
import { eleMesBox ${this.form.encapsulationConData != 0 ? ',arrUnique' : ''}} from '@/utils/public.js'
${importText}

export default {
  name: '${id.split('-').reduce((a, b) => {
    return a + firstUpperCase(b)
  }, '')}',
  components: { XwsQrCode },
  mixins: [bg_mixin],
  data() {
    return {
      showLoading: false,
      dialogVisible: false,
      showTable: false,
      dialogWidth: '30%',
      qrCodeDialogVisible: false,
      loading: false,
      iframeUrl: '',
      serviceUrl: '',
      nickName: '',
      filename: '',
      site_url: '[小旺神：<a href="https://xiaowangshen.com/" target="_blank">xiaowangshen.com</a>]',
      size: 50,
      dateRange: '',
      dateType: '',
      pageData:[],
      tableData: [],
      tableLabel: [],
      defaultSort: '',
      ${
        this.form.renderChart == '1'
          ? `
      legendList: [],
      dateInfo: [],
      sub_yAxis: [],
      sub_series: [],`
          : ''
      }
      
     ${
       ['1', '2'].includes(this.form.changeRadio)
         ? `
      indexCodeButtonList: [],
      radioText: keyValue,
      radio: 'tradeIndex',
      hasDataKey: [],
     `
         : ''
     }
      ${
        this.form.changeRadio == '3'
          ? `
      hasData: [],
      pageCount: '',
      currentPage: 1,
     `
          : ''
      }
      
    }
  },
 computed: {
     ${
       this.form.renderChart == '1'
         ? `getOption: function() {
      return {
        legend: {
          data: this.legendList,
          orient: 'horizontal',
          top: 'top',
          left: 'center',
          selected: {},
        },
        // tooltip: {
        //   confine: 'true',
        //   formatter: item => {
        //     let result = \`日期: \${item[0].name}<br/>\`
        //     console.log(item)

        //     item.forEach(function(item) {
        //       if (item.seriesName.includes('占比') || item.seriesName.includes('率')) {
        //         result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '%</br>'
        //       } else {
        //         result += item.marker + ' ' + item.seriesName + ' : ' + item.value + '</br>'
        //       }
        //     })
        //     return result
        //   },
        // },
        grid: { left: '5%', right: '5%' },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateInfo,
        },
        yAxis: this.sub_yAxis,
        series: this.sub_series,
      }
    },`
         : ''
     }
  },
  methods: {
    isQrCodeDialogVisible(val) {
      this.qrCodeDialogVisible = val
    },
    judgeActivate() {
      this.showLoading = true
      const indexInfo = getSycmUserStateParame()
      this.bgReq('POST', indexInfo['url'], { info: indexInfo['info'] }, ret => {
        console.log('ret', ret)
        if (ret.code === 200) {
          if (ret.msg && ret.msg == '已激活') {
            console.log('22222222')
            this.fetchData()
          } else if (ret.msg && ret.msg == '用户扫码关注可激活') {
            this.iframeUrl = ret.url
            this.serviceUrl = ret.serviceUrl
            this.nickName = indexInfo['nickName']
            this.qrCodeDialogVisible = true
          }
        } else {
          eleMesBox(ret.msg, this)
          this.showLoading = false
        }
      })
    },
    fetchData() {
      ${fetch}
      this.filename = \`行业分析 效果趋势 \${dateRange} \${this.site_url}\`
    },
    ${encapsulationConData}
    //渲染表格
    renderTable() {
      this.dialogWidth = '95%'
      this.dialogVisible = true
      this.showTable = true
      this.tableData = []
      ${getDate}
  
      let keyListOne = ${this.keyList}
      let keyListTwo = ['uv', 'pv', 'clickCnt', 'clickUv', 'clickRate', 'bounceRate', 'orderAmt', 'orderByrCnt', 'orderRate', 'payAmt', 'payByrCnt', 'payRate']
      let keyList = false ? keyListTwo : keyListOne
    
      ${renderTable}
     
      console.log(' this.tableData', this.tableData)
      this.loading = false
      this.showLoading = false
    },
    ${getItem}
    ${renderChart}
    ${changeRadio}
    //关闭弹框时重置data数据
    closeHandel() {
      Object.assign(this.$data, this.$options.data())
    },
  },
}
</${script}>
<style lang="scss" scoped></style>`
      return html + scrtptText
    },
  },

  methods: {
    copy() {
      const inputElement = document.querySelector('#hhh')
      inputElement.select()
      document.execCommand('copy')
    },
    onSubmit() {},
    inputChange(val) {
      try {
        this.keyList = '[]'
        let data = localStorage.getItem(val)
        if (data) {
          data = JSON.parse(JSON.parse(data.replace(/\d+\|/g, '')))['value']['_d']
          if (data.length) {
            let keyList = Object.keys(data[0])
            console.log(keyList)
            keyList = keyList.map(i => {
              return `'${i}'`
            })
            this.keyList = '[' + keyList.toString() + ']'
          } else {
            data = data['value']
            if (data.length) {
              this.form['getItem'] = '1'
              let keyList = Object.keys(data[0])
              keyList = keyList.map(i => {
                return `'${i}'`
              })
              this.keyList = '[' + keyList.toString() + ']'
            }
          }
        }
      } catch (error) {
        console.log('出错了')
      }
    },

    input(a, b) {
      console.log(a, b)
    },
  },
}
</script>

<style lang="scss" scoped>
.get-code {
  display: flex;
  margin-left: 5px;
  /deep/ .el-form-item {
    margin-bottom: 0px;
    .el-form-item__label {
      line-height: 34px;
    }
    .el-form-item__content {
      line-height: 34px;
    }
  }
}
</style>
