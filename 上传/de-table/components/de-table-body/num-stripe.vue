<!--
 * @Author: your name
 * @Date: 2022-03-03 16:46:23
 * @LastEditTime: 2022-03-10 10:42:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/num-stripe.vue
-->
<template>
  <div class="progress-outer" :style="{ padding: padding, 'text-align': align }">
    <div
      class="progress-inner"
      :style="{ width: percentage + '%', background: 'linear-gradient(' + (align === 'left' ? 90 : 270) + 'deg, #ecf5ff, #ecf5ff, #ffffff)' }"
    >
      <div class="border"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumStripe',
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    padding: {
      type: String,
      default: '6px 6px',
    },
    align: {
      type: String,
      default: 'left',
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.progress-outer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.progress-outer .progress-inner {
  display: inline-block;
  height: 100%;
  transition: width 0.1s ease;
  overflow: hidden;
  width: 0;
}
.progress-outer .progress-inner .border {
  width: 100%;
  height: 100%;
  border: 1px solid #d9ecff;
}
</style>
