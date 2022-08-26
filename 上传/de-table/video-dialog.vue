<!--
 * @Author: your name
 * @Date: 2022-03-03 16:43:01
 * @LastEditTime: 2022-03-08 17:02:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/video-dialog.vue
-->
<template>
  <el-dialog custom-class="video-dialog" :visible.sync="videoVisible" append-to-body :close="onClose" :open="onOpened">
    <div class="main">
      <div v-if="url" class="video" :style="{ width: width }">
        <video ref="video" :src="url" width="100%" height="100%" controls="" autoplay=""></video>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'VideoDialog',
  props: {
    visible: {
      type: Boolean,
      default: !1,
    },
    url: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '1280px',
    },
  },
  data: function() {
    return {}
  },
  computed: {
    videoVisible: {
      get: function() {
        return this.visible
      },
      set: function(e) {
        this.$emit('update:visible', e)
      },
    },
  },
  methods: {
    play: function() {
      var e = this
      this.$refs.video
        ? this.$refs.video.play()
        : this.$nextTick(function() {
            e.$refs.video.play()
          })
    },
    pause: function() {
      var e = this
      this.$refs.video
        ? this.$refs.video.pause()
        : this.$nextTick(function() {
            e.$refs.video.pause()
          })
    },
    onOpened: function() {
      this.play()
    },
    onClose: function() {
      this.pause()
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.video-dialog {
  background: transparent;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.video-dialog .el-dialog__header {
  padding: 0;
}
.video-dialog .el-dialog__header .el-dialog__headerbtn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
}
.video-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
  color: #000;
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
}
.video-dialog .el-dialog__header .el-dialog__headerbtn:hover {
  background: #fff;
}
.video-dialog .el-dialog__body {
  padding: 0;
}
.video-dialog .el-dialog__footer {
  padding: 0;
}
.main {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.main .video {
  max-width: 90vw;
}
</style>
