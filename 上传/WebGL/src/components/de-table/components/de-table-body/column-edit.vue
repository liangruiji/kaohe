<!--
 * @Author: your name
 * @Date: 2022-03-03 16:46:06
 * @LastEditTime: 2022-03-03 17:01:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/column-edit.vue
-->
<template>
  
</template>

<script>
 var r = n("gKiB"); // 一些处理数据格式公共函数
export default {
    name: "column-edit",
    data: function () {
      return {
        lazyLoadStatus: !0,
        visible: !1,
        form: {
          sku_price: null
        },
        formRules: {
          sku_price: [{
            type: "number",
            transform: r.transformToFloat,
            message: "请输入数字",
            trigger: "blur"
          }]
        }
      }
    },
    methods: {
      assignAndFocus: function () {
        var t = this;
        this.$nextTick(function () {
          var e = t.$refs.input;
          e && (e.focus(),
            e.select && e.select())
        })
      },
      handleUpdate: function () {
        this.$emit("change", this.form.sku_price),
          this.handleReset()
      },
      handleReset: function () {
        this.$refs.form.resetFields(),
          this.visible = !1
      }
    }
  }
</script>

<style lang='scss' scope>

</style>