<template>
  <div class="column-setting-wrap">
    <el-button v-popover:popover icon="el-icon-s-tools" size="small"></el-button>
    <el-popover
      ref="popover"
      v-model="visible"
      placement="bottom-end"
      :width="isUseNewColSetting ? 'auto' : '260'"
      trigger="click"
      @after-leave="onPopoverHide"
    >
      <lazy-load :show="visible" :follow-show="false">
        <div class="set-header">
          <div>
            <span>表格列设置 </span>
            <el-tooltip effect="dark" placement="left">
              <div slot="content" class="col-set-tip">
                <span>操作说明：</span>
                <ul>
                  <li>展示：设置列是否在转化页面展示。</li>
                  <li>导出：设置列是否可导出到本地。</li>
                  <li>数据条：设置列的数据条展示状态。</li>
                </ul>
              </div>
              <i v-if="isUseNewColSetting" class="el-icon-question help-icon"></i>
            </el-tooltip>
          </div>
          <div v-if="isUseNewColSetting" class="header-search">
            <el-input v-model="searchInput" placeholder="全局搜索" size="small" @input="searchCol">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-button type="text" size="medium" style="padding:0" @click="onClickRestoreDefault">
            <i class="el-icon-refresh-right"></i>
            恢复默认
          </el-button>
        </div>
        <div v-if="isUseNewColSetting" class="set-table-header">
          <span class="check-box"> </span>
          <span class="col-name" :style="{ width: 14 * titleLength + 'px' }"> 列名称({{ colNum }}) </span>
          <span class="sort">位置</span>
          <span class="show">展示</span>
          <span class="export" title="开启后，导出和复制表格同时生效">可导出</span>
          <span class="data-bar">数据条</span>
        </div>
        <div class="set-body">
          <el-scrollbar ref="scrollbar" wrap-style="max-height: 435px;">
            <new-column-setting-draggable
              v-if="isUseNewColSetting"
              ref="columnSettingDraggable"
              v-model="draggableData"
              :title-length="titleLength"
              :is-all-checked="allStatus.isChecked"
              :has-children="hasChildren"
              @handleCheck="handleCheck"
              @switch-change="onSwitchChange"
            ></new-column-setting-draggable>
            <column-setting-draggable v-else v-model="draggableData" @switch-change="onSwitchChange"></column-setting-draggable>
          </el-scrollbar>
        </div>
        <div v-if="isUseNewColSetting" class="set-table-footer">
          <div v-if="hasChildren" style="width:14px;height:14px"></div>
          <span class="check-box">
            <el-checkbox v-model="allStatus.isChecked" :indeterminate="isIndeterminate" @change="handleAllCheck"></el-checkbox>
          </span>
          <span class="col-name" :style="{ width: 14 * titleLength + 'px' }">批量设置</span>
          <span class="sort"></span>
          <span class="switch">
            <el-switch
              v-model="allStatus.isShow"
              :disabled="!isSelect"
              :title="isSelect ? '' : '请先选择需要设置的列'"
              @change="
                e => {
                  return handleAllSwitch('isShow', e)
                }
              "
            ></el-switch>
          </span>
          <span class="switch">
            <el-switch
              v-model="allStatus.isExport"
              :disabled="!isSelect"
              :title="isSelect ? '' : '请先选择需要设置的列'"
              @change="
                e => {
                  return handleAllSwitch('isExport', e)
                }
              "
            ></el-switch>
          </span>
          <span class="switch">
            <el-switch
              v-model="allStatus.numStripe"
              :disabled="!isSelect"
              :title="isSelect ? '' : '请先选择需要设置的列'"
              @change="
                e => {
                  return handleAllSwitch('numStripe', e)
                }
              "
            ></el-switch>
          </span>
        </div>
        <div class="set-footer">
          <div class="set-footer_left">
            <el-button type="primary" size="mini" @click="onClickConfirm">确定</el-button>
            <el-button type="text" size="mini" @click="visible = false">取消</el-button>
          </div>
          <div class="set-footer_right">
            <div v-if="hasChildren">
              <el-tooltip effect="dark" placement="top">
                <div slot="content" style="width:400px">
                  说明：1、开启后：相同名称列操作会同时生效。例如：三个竞品对比时，我们将竞品1访客人数数据列关闭，则竞品2、3的访客人数均会同时关闭。2、关闭后：操作只对当前操作列生效。例如：三个竞品对比时，竞品1访客数数据列关闭，竞品2、3竞品访客人数不会发生变化。
                </div>
                <span>同名列批量操作</span>
              </el-tooltip>
              <el-switch v-model="sameColSetStatus" size="mini"></el-switch>
            </div>
          </div>
        </div>
      </lazy-load>
    </el-popover>
  </div>
