<template>
  <div class="header-wrap">
    <div class="header-left">
      <slot name="table-title" class="slot-wrap"> </slot>
      <div v-if="!store.table.tableOptions.hiddenFilterTag && filterTagShow" class="filter-tag-wrap">
        <filter-tag
          :filters="store.states.filters"
          :filter-mode="store.states.filterMode"
          :global-filter-keyword="store.states.globalFilterKeyword"
          @remove-filter="onRemoveFilter"
          @remove-global-filter="onRemoveGlobalFilter"
        >
          <template v-slot:prefix>
            <el-button slot="prefix" style="padding: '0'" type="text" size="mini" title="点击切换筛选方式" @click="onClickFilterTagHeader">
              {{ 'and' === store.states.filterMode ? '所有' : '任一' }} 满足 <i class="el-icon-arrow-down"></i> :
            </el-button>
          </template>
        </filter-tag>
      </div>
    </div>
    <div class="header-right">
      <div v-if="!store.table.tableOptions.hiddenGlobalSearch">
        <el-input
          ref="globalInput"
          v-model="store.states.globalFilterKeyword"
          placeholder="全局搜索"
          style="width: '160px'"
          clearable
          size="small"
          @input="handleGlobalSearch"
          @clear="handleGlobalSearch"
        >
          <i slot="prefix" class="el-input__icon el-icon-search search-icon" title="搜索" @click="handleGlobalSearch"></i>
        </el-input>
      </div>
      <div v-if="store.table.tableOptions.showSeniorFilter">
        <senior-filter :store="store"> </senior-filter>
      </div>
      <div v-if="!store.table.tableOptions.hiddenCopyTable">
        <div class="copy-btn-wrap">
          <transition name="slide">
            <div v-if="showTip" class="copy-btn-tips">
              复制成功
            </div>
          </transition>
          <transition name="slide">
            <div v-if="copySetTip" class="copy-btn-tips">
              设置成功
            </div>
          </transition>
          <first-tip-popover tip-key="tableCopyImageTip" tip="这里可以复制 数据+图片">
            <el-dropdown :split-button="true" size="small" @command="handleCopyTable" @click="handleCopyTable(copyType.value)">
              <span>
                <i class="el-icon-document-copy"></i>复制
                <span class="export-type-card-wrap">
                  <span class="export-type-card">{{ copyType.index }}</span>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div class="drop-head">
                  <span class="drop-head_left">
                    <span></span>
                    <span>模式选择</span>
                  </span>
                  <span class="drop-head_right"> <i class="icon yqsiconfont yqs-icon-shipin" @click="openVedio"></i>说明 </span>
                </div>
                <el-dropdown-item v-for="t in copyMethods" :key="t.index" :command="t.value" :divided="t.isDivided">
                  <div class="dropdown-wrap">
                    <span class="export-type-card">{{ t.index }}</span>
                    <span>{{ t.text }}</span>
                    <el-button
                      type="text"
                      size="mini"
                      :style="{ color: t.isDefault ? '#B7BAC0' : '#3772E8' }"
                      @click.stop="t.isDefault || setDefault(t, 'copy')"
                    >
                      {{ t.isDefault ? '默认' : '设为默认' }}
                    </el-button>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </first-tip-popover>
        </div>
      </div>
      <div v-if="!store.table.tableOptions.hiddenExportTable">
        <div class="export-table-btn-wrap">
          <transition name="slide">
            <div v-if="exportSetTip" class="export-btn-tips">
              设置成功
            </div>
          </transition>
          <el-dropdown size="small" :split-button="true" @command="handleExportTable" @click="handleExportTable(exportType.value)">
            <span>
              <i class="el-icon-download"></i> 导出
              <span class="export-type-card-wrap">
                <span class="export-type-card">
                  {{ exportType.index }}
                </span>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="drop-head">
                <span class="drop-head_left">
                  <span></span>
                  <span>模式选择</span>
                </span>
                <span class="drop-head_right">
                  <i class="icon yqsiconfont yqs-icon-shipin" @click="openVedio"></i>
                  说明
                </span>
              </div>
              <el-dropdown-item v-for="t in exportMethods" :key="t.index" :command="t.value" :divided="t.isDivided">
                <div class="dropdown-wrap">
                  <span class="export-type-card">{{ t.index }}</span>
                  <span>{{ t.text }}</span>
                  <el-button
                    type="text"
                    size="mini"
                    :style="{ color: t.isDefault ? '#B7BAC0' : '#3772E8' }"
                    @click.stop="t.isDefault || setDefault(t, 'export')"
                  >
                    {{ t.isDefault ? '默认' : '设为默认' }}
                  </el-button>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div v-show="!store.table.tableOptions.hiddenColumnSetting">
        <column-setting
          :table-key="tableKey"
          :data="store.states.colSetData"
          :default-data="store.states._colSetData"
          @change="
            e => {
              return store.commit('saveColSetData', e)
            }
          "
        >
        </column-setting>
      </div>
    </div>
    <video-dialog ref="video" :visible.sync="videoVisible" url="https://qiniu.amingtool.com/copy_export_explain.mp4"></video-dialog>
  </div>
