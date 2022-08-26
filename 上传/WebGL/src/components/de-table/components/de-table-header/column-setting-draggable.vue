<!--
 * @Author: your name
 * @Date: 2022-03-03 16:40:53
 * @LastEditTime: 2022-03-03 16:52:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/column-setting-draggable.vue
-->
<template>
  
</template>

<script>
var r = n("t2rG"); // 要加载draggable库
export default  {
    name: "columnSettingDraggable",
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
    methods: {
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
      onSwitchChange: function (e, t) {
        this.$emit("switch-change", e, t)
      }
    }
  }
</script>

<style lang='scss' scope>

</style>