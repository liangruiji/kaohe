<!--
 * @Author: your name
 * @Date: 2022-03-03 16:43:31
 * @LastEditTime: 2022-03-03 17:08:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/index.vue
-->
<template>
  
</template>

<script>
  var r = n("1OyO"), // ColumnHeader
    a = n("kYH4"), // NumStripe
    i = n("qOSF"), // handlerValueFilter 处理数据格式的函数，好像是生成过滤器用的
    n = n("9oDN"); // CountDown
export default {
    name: "deTableBody",
    components: {
      ColumnHeader: r.default,
      NumStripe: a.default,
      CountDown: n.default
    },
    filters: {
      valueFilter: function (e, t) {
        return Object(i.handlerValueFilter)(e, t)
      }
    },
    props: {
      store: {
        required: !0
      }
    },
    data: function () {
      return this.nativeColumnTypes = ["selection", "index", "expand"], {}
    },
    mounted: function () {
      this.store.elTable = this.$refs.elTable || null
    },
    methods: {
      getNumStripeValue: function (e, t) {
        return this.store.states.numStripeData.hasOwnProperty(e) && this.store.states.numStripeData[e].hasOwnProperty(t) ? this.store.states.numStripeData[e][t] : 0
      }
    }
  }
</script>

<style lang='scss' scope>

</style>