</template>

<script>
import ColumnSetting from './column-setting.vue'
import FilterTag from './filter-tag.vue'
import FirstTipPopover from '@/components/de-table/first-tip-popover'
import SeniorFilter from './senior-filter.vue'
import VideoDialog from '@/components/de-table/video-dialog'

import { YKlt, LiUo, IcxY } from '@/components/de-table/copy.js' // 复制功能相关  // 导出功能相关

// var d = n('IcxY'), // 封装后的localStorage方法
let p = 'deTableExportConfig'
export default {
  name: 'DeTableHeader',
  components: {
    ColumnSetting,
    FilterTag,
    FirstTipPopover,
    SeniorFilter,
    VideoDialog,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    store: {
      required: !0,
    },
    tableKey: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      showTip: !1,
      copyMethods: [
        {
          index: '模式一',
          value: 'data',
          text: '复制表格 数据',
          isDefault: !0,
          isDivided: !0,
        },
        {
          index: '模式二',
          value: 'data,header',
          text: '复制表格 数据+头部',
          isDefault: !1,
        },
        {
          index: '模式三',
          value: 'data,image',
          text: '复制表格 数据+图片',
          isDefault: !1,
        },
        {
          index: '模式四',
          value: 'data,image,header',
          text: '复制表格 数据+图片+头部',
          isDefault: !1,
        },
        {
          index: '模式五',
          value: 'display,data',
          text: '复制设置列 数据',
          isDefault: !1,
          isDivided: !0,
        },
        {
          index: '模式六',
          value: 'display,data,header',
          text: '复制设置列 数据+头部',
          isDefault: !1,
        },
        {
          index: '模式七',
          value: 'display,data,image',
          text: '复制设置列 数据+图片',
          isDefault: !1,
        },
        {
          index: '模式八',
          value: 'display,data,image,header',
          text: '复制设置列 数据+图片+头部',
          isDefault: !1,
        },
        {
          index: '模式九',
          value: 'show,data',
          text: '复制显示列 数据',
          isDefault: !1,
          isDivided: !0,
        },
        {
          index: '模式十',
          value: 'show,data,header',
          text: '复制显示列 数据+头部',
          isDefault: !1,
        },
        {
          index: '模式十一',
          value: 'show,data,image',
          text: '复制显示列 数据+图片',
          isDefault: !1,
        },
        {
          index: '模式十二',
          value: 'show,data,image,header',
          text: '复制显示列 数据+图片+头部',
          isDefault: !1,
        },
      ],
      exportMethods: [
        {
          index: '模式一',
          value: 'csv',
          text: '导出CSV表格（所有列）',
          isDefault: !0,
          isDivided: !0,
        },
        {
          index: '模式二',
          value: 'csv,display',
          text: '导出CSV表格（设置列）',
          isDefault: !1,
        },
        {
          index: '模式三',
          value: 'csv,show',
          text: '导出CSV表格（显示列）',
          isDefault: !1,
        },
        {
          index: '模式四',
          value: 'xlsx',
          text: '导出XLSX表格（所有列）',
          isDefault: !1,
          isDivided: !0,
        },
        {
          index: '模式五',
          value: 'xlsx,display',
          text: '导出XLSX表格（设置列）',
          isDefault: !1,
        },
        {
          index: '模式六',
          value: 'xlsx,show',
          text: '导出XLSX表格（显示列）',
          isDefault: !1,
        },
        {
          index: '模式七',
          value: 'xlsx,image',
          text: '导出XLSX表格（所有列）（含图片）',
          isDefault: !1,
          isDivided: !0,
        },
        {
          index: '模式八',
          value: 'xlsx,display,image',
          text: '导出XLSX表格（设置列）（含图片）',
          isDefault: !1,
        },
        {
          index: '模式九',
          value: 'xlsx,show,image',
          text: '导出XLSX表格（显示列）（含图片）',
          isDefault: !1,
        },
      ],
      copySetTip: !1,
      exportSetTip: !1,
      videoVisible: !1,
    }
  },
  computed: {
    filterTagShow: function() {
      return 0 < Object.keys(this.store.states.filters).length || this.store.states.globalFilterKeyword
    },
    copyType: function() {
      return (
        this.copyMethods.find(function(e) {
          return e.isDefault
        }) || this.copyMethods[0]
      )
    },
    exportType: function() {
      return (
        this.exportMethods.find(function(e) {
          return e.isDefault
        }) || this.exportMethods[0]
      )
    },
  },
  created: function() {
    var t = this
    this.getTableExportConfig('copySetting', function(e) {
      e && t.copyMethods.length === e.length && (t.copyMethods = e)
    }),
      this.getTableExportConfig('exportSetting', function(e) {
        e && t.exportMethods.length === e.length && (t.exportMethods = e)
      })
  },
  methods: {
    setTableExportConfig: function(t, n, r) {
      this.getTableExportConfig(null, function(e) {
        e = e || {}
        e[t] = n
        IcxY.setItem(p, e).then(function() {
          r(!0)
        })
      })
    },
    getTableExportConfig: function(t, n) {
      n &&
        IcxY.getItem(p)
          .then(function(e) {
            n(t ? (e && 'object' === typeof e && e[t] ? e[t] : null) : e)
          })
          .catch(function() {
            n(null)
          })
    },
    openVedio: function() {
      this.videoVisible = !0
    },
    setDefault: function(t, e) {
      var n = this
      this[e + 'Methods'].forEach(function(e) {
        e.index === t.index ? (e.isDefault = !0) : (e.isDefault = !1)
      }),
        (this[e + 'SetTip'] = !0),
        setTimeout(function() {
          n[e + 'SetTip'] = !1
        }, 2e3),
        this.setTableExportConfig(e + 'Setting', this[e + 'Methods'], function() {})
    },
    handleGlobalSearch: function() {
      this.store.commit('globalFilterChange', {
        keyword: this.store.states.globalFilterKeyword,
      })
    },
    onClickFilterTagHeader: function() {
      var e = 'and' === this.store.states.filterMode ? 'or' : 'and'
      this.store.commit('filterModeChange', e)
    },
    onRemoveFilter: function(e) {
      this.store.commit('columnFilterChange', {
        column: e.column,
        value: null,
      })
    },
    onRemoveGlobalFilter: function() {
      this.store.commit('globalFilterChange', {
        keyword: null,
      })
    },
    handleCopyTable: function(e) {
      var t = this
      let n = this.store.table
      let r = this.store.states
      let a = r.columns
      let i = r.data
      let o = 0 <= e.indexOf('header')
      let s = 0 <= e.indexOf('display')
      let l = 0 <= e.indexOf('show')
      r = 0 <= e.indexOf('image')
      e = 0 <= e.indexOf('image')
      l = new YKlt(o, s, r, e, l)

      l.setColumns(a)

      n.tableOptions.hasOwnProperty('exportRowHeight') && 'number' == typeof n.tableOptions.exportRowHeight && l.setRowHeight(n.tableOptions.exportRowHeight)

      this.store.elTable.summaryMethod && l.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns)
      l.onSuccess(function() {
        t.showTip ||
          ((t.showTip = !0),
          setTimeout(function() {
            t.showTip = !1
          }, 2e3))
      })
      l.copy(i)
    },
    handleExportTable: function(e) {
      let n = this.store.table
      if (n.tableOptions.hasOwnProperty('beforeExport') && 'function' == typeof n.tableOptions.beforeExport && !n.tableOptions.beforeExport()) return !1
      let t = this.store.states
      let r = t.columns
      let a = t.data
      let i = 0 <= e.indexOf('csv') ? 'csv' : 'xlsx'
      let o = 0 <= e.indexOf('display')
      let s = 0 <= e.indexOf('show')
      t = 0 <= e.indexOf('image')
      e = 0 <= e.indexOf('Image')
      s = new LiUo(i, t, o, e, s)
      s.setColumns(r)
      n.tableOptions.hasOwnProperty('exportRowHeight') && 'number' == typeof n.tableOptions.exportRowHeight && s.setRowHeight(n.tableOptions.exportRowHeight)
      n.tableOptions.hasOwnProperty('exportFileName') && typeof n.tableOptions.exportFileName && s.setFileName(n.tableOptions.exportFileName)
      this.store.elTable.summaryMethod &&
        s.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns)((n.progress.visible = !0))((n.progress.title = '导出中…'))
      s.onProgress(function(e, t) {
        t = parseInt((e / t) * 100)
        t % 5 == 0 && (n.progress.percentage = 100 < t ? 100 : t)
      })
      s.onSuccess(function() {
        n.progress.visible = !1
        n.progress.title = null
        n.progress.percentage = 0
      })
      s.export(a)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.header-wrap {
  display: flex;
  justify-content: space-between;
  background: #f5f7fa;
  padding: 10px;
}
.header-wrap .header-left {
  flex-grow: 1;
  display: flex;
  overflow: hidden;
}
.header-wrap .header-left .slot-wrap {
  flex-shrink: 0;
}
.header-wrap .header-left .filter-tag-wrap {
  flex-grow: 1;
  overflow: hidden;
}
.header-wrap .header-left > .slot-wrap + .filter-tag-wrap {
  margin-left: 10px;
}
.header-wrap .header-right {
  flex-shrink: 0;
  display: flex;
}
.header-wrap .header-right > div + div {
  margin-left: 10px;
}
.header-wrap .header-right .el-button {
  color: #909399;
}
.header-wrap .header-right .el-button:focus,
.header-wrap .header-right .tool-item .el-button:hover {
  color: #409eff;
}
.copy-btn-wrap {
  position: relative;
}
.copy-btn-wrap .copy-btn-tips {
  position: absolute;
  pointer-events: none;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  padding: 5px 10px;
  font-size: 12px;
  color: #67c23a;
  z-index: 30;
  border-radius: 4px;
  left: 50%;
  transform: translate3d(-50%, -35px, 0);
  min-width: 80px;
  text-align: center;
  transition: opacity 0.3s, transform 0.3s;
}
.export-table-btn-wrap {
  position: relative;
}
.export-table-btn-wrap .export-btn-tips {
  position: absolute;
  pointer-events: none;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  padding: 5px 10px;
  font-size: 12px;
  color: #67c23a;
  z-index: 30;
  border-radius: 4px;
  left: 50%;
  transform: translate3d(-50%, -35px, 0);
  min-width: 80px;
  text-align: center;
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-active {
  -webkit-animation: slide-in-data-v-5d20328f 0.5s;
  animation: slide-in-data-v-5d20328f 0.5s;
}
.slide-leave-active {
  -webkit-animation: slide-out-data-v-5d20328f 0.5s;
  animation: slide-out-data-v-5d20328f 0.5s;
}
@-webkit-keyframes slide-in-data-v-5d20328f {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 35px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -35px, 0);
  }
}
@keyframes slide-in-data-v-5d20328f {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 35px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -35px, 0);
  }
}
@-webkit-keyframes slide-out-data-v-5d20328f {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(-50%, -70px, 0);
  }
}
@keyframes slide-out-data-v-5d20328f {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(-50%, -70px, 0);
  }
}
.dropdown-wrap {
  display: flex;
  align-items: center;
}
.dropdown-wrap > :nth-child(2) {
  flex: 1;
  margin: 0 10px;
  color: #909399;
}
.export-type-card {
  display: inline-block;
  background-color: #e9ecf2;
  color: #909399;
  font-size: 12px;
  padding: 0 6px;
  border-radius: 3px;
  line-height: 18px;
}
.export-type-card-wrap {
  display: inline-block;
  position: relative;
  width: 48px;
  height: 10px;
}
.export-type-card-wrap .export-type-card {
  position: absolute;
  top: -4px;
  left: 0;
}
.drop-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
}
.drop-head_left {
  display: flex;
  align-items: center;
}
.drop-head_left > :first-child {
  background-color: #3772e8;
  display: inline-block;
  width: 4px;
  height: 12px;
  border-radius: 2px;
  margin-right: 6px;
}
.drop-head_left > :last-child {
  color: #666666;
}
.drop-head_right {
  color: #999;
}
.drop-head_right .yqs-icon-shipin {
  cursor: pointer;
}

//
.el-dropdown-menu .el-dropdown-menu__item--divided:not(:nth-child(2)) {
  margin: 4px 15px 0;
  padding: 0;
}
</style>
