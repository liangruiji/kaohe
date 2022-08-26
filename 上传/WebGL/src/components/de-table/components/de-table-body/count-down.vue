<!--
 * @Author: your name
 * @Date: 2022-03-03 16:46:39
 * @LastEditTime: 2022-03-03 17:07:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/count-down.vue
-->
<template>
  
</template>

<script>
var r = n("Ydol"); // vue.js
export default {
    name: "count-down",
    props: {
      isLogin: {
        type: [Boolean, String],
        default: !1
      }
    },
    methods: {
      handleLogin: function () {
        this.isLogin || r.default.$emit("openUserLogin", "phoneLogin")
      }
    }
  }
</script>

<style lang='scss' scope>

</style>