</template>

<script>
import LazyLoad from '@/components/de-table/lazy-load'
import ColumnSettingDraggable from './column-setting-draggable.vue'
import NewColumnSettingDraggable from './new-column-setting-draggable.vue'

function r(e, t, n) {
  e.forEach(function(e) {
    e.switch = t
    e.hasOwnProperty(n) && (e[n] = t)
    e.children && r(e.children, t, n)
  })
}

function i(e, t) {
  for (var n = 0; n < e.length; n++)
    if (e[n].children)
      for (var r = 0; r < e[n].children.length; r++) {
        if (e[n].children[r].prop === t.prop) return e[n]
        var a = i(e[n].children, t)
        if (a) return a
      }
  return null
}

function o(e, t, n, r) {
  var a
  t = i(e, t)
  if (t && t.hasOwnProperty(r)) {
    if (n) {
      t[r] = !0
    } else {
      a = !0
      t.children.forEach(function(e) {
        e[r] && (a = !1)
      })
      a && (t[r] = !1)
    }

    o(e, t, n, r)
  }
}

function a(e) {
  return e.map(function(e) {
    e = Object.assign({}, e)
    return e.children && (e.children = a(e.children)), Object.assign({}, e)
  })
}

function s(e) {
  return e.map(function(e) {
    e = Object.assign({}, e)
    return (
      e.hasOwnProperty('isShow') ||
        e.hasOwnProperty('isExport') ||
        !e.switch ||
        ((e.isShow = !0), (e.isExport = !(e.hasOwnProperty('notExport') && e.notExport))),
      e.children && (e.children = s(e.children)),
      Object.assign({}, e)
    )
  })
}

