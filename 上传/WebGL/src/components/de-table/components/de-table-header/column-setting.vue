<template>
  
</template>

<script>
  function r(e, t, n) {
    e.forEach(function (e) {
      e.switch = t,
        e.hasOwnProperty(n) && (e[n] = t),
        e.children && r(e.children, t, n)
    })
  }

  function i(e, t) {
    for (var n = 0; n < e.length; n++)
      if (e[n].children)
        for (var r = 0; r < e[n].children.length; r++) {
          if (e[n].children[r].prop === t.prop)
            return e[n];
          var a = i(e[n].children, t);
          if (a)
            return a
        }
    return null
  }

  function o(e, t, n, r) {
    var a;
    (t = i(e, t)) && t.hasOwnProperty(r) && (n ? t[r] = !0 : (a = !0,
        t.children.forEach(function (e) {
          e[r] && (a = !1)
        }),
        a && (t[r] = !1)),
      o(e, t, n, r))
  }

  function a(e) {
    return e.map(function (e) {
      e = Object(c.default)({}, e);
      return e.children && (e.children = a(e.children)),
        Object(c.default)({}, e)
    })
  }

  function s(e) {
    return e.map(function (e) {
      e = Object(c.default)({}, e);
      return e.hasOwnProperty("isShow") || e.hasOwnProperty("isExport") || !e.switch || (e.isShow = !0,
          e.isExport = !(e.hasOwnProperty("notExport") && e.notExport)),
        e.children && (e.children = s(e.children)),
        Object(c.default)({}, e)
    })
  }
  var l = n("KQm4"), // 转数组的函数
    c = n("VTBJ"),
    u = (n("07d7"),
      n("FZtP"),
      n("2B1R"),
      n("6cQw"),
      n("tkto"),
      n("yq1k"),
      n("JTJg"),
      n("jraC")), // LazyLoad
    d = n("ScZ0"), // ColumnSettingDraggable
    n = n("zzle"); // NewColumnSettingDraggable
export default {
    name: "columnSetting",
    components: {
      LazyLoad: u.default,
      ColumnSettingDraggable: d.default,
      NewColumnSettingDraggable: n.default
    },
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      defaultData: {
        type: Array,
        default: function () {
          return []
        }
      },
      tableKey: {
        type: String,
        default: ""
      }
    },
    data: function () {
      return {
        visible: !1,
        draggableData: [],
        allStatus: {
          isChecked: !1,
          isShow: !1,
          isExport: !1,
          numStripe: !1
        },
        isIndeterminate: !1,
        searchInput: "",
        sameColSetStatus: !0
      }
    },
    computed: {
      isUseNewColSetting: function () {
        return !0
      },
      isSelect: function () {
        return this.draggableData.some(function (e) {
          return e.checked || e.children && e.children.some(function (e) {
            return e.checked
          })
        })
      },
      hasChildren: function () {
        return this.draggableData.some(function (e) {
          return e.hasOwnProperty("children")
        })
      },
      titleLength: function () {
        var e = this.draggableData.map(function (e) {
            return e.children ? (Math.max.apply(Math, Object(l.default)(e.children.map(function (e) {
              return e.label ? e.label.length : 0
            }))) || 0) + 2 : e.label ? e.label.length : 0
          }) || [],
          e = Math.max.apply(Math, Object(l.default)(e)) || 5;
        return 5 <= e ? e : 5
      },
      colNum: function () {
        var t = 0;
        return this.draggableData.forEach(function (e) {
            e.isFilter || t++,
              e.children && e.children.forEach(function (e) {
                e.isFilter || t++
              })
          }),
          t
      }
    },
    watch: {
      data: {
        immediate: !0,
        handler: function (e) {
          this.isUseNewColSetting ? (this.draggableData = s(e),
            JSON.stringify(e) !== JSON.stringify(this.draggableData) && this.$emit("change", this.draggableData)) : this.draggableData = a(e)
        }
      },
      visible: function (e) {
        var t = this;
        e && this.isUseNewColSetting && (this.searchInput = "",
          Object.keys(this.allStatus).forEach(function (e) {
            t.allStatus[e] = !1
          }))
      }
    },
    methods: {
      searchCol: function () {
        var t = this;
        this.draggableData.forEach(function (e) {
            e.label.includes(t.searchInput) ? t.$set(e, "isFilter", !1) : t.$set(e, "isFilter", !0),
              e.children && e.children.forEach(function (e) {
                e.label.includes(t.searchInput) ? t.$set(e, "isFilter", !1) : t.$set(e, "isFilter", !0)
              })
          }),
          this.allStatus.isChecked = !1,
          this.isIndeterminate = !1,
          this.$refs.columnSettingDraggable.setAllCheck({
            key: "checked",
            value: !1
          })
      },
      handleAllSwitch: function (e, t) {
        (this.allStatus.isChecked || this.isIndeterminate) && this.$refs.columnSettingDraggable.setAllCheck({
          key: e,
          value: t
        })
      },
      handleAllCheck: function (e) {
        this.isIndeterminate = !1,
          this.$refs.columnSettingDraggable.setAllCheck({
            key: "checked",
            value: e
          })
      },
      handleCheck: function (e) {
        this.allStatus.isChecked = e.isAllChecked,
          this.isIndeterminate = e.isIndeterminate
      },
      onPopoverHide: function () {
        this.draggableData = a(this.data)
      },
      onClickRestoreDefault: function () {
        this.isUseNewColSetting ? (this.draggableData = s(this.defaultData),
          JSON.stringify(this.defaultData) !== JSON.stringify(this.draggableData) && this.$emit("change", this.draggableData)) : this.draggableData = a(this.defaultData)
      },
      onClickConfirm: function () {
        this.$emit("change", this.draggableData),
          this.visible = !1,
          this.$root.$emit("colSetChange", this.draggableData)
      },
      resetScrollbar: function () {
        this.$refs.scrollbar && (this.$refs.scrollbar.moveX = 0,
          this.$refs.scrollbar.moveY = 0)
      },
      onSwitchChange: function (e, t, n) {
        e.children && r(e.children, t, n),
          o(this.draggableData, e, t, n),
          this.hasChildren && this.sameColSetStatus && this.getSameCol(e, t, n)
      },
      getSameCol: function (t, n, r) {
        var a = this;
        this.draggableData.forEach(function (e) {
          e.children && e.children.forEach(function (e) {
            e.label == t.label && (a.$set(e, r, n),
              o(a.draggableData, t, n, r))
          })
        })
      }
    }
  }
</script>

<style lang='scss' scope>

</style>