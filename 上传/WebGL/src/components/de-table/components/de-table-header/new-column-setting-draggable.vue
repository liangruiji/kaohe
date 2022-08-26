<!--
 * @Author: your name
 * @Date: 2022-03-03 16:41:03
 * @LastEditTime: 2022-03-03 16:55:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/new-column-setting-draggable.vue
-->
<template>
  
</template>

<script>
 var r = n("t2rG");
export default {
    name: "newColumnSettingDraggable",
    components: {
      draggable: n.n(r).a
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return []
        }
      },
      draggableGroup: {
        type: String,
        default: "directory"
      },
      isAllChecked: {
        type: Boolean,
        default: !1
      },
      titleLength: {
        type: Number,
        default: 5
      },
      arrowStatus: {
        type: Boolean,
        default: !0
      },
      hasChildren: {
        type: Boolean,
        default: !1
      },
      isChildren: {
        type: Boolean,
        default: !1
      }
    },
    computed: {
      draggableData: {
        get: function () {
          return this.value
        },
        set: function (e) {
          this.$emit("input", e)
        }
      }
    },
    data: function () {
      return {
        arrowObj: {}
      }
    },
    methods: {
      arrowChange: function (e) {
        this.$set(this.arrowObj, e, this.arrowObj.hasOwnProperty(e) && "up" === this.arrowObj[e] ? "down" : "up")
      },
      setAllCheck: function (t) {
        var n = this;
        this.draggableData.forEach(function (e) {
          ("checked" === t.key && !e.isFilter || e.checked && ("numStripe" === t.key && e.hasOwnProperty(t.key) || "numStripe" !== t.key)) && n.$set(e, t.key, t.value),
            e.children && e.children.forEach(function (e) {
              ("checked" === t.key && !e.isFilter || e.checked && ("numStripe" === t.key && e.hasOwnProperty(t.key) || "numStripe" !== t.key)) && n.$set(e, t.key, t.value)
            })
        })
      },
      handleCheck: function () {
        var e = this.draggableData.every(function (e) {
            if (e.checked)
              return !(e.children && !e.children.every(function (e) {
                return e.checked
              }))
          }),
          t = this.draggableData.some(function (e) {
            if (e.checked || e.children && e.children.some(function (e) {
                return e.checked
              }))
              return !0
          }) && !e;
        this.$emit("handleCheck", {
          isAllChecked: e,
          isIndeterminate: t
        })
      },
      onClickMoveIcon: function (e, t) {
        for (var n = 0; n < this.draggableData.length; n++) {
          var r = this.draggableData[n];
          if (r.prop && r.prop === t.prop || !r.prop && r.label && r.label === t.label) {
            "top" === e ? 0 < n && (this.draggableData.splice(n, 1),
              this.draggableData.splice(n - 1, 0, r)) : n < this.draggableData.length - 1 && (this.draggableData.splice(n, 1),
              this.draggableData.splice(n + 1, 0, r));
            break
          }
        }
      },
      onSwitchChange: function (e, t, n) {
        this.$emit("switch-change", e, t, n)
      }
    }
  }
</script>

<style lang='scss' scope>

</style>