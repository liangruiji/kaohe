<template>
  <div class="xws-pull-right">
    <xws-button id="xws-activity-details-tools" text="小旺神汇总报表" :show-loading="showLoading" @click.native="judgeActivate" />
    <el-dialog :visible.sync="dialogVisible" :width="dialogWidth" :append-to-body="true" top="5vh" class="xws-dialog-custom-class" @closed="closeHandel">
      <span slot="title" class="dialog-title">
        <xws-dialog-title :filename="filename" />
      </span>
      <template v-if="showTable">
        <xws-show-board :has-data-board="hasDataKey" type="check" :board-list="indexCodeButtonList" :current-board="radio" @change="change">
          <template v-slot="scope">
            <div class="label">
              {{ tableLabelMaps[scope.item]['label'] }}
            </div>
            <div class="value-box">
              {{ labelData[scope.item]['value'].toLocaleString() }}
            </div>
          </template>
        </xws-show-board>

        <line-chart v-if="dialogVisible" :loading="loading" :option="getOption" />
        <el-tabs v-if="['shopbonus', 'collocationId', 'shopPromotion', 'commonItemPromotion'].includes(type)" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="工具效果" name="first"></el-tab-pane>
          <el-tab-pane label="活动效果" name="second"></el-tab-pane>
        </el-tabs>
        <xws-table
          :key="activeName"
          :table-data="tableData"
          :table-label="tableLabel"
          :default-sort="defaultSort"
          :loading="loading"
          :filename="filename"
          :size="size"
        />
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
</template>
<script>
import bg_mixin from '@/taobao/sycm/mixins/bg_mixin.js'
import XwsQrCode from '@/taobao/sycm/components/XwsQrCode.vue'
import XwsShowBoard from '@/taobao/sycm/components/XwsShowBoard.vue'
import { getSycmUserStateParame } from '@/taobao/sycm/init_api.js'
import { eleMesBox } from '@/utils/public.js'
import lineChart from '@/components/charts/line'
function time(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
  return date
    .toJSON()
    .substr(0, 10)
    .replace('T', ' ')
}
const op = {
  shopbonus: ['getCouponsCnt', 'useCouponsCnt', 'payByrCnt', 'payCnt', 'payAmt'],
  itemcoupon: ['getCouponsCnt', 'useCouponsCnt', 'payByrCnt', 'payCnt', 'payAmt'],
  commonItemPromotion: ['payCnt', 'payByrCnt', 'payAmt', 'payPct'],
  shopPromotion: ['payCnt', 'payByrCnt', 'payAmt', 'payPct'],
  collocationId: ['payCnt', 'payByrCnt', 'payAmt', 'payOrdCnt', 'payMordCnt', 'payPct', 'cartOrderRate'],
  coupon2gold: ['payByrCnt', 'payCnt', 'payOrdCnt', 'payMordCnt', 'payAmt', 'payOrdDsc', 'ROI', 'payPct'],
  coupon2category: ['payByrCnt', 'payCnt', 'payOrdCnt', 'payMordCnt', 'payAmt', 'payOrdDsc', 'ROI', 'payPct'],
  maijiufan: ['redSendOrderCnt', 'redMordOrderCnt', 'redPayOrderAmt', 'redPayMordPayAmt', 'sendRedPacketAmt', 'redPayByrCnt', 'tpPayAvg', 'ROI', 'payPct'],
  qunmanfan: [
    'taskInGroupCnt',
    'taskInPayMordOrdCnt',
    'taskInPayAmt',
    'taskPayOrdByrCnt',
    'taskGroupCnt',
    'taskPayByrCnt',
    'taskPayOrdAmt',
    'taskPayMordCnt',
    'taskRedPayAmt',
    'ROI',
    'payPct',
    'taskRadio',
  ],
  tbCross: ['itemPayAmt', 'tbcrossPayPayRate', 'tbcrossPayPct', 'tbcrossPayOrdByrCnt', 'tbcrossPayMordCnt'],
}
const indexCode = {
  shopbonus: ['couponAmt', 'startFee', 'couponTotalCount', 'getCouponsCnt', 'useCouponsCnt', 'actItmPayAmt'],
  itemcoupon: ['couponAmt', 'startFee', 'couponTotalCount', 'getCouponsCnt', 'useCouponsCnt', 'actItmPayAmt'],
  commonItemPromotion: ['sumPayByrCnt', 'sumPayCnt', 'cumulativePayAmt', 'sumPayPct'],
  shopPromotion: ['sumPayMordCnt', 'sumPayOrdCnt', 'sumPayCnt', 'cumulativePayAmt', 'avgPayCnt'],
  collocationId: ['sumPayMordCnt', 'sumPayOrdCnt', 'sumPayCnt', 'cartOrderRateTotal'],
}

