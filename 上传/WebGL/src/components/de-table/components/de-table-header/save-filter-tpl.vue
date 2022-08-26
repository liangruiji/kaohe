<!--
 * @Author: your name
 * @Date: 2022-03-03 16:42:22
 * @LastEditTime: 2022-03-03 16:57:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/save-filter-tpl.vue
-->
<template>
  
</template>

<script>

  function i(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var r = e[n];
      r.hasOwnProperty("children") && Array.isArray(r.children) ? t = t.concat(i(r.children)) : r.type && ["selection", "index", "expand", "image"].includes(r.type) || t.push(r)
    }
    return t
  }
  var r = n("HaE+"), // Promise相关的函数 ，没看明白
    o = (n("ls82"),
      n("ma9I"),
      n("yq1k"),
      n("07d7"),
      n("FZtP"),
      n("TeQF"),
      n("2B1R"),
      n("pjDv"),
      n("PKPk"),
      n("YGK4"),
      n("3bBZ"),
      n("2eJa"),
      n("tkto"),
      n("pDQq"),
      n("fS19")), // 设置模板的相关函数
    n = n("qfMj"); // SelectWithCheckbox

export default {
    name: "saveFilterTpl",
    components: {
      SelectWithCheckbox: n.default
    },
    props: {
      visible: Boolean,
      tableKey: String,
      columns: Array,
      editTplName: String,
      isOnlyFilter: {
        type: Boolean,
        default: !1
      }
    },
    data: function () {
      return {
        isEdit: !1,
        form: {
          name: "",
          mode: "and",
          conditions: []
        },
        definedError: {},
        showNameInput: !0
      }
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.visible
        },
        set: function (e) {
          this.$emit("update:visible", e)
        }
      },
      dialogTitle: function () {
        return this.isOnlyFilter ? "高级筛选" : "".concat(this.isEdit ? "编辑" : "添加", "高级筛选模板")
      },
      fields: function () {
        var e = i(this.columns),
          t = {};
        return e.forEach(function (e) {
            e.filterType && (t[e.prop] = {
                prop: e.prop,
                label: e.label,
                filterType: e.filterType
              },
              e.hasOwnProperty("filters") && (t[e.prop].filters = e.filters))
          }),
          t
      },
      rules: function () {
        var e = {};
        return this.showNameInput && (e.name = [{
            required: !0,
            message: "请输入模板名称",
            trigger: "blur"
          }, {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }]),
          e.mode = [{
            required: !0,
            message: "请选择筛选方式",
            trigger: "change"
          }],
          e.conditions = [{
            validator: function (e, t, n) {
              var r = t.filter(function (e) {
                  return "checkbox" === e.filterType && "eq" === e.matchMode
                }).map(function (e) {
                  return e.prop
                }),
                t = Array.from(new Set(r));
              r.length !== t.length ? n(new Error("支持复选的条件列请在下拉菜单中进行复选，勿重复添加！")) : n()
            },
            trigger: ["blur", "change"]
          }],
          e
      }
    },
    methods: {
      initFormData: function () {
        var a = this;
        return Object(r.default)(regeneratorRuntime.mark(function e() {
          var t, n, r;
          return regeneratorRuntime.wrap(function (e) {
            for (;;)
              switch (e.prev = e.next) {
                case 0:
                  if (t = !1,
                    n = null,
                    a.editTplName)
                    return e.next = 5,
                      Object(o.getTplByName)(a.tableKey, a.editTplName);
                  e.next = 7;
                  break;
                case 5:
                  n = e.sent,
                    t = !!n;
                case 7:
                  a.isEdit = t,
                    r = i(a.columns),
                    a.isEdit ? a.form = n : a.form = {
                      name: "",
                      mode: "and",
                      conditions: [a.getCondition(r[0].prop)]
                    },
                    a.showNameInput = !a.isOnlyFilter,
                    a.showNameInput && a.$nextTick(function () {
                      a.$refs.nameInput.focus()
                    });
                case 12:
                case "end":
                  return e.stop()
              }
          }, e)
        }))()
      },
      getCondition: function (e) {
        var t = this.fields[e],
          n = t.filterType,
          r = null,
          a = null;
        return "string" === t.filterType ? (r = "fuzzy",
          a = "") : "number" === t.filterType ? (r = "gt",
          a = "") : "checkbox" === t.filterType || "hours" === t.filterType || "day" === t.filterType || "week" === t.filterType || "month" === t.filterType ? (r = "eq",
          "checkbox" === t.filterType || "hours" === t.filterType ? a = [0 < t.filters.length ? t.filters[0].value : null] : "week" === t.filterType ? a = null : "day" !== t.filterType && "month" !== t.filterType || (a = [])) : "mark" === t.filterType && (r = "eq",
          a = []), {
          prop: e,
          matchMode: r,
          value: a,
          filterType: n
        }
      },
      onClickAddCondition: function () {
        var e = Object.keys(this.fields)[0];
        this.form.conditions.push(this.getCondition(e))
      },
      onFieldSelectChange: function (e) {
        this.$set(this.form.conditions, e, this.getCondition(this.form.conditions[e].prop))
      },
      handleConfirm: function (t) {
        var n = this;
        this.definedError = {},
          this.$refs.form.validate(function (e) {
            if (e)
              if (0 <= t.indexOf("save")) {
                if (!n.showNameInput)
                  return n.showNameInput = !0,
                    n.$nextTick(function () {
                      n.handleConfirm(t),
                        n.$nextTick(function () {
                          n.$refs.nameInput.focus()
                        })
                    }),
                    !1;
                Object(o.saveTpl)(n.tableKey, n.form, n.isEdit ? n.editTplName : null).then(function (e) {
                  return !0 !== e ? (1e4 === e.code && n.$set(n, "definedError", e.data),
                    !1) : (n.$message.success("模板保存成功"),
                    void(0 <= t.indexOf("find") && n.emitFindEvent()))
                })
              } else
                0 <= t.indexOf("find") && n.emitFindEvent()
          })
      },
      emitFindEvent: function () {
        this.dialogVisible = !1,
          this.$emit("find", this.form)
      },
      onDialogClose: function () {
        this.$refs.form.clearValidate()
      },
      handleDelete: function (e) {
        this.form.conditions.splice(e, 1),
          this.$refs.form.clearValidate("conditions")
      }
    }
  }
</script>

<style lang='scss' scope>

</style>