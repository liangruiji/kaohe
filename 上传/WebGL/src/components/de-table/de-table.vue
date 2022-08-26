<template>
  <div class="de-table" :class="{  'de-table-light': 'light' === effect}">
<de-table-header ref="deTableHeader" :store="store" :tableKey="tableKey">
  <template v-slot:table-title>

  </template>
</de-table-header>
<de-table-body :store="store" :use-virtual="useVirtual" :height="bodyHeight" v-bind="$attrs" v-on="$listeners">
    <template v-for="t in store.states.slotNames" >
      
    </template>
    <template v-slot:table-empty></template>
</de-table-body>
<de-table-footer ref="deTableFooter" :store="store"></de-table-footer>
<div v-show="progress.visible" class="progress-wrap">
  <div class="progress-main">
    <div v-if="progress.title" class="title">
{{progress.title}}
    </div>
    <el-progress v-else :percentage="progress.percentage"></el-progress>
  </div>
</div>
  </div>
</template>

<script>

  var r = n("U8pU"), // 判断类型函数
    a = n("VTBJ"),
    i = (n("qePV"),
      n("07d7"),
      n("FZtP"),
      n("rLoZ")), // DeTableHeader
    o = n("Vgu1"), // DeTableBody
    s = n("KAZN"), // DeTableFooter
    l = n("y9gQ"), // store相关
    c = n("gKiB"); // 公共函数
export default  {
    name: "deTable",
    inject: {
      deDialog: {
        default: null
      }
    },
    components: {
      DeTableHeader: i.default,
      DeTableBody: o.default,
      DeTableFooter: s.default
    },
    props: {
      tableKey: {
        type: String,
        default: "",
        validator: function (e) {
          return !!e
        }
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      data: {
        type: [Array, Function],
        default: function () {
          return []
        }
      },
      height: {
        type: [Number, String],
        default: null
      },
      minHeight: {
        type: Number,
        default: 200
      },
      defaultSort: {
        type: Object,
        default: null
      },
      useVirtual: {
        type: Boolean,
        default: !0
      },
      autoReset: {
        type: Boolean,
        default: !0
      },
      autoDateFilter: {
        type: [String, Boolean],
        default: "dateRange"
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      effect: {
        type: String,
        default: "dark"
      }
    },
    data: function () {
      return this.store = Object(l.createStore)(this), {
        progress: {
          visible: this.isClosedCallback = !1,
          title: null,
          percentage: 0
        }
      }
    },
    computed: {
      tableOptions: function () {
        return Object.assign({
          hiddenGlobalSearch: !1,
          hiddenCopyTable: !1,
          hiddenExportTable: !1,
          hiddenColumnSetting: !1,
          hiddenFilterTag: !1,
          hiddenSegment: !1,
          hiddenTotalRow: !1,
          showSeniorFilter: !0,
          exportRowHeight: null,
          exportFileName: "导出数据",
          beforeExport: function () {
            return !0
          },
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          pageLayout: "prev, pager, next, sizes"
        }, this.options)
      },
      bodyHeight: function () {
        if ("number" != typeof this.height)
          return this.height;
        var e = this.tableOptions.hiddenGlobalSearch && this.tableOptions.hiddenCopyTable && this.tableOptions.hiddenExportTable && this.tableOptions.hiddenColumnSetting && this.tableOptions.hiddenFilterTag ? 0 : 52,
          t = this.tableOptions.hiddenSegment && this.tableOptions.hiddenTotalRow ? 0 : 37;
        return this.height + e + t < this.minHeight ? this.minHeight - e - t : this.height - e - t
      }
    },
    watch: {
      data: function (e) {
        this.store.commit("setData", e)
      },
      columns: function (e) {
        this.store.commit("setColumn", e)
      }
    },
    created: function () {
      this.columns.forEach(function (e) {
          e.prop || (e.prop = "temp" + Math.random())
        }),
        this.store.commit("setColumn", this.columns),
        this.store.commit("sort", Object(a.default)(Object(a.default)({}, this.defaultSort), {}, {
          init: !0,
          silent: !0
        })),
        this.store.commit("setData", this.data),
        this.deDialog && this.autoReset && (this.isClosedCallback = !0,
          this.deDialog.addClosedListener(this.reset))
    },
    methods: {
      sort: function (e, t) {
        "object" === Object(r.default)(e) && (t = e.order,
            e = e.prop),
          this.store.commit("sort", {
            prop: e,
            order: t
          })
      },
      clearSort: function () {
        this.store.commit("clearSort")
      },
      setFilterType: function (e, t) {
        this.store.setFilterType(e, t)
      },
      setColumnFilter: function (e, t, n) {
        var r = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
          e = Object(c.getColumnByProp)(this.store.states.columns, e);
        e && this.store.commit("columnFilterChange", {
          column: e,
          value: t,
          mode: n,
          isClear: r,
          silent: !0
        })
      },
      clearFilter: function () {
        this.store.commit("clearFilter", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null)
      },
      scrollToRow: function (e) {
        this.store.elTable && (e = this.store.elTable.rowHeight * e,
          this.store.commit("scroll", e, null))
      },
      reset: function () {
        this.defaultSort ? this.store.commit("sort", Object(a.default)({}, this.defaultSort)) : this.clearSort(),
          this.clearFilter(),
          this.store.commit("scroll", 0, 0)
      }
    },
    beforeDestroy: function () {
      this.isClosedCallback && this.deDialog.removeClosedListener(this.reset)
    }
  }
</script>

<style lang='scss' scope>

</style>