export default {
  name: 'ColumnSetting',
  components: {
    LazyLoad,
    ColumnSettingDraggable,
    NewColumnSettingDraggable,
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      },
    },
    defaultData: {
      type: Array,
      default: function() {
        return []
      },
    },
    tableKey: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      visible: !1,
      draggableData: [],
      allStatus: {
        isChecked: !1,
        isShow: !1,
        isExport: !1,
        numStripe: !1,
      },
      isIndeterminate: !1,
      searchInput: '',
      sameColSetStatus: !0,
    }
  },
  computed: {
    isUseNewColSetting: function() {
      return !0
    },
    isSelect: function() {
      return this.draggableData.some(function(e) {
        return (
          e.checked ||
          (e.children &&
            e.children.some(function(e) {
              return e.checked
            }))
        )
      })
    },
    hasChildren: function() {
      return this.draggableData.some(function(e) {
        return e.hasOwnProperty('children')
      })
    },
    titleLength: function() {
      var e =
        this.draggableData.map(function(e) {
          return e.children
            ? (Math.max.apply(
                Math,
                Array.from(
                  e.children.map(function(e) {
                    return e.label ? e.label.length : 0
                  }),
                ),
              ) || 0) + 2
            : e.label
            ? e.label.length
            : 0
        }) || []
      e = Math.max.apply(Math, Array.from(e)) || 5
      return 5 <= e ? e : 5
    },
    colNum: function() {
      var t = 0
      return (
        this.draggableData.forEach(function(e) {
          e.isFilter || t++,
            e.children &&
              e.children.forEach(function(e) {
                e.isFilter || t++
              })
        }),
        t
      )
    },
  },
  watch: {
    data: {
      immediate: !0,
      handler: function(e) {
        this.isUseNewColSetting
          ? ((this.draggableData = s(e)), JSON.stringify(e) !== JSON.stringify(this.draggableData) && this.$emit('change', this.draggableData))
          : (this.draggableData = a(e))
      },
    },
    visible: function(e) {
      var t = this
      e &&
        this.isUseNewColSetting &&
        ((this.searchInput = ''),
        Object.keys(this.allStatus).forEach(function(e) {
          t.allStatus[e] = !1
        }))
    },
  },
  methods: {
    searchCol: function() {
      var t = this
      this.draggableData.forEach(function(e) {
        e.label.includes(t.searchInput) ? t.$set(e, 'isFilter', !1) : t.$set(e, 'isFilter', !0),
          e.children &&
            e.children.forEach(function(e) {
              e.label.includes(t.searchInput) ? t.$set(e, 'isFilter', !1) : t.$set(e, 'isFilter', !0)
            })
      })
      this.allStatus.isChecked = !1
      this.isIndeterminate = !1
      this.$refs.columnSettingDraggable.setAllCheck({
        key: 'checked',
        value: !1,
      })
    },
    handleAllSwitch: function(e, t) {
      if (this.allStatus.isChecked || this.isIndeterminate) {
        this.$refs.columnSettingDraggable.setAllCheck({
          key: e,
          value: t,
        })
      }
    },
    handleAllCheck: function(e) {
      this.isIndeterminate = !1
      this.$refs.columnSettingDraggable.setAllCheck({
        key: 'checked',
        value: e,
      })
    },
    handleCheck: function(e) {
      this.allStatus.isChecked = e.isAllChecked
      this.isIndeterminate = e.isIndeterminate
    },
    onPopoverHide: function() {
      this.draggableData = a(this.data)
    },
    onClickRestoreDefault: function() {
      this.isUseNewColSetting
        ? ((this.draggableData = s(this.defaultData)),
          JSON.stringify(this.defaultData) !== JSON.stringify(this.draggableData) && this.$emit('change', this.draggableData))
        : (this.draggableData = a(this.defaultData))
    },
    // 确认
    onClickConfirm: function() {
      console.log(this.draggableData)

      this.$emit('change', this.draggableData)
      this.visible = !1
      this.$root.$emit('colSetChange', this.draggableData)
    },
    resetScrollbar: function() {
      this.$refs.scrollbar && ((this.$refs.scrollbar.moveX = 0), (this.$refs.scrollbar.moveY = 0))
    },
    onSwitchChange: function(e, t, n) {
      console.log(e, t, n)
      e.children && r(e.children, t, n)
      o(this.draggableData, e, t, n)
      this.hasChildren && this.sameColSetStatus && this.getSameCol(e, t, n)
    },
    getSameCol: function(t, n, r) {
      var a = this
      this.draggableData.forEach(function(e) {
        e.children &&
          e.children.forEach(function(e) {
            e.label == t.label && (a.$set(e, r, n), o(a.draggableData, t, n, r))
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.col-set-tip {
  font-size: 14px;
  line-height: 24px;
}
.col-set-tip li::before {
  content: '●';
  color: #fff;
  margin-right: 4px;
}
.set-header {
  margin: -12px -12px 12px -12px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.set-header .help-icon {
  color: #ccc;
}
.set-header .header-search {
  flex: 0.75;
}
.set-table-header,
.set-table-footer {
  padding: 0 2px 0 10px;
  height: 36px;
  display: flex;
  color: #b7bac2;
  background-color: #f5f7fa;
  align-items: center;
  justify-content: space-between;
}
.set-table-header span,
.set-table-footer span {
  text-align: center;
}
.set-table-header span.check-box,
.set-table-footer span.check-box {
  width: 30px;
}
.set-table-header span.col-name,
.set-table-footer span.col-name {
  text-align: left;
}
.set-table-header span.sort,
.set-table-footer span.sort {
  width: 28px;
}
.set-table-header span.show,
.set-table-footer span.show {
  width: 50px;
}
.set-table-header span.export,
.set-table-footer span.export {
  width: 50px;
}
.set-table-header span.data-bar,
.set-table-footer span.data-bar {
  width: 50px;
}
.set-table-header span.switch,
.set-table-footer span.switch {
  width: 50px;
}
.set-footer {
  margin: 12px -12px -12px -12px;
  padding: 12px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
</style>
