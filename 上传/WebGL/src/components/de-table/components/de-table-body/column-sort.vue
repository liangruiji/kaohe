<!--
 * @Author: your name
 * @Date: 2022-03-03 16:44:08
 * @LastEditTime: 2022-03-03 17:03:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-sort.vue
-->
<template>
  
</template>

<script>
export default {
    name: "columnSort",
    props: {
      value: {
        type: String,
        default: null
      },
      sortOrders: {
        type: Array,
        default: function () {
          return ["ascending", "descending", null]
        }
      }
    },
    methods: {
      onClickSortBtn: function (e) {
        var t = this,
          n = null;
        n = e ? this.value === e ? null : e : (e = (e = this.sortOrders.findIndex(function (e) {
              return e === t.value
            }) + 1) >= this.sortOrders.length ? 0 : e,
            this.sortOrders[e]),
          this.$emit("input", n)
      }
    }
  }
</script>

<style lang='scss' scope>

</style>