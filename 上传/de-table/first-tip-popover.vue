<!--
 * @Author: your name
 * @Date: 2022-03-03 16:41:39
 * @LastEditTime: 2022-03-09 16:58:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/first-tip-popover.vue
-->
<template>
  <div class="tip-wrap">
    <div v-popover:popover class="popover-btn"></div>
    <div class="slot" @click="onSlotClick">
      <slot></slot>
    </div>
    <el-popover ref="popover" v-model="firstTipVisible" :placement="placement" width="210" trigger="click" :offset="-5">
      <p style="padding:0;margin:0">
        {{ tip }}
      </p>
      <div style="text-align:right">
        <el-button style="padding:15px 0 0" size="mini" type="text" @click="handleKnow">我知道了</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { IcxY } from '@/components/de-table/copy.js'
// var r = n('IcxY')
export default {
  name: 'FirstTipPopover',
  props: {
    tipKey: {
      type: String,
      required: !0,
      default: '',
    },
    tip: {
      type: String,
      required: !0,
      default: '',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    isClickSlotAgree: {
      type: Boolean,
      default: !0,
    },
  },
  data: function() {
    return {
      firstTipVisible: !1,
      isAgree: !0,
    }
  },
  created: function() {},
  methods: {
    init: function() {
      var t = this
      IcxY.getItem(this.tipKey).then(function(e) {
        t.isAgree = e || !1
        t.handleFirstTip()
      })
    },
    handleFirstTip: function() {
      var e = this
      this.isAgree ||
        setTimeout(function() {
          e.firstTipVisible = !0
        }, 1e3)
    },
    onSlotClick: function() {
      this.isClickSlotAgree && this.handleKnow()
    },
    handleKnow: function() {
      this.firstTipVisible && !this.isAgree && ((this.isAgree = !0), IcxY.setItem(this.tipKey, this.isAgree)), (this.firstTipVisible = !1)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.tip-wrap {
  position: relative;
}
.tip-wrap .popover-btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.tip-wrap .slot {
  position: relative;
  z-index: 2;
}
</style>
