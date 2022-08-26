<template>
  <div class="de-table" :class="{ 'de-table-light': 'light' === effect }">
    <de-table-header ref="deTableHeader" :store="store" :table-key="tableKey">
      <template v-slot:table-title> </template>
    </de-table-header>
    <de-table-body :store="store" :use-virtual="useVirtual" :height="bodyHeight" v-bind="$attrs" v-on="$listeners">
      <template v-for="t in store.states.slotNames" :slot="t" slot-scope="scope">
        <slot :name="t" v-bind="scope"></slot>
      </template>

      <!-- <div v-for="t in store.states.slotNames" :key="t" :slot="t"></div> -->
      <template v-slot:table-empty></template>
    </de-table-body>
    <de-table-footer ref="deTableFooter" :store="store"></de-table-footer>
    <div v-show="progress.visible" class="progress-wrap">
      <div class="progress-main">
        <div v-if="progress.title" class="title">
          {{ progress.title }}
        </div>
        <el-progress v-else :percentage="progress.percentage"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
// import './mixins/elTableMaxins'
import DeTableHeader from './components/de-table-header/index'
import DeTableBody from './components/de-table-body/index.vue'
import DeTableFooter from './components/de-table-footer/index.vue'

import { createStore } from './store/helper'
import { getColumnByProp } from './public'
// var l = n('y9gQ'), //  store相关
// c = n('gKiB') // 公共函数
export default {
  name: 'DeTable',
  inject: {
    deDialog: {
      default: null,
    },
  },
  components: {
    DeTableHeader,
    DeTableBody,
    DeTableFooter,
  },
  props: {
    tableKey: {
      type: String,
      default: '',
      validator: function(e) {
        return !!e
      },
    },
    columns: {
      type: Array,
      default: function() {
        return []
      },
    },
    data: {
      type: [Array, Function],
      default: function() {
        return []
      },
    },
    height: {
      type: [Number, String],
      default: null,
    },
    minHeight: {
      type: Number,
      default: 200,
    },
    defaultSort: {
      type: Object,
      default: null,
    },
    useVirtual: {
      type: Boolean,
      default: !0,
    },
    autoReset: {
      type: Boolean,
      default: !0,
    },
    autoDateFilter: {
      type: [String, Boolean],
      default: 'dateRange',
    },
    options: {
      type: Object,
      default: function() {
        return {}
      },
    },
    effect: {
      type: String,
      default: 'dark',
    },
  },
  data: function() {
    this.store = createStore(this)

    return {
      progress: {
        visible: (this.isClosedCallback = !1),
        title: null,
        percentage: 0,
      },
    }
  },
  computed: {
    tableOptions: function() {
      return Object.assign(
        {
          hiddenGlobalSearch: !1,
          hiddenCopyTable: !1,
          hiddenExportTable: !1,
          hiddenColumnSetting: !1,
          hiddenFilterTag: !1,
          hiddenSegment: !1,
          hiddenTotalRow: !1,
          showSeniorFilter: !0,
          exportRowHeight: null,
          exportFileName: '导出数据',
          beforeExport: function() {
            return !0
          },
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          pageLayout: 'prev, pager, next, sizes',
        },
        this.options,
      )
    },
    bodyHeight: function() {
      if ('number' != typeof this.height) return this.height
      var e =
          this.tableOptions.hiddenGlobalSearch &&
          this.tableOptions.hiddenCopyTable &&
          this.tableOptions.hiddenExportTable &&
          this.tableOptions.hiddenColumnSetting &&
          this.tableOptions.hiddenFilterTag
            ? 0
            : 52,
        t = this.tableOptions.hiddenSegment && this.tableOptions.hiddenTotalRow ? 0 : 37
      return this.height + e + t < this.minHeight ? this.minHeight - e - t : this.height - e - t
    },
  },
  watch: {
    data: function(e) {
      this.store.commit('setData', e)
    },
    columns: function(e) {
      this.store.commit('setColumn', e)
    },
  },
  created: function() {
    this.columns.forEach(function(e) {
      e.prop || (e.prop = 'temp' + Math.random())
    }),
      this.store.commit('setColumn', this.columns),
      this.store.commit(
        'sort',
        Object.assign(
          Object.assign({}, this.defaultSort),
          {},
          {
            init: !0,
            silent: !0,
          },
        ),
      ),
      this.store.commit('setData', this.data),
      this.deDialog && this.autoReset && ((this.isClosedCallback = !0), this.deDialog.addClosedListener(this.reset))
  },
  beforeDestroy: function() {
    this.isClosedCallback && this.deDialog.removeClosedListener(this.reset)
  },
  methods: {
    sort: function(e, t) {
      'object' === typeof e && ((t = e.order), (e = e.prop)),
        this.store.commit('sort', {
          prop: e,
          order: t,
        })
    },
    clearSort: function() {
      this.store.commit('clearSort')
    },
    setFilterType: function(e, t) {
      this.store.setFilterType(e, t)
    },
    setColumnFilter: function(e, t, n) {
      var r = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3]
      e = getColumnByProp(this.store.states.columns, e)
      e &&
        this.store.commit('columnFilterChange', {
          column: e,
          value: t,
          mode: n,
          isClear: r,
          silent: !0,
        })
    },
    clearFilter: function() {
      this.store.commit('clearFilter', 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null)
    },
    scrollToRow: function(e) {
      this.store.elTable && ((e = this.store.elTable.rowHeight * e), this.store.commit('scroll', e, null))
    },
    reset: function() {
      this.defaultSort ? this.store.commit('sort', Object.assign({}, this.defaultSort)) : this.clearSort(),
        this.clearFilter(),
        this.store.commit('scroll', 0, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table__empty-text {
  line-height: normal;
}
.de-table {
  position: relative;
}
.de-table .progress-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}
.de-table .progress-wrap .progress-main {
  width: 300px;
}
.de-table .progress-wrap .progress-main .title {
  font-size: 14px;
  text-align: center;
  color: #606266;
  margin-bottom: 5px;
}
.de-table {
  font-family: Microsoft YaHei, PingFang SC, Hiragino Sans GB, SimHei, WenQuanYi Micro Hei, sans-serif;
}
.de-table {
  /* 字体颜色 */ /* 间距 */ /* 列单元格以列头为准右对齐 差2个像素，主要是showOverflowTooltip属性 */ /* 带tips */
}
.de-table defined-header + .caret-wrapper {
  display: none;
}
.de-table .el-table {
  background: #f5f7fa;
}
.de-table .defined-header-row {
  background: #f5f7fa;
}
.de-table .defined-header-row th {
  background: #f5f7fa;
}
.de-table .el-table__footer-wrapper .gutter {
  background: #f5f7fa;
}
.de-table .el-table__fixed-right-patch {
  background: #f5f7fa;
}
.de-table thead {
  color: #606266;
}
.de-table tbody {
  color: #303133;
}
.de-table .cell {
  padding-left: 6px;
  padding-right: 6px;
}
.de-table .el-table--border th:first-child .cell {
  padding-left: 6px;
}
.de-table td.col-padding-right-60 .cell {
  padding-right: 60px;
}
.de-table td.col-padding-right-58 .cell {
  padding-right: 58px;
}
.de-table td.col-padding-right-42 .cell {
  padding-right: 42px;
}
.de-table td.col-padding-right-40 .cell {
  padding-right: 40px;
}
.de-table td.col-padding-right-45 .cell {
  padding-right: 45px;
}
.de-table td.col-padding-right-43 .cell {
  padding-right: 43px;
}
.de-table td.col-padding-right-27 .cell {
  padding-right: 27px;
}
.de-table td.col-padding-right-25 .cell {
  padding-right: 25px;
}
.de-table th div {
  text-overflow: initial;
} /* 滚动条 */
.de-table ::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #b4c8d8;
} /* 白色主题表格 */
.de-table-light .header-wrap {
  background: transparent;
  padding: 0 0 10px 0;
}
.de-table-light .el-table {
  background: transparent;
}
.de-table-light .defined-header-row {
  background: #fff;
}
.de-table-light .defined-header-row th {
  background: #fff;
}
.de-table-light .el-table__footer-wrapper .gutter {
  background: transparent;
}
.de-table-light .el-table__fixed-right-patch {
  background: transparent;
}
</style>
