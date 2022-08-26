<template>
    <div class="header-wrap">
    <div class="header-left">
      <slot name="table-title" class="slot-wrap">
        <div v-if="store.table.tableOptions.hiddenFilterTag && filterTagShow" class="filter-tag-wrap">
          <filter-tag :filters="store.states.filters" :filter-mode="store.states.filterMode" :global-filter-keyword="store.states.globalFilterKeyword" @remove-filter="onRemoveFilter" @remove-global-filter="onRemoveGlobalFilter">
            <template v-slot:prefix>
            
               <el-button style="padding: '0'" slot="prefix"   type="text"  size="mini"  title= "点击切换筛选方式" @click="onClickFilterTagHeader">
                 {{"and" === n.store.states.filterMode ? "所有" : "任一" }} 满足
                 <i class="el-icon-arrow-down"></i> :
            </el-button>
            
            </template>  
       
          </filter-tag>
        </div>
      </slot>
    </div>
    <div class="header-right">
      <div v-if="!store.table.tableOptions.hiddenGlobalSearch">
    
          <el-input ref="globalInput"  placeholder="全局搜索" v-model="store.states.globalFilterKeyword"  style="width: '160px'" clearable size="small" @input="handleGlobalSearch" @clear="handleGlobalSearch">
            <i slot="suffix" class="el-input__icon el-icon-search search-icon" title="搜索" @click="handleGlobalSearch"></i>
          </el-input>
       
      </div>
      <div v-if="store.table.tableOptions.showSeniorFilter">
        <senior-filter :store="store">
        
        </senior-filter>
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
          <first-tip-popover  tip-key="tableCopyImageTip" tip="这里可以复制 数据+图片">
            <el-dropdown split-button="true" size="small" @command='handleCopyTable' @click='handleCopyTable(copyType.value)'>
              <span>
                <i class="el-icon-document-copy"></i>复制
                <span class="export-type-card-wrap">
                  <span class="export-type-card">{{copyType.index}}</span>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div class="drop-head">
                    <span class="drop-head_left">
                      <span></span>
                      <span>模式选择</span>
                    </span>
                    <span class="drop-head_right">
                      <i class="icon yqsiconfont yqs-icon-shipin" @click="openVedio"></i>说明
                    </span>
                </div>
              <el-dropdown-item v-for="t in copyMethods" :key="t.index" :command="t.value" :divided="t.isDivided">
                <div class="dropdown-wrap">
                  <span class="export-type-card">{{t.index}}</span>
                  <span>{{t.text}}</span>
                  <el-button type="text"  size="mini" :style="{color:t.isDefault ? '#B7BAC0' : '#3772E8'}" @click=" t.isDefault || setDefault(t, 'copy')">
                    {{t.isDefault ? "默认" : "设为默认"}}
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
              <div v-if="exportSetTip">
                设置成功
              </div>
              
            </transition>
            <el-dropdown size="small" :split-button="true" @command="handleExportTable" @click="handleExportTable(exportType.value)">
              <span>
                <i class="el-icon-download"></i> 导出 
                <span class="export-type-card-wrap">
                  <span class="export-type-card">
                    {{ exportType.index}}
                  </span>
                </span>
              </span>
              <el-dropdown-menu  slot="dropdown">
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
                  <span class="export-type-card">{{t.index}}</span>
                  <span>{{t.text}}</span>
                  <el-button type="text"  size="mini" :style="{color:t.isDefault ? '#B7BAC0' : '#3772E8'}" @click=" t.isDefault || setDefault(t, 'export')">
                    {{t.isDefault ? "默认" : "设为默认"}}
                  </el-button>
                </div>
              </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div v-show="!store.table.tableOptions.hiddenColumnSetting">
            <column-setting  :tableKey="tableKey" :data="store.states.colSetData" :default-data="store.states._colSetData" @change="function (e){
            return n.store.commit('saveColSetData', e)
          }">
          </column-setting>
        </div>
    </div>
  <video-dialog ref="video" :visible.sync="videoVisible" url="https://qiniu.amingtool.com/copy_export_explain.mp4" ></video-dialog>
  </div>
</template>

