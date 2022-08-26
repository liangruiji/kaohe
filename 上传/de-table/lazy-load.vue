<!--
 * @Author: your name
 * @Date: 2022-03-03 16:40:03
 * @LastEditTime: 2022-03-08 11:56:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/lazy-load.vue
-->
<template>
  <div v-if="loadStatus" v-show="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LazyLoad',
  props: {
    show: {
      type: Boolean,
      default: !1,
    },
    followShow: {
      type: Boolean,
      default: !0,
    },
  },
  data: function() {
    return (
      (this.loadedCallback = null),
      {
        loadStatus: !1,
        isShow: !1,
      }
    )
  },
  watch: {
    show: {
      immediate: !0,
      handler: function(e) {
        var t = this
        e &&
          ((this.loadStatus = !0),
          this.$nextTick(function() {
            t.handleLoaded()
          })),
          (this.isShow = !this.followShow || e)
      },
    },
  },
  destroyed: function() {
    this.loadedCallback = null
  },
  methods: {
    loaded: function(e) {
      this.loadedCallback = e
      this.handleLoaded()
    },
    handleLoaded: function() {
      this.loadStatus && this.loadedCallback && (this.loadedCallback(), (this.loadedCallback = null))
    },
  },
}
</script>

<style lang="scss" scope></style>
