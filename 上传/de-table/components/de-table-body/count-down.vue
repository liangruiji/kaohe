<!--
 * @Author: your name
 * @Date: 2022-03-03 16:46:39
 * @LastEditTime: 2022-03-08 17:48:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/count-down.vue
-->
<template>
  <div id="tableColumnCountDown" class="count-down" @click="handleLogin">
    {{ isLogin ? '' : '请登录后查看' }}
  </div>
</template>

<script>
// var r = n('Ydol') // vue.js
export default {
  name: 'CountDown',
  props: {
    isLogin: {
      type: [Boolean, String],
      default: !1,
    },
  },
  methods: {
    handleLogin: function() {
      this.isLogin || new Vue.$emit('openUserLogin', 'phoneLogin')
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.count-down {
  text-align: left;
  color: #e6a23c;
  transform: scale(0.9);
  margin-top: -12px;
  margin-left: -6px;
  height: 16px;
  cursor: pointer;
}
</style>