const tabNameMap = {
  店铺优惠券: 'shopbonus',
  搭配宝: 'collocationId',
  店铺宝: 'shopPromotion',
  单品宝: 'commonItemPromotion',
  品类券: 'coupon2category',
  前N: 'topN',
  跨店满减: 'tbCross',
}
const urls = {
  tools: '//sycm.taobao.com/datawar/v3/activity/detail/tools.json',
  coupon2gold: '//sycm.taobao.com/datawar/v3/datawar/market/tools/coupon/hh.json',
  coupon2goldTrend: '//sycm.taobao.com/datawar/v3/datawar/market/tools/coupon/hh/trend.json',
  coupon2category: '//sycm.taobao.com/datawar/v3/datawar/market/tools/coupon/hh.json',
  maijiufan: '//sycm.taobao.com/datawar/v3/datawar/market/tools/maijiufan/hh.json',
  qunmanfan: '//sycm.taobao.com/datawar/v3/datawar/market/tools/qunmanfan/hh.json',
  shopbonus: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon.json',
  itemcoupon: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon.json',
  shopPromotion: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion.json',
  commonItemPromotion: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion.json',
  coupon2categoryTrend: '//sycm.taobao.com/datawar/v3/datawar/market/tools/coupon/hh/trend.json',
  maijiufanTrend: '//sycm.taobao.com/datawar/v3/datawar/market/tools/maijiufan/hh/trend.json',
  qunmanfanTrend: '//sycm.taobao.com/datawar/v3/datawar/market/tools/qunmanfan/hh/trend.json',
  shopbonusTrend: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon/trend.json',
  itemcouponTrend: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon/trend.json',
  shopPromotionTrend: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion/trend.json',
  commonItemPromotionTrend: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion/trend.json',
  collocationId: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/collocation.json',
  collocationIdEffect: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/collocationId/act.json',
  collocationIdTrend: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/collocation/trend.json',
  shopbonusEffect: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon/act.json',
  itemcouponEffect: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon/act.json',
  shopPromotionEffect: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/shopPromotion/act.json',
  commonItemPromotionEffect: '//sycm.taobao.com/datawar/v3/activity/detail/tools/effect/commonItemPromotion/act.json',
  tbCross: '//sycm.taobao.com/datawar/v4/activity/detail/tools/effect/coupon.json',
  tbCrossTrend: '//sycm.taobao.com/datawar/v4/activity/detail/tools/effect/coupon/trend.json',
  topN: '//sycm.taobao.com/datawar/v4/activity/detail/tools/effect/coupon.json',
  topNTrend: '//sycm.taobao.com/datawar/v4/activity/detail/tools/effect/coupon/trend.json',
}
const tableLabelMaps = {
  date: { prop: 'date', label: '日期', sortable: true, minWidth: 124 },
  getCouponsCnt: {
    prop: 'getCouponsCnt',
    label: '领取张数',
    sortable: true,
    minWidth: 92,
  },
  useCouponsCnt: {
    prop: 'useCouponsCnt',
    label: '使用张数',
    sortable: true,
    minWidth: 92,
  },
  payByrCnt: {
    prop: 'payByrCnt',
    label: '支付买家数',
    sortable: true,
    minWidth: 104,
  },
  payCnt: {
    prop: 'payCnt',
    label: '支付件数',
    sortable: true,
    minWidth: 92,
  },
  payAmt: {
    prop: 'payAmt',
    label: '支付金额',
    sortable: true,
    minWidth: 92,
  },
  payPct: {
    prop: 'payPct',
    label: '客单价',
    sortable: true,
    minWidth: 80,
  },
  payOrdCnt: {
    prop: 'payOrdCnt',
    label: '支付子订单数',
    sortable: true,
    minWidth: 116,
  },
  payMordCnt: {
    prop: 'payMordCnt',
    label: '支付父订单数',
    sortable: true,
    minWidth: 116,
  },
  cartOrderRate: {
    prop: 'cartOrderRate',
    label: '连带率',
    sortable: true,
    minWidth: 80,
  },
  payOrdDsc: {
    prop: 'payOrdDsc',
    label: '优惠金额',
    sortable: true,
    minWidth: 92,
  },
  ROI: {
    prop: 'ROI',
    label: 'ROI',
    sortable: true,
    minWidth: 80,
  },
  redSendOrderCnt: {
    prop: 'redSendOrderCnt',
    label: '发送红包子订单数',
    sortable: true,
    minWidth: 140,
  },
  redMordOrderCnt: {
    prop: 'redMordOrderCnt',
    label: '发送红包父订单数',
    sortable: true,
    minWidth: 140,
  },
  redPayOrderAmt: {
    prop: 'redPayOrderAmt',
    label: '发送红包子订单支付金额',
    sortable: true,
    minWidth: 176,
  },
  redPayMordPayAmt: {
    prop: 'redPayMordPayAmt',
    label: '发送红包父订单支付金额',
    sortable: true,
    minWidth: 176,
  },
  sendRedPacketAmt: {
    prop: 'sendRedPacketAmt',
    label: '发送红包金额',
    sortable: true,
    minWidth: 116,
  },
  redPayByrCnt: {
    prop: 'redPayByrCnt',
    label: '发送红包支付买家数',
    sortable: true,
    minWidth: 152,
  },
  tpPayAvg: {
    prop: 'tpPayAvg',
    label: '平均让利金额',
    sortable: true,
    minWidth: 116,
  },
  taskInGroupCnt: {
    prop: 'taskInGroupCnt',
    label: '参与任务群数',
    sortable: true,
    minWidth: 116,
  },
  taskInPayMordOrdCnt: {
    prop: 'taskInPayMordOrdCnt',
    label: '参与任务父订单数',
    sortable: true,
    minWidth: 140,
  },
  taskInPayAmt: {
    prop: 'taskInPayAmt',
    label: '参与任务支付金额',
    sortable: true,
    minWidth: 140,
  },
  taskPayOrdByrCnt: {
    prop: 'taskPayOrdByrCnt',
    label: '参与任务支付买家数',
    sortable: true,
    minWidth: 152,
  },
  taskGroupCnt: {
    prop: 'taskGroupCnt',
    label: '完成任务群数',
    sortable: true,
    minWidth: 116,
  },
  taskPayByrCnt: {
    prop: 'taskPayByrCnt',
    label: '完成任务支付买家数',
    sortable: true,
    minWidth: 152,
  },
  taskPayOrdAmt: {
    prop: 'taskPayOrdAmt',
    label: '完成任务支付金额',
    sortable: true,
    minWidth: 140,
  },
  taskPayMordCnt: {
    prop: 'taskPayMordCnt',
    label: '完成任务父订单数',
    sortable: true,
    minWidth: 140,
  },
  taskRedPayAmt: {
    prop: 'taskRedPayAmt',
    label: '任务成交发放红包金额',
    sortable: true,
    minWidth: 164,
  },
  taskRadio: {
    prop: 'taskRadio',
    label: '任务完成率',
    sortable: true,
    minWidth: 104,
  },
  itemPayAmt: { prop: 'itemPayAmt', label: '支付金额', sortable: true, minWidth: 92 },
  tbcrossPayPayRate: { prop: 'tbcrossPayPayRate', label: '跨店满减商品成交占比', sortable: true, minWidth: 164 },
  tbcrossPayPct: { prop: 'tbcrossPayPct', label: '客单价', sortable: true, minWidth: 80 },
  tbcrossPayOrdByrCnt: { prop: 'tbcrossPayOrdByrCnt', label: '支付买家数', sortable: true, minWidth: 104 },
  tbcrossPayMordCnt: { prop: 'tbcrossPayMordCnt', label: '支付订单数', sortable: true, minWidth: 104 },
  // 活动效果
  actId: {
    prop: 'actId',
    label: '活动id',
    sortable: true,
    minWidth: 92,
  },
  actName: {
    prop: 'actName',
    label: '活动名称',
    sortable: true,
    minWidth: 92,
  },
  toolName: {
    prop: 'toolName',
    label: '工具名称',
    sortable: true,
    minWidth: 92,
  },
  couponAmt: {
    prop: 'couponAmt',
    label: '面额（元）',
    sortable: true,
    minWidth: 104,
  },
  startFee: {
    prop: 'startFee',
    label: '使用条件（元）',
    sortable: true,
    minWidth: 128,
  },
  couponTotalCount: {
    prop: 'couponTotalCount',
    label: '发行张数',
    sortable: true,
    minWidth: 92,
  },
  actItmPayAmt: {
    prop: 'actItmPayAmt',
    label: '活动商品支付金额',
    sortable: true,
    minWidth: 140,
  },

  sumPayByrCnt: {
    prop: 'sumPayByrCnt',
    label: '累计支付买家数',
    sortable: true,
    minWidth: 128,
  },
  sumPayCnt: {
    prop: 'sumPayCnt',
    label: '累计支付件数',
    sortable: true,
    minWidth: 116,
  },
  cumulativePayAmt: {
    prop: 'cumulativePayAmt',
    label: '累计支付金额',
    sortable: true,
    minWidth: 116,
  },
  sumPayPct: {
    prop: 'sumPayPct',
    label: '累计客单价',
    sortable: true,
    minWidth: 104,
  },
  sumPayMordCnt: {
    prop: 'sumPayMordCnt',
    label: '累计支付父订单数',
    sortable: true,
    minWidth: 140,
  },
  sumPayOrdCnt: {
    prop: 'sumPayOrdCnt',
    label: '累计支付子订单数',
    sortable: true,
    minWidth: 140,
  },
  avgPayCnt: {
    prop: 'avgPayCnt',
    label: '人均支付件数',
    sortable: true,
    minWidth: 116,
  },
  cartOrderRateTotal: {
    prop: 'cartOrderRateTotal',
    label: '累计连带率',
    sortable: true,
    minWidth: 104,
  },
}
export default {
  // 作战室 => 活动分析 => 活动详情 营销工具
  name: 'XwsActivityDetailsTools',
  components: { XwsQrCode, XwsShowBoard, lineChart },
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
      type: '',
      labelData: {},
      pageData: [],
      pageDataTwo: [],
      tableData: [],
      tableDataOne: [],
      tableDataTwo: [],

      tableLabelList: [],
      defaultSort: '',

      legendList: [],
      dateInfo: [],
      sub_yAxis: [],
      sub_series: [],

      indexCodeButtonList: [],

      radio: [],
      hasDataKey: [],
      tableLabelMaps: tableLabelMaps,

      activeName: 'first',
    }
  },
  computed: {
    getOption: function() {
      return {
        legend: {
          data: this.legendList,
          orient: 'vertical', // 图例列表的布局朝向。
          bottom: '10',
          left: '78%',
          selected: {},
        },

        grid: { top: '25', left: '3%', right: '25%', bottom: '20', containLabel: false },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateInfo,
        },
        yAxis: this.sub_yAxis,
        series: this.sub_series,
      }
    },
    tableLabel: function() {
      return this.tableLabelList.map(i => {
        return tableLabelMaps[i]
      })
    },
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
      //sycm.taobao.com/datawar/v3/activity/detail/tools/effect/coupon/trend.json?activityId=19292517&dateRange=2019-01-05|2019-01-05&dateType=today&indexCode=&toolId=shopbonus 店铺优惠卷
      //sycm.taobao.com/datawar/v3/activity/detail/tools/effect/collocation/trend.json?activityId=19292517&dateRange=2019-01-05|2019-01-05&dateType=today&indexCode=&toolId=collocationId 搭配宝
      //sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion/trend.json?activityId=19292517&dateRange=2019-01-05|2019-01-05&dateType=today&indexCode=&toolId=shopPromotion 店铺宝
      //sycm.taobao.com/datawar/v3/activity/detail/tools/effect/promotion/trend.json?activityId=19292517&dateRange=2019-01-05|2019-01-05&dateType=today&indexCode=&toolId=commonItemPromotion 单品宝
      //sycm.taobao.com/datawar/v4/activity/detail/tools/effect/coupon/trend.json?activityId=19292517&dateRange=2019-01-05|2019-01-05&dateType=today&indexCode=&toolId=tbCross // 跨店满减
      this.activityInfo = getXwsStorage('xws/session/datawar/v3/activity/getActivity.json')
      console.log(this.activityInfo)
      let tabName = $('.alife-dt-card-sycm-am-market-indexes-trend .oui-tab-switch .oui-tab-switch-item-custom-active h3').text()
      let type = ''
      if (tabName) {
        type = tabNameMap[tabName]
        this.isHasTableTwo = ['shopbonus', 'collocationId', 'shopPromotion', 'commonItemPromotion'].includes(type)
        this.type = type
      } else {
        eleMesBox('暂不支持 前N 的导出 ', this)
        this.showLoading = false
        return false
      }
      if (tabName == '前N') {
        eleMesBox('暂不支持 前N 的导出 ', this)
        this.showLoading = false
        return false
      }

      let dateRange = '2019-01-05|2019-01-05'
      let dateType = 'today'
      let activityId = getUrlKey(window.location.href, 'activityId')

      // 总数
      let labelDataKey = `${urls[type]}?activityId=${activityId}&dateRange=${dateRange}&dateType=${dateType}&toolId=${type}`
      console.log('labelDataKey', labelDataKey)
      let labelData = localStorage.getItem(labelDataKey)
      if (labelData) {
        labelData = JSON.parse(JSON.parse(labelData.replace(/\d+\|/g, '')))['value']['_d']
        console.log('>>>>>>', labelData)
        this.labelData = labelData.data
      }

      // 曲线图数据
      let keyOne = `${urls[type + 'Trend']}?activityId=${activityId}&dateRange=${dateRange}&dateType=${dateType}&indexCode=&toolId=${type}`
      console.log(keyOne)
      let data = localStorage.getItem(keyOne)
      if (data) {
        data = JSON.parse(JSON.parse(data.replace(/\d+\|/g, '')))['value']['_d']['data']
        console.log('>>>>>>', data)
        if (Object.keys(data).length !== 0) {
          this.pageData = data
        } else {
          eleMesBox('暂无数据', this)
          this.showLoading = false
          return false
        }
      }

      // 活动效果数据
      if (this.isHasTableTwo) {
        let keyTwo = `${urls[type + 'Effect']}?activityId=${activityId}&dateRange=&dateType=today&indexCode=${indexCode[type].join(
          ',',
        )}&order=desc&orderBy=sumPayCnt&`
        let keyThree = `toolId=${type}`
        let localStorageLen = localStorage.length
        for (let i = 0; i < localStorageLen; i++) {
          let localStorageKey = localStorage.key(i)
          if (localStorageKey.includes(keyTwo) && localStorageKey.includes(keyThree)) {
            console.log('localStorageKey', localStorageKey)

            let data = localStorage.getItem(localStorageKey)

            if (data) {
              data = JSON.parse(JSON.parse(data.replace(/\d+\|/g, '')))['value']['_d']['data']['data']
              console.log('>>>>>>', data)
              this.pageDataTwo.push(...data)
            }
          }
        }
      }

      this.renderTable()

      this.filename = `${this.activityInfo.activityName} ${tabName} ${this.site_url}`
    },

    //渲染表格
    renderTable() {
      this.dialogWidth = '95%'
      this.dialogVisible = true
      this.showTable = true
      this.tableData = []
      this.tableDataTwo = []

      let dataLen = this.pageData.statDate.length
      let dateList = this.pageData.statDate.map(i => {
        return time(i)
      })

      this.dateInfo = dateList

      let keyList = op[this.type]
      this.indexCodeButtonList = keyList
      this.hasDataKey = keyList
      this.radio.push(keyList[0])
      // 工具效果
      for (let i = 0; i < dataLen; i++) {
        let detailData = { date: dateList[i] }
        for (let key in this.pageData) {
          if (keyList.includes(key)) {
            let data = this.pageData[key][i]
            if (key.includes('Amt') || ['avgStayTime', 'tbcrossPayPct', 'payOrdDsc', 'payPct'].includes(key)) {
              detailData[key] = data.toFixed(2)
            } else if (key.includes('Rate')) {
              detailData[key] = percentFormat((100 * data).toFixed(2))
            } else {
              detailData[key] = data
            }
          }
        }
        this.tableDataOne.push(detailData)
      }
      // 活动效果
      if (this.isHasTableTwo) {
        let keyListTwo = indexCode[this.type]
        this.pageDataTwo.map(item => {
          this.getItem(item, keyListTwo)
        })
      }
      if (this.activeName == 'first') {
        this.tableLabelList = ['date'].concat(keyList)
        this.tableData = this.tableDataOne
      } else {
        this.tableLabelList = ['actName', 'toolName'].concat(keyListTwo)
        this.tableData = this.tableDataTwo
      }

      this.renderChart()

      console.log(' this.tableData', this.tableDataOne)
      console.log(' this.tableData', this.tableDataTwo)
      this.loading = false
      this.showLoading = false
    },

    //渲染图表
    renderChart() {
      let chartData = {}
      this.legendList = []
      this.sub_yAxis = []
      this.sub_series = []
      let titleMaps = {}
      this.radio.map(key => {
        titleMaps[tableLabelMaps[key]['label']] = key
        this.legendList.push(tableLabelMaps[key]['label'])
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

      console.log('titleMaps', titleMaps)
      for (let i = 0; i < this.legendList.length; i++) {
        this.sub_series.push({
          type: 'line',
          yAxisIndex: i,
          smooth: true,
          name: this.legendList[i],
          data: chartData[titleMaps[this.legendList[i]]],
        })
      }
    },
    getItem(item, keyList) {
      let actId = item.actId.value
      let actName = item.actName.value
      let toolName = item.toolName.value

      let detailData = { actId, actName, toolName }
      for (let key of keyList) {
        detailData[key] = '-'
      }
      for (let key in item) {
        if (keyList.includes(key)) {
          let data = item[key]
          if (!data.hasOwnProperty('value')) {
            detailData[key] = '-'
            continue
          }
          if (key.includes('Amt') || ['avgStayTime', 'avgPv', 'payPct'].includes(key)) {
            detailData[key] = data['value'].toFixed(2)
          } else if (key.includes('Rate')) {
            detailData[key] = percentFormat((100 * data['value']).toFixed(2))
          } else {
            detailData[key] = data['value']
          }
        }
      }
      this.tableDataTwo.push(detailData)
    },

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
    handleClick() {
      if (this.activeName == 'first') {
        let keyList = op[this.type]
        this.tableLabelList = ['date'].concat(keyList)
        this.tableData = this.tableDataOne
      } else {
        let keyListTwo = indexCode[this.type]
        this.tableLabelList = ['actName', 'toolName'].concat(keyListTwo)
        this.tableData = this.tableDataTwo
      }
      console.log(this.tableLabel)
    },

    //关闭弹框时重置data数据
    closeHandel() {
      Object.assign(this.$data, this.$options.data())
    },
  },
}
</script>
<style lang="scss" scoped></style>
