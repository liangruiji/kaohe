<!--
 * @Author: your name
 * @Date: 2022-03-03 16:47:39
 * @LastEditTime: 2022-03-03 17:09:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-footer/index.vue
-->
<template>
  
</template>

<script>
export default  {
  name: "deTableFooter",
  props: {
    store: {
      required: !0
    }
  },
  data: function () {
    return this.segmentList = [10, 30, 50, 100, 200], {}
  },
  computed: {
    segment: {
      get: function () {
        return this.store.states.segment
      },
      set: function (e) {
        this.store.commit("segmentChange", e)
      }
    },
    totalText: function () {
      var e = "";
      return this.store.states._data.length !== this.store.states.data.length && (e = "当前".concat(this.store.states.data.length, "行数据，")),
        e += "共".concat(this.store.states._data.length, "行数据")
    }
  }
}
</script>

<style lang='scss' scope>

</style>