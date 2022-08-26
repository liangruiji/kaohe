<!--
 * @ Author: Gszs
 * @ Create Time: 2020-01-07 22:51:35
 * @ Modified by: Gszs
 * @ Modified time: 2020-04-01 17:11:13
 * @ Description: 生活
 -->

<template>
  <div class="life-box">
    <el-button-group>
      <!-- 我是注释 -->
      <el-button v-for="(key, val) in iconForLife" :key="key" class="btnStyle" @click="getCurrentIcon">
        <el-tooltip class="tooltip-style" effect="dark" :content="key" placement="top-start">
          <svg-icon :icon-name="val" class="icon" />
        </el-tooltip>
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
import { iconForLife } from '@/utils/matchSearch'
import controlIconMixins from '../mixins/controlIcon'

export default {
  name: 'Life',
  mixins: [controlIconMixins],
  data() {
    return {
      currentIcon: '',
      iconForLife,
    }
  },
}
</script>

<style lang="scss">
// @import url('../../styles/documention.scss');
.life-box {
  .el-button {
    font-size: 20px;
    padding: 9px;
    margin: 1px 5px 15px 5px !important;
  }
}
</style>