<script>
  var r = n("U8pU"), // 判断类型函数
    a = (n("tkto"),
      n("fbCW"),
      n("07d7"),
      n("FZtP"),
      n("LfHX")), // ColumnSetting
    i = n("yQV9"), // FilterTag
    c = n("YKlt"), // 复制功能相关
    l = n("LiUo"), // 导出功能相关
    o = n("ULNZ"), // FirstTipPopover
    s = n("O5Ae"), // SeniorFilter
    u = n("Sb01"), // VideoDialog
    d = n("IcxY"), // 封装后的localStorage方法
    p = "deTableExportConfig";
export default {
    name: "deTableHeader",
    components: {
      ColumnSetting: a.default,
      FilterTag: i.default,
      FirstTipPopover: o.default,
      SeniorFilter: s.default,
      VideoDialog: u.default
    },
    props: {
      store: {
        required: !0
      },
      tableKey: {
        type: String,
        default: ""
      }
    },
    data: function () {
      return {
        showTip: !1,
        copyMethods: [{
          index: "模式一",
          value: "data",
          text: "复制表格 数据",
          isDefault: !0,
          isDivided: !0
        }, {
          index: "模式二",
          value: "data,header",
          text: "复制表格 数据+头部",
          isDefault: !1
        }, {
          index: "模式三",
          value: "data,image",
          text: "复制表格 数据+图片",
          isDefault: !1
        }, {
          index: "模式四",
          value: "data,image,header",
          text: "复制表格 数据+图片+头部",
          isDefault: !1
        }, {
          index: "模式五",
          value: "display,data",
          text: "复制设置列 数据",
          isDefault: !1,
          isDivided: !0
        }, {
          index: "模式六",
          value: "display,data,header",
          text: "复制设置列 数据+头部",
          isDefault: !1
        }, {
          index: "模式七",
          value: "display,data,image",
          text: "复制设置列 数据+图片",
          isDefault: !1
        }, {
          index: "模式八",
          value: "display,data,image,header",
          text: "复制设置列 数据+图片+头部",
          isDefault: !1
        }, {
          index: "模式九",
          value: "show,data",
          text: "复制显示列 数据",
          isDefault: !1,
          isDivided: !0
        }, {
          index: "模式十",
          value: "show,data,header",
          text: "复制显示列 数据+头部",
          isDefault: !1
        }, {
          index: "模式十一",
          value: "show,data,image",
          text: "复制显示列 数据+图片",
          isDefault: !1
        }, {
          index: "模式十二",
          value: "show,data,image,header",
          text: "复制显示列 数据+图片+头部",
          isDefault: !1
        }],
        exportMethods: [{
          index: "模式一",
          value: "csv",
          text: "导出CSV表格（所有列）",
          isDefault: !0,
          isDivided: !0
        }, {
          index: "模式二",
          value: "csv,display",
          text: "导出CSV表格（设置列）",
          isDefault: !1
        }, {
          index: "模式三",
          value: "csv,show",
          text: "导出CSV表格（显示列）",
          isDefault: !1
        }, {
          index: "模式四",
          value: "xlsx",
          text: "导出XLSX表格（所有列）",
          isDefault: !1,
          isDivided: !0
        }, {
          index: "模式五",
          value: "xlsx,display",
          text: "导出XLSX表格（设置列）",
          isDefault: !1
        }, {
          index: "模式六",
          value: "xlsx,show",
          text: "导出XLSX表格（显示列）",
          isDefault: !1
        }, {
          index: "模式七",
          value: "xlsx,image",
          text: "导出XLSX表格（所有列）（含图片）",
          isDefault: !1,
          isDivided: !0
        }, {
          index: "模式八",
          value: "xlsx,display,image",
          text: "导出XLSX表格（设置列）（含图片）",
          isDefault: !1
        }, {
          index: "模式九",
          value: "xlsx,show,image",
          text: "导出XLSX表格（显示列）（含图片）",
          isDefault: !1
        }],
        copySetTip: !1,
        exportSetTip: !1,
        videoVisible: !1
      }
    },
    computed: {
      filterTagShow: function () {
        return 0 < Object.keys(this.store.states.filters).length || this.store.states.globalFilterKeyword
      },
      copyType: function () {
        return this.copyMethods.find(function (e) {
          return e.isDefault
        }) || this.copyMethods[0]
      },
      exportType: function () {
        return this.exportMethods.find(function (e) {
          return e.isDefault
        }) || this.exportMethods[0]
      }
    },
    created: function () {
      var t = this;
      this.getTableExportConfig("copySetting", function (e) {
          e && t.copyMethods.length === e.length && (t.copyMethods = e)
        }),
        this.getTableExportConfig("exportSetting", function (e) {
          e && t.exportMethods.length === e.length && (t.exportMethods = e)
        })
    },
    methods: {
      setTableExportConfig: function (t, n, r) {
        this.getTableExportConfig(null, function (e) {
          (e = e || {})[t] = n,
          d.default.setItem(p, e).then(function () {
            r(!0)
          })
        })
      },
      getTableExportConfig: function (t, n) {
        n && d.default.getItem(p).then(function (e) {
          n(t ? e && "object" === Object(r.default)(e) && e[t] ? e[t] : null : e)
        }).catch(function () {
          n(null)
        })
      },
      openVedio: function () {
        this.videoVisible = !0
      },
      setDefault: function (t, e) {
        var n = this;
        this[e + "Methods"].forEach(function (e) {
            e.index === t.index ? e.isDefault = !0 : e.isDefault = !1
          }),
          this[e + "SetTip"] = !0,
          setTimeout(function () {
            n[e + "SetTip"] = !1
          }, 2e3),
          this.setTableExportConfig(e + "Setting", this[e + "Methods"], function () {})
      },
      handleGlobalSearch: function () {
        this.store.commit("globalFilterChange", {
          keyword: this.store.states.globalFilterKeyword
        })
      },
      onClickFilterTagHeader: function () {
        var e = "and" === this.store.states.filterMode ? "or" : "and";
        this.store.commit("filterModeChange", e)
      },
      onRemoveFilter: function (e) {
        this.store.commit("columnFilterChange", {
          column: e.column,
          value: null
        })
      },
      onRemoveGlobalFilter: function () {
        this.store.commit("globalFilterChange", {
          keyword: null
        })
      },
      handleCopyTable: function (e) {
        var t = this,
          n = this.store.table,
          r = this.store.states,
          a = r.columns,
          i = r.data,
          o = 0 <= e.indexOf("header"),
          s = 0 <= e.indexOf("display"),
          l = 0 <= e.indexOf("show"),
          r = 0 <= e.indexOf("image"),
          e = 0 <= e.indexOf("image"),
          l = new c.default(o, s, r, e, l);
        l.setColumns(a),
          n.tableOptions.hasOwnProperty("exportRowHeight") && "number" == typeof n.tableOptions.exportRowHeight && l.setRowHeight(n.tableOptions.exportRowHeight),
          this.store.elTable.summaryMethod && l.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns),
          l.onSuccess(function () {
            t.showTip || (t.showTip = !0,
              setTimeout(function () {
                t.showTip = !1
              }, 2e3))
          }),
          l.copy(i)
      },
      handleExportTable: function (e) {
        var n = this.store.table;
        if (n.tableOptions.hasOwnProperty("beforeExport") && "function" == typeof n.tableOptions.beforeExport && !n.tableOptions.beforeExport())
          return !1;
        var t = this.store.states,
          r = t.columns,
          a = t.data,
          i = 0 <= e.indexOf("csv") ? "csv" : "xlsx",
          o = 0 <= e.indexOf("display"),
          s = 0 <= e.indexOf("show"),
          t = 0 <= e.indexOf("image"),
          e = 0 <= e.indexOf("Image"),
          s = new l.default(i, t, o, e, s);
        s.setColumns(r),
          n.tableOptions.hasOwnProperty("exportRowHeight") && "number" == typeof n.tableOptions.exportRowHeight && s.setRowHeight(n.tableOptions.exportRowHeight),
          n.tableOptions.hasOwnProperty("exportFileName") && typeof n.tableOptions.exportFileName && s.setFileName(n.tableOptions.exportFileName),
          this.store.elTable.summaryMethod && s.setSummaryMethod(this.store.elTable.summaryMethod, this.store.elTable.columns),
          n.progress.visible = !0,
          n.progress.title = "导出中…",
          s.onProgress(function (e, t) {
            t = parseInt(e / t * 100);
            t % 5 == 0 && (n.progress.percentage = 100 < t ? 100 : t)
          }),
          s.onSuccess(function () {
            n.progress.visible = !1,
              n.progress.title = null,
              n.progress.percentage = 0
          }),
          s.export(a)
      },
    }
  }
</script>

<style lang='scss' scope>

</